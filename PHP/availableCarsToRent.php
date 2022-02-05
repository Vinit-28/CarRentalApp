<?php

    session_start();
    require_once "./userAuthentication.php";

    // Checking the user authenticity //
    $isUserAuthenticated = isUserAuthenticated();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/availableCarsToRent.css">
    <title>Car Rental Agency | Available Cars</title>
</head>
<body>
    <div class="container">

        <!-- Modal Start -->

        <div class="modalContainer" id="modalContainer" style="display: none;">

            <div class="modal">

                <h1 class="modalTitle">Let's Book a Car !</h1>

                <form id="form" >

                    <input required id="vehicleNo" autocomplete="off" class="inputFields" type="text"  placeholder="*Vehicle Number">
                    <input required id="vehicleModel" autocomplete="off" class="inputFields" type="text"  placeholder="*Vehicle Model">
                    <input required id="seatingCapacity" autocomplete="off" class="inputFields" type="text"  placeholder="*Seating Capacity">
                    <input required id="rentPerDay" autocomplete="off" class="inputFields" type="text"  placeholder="*Rent Per Day">
                    
                    <label class="inputFields">
                        Choose Start Date : 
                        <?php echo '<input type="date" id="fromDate" min="' . date("Y-m-d") .'">';?>
                    </label>

                    <input required id="numberOfDays" autocomplete="off" class="inputFields" type="number" placeholder="*Number of Days">
                    <input required id="amount" autocomplete="off" class="inputFields" type="text" value="₹ 0 (Total Amount)">
                    
                    <div class="buttonsContainer" id="buttonsContainer">
                        <button id="closeButton">Close</button>
                        <button id="rentCar">Rent Car</button>
                    </div>

                </form>
            </div>

        </div>


        <!-- Modal End -->

        <h1 class="greeting">👋 Hello <?php echo ($isUserAuthenticated)? $_SESSION['userId'] : "User"; ?></h1>


        <div class="carsContainer" id="carsContainer">

            <!-- Book Car Card Start -->
            <!-- <div class="bookCarCard">
                
                <div class="vehicleName">
                    <h3>Vehicle Name (Model)</h3>
                </div>

                <div class="basicVehicleDetails">
                    <span class="labels">Vehicle Number :</span>
                    <span class="values">RJ01 VK 2827</span>
                    <span class="labels">Seating Capacity :</span>
                    <span class="values">5 Persons</span>
                </div>

                <div class="basicVehicleDetails">
                    <span class="labels">Agency Name :</span>
                    <span class="values">V&K Car Agency</span>
                    <span class="labels">Rent Per Day :</span>
                    <span class="values">₹ 1000/-</span>
                </div>

                <div class="carButtonsContainer">
                    <button class="bookNow">Book Now</button>
                </div>
                
            </div> -->
            <!-- Book Car Card End -->


        </div>

    </div>

    <p hidden id="userId"><?php echo ($isUserAuthenticated)? $_SESSION['userId'] : "" ;?></p>
    <p hidden id="sessionId"><?php echo ($isUserAuthenticated)? $_SESSION['sessionId'] : "" ;?></p>
    <p hidden id="userType"><?php echo ($isUserAuthenticated)? $_SESSION['userType'] : "" ;?></p>

</body>
<script src="../JS/makeAjaxRequest.js"></script>
<script src="../JS/availableCarsToRent.js"></script>
</html>