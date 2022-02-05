<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/signup.css">
    <title>Car Rental App | SignUp</title>
</head>
<body>

    <div class="container">

        <!-- Modal Start -->

        <div class="modalContainer" id="modalContainer">

            <div class="modal">

                <h1 class="modalTitle">Let's Register !</h1>

                <form id="form" >

                    <input autocomplete="off" required class="inputFields" id="userId" type="text" placeholder="Enter User-Id">
                    <input autocomplete="off" required class="inputFields" id="password" type="password" placeholder="Enter Password">
                    <input autocomplete="off" required class="inputFields" id="contact" type="text" placeholder="Enter Contact No.">
                    <input autocomplete="off" required class="inputFields" id="email" type="email" placeholder="Enter Email-Id">
                    <input autocomplete="off" required class="inputFields" id="address" type="text" placeholder="Enter Your Address">
                    
                    <select id="userType" class="inputFields">
                        <option value="">Select User Type</option>
                        <option value="agent">Car Rental Agency</option>
                        <option value="customer">Car Rental Customer</option>
                    </select>

                    <div class="buttonsContainer" id="buttonsContainer">
                        <button id="register">Register</button>
                        <button id="login">Login</button>
                    </div>

                </form>

            </div>

        </div>
        <!-- Modal End -->

    </div>

</body>

<script src="../JS/makeAjaxRequest.js"></script>
<script src="../JS/signup.js"></script>
</html>