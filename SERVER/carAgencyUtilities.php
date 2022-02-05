<?php


// Function to find and return all the cars details of a Car Agent/Agency //
function getOwnedCars($databaseConnectionObject, $request){

    $query = "SELECT * FROM Cars WHERE ownedBy = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$request['userId']], "s");
    $ownedCars = array();

    // Iterating through all the cars //
    while( $row = $result->fetch_assoc() ){
        $ownedCars += [$row['vehicleNo'] => $row];
    }

    return $ownedCars;
}



// Function to check whether a car exits in the database or not //
function isCarExits($databaseConnectionObject, $vehicleNo){

    $query = "SELECT * from Cars WHERE vehicleNo = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$vehicleNo], "s");

    if( $result && $result->num_rows ){

        return ["isCarExits"=>true, "carDetails"=>$result->fetch_assoc()];
    }
    return ["isCarExits"=>false];
}



// Function to add a new car in the car agency //
function addNewCar($databaseConnectionObject, $request){

    $isCarAlreadyExists = isCarExits($databaseConnectionObject, $request['carDetails']['vehicleNo']);
    
    // If that new vehicle number is already registered on someone else name //
    if( $isCarAlreadyExists['isCarExits'] ){

        return array(
            'result' => "Failed",
            "message" => ("Car is already Owned by the Car Agency " . $isCarAlreadyExists['carDetails']['ownedBy'])
        );
    }
    else{

        $newCarDetails = $request['carDetails'];

        $query = "INSERT INTO Cars(vehicleNo, vehicleModel, seatingCapacity, rentPerDay, ownedBy) VALUES(?,?,?,?,?);";
        runQuery($databaseConnectionObject, $query, [$newCarDetails['vehicleNo'], $newCarDetails['vehicleModel'], $newCarDetails['seatingCapacity'], $newCarDetails['rentPerDay'], $request['userId']], "ssids", true);

        return array(
            'result' => "Success",
            "message" => "Car Details Added Successfully !!!"
        );
    }
}



// Function to edit a car details in the car agency if possible //
function editCarDetails($databaseConnectionObject, $request){

    // If the car agency has requested to change the existing vehicle no. of a car //
    if( $request['vehicleNo'] != $request['updatedCarDetails']['vehicleNo'] ){

        $isCarAlreadyExists = isCarExits($databaseConnectionObject, $request['updatedCarDetails']['vehicleNo']);

        // If that new vehicle number is already registered on someone else name //
        if( $isCarAlreadyExists['isCarExits'] ){

            return array(
                'result' => "Failed",
                "message" => ("Car is already Owned by the Car Agency " . $isCarAlreadyExists['carDetails']['ownedBy'])
            );
        }
    }

    // If everything is fine and car details can be updated without any errors //
    $updatedCarDetails = $request['updatedCarDetails'];
    $query = "UPDATE Cars SET vehicleNo = ?, vehicleModel = ?, seatingCapacity = ?, rentPerDay = ? WHERE vehicleNo = ?;";
    runQuery($databaseConnectionObject, $query, [$updatedCarDetails['vehicleNo'], $updatedCarDetails['vehicleModel'], $updatedCarDetails['seatingCapacity'], $updatedCarDetails['rentPerDay'], $request['vehicleNo']], "ssids");

    return array(
        'result' => "Success",
        "message" => "Car Details Updated Successfully !!!"
    );
}



// Function to delete a car details of the car agency //
function deleteCarDetails($databaseConnectionObject, $request){

    $query = "DELETE FROM Cars WHERE ownedBy = ? AND vehicleNo = ?;";
    runQuery($databaseConnectionObject, $query, [$request['userId'], $request['vehicleNo']], "ss");

    return array(
        'result' => "Success",
        "message" => "Car Details Deleted Successfully !!!"
    );
}



// Function to get all the booked cars of a car agency //
function getBookedCars($databaseConnectionObject, $userId){

    $today = date("Y-m-d");
    $query = "SELECT * FROM bookedCars WHERE (fromDate > ? OR toDate > ?) AND ownedBy = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$today, $today, $userId], "sss");
    $counter = 1;
    $bookedCars = array();

    // Iterating thorugh all the booked cars //
    while($row = $result->fetch_assoc()){
        $bookedCars += [$counter=>$row];
        $counter+=1;
    }

    return array(
        'result' => "Success",
        "bookedCars" => $bookedCars,
        "totalBookedCars" => $counter-1,
        "today" => $today
    );
}

?>