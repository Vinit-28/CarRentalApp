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

                <h1 class="modalTitle">Add Car To Your Car Agency !</h1>
        
                <form id="form" >

                    <input required id="vehicleNo" autocomplete="off" class="inputFields" type="text"  placeholder="*Vehicle Number">
                    <input required id="vehicleModel" autocomplete="off" class="inputFields" type="text"  placeholder="*Vehicle Model">
                    <input required id="seatingCapacity" autocomplete="off" class="inputFields" type="number"  placeholder="*Seating Capacity">
                    <input required id="rentPerDay" autocomplete="off" class="inputFields" type="number"  placeholder="*Rent Per Day">
                    
                    <div class="buttonsContainer" id="buttonsContainer">
                        <button id="closeButton">Close</button>
                    </div>

                </form>
            </div>

        </div>


        <!-- Modal End -->


        
        <h1 class="greeting">👋 Hello <?php echo $_SESSION['userId']; ?></h1>

        <div class="menuButtons">
            <button id="addNewCar">Add New Car</button>
            <button id="ownedCars">Owned Cars</button>
            <button id="bookedCars">Booked Cars</button>
            <button id="availableCarsToRent" >Cars Available On Rent</button>
            <button id="logout" >Logout</button>
        </div>

        <div class="carsContainer" id="carsContainer">

            <!-- Normal Car Card or Booked Car Card Start -->
            <!-- <div class="normalCarCard">
                
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
                    <button class="editButton">Edit</button>
                    <button class="deleteButton">Delete</button>
                </div>
                
            </div> -->
            <!-- Normal Car Card or Booked Car Card End -->



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