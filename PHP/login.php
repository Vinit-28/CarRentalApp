<?php
    
    session_start();

    // If the session variables are set (if the user is already logged in) //
    if( isset($_SESSION["isUserLogedIn"]) && isset($_SESSION["userId"]) && isset($_SESSION["sessionId"]) && isset($_SESSION['userType']) ){

        header("Location: ./postLogin.php");
    }
    else{
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/login.css">
    <title>Car Rental App | Login</title>
</head>
<body>
    

    <div class="container">

        <!-- Modal Start -->

        <div class="modalContainer" id="modalContainer">

            <div class="modal">

                <h1 class="modalTitle">Let's Login !</h1>

                <form id="form" >

                    <input required id="userId" class="inputFields" type="text" placeholder="Enter User Id" autocomplete="off">
                    <input required id="password" class="inputFields" type="password" placeholder="Enter Password" autocomplete="off">
                    
                    <div class="buttonsContainer" id="buttonsContainer">
                        <button id="login">Login</button>
                        <button id="register">Register</button>
                    </div>

                </form>
            </div>

        </div>


        <!-- Modal End -->
    
    </div>

</body>

<script src="../JS/login.js"></script>
<script src="../JS/makeAjaxRequest.js"></script>
</html>
<?php
    }
?>