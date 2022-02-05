<?php

    // Function to check the user athuenticity //
    function isUserAuthenticated(){

        // If the session variables are set //
        if(  isset($_SESSION["isUserLogedIn"]) && isset($_SESSION["userId"]) && isset($_SESSION["sessionId"]) && isset($_SESSION['userType']) ){
            
            require_once "../../SERVER/databaseUtilities.php";
            require_once "../../SERVER/commonUtilities.php";
            
            // Getting the Database Connection Object //
            $databaseConnectionObject = get_DatabaseConnectionObject();

            // If the user is authenticated //
            if( isUserOnline($databaseConnectionObject, $_SESSION["userId"], $_SESSION["sessionId"]) && $_SESSION['userType'] == "customer" ){
                return true;
            }
        }
        return false;
    }

?>