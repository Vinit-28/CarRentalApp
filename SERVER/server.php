<?php

    // starting the Session //
    session_start();

    //Report all errors except warnings.
    error_reporting(E_ALL ^ E_WARNING);

    // Importing the required files //
    require_once "./databaseUtilities.php";
    require_once "./commonUtilities.php";
    require_once "./carAgencyUtilities.php";
    require_once "./customerUtilities.php";


    // Getting the database connection object //
    $databaseConnectionObject = get_DatabaseConnectionObject( constant("databaseName") );


    // If a client has made a request //
    if( isset($_POST['request']) ){
        
        $request = json_decode($_POST['request'], true);


        // If the request is for Login //
        if( $request['task'] == 'login' ){
            

            // If credentials are valid //
            if( isUserAuthorized($databaseConnectionObject, $request['userId'], $request['password']) ){
                
                session_regenerate_id();
                $sessionId = session_id();

                $_SESSION['isUserLogedIn'] = true;
                $_SESSION['userId'] = $request["userId"];
                $_SESSION['sessionId'] = $sessionId;

                
                $_SESSION['userType'] = getColumnValue($databaseConnectionObject, "SELECT * FROM AppUsers Where userId = ?", [$request["userId"]], "s", "userType");
                
                
                // Making the user Online and storing the session id in the database //
                makeUserOnline($databaseConnectionObject, $request["userId"], $sessionId);
                
                $response = array(
                    "result"=>"Success",
                    "message"=>"",
                );
                
                // Sending the response //
                echo json_encode($response);
            }

            // If credentials are not valid //
            else{
                $response = array(
                    "result"=>"Failed",
                    "message"=>"Invalid User Id or Password !!!",
                );
                
                // Sending the response //
                echo json_encode($response);
            }
        }


        // If the request is for Sign Up //
        else if( $request['task'] == 'signup' ){

            $response = registerUser($databaseConnectionObject, $request);

            // Sending the response //
            echo json_encode($response);
        }


        // If the request is to get all available cars //
        else if( $request['task'] == 'Get All Cars' ){

            $response = array(
                "result"=>"Success",
                "allAvailableCars"=>getAllAvailableCars($databaseConnectionObject),
            );
            
            // Sending the response //
            echo json_encode($response);
        }


        // If the request is made by the active user //
        else if( isUserOnline($databaseConnectionObject, $request['userId'], $request['sessionId']) ){

            $userType = getColumnValue($databaseConnectionObject, "SELECT userType FROM AppUsers WHERE userId = ?;", [$request['userId']], "s", "userType");


            // If the request to all the cars of a Car Agency //
            if( $request['task'] == 'Get Owned Cars' && $userType == "agent" ){

                $response = array(
                    "result"=>"Success",
                    "ownedCars"=>getOwnedCars($databaseConnectionObject, $request),
                );
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is add a new car in the car agency //
            else if( $request['task'] == 'Add New Car' && $userType == "agent" ){

                $response = addNewCar($databaseConnectionObject, $request);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is edit a car details in the car agency //
            else if( $request['task'] == 'Edit Car Details' && $userType == "agent" ){

                $response = editCarDetails($databaseConnectionObject, $request);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is delete a car details of the car agency //
            else if( $request['task'] == 'Delete Car Details' && $userType == "agent" ){

                $response = deleteCarDetails($databaseConnectionObject, $request);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is to get all the booked cars of a car agency //
            else if( $request['task'] == 'Get Booked Cars' && $userType == "agent" ){

                $response = getBookedCars($databaseConnectionObject, $request['userId']);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is to get all the booked cars of a car agency //
            else if( $request['task'] == 'Get Booked Cars' && $userType == "customer" ){

                $response = getBookedCarsOfCustomer($databaseConnectionObject, $request['userId']);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is to book a car //
            else if( $request['task'] == 'Book Car' && $userType == "customer" ){

                $response = bookCar($databaseConnectionObject, $request);
                    
                // Sending the response //
                echo json_encode($response);
            }


            // If the request is to book a car //
            else if( $request['task'] == 'Cancel Car Booking' && $userType == "customer" ){

                $response = cancelBooking($databaseConnectionObject, $request);
                    
                // Sending the response //
                echo json_encode($response);
            }

            // If the request is for Logout //
            else if( $request['task'] == 'logout' ){

                // Making user offling || Destroying SessionId //
                makeUserOffline($databaseConnectionObject, $request['userId']);

                $response = array(
                    "result"=>"Success",
                    "message"=>"",
                );
                    
                // Sending the response //
                echo json_encode($response);
            }

        }

    }
?>