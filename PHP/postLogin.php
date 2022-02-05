<?php

    session_start();
    require_once "./userAuthentication.php";

    // If the user is not authenticated //
    if( ! isUserAuthenticated() ){

        session_destroy();
        header("Location: ../index.php");
    }
    
    // Redirection the user according to their type //
    if( $_SESSION['userType'] == "agent" ){
        header("Location: ../Agency/PHP/home.php");
    }
    else if( $_SESSION['userType'] == "customer" ){
        header("Location: ../Customer/PHP/home.php");
    }
?>