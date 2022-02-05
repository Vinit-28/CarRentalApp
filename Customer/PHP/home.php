<?php
    session_start();
    require_once "./userAuthentication.php";

    // If the user is not authenticated //
    if( ! isUserAuthenticated() ){
        session_destroy();
        header("Location: ../../index.php");
    }
    // If the user is authenticated //
    else{
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/home.css">
    <title>Car Rental Agency | Home</title>
</head>
<body>
    
    <div class="container">

        <!-- Modal Start -->

        <div class="modalContainer" id="modalContainer" style="display: none;">

            <div class="modal">

                <h1 class="modalTitle">This is the Modal Title !</h1>

                <form id="form" >

                    <input id="vehicleNo" class="inputFields" type="text">
                    <input id="vehicleModel" class="inputFields" type="text">
                    <input id="seatingCapacity" class="inputFields" type="text">
                    <input id="rentPerDay" class="inputFields" type="text">
                    <input id="fromDate" class="inputFields" type="text">
                    <input id="toDate" class="inputFields" type="text">
                    <input id="amount" class="inputFields" type="text">
                    
                    <div class="buttonsContainer" id="buttonsContainer">
                        <button id="closeButton">Close</button>
                    </div>

                </form>
            </div>

        </div>


        <!-- Modal End -->


        <h1 class="greeting">👋 Hello <?php echo $_SESSION['userId']; ?></h1>

        <div class="menuButtons">
            <button id="availableCarsToRent" >Cars Available On Rent</button>
            <button id="logout" >Logout</button>
        </div>

        <div class="carsContainer" id="carsContainer">

            <!-- Booked Car Card Start -->
            <!-- <div class="bookedCarCard">
                
                <div class="vehicleName">
                    <h3>Vehicle Name (Model)</h3>
                </div>

                <div class="basicVehicleDetails">
                    <span class="labels">Vehicle Number :</span>
                    <span class="values">RJ01 VK 2827</span>
                    <span class="labels">Agency Name :</span>
                    <span class="values">V&K Car Agency</span>
                </div>

                <div class="basicVehicleDetails">
                    <span class="labels">From Date :</span>
                    <span class="values">2022-02-05</span>
                    <span class="labels">To Date :</span>
                    <span class="values">2022-02-10</span>
                </div>

                <div class="carButtonsContainer">
                    <button class="viewDetails">View Details</button>
                    <button class="cancel">Cancel</button>
                </div>
                
            </div> -->
            <!-- Booked Car Card End -->


        </div>

    </div>

    <p hidden id="userId"><?php echo $_SESSION['userId'] ;?></p>
    <p hidden id="sessionId"><?php echo $_SESSION['sessionId'] ;?></p>

</body>
<script src="../JS/makeAjaxRequest.js"></script>
<script src="../JS/home.js"></script>
</html>
<?php
    }
?>