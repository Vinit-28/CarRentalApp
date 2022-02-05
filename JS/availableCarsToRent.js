
// Declaring some global variables //
let userId = document.getElementById("userId").innerText; // User Id of the user //
let userType = document.getElementById("userType").innerText; // User type(Agent or Customer) //
let sessionId = document.getElementById("sessionId").innerText; // User type(Agent or Customer) //


// Function to extract the the value of the input tags and will pack in an object //
function extractInputValues(){

    let extractedValues = {
        vehicleNo : (document.getElementById("vehicleNo").value.replace(" ( Vehicle No. )", "")),
        fromDate : document.getElementById("fromDate").value,
        numberOfDays : Math.floor(document.getElementById("numberOfDays").value),
    }

    return extractedValues;
}


function bookCar(e){

    if( e!=undefined )
        e.preventDefault();

    // Creating some request variables and response handler //
    let data = {
        "task" : "Book Car",
        "userId" : userId,
        "sessionId" : sessionId,
        "bookingDetails" : extractInputValues()
    };

    // If cancellation request is invalid //
    if( data.bookingDetails.numberOfDays <= 0 || data.bookingDetails.numberOfDays > 10 ){
        alert("Booking Days Should be between 1-10 Days !!!");
        return;
    }

    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") || responseText.includes("Failed") ){
                let response = JSON.parse(responseText);
                alert(response.message);
                if( response.result == "Success" )
                    closeModel();
            }
            else{
                alert(responseText);
            }
        }
    }
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../SERVER/server.php", data, onLoadFunction, false);
}


// Function to open modal to book a car //
function openModalToBookCar(vehicleDetails){

    // If user is not logged in //
    if( userId == "" ){
        window.open("../index.php", "_self");
    }
    else if( userType.toLowerCase() == "agent" ){
        alert("A Car Agency Can't Book a Car !!!");
    }
    else{
        // Getting the Required Tags //
        let modalContainer = document.getElementById("modalContainer");
        let vehicleNo = document.getElementById("vehicleNo");
        let vehicleModel = document.getElementById("vehicleModel");
        let seatingCapacity = document.getElementById("seatingCapacity");
        let rentPerDay = document.getElementById("rentPerDay");
        let numberOfDays = document.getElementById("numberOfDays");
        let amount = document.getElementById("amount");

        // Modifying the tag elements //
        modalContainer.style.display = "flex";
        vehicleNo.value = vehicleDetails.vehicleNo + " ( Vehicle No. )";
        vehicleModel.value = vehicleDetails.vehicleModel + " ( Vehicle Model )";
        seatingCapacity.value = vehicleDetails.seatingCapacity + " ( Seating Capacity )";
        rentPerDay.value = vehicleDetails.rentPerDay + " ( Rent Per Day )";
        vehicleNo.disabled = vehicleModel.disabled = seatingCapacity.disabled = rentPerDay.disabled = amount.disabled = true;
        numberOfDays.value = 1;
        amount.value = "₹ " + vehicleDetails.rentPerDay + " (Total Amount)";

        numberOfDays.addEventListener("input", ()=>{
            let days = numberOfDays.value;
            amount.value = "₹ " + (days * vehicleDetails.rentPerDay) + " (Total Amount)";
        });
    }
}


// Function to close the modal //
function closeModel(e){

    if( e != undefined ){
        e.preventDefault();
    }
    let modalContainer = document.getElementById("modalContainer");
    modalContainer.style.display = "none";
}


// Function to make a card of a car //
function getBookCarCard(vehicleDetails){

    
    // Creating tags at runtime //
    let bookCarCard = document.createElement("div");
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
    let carButtonsContainer = document.createElement("div");
    let bookNow = document.createElement("button");
    
    // Adding Classes //
    bookCarCard.classList.add("bookCarCard");
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
    carButtonsContainer.classList.add("carButtonsContainer");
    bookNow.classList.add("bookNow");
    

    // Assigning values to the attributes //
    h3VehicleName.innerText = vehicleDetails.vehicleModel;
    bookNow.innerText = "Book Now";
    bookNow.onclick = ()=>{openModalToBookCar(vehicleDetails)};
    label1.innerText = "Vehicle Number :";
    label2.innerText = "Seating Capacity :";
    label3.innerText = "Agency Name :";
    label4.innerText = "Rent Per Day :";
    value1.innerText = vehicleDetails.vehicleNo;
    value2.innerText = vehicleDetails.seatingCapacity + " Persons";
    value3.innerText = vehicleDetails.ownedBy;
    value4.innerText = "₹ " + vehicleDetails.rentPerDay + " /-";


    // Wrapping up the tags //
    vehicleName.appendChild(h3VehicleName);
    bookCarCard.appendChild(vehicleName);
    bookCarCard.appendChild(basicVehicleDetails1);
    bookCarCard.appendChild(basicVehicleDetails2);
    
    
    // Wrapping up the tags //
    basicVehicleDetails1.appendChild(label1);
    basicVehicleDetails1.appendChild(value1);
    basicVehicleDetails1.appendChild(label2);
    basicVehicleDetails1.appendChild(value2);

    basicVehicleDetails2.appendChild(label3);
    basicVehicleDetails2.appendChild(value3);
    basicVehicleDetails2.appendChild(label4);
    basicVehicleDetails2.appendChild(value4);

    carButtonsContainer.appendChild(bookNow);
    bookCarCard.appendChild(carButtonsContainer);

    // Returning car card element //
    return bookCarCard;
}


// Function to get all the available cars that can rented to a customer //
function getAllAvailableCars(){

    // Creating some request variables and response handler //
    let data = {
        "task" : "Get All Cars",
    };
    
    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") || responseText.includes("Failed") ){
                let response = JSON.parse(responseText);
                
                if( response.result == "Success" ){
                    
                    let carsContainer = document.getElementById("carsContainer");
                    carsContainer.innerHTML = "";

                    // Iterating through all the all avaialble cars //
                    for(let key in response.allAvailableCars){
                        carsContainer.appendChild(getBookCarCard(response.allAvailableCars[key]));
                    }
                }
            }
            else{
                alert(responseText);
            }
        }
    }
    console.log("ghwenv");
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../SERVER/server.php", data, onLoadFunction, false);
}



// Binding the buttons with their handlers //
document.getElementById("closeButton").addEventListener("click", closeModel);
document.getElementById("rentCar").addEventListener("click", bookCar);

// Getting all the available cars from the database //
getAllAvailableCars();