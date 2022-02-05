<?php

// Registration of a User //
function registerUser($databaseConnectionObject, $request){

    if( isUserRegistered($databaseConnectionObject, $request['userId']) ){
        return array(
            "result"=>"Failed", 
            "message"=>"User-Id Already Exists !!!"
        );
    }

    $password = password_hash($request['password'], PASSWORD_BCRYPT);

    $query = "INSERT INTO AppUsers(userId, password, contact, email, address, userType) VALUES(?,?,?,?,?,?);";
    runQuery($databaseConnectionObject, $query, [$request['userId'], $password, $request['contact'], $request['email'], $request['address'], $request['userType']], "ssssss", true);
    
    $query = "INSERT INTO LoggedInUsers(userId, sessionId) VALUES(?,?);";
    runQuery($databaseConnectionObject, $query, [$request['userId'], "offline"], "ss", true);

    return array(
        "result"=>"Success", 
        "message"=>"Registration Successfull, Now Login !!!"
    );
}


// Checking whether the user is authorized or not (Will be used for login purpose)//
function isUserAuthorized($databaseConnectionObject, $userId, $password){
    
    $query = "SELECT * FROM AppUsers WHERE userId = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$userId], "s");
    
    if( $result && $result->num_rows ){
        $row = $result->fetch_assoc();
        $result->close();
        return password_verify($password, $row["password"]);
    }
    $result->close();
    return false;
}


// Function to check whether the user is Registered in the App or Not //
function isUserRegistered($databaseConnectionObject, $userId){

    $query = "SELECT * FROM AppUsers WHERE userId = ?";
    $res = runQuery($databaseConnectionObject, $query, [$userId], "s");
    if( $res && $res->num_rows > 0 ){
        return true;
    }
    return false;
}


// Checking whether the user is online or not //
function isUserOnline($databaseConnectionObject, $userId, $sessionId){
    
    $query = "SELECT * FROM LoggedInUsers WHERE userId = ? AND sessionId = ?;";
    $result = runQuery($databaseConnectionObject, $query, [$userId, $sessionId], "ss");
    
    if( $result && $result->num_rows && $result->fetch_assoc()['sessionId'] != "offline" ){
        $result->close();
        return true;
    }
    $result->close();
    return false;
}


// Storing the SessionId of the user into the database //
function makeUserOnline($databaseConnectionObject, $userId, $sessionId){
    
    $query = "UPDATE LoggedInUsers SET sessionId = ? WHERE userId = ?;";
    runQuery($databaseConnectionObject, $query, [$sessionId, $userId], "ss", true);
}


// Making the User Status Offline //
function makeUserOffline($databaseConnectionObject, $userId){

    $query = "UPDATE LoggedInUsers SET sessionId = ? WHERE userId = ?;";
    runQuery($databaseConnectionObject, $query, ["offline", $userId], "ss", true);
}


// Function to get all the available cars that can be rented to a user //
function getAllAvailableCars($databaseConnectionObject){

    $query = "SELECT * FROM Cars;";
    $result = runQuery($databaseConnectionObject, $query, [], "");
    
    $allAvailableCars = array();
    while($row = $result->fetch_assoc()){
        $allAvailableCars += [$row['vehicleNo']=>$row];
    }

    return $allAvailableCars;
}

?>