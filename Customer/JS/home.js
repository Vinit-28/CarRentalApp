
// Declaring some global varibales //
let userId = document.getElementById("userId"); // User-Id of the car agency //
let sessionId = document.getElementById("sessionId"); // Session-Id of the current LoggedIn Car Agency //


// Function to open modal to view all details of the booking //
function openModalToViewBookingDetails(vehicleDetails){

    // Getting the Required Tags //
    let modalContainer = document.getElementById("modalContainer");
    let vehicleNo = document.getElementById("vehicleNo");
    let vehicleModel = document.getElementById("vehicleModel");
    let seatingCapacity = document.getElementById("seatingCapacity");
    let rentPerDay = document.getElementById("rentPerDay");
    let toDate = document.getElementById("toDate");
    let amount = document.getElementById("amount");

    // Modifying the tag elements //
    modalContainer.style.display = "flex";
    vehicleNo.value = vehicleDetails.vehicleNo + " ( Vehicle No. )";
    vehicleModel.value = vehicleDetails.vehicleModel + " ( Vehicle Model )";
    seatingCapacity.value = vehicleDetails.seatingCapacity + " ( Seating Capacity )";
    rentPerDay.value = vehicleDetails.rentPerDay + " ( Rent Per Day )";
    fromDate.value = vehicleDetails.fromDate + " ( From Date )";
    toDate.value = vehicleDetails.toDate + " ( To Date )";
    amount.value = "₹ " + vehicleDetails.amountPaid + " (Total Amount)";
    vehicleNo.disabled = vehicleModel.disabled = seatingCapacity.disabled = rentPerDay.disabled = fromDate.disabled = toDate.disabled = amount.disabled = true;
}


// Function to close the modal //
function closeModel(e){

    if( e != undefined ){
        e.preventDefault();
    }
    let modalContainer = document.getElementById("modalContainer");
    modalContainer.style.display = "none";
}


// Function to check whether the vehicle booking can be canceled or not //
function checkCancelValidity(bookingStartingDate){

    let today = new Date();
    bookingStartingDate = new Date(bookingStartingDate);

    return ( today.getFullYear() <= bookingStartingDate.getFullYear() && today.getMonth() <= bookingStartingDate.getMonth() && today.getDate() <= (bookingStartingDate.getDate()-1) );
}


// Function to Cancel the car/vehicle booking //
function cancelBooking(vehicleDetails){


    // Check Booking Cancellation Validity //
    if( checkCancelValidity(vehicleDetails.fromDate) == false ){
        alert("Cancellation of booking should be before 1 day from Start Date of Booking !!!");
        return;
    }

    // Taking user confirmation //
    if( confirm("Do You Really Want to Cancel the Booking ?") ){
        
        // Creating some request variables and response handler //
        let data = {
            "task" : "Cancel Car Booking",
            "userId" : userId.innerText,
            "sessionId" : sessionId.innerText,
            "bookingDetails" : vehicleDetails
        };
        
        let onLoadFunction = function(){
            
            if( this.status != 200 ){
                alert("Something Went Wrong !!!");
            }
            else{
                
                let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
                if( responseText.includes("Success") ){
                    let response = JSON.parse(responseText);
                    alert(response.message);
                    showBookedCars();
                }
                else{
                    alert(responseText);
                }
            }
        }
    
        // Making the AJAX Request //
        makeAJAXRequest("POST", "../../SERVER/server.php", data, onLoadFunction, false);
    }

}



// Function to make a card of a car //
function getBookedCarCard(vehicleDetails){

    // Creating tags at runtime //
    let bookedCarCard = document.createElement("div");
    let vehicleName = document.createElement("div");
    let h3VehicleName = document.createElement("h3");
    let basicVehicleDetails1 = document.createElement("div");
    let basicVehicleDetails2 = document.createElement("div");
    let label1 = document.createElement("span");
    let label2 = document.createElement("span");
    let label3 = document.createElement("span");
    let label4 = document.createElement("span");
    let value1 = document.createElement("span");
    let value2 = document.createElement("span");
    let value3 = document.createElement("span");
    let value4 = document.createElement("span");
    
    // Adding Classes //
    bookedCarCard.classList.add("bookedCarCard");
    vehicleName.classList.add("vehicleName");
    basicVehicleDetails1.classList.add("basicVehicleDetails");
    basicVehicleDetails2.classList.add("basicVehicleDetails");
    label1.classList.add("labels");
    label2.classList.add("labels");
    label3.classList.add("labels");
    label4.classList.add("labels");
    value1.classList.add("values");
    value2.classList.add("values");
    value3.classList.add("values");
    value4.classList.add("values");
    
    // Assigning values to the attributes //
    h3VehicleName.innerText = vehicleDetails.vehicleModel;

    // Wrapping up the tags //
    vehicleName.appendChild(h3VehicleName);
    bookedCarCard.appendChild(vehicleName);
    bookedCarCard.appendChild(basicVehicleDetails1);
    bookedCarCard.appendChild(basicVehicleDetails2);
   
    // Creating tag elements //
    let carButtonsContainer = document.createElement("div");
    let viewDetails = document.createElement("button");
    let cancel = document.createElement("button");

    // Adding classes //
    carButtonsContainer.classList.add("carButtonsContainer");
    viewDetails.classList.add("viewDetails");
    cancel.classList.add("cancel");
    viewDetails.innerText = "View Details";
    cancel.innerText = "Cancel Booking";


    viewDetails.onclick = ()=>{openModalToViewBookingDetails(vehicleDetails);};
    cancel.onclick = ()=>{cancelBooking(vehicleDetails);};

    // Assigning values to the attributes //
    label1.innerText = "Vehicle Number :";
    label2.innerText = "Agency Name :";
    label3.innerText = "From Date :";
    label4.innerText = "To Date :";
    value1.innerText = vehicleDetails.vehicleNo;
    value2.innerText = vehicleDetails.ownedBy;
    value3.innerText = vehicleDetails.fromDate;
    value4.innerText = vehicleDetails.toDate;

    // Wrapping up the tags //
    basicVehicleDetails1.appendChild(label1);
    basicVehicleDetails1.appendChild(value1);
    basicVehicleDetails1.appendChild(label2);
    basicVehicleDetails1.appendChild(value2);

    basicVehicleDetails2.appendChild(label3);
    basicVehicleDetails2.appendChild(value3);
    basicVehicleDetails2.appendChild(label4);
    basicVehicleDetails2.appendChild(value4);

    carButtonsContainer.appendChild(viewDetails);
    carButtonsContainer.appendChild(cancel);
    bookedCarCard.appendChild(carButtonsContainer);


    // Returning car card element //
    return bookedCarCard;
}



// Function to show Booked cars of the customer //
function showBookedCars(){

    // Creating some request variables and response handler //
    let data = {
        "task" : "Get Booked Cars",
        "userId" : userId.innerText,
        "sessionId" : sessionId.innerText,
    };
    
    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") ){
                let response = JSON.parse(responseText);
                
                let carsContainer = document.getElementById("carsContainer");
                carsContainer.innerHTML = "";
                // console.log(response.bookedCars);

                // Iterating through all the booked cars //
                for(let key in response.bookedCars){
                    carsContainer.appendChild(getBookedCarCard(response.bookedCars[key]));
                }
            
            }
            else{
                alert(responseText);
            }
        }
    }
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../../SERVER/server.php", data, onLoadFunction, false);
}


// Function to logout the user //
function logoutUser(){

    // Creating some request variables and response handler //
    let data = {
        "task" : "logout",
        "userId" : userId.innerText,
        "sessionId" : sessionId.innerText,
    };
    
    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") )
                window.open("../../PHP/logout.php", "_self");
            else
                alert(responseText);
        }
    }
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../../SERVER/server.php", data, onLoadFunction, false);
}




// Binding the Buttons with their handlers //
document.getElementById("availableCarsToRent").addEventListener("click", ()=>{window.open("../../PHP/availableCarsToRent.php", "_self");});
document.getElementById("logout").addEventListener("click", logoutUser);
document.getElementById("closeButton").addEventListener("click", closeModel);


// Calling the Function to show Booked Cars //
showBookedCars();