<?php

// Function to find the cars/vehicles booked by the customer //
function getBookedCarsOfCustomer($databaseConnectionObject, $userId){

    $query1 = "SELECT * FROM bookedCars WHERE rentedTo = ? ORDER BY fromDate DESC;";
    $query2 = "SELECT seatingCapacity, rentPerDay FROM Cars WHERE vehicleNo = ?;";
    $result1 = runQuery($databaseConnectionObject, $query1, [$userId], "s");
    $counter = 1;
    $bookedCars = array();

    // Iterating thorugh all the booked cars //
    while($row = $result1->fetch_assoc()){

        $tempResult = runQuery($databaseConnectionObject, $query2, [$row['vehicleNo']], "s");
        $row += $tempResult->fetch_assoc();
        $bookedCars += ["bookedCar_$counter"=>$row];
        $counter+=1;
    }

    return array(
        'result' => "Success",
        "bookedCars" => $bookedCars
    );
}



// Function to check whether a car can be booked between the given dates //
function isBookingPossible($databaseConnectionObject, $bookingDetails){

    // Getting the Booking's last/expiry date //
    $toDate = date_create($bookingDetails['fromDate']);
    date_add($toDate, date_interval_create_from_date_string($bookingDetails['numberOfDays'] . " days"));
    $toDate = date_format($toDate, "Y-m-d"); 
    $fromDate = $bookingDetails['fromDate'];

    $query = "SELECT * FROM bookedCars WHERE vehicleNo = ? AND ( ( fromDate <= ? AND toDate >= ? ) OR ( fromDate <= ? AND toDate >= ? ) OR ( fromDate >= ? AND fromDate <= ? ) );";
    $result = runQuery($databaseConnectionObject, $query, [$bookingDetails['vehicleNo'], $fromDate, $fromDate, $toDate, $toDate, $fromDate, $toDate], "sssssss");
    
    // If car can't be booked //
    if( $result && $result->num_rows ){

        $arr = $result->fetch_assoc();
        return array(
            "isBookingPossible" => 'false',
            "message" => "Car is Already Booked From " . $arr['fromDate'] . " to " . $arr['toDate'] . " !!!"
        );
    }

    // If car can be booked //
    return array(
        "isBookingPossible" => 'true',
        "message" => "Car Can Be Booked !!!",
        "fromDate" => $fromDate,
        "toDate" => $toDate
    );
}


// Function to book a car //
function bookCar($databaseConnectionObject, $request){

    // Query to get the car details //
    $query = "SELECT * FROM Cars WHERE vehicleNo = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$request['bookingDetails']['vehicleNo']], "s");

    if( $result && $result->num_rows ){

        $vehicleDetails = $result->fetch_assoc();
        
        // Checking whether the booking is possible or not //
        $arr = isBookingPossible($databaseConnectionObject, $request['bookingDetails']);

        // If booking possible //
        if( $arr['isBookingPossible'] == 'true' ){

            // Booking the car for the customer //
            $query = "INSERT INTO bookedCars(vehicleNo, vehicleModel, ownedBy, rentedTo, fromDate, toDate, amountPaid) VALUES(?,?,?,?,?,?,?);";
            runQuery($databaseConnectionObject, $query, [$vehicleDetails['vehicleNo'], $vehicleDetails['vehicleModel'], $vehicleDetails['ownedBy'], $request['userId'], $arr['fromDate'], $arr['toDate'], ( $vehicleDetails['rentPerDay'] * $request['bookingDetails']['numberOfDays'] ) ], "ssssssd", true);

            return array(
                "result" => "Success",
                "message" => "Your Booking Was Successfull !!!"
            );
        }
        // If booking not possible //
        else{
            return array(
                "result" => "Failed",
                "message" => $arr['message']
            );
        }
    }

    // If car not found in the database //
    return array(
        "result" => "Failed",
        "message" => "Invalid Car Booking Request !!!"
    );
}


// Function to cancel the car/vehicle booking //
function cancelBooking($databaseConnectionObject, $request){

    $bookingDetails = $request['bookingDetails'];
    $query = "DELETE FROM bookedCars WHERE vehicleNo = ? AND rentedTo = ? AND fromDate = ? AND toDate = ?;";
    runQuery($databaseConnectionObject, $query, [$bookingDetails['vehicleNo'], $request['userId'], $bookingDetails['fromDate'], $bookingDetails['toDate']], "ssss", true);

    return array(
        "result" => "Success",
        "message" => "Car Booking Canelled Successfully !!!"
    );
}

?>