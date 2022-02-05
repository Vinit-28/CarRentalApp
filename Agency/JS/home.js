
// Declaring some global varibales //
let ownedCars = {}; // Owned Cars of a car agency //
let userId = document.getElementById("userId"); // User-Id of the car agency //
let sessionId = document.getElementById("sessionId"); // Session-Id of the current LoggedIn Car Agency //




// Function to get all the owned cars of a car agaency //
function getOwnedCars(){

    // Creating some request variables and response handler //
    let data = {
        "task" : "Get Owned Cars",
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
                ownedCars = response.ownedCars;
            }
            else{
                alert(responseText);
            }
        }
    }
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../../SERVER/server.php", data, onLoadFunction, false);
}



// Function to extract the the value of the input tags and will pack in an object //
function extractInputValues(){

    let extractedValues = {
        vehicleNo : document.getElementById("vehicleNo").value,
        vehicleModel : document.getElementById("vehicleModel").value,
        seatingCapacity : document.getElementById("seatingCapacity").value,
        rentPerDay : document.getElementById("rentPerDay").value
    }

    return extractedValues;
}



// Function to open modal for either Edit/Add Car Details //
function openModal(options){

    // Getting and Creating the Required Tags //
    let modalContainer = document.getElementById("modalContainer");
    let buttonsContainer = document.getElementById("buttonsContainer");
    let vehicleNo = document.getElementById("vehicleNo");
    let vehicleModel = document.getElementById("vehicleModel");
    let seatingCapacity = document.getElementById("seatingCapacity");
    let rentPerDay = document.getElementById("rentPerDay");
    let actionButton = document.createElement("button");

    // Modifying the tag elements //
    actionButton.classList.add("actionButton");
    actionButton.innerText = options.actionButtonName;
    actionButton.id = 'actionButton';
    actionButton.onclick = options.actionFunction;
    modalContainer.style.display = "flex";
    buttonsContainer.appendChild(actionButton);
    

    // If the Model is Opened for Adding New Car //
    if( options.task == "Add New Car" ){
        
        vehicleNo.value = vehicleModel.value = seatingCapacity.value = rentPerDay.value = "";
    }
    // If the Model is Opened for Editing the Existing Car Details //
    else if( options.task == "Edit Car Details" ){
        
        vehicleNo.value = ownedCars[options.vehicleNo]['vehicleNo'];
        vehicleModel.value = ownedCars[options.vehicleNo]['vehicleModel'];
        seatingCapacity.value = ownedCars[options.vehicleNo]['seatingCapacity'];
        rentPerDay.value = ownedCars[options.vehicleNo]['rentPerDay'];
    }
}



// Function to close the modal and remove the action button attached with it//
function closeModel(e){

    if( e != undefined ){
        e.preventDefault();
    }
    let modalContainer = document.getElementById("modalContainer");
    let actionButton = document.getElementById("actionButton");

    actionButton.remove();
    modalContainer.style.display = "none";
}



// Functio to make request to the server to add a new car in the LoggedIn Car Agency //
function addNewCar(e){

    e.preventDefault();
    
    // Creating some request variables and response handler //
    let data = {
        "task" : "Add New Car",
        "userId" : userId.innerText,
        "sessionId" : sessionId.innerText,
        "carDetails" : extractInputValues()
    };


    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") || responseText.includes("Failed") ){
                let response = JSON.parse(responseText);
                alert(response.message);

                if( response.result == "Success" ){
                    showOwnedCars();
                    closeModel();
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



// Function to open modal to add a new car in the LoggedIn Car Agency //
function openAddCarModal(){

    let options = {
        task : "Add New Car",
        actionButtonName : "Add Car",
        actionFunction : addNewCar,
    }

    openModal(options);
}



// Functio to make request to the server to edit a car details in the LoggedIn Car Agency //
function editCarDetails(vehicleNo){
 
    // Creating some request variables and response handler //
    let data = {
        "task" : "Edit Car Details",
        "userId" : userId.innerText,
        "sessionId" : sessionId.innerText,
        "vehicleNo" : vehicleNo,
        "updatedCarDetails" : extractInputValues()
    };

    
    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") || responseText.includes("Failed") ){
                let response = JSON.parse(responseText);
                alert(response.message);

                if( response.result == "Success" ){
                    showOwnedCars();
                    closeModel();
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



// Function to open modal to edit a car details in the LoggedIn Car Agency //
function openEditCarModal(vehicleNo){

    let options = {
        task : "Edit Car Details",
        vehicleNo : vehicleNo,
        actionButtonName : "Edit Details",
        actionFunction : (e)=>{
            e.preventDefault();
            editCarDetails(vehicleNo);
        },
    }

    openModal(options);
}



// Function to delete a car details fo the LoggedIn Car Agency //
function deleteCarDetails(vehicleNo){

    // Taking user confirmation //
    if( confirm("Do You Really Want to Delete the Car ' " + vehicleNo + " ' ?") ){
        
        // Creating some request variables and response handler //
        let data = {
            "task" : "Delete Car Details",
            "userId" : userId.innerText,
            "sessionId" : sessionId.innerText,
            "vehicleNo" : vehicleNo
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
                    showOwnedCars();
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



// Function to make a card of a car(Owned / Booked) //
function getNormalOrBookedCarCard(task, vehicleDetails){

    
    // Creating tags at runtime //
    let normalCarCard = document.createElement("div");
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
    normalCarCard.classList.add("normalCarCard");
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
    normalCarCard.appendChild(vehicleName);
    normalCarCard.appendChild(basicVehicleDetails1);
    normalCarCard.appendChild(basicVehicleDetails2);
    
    // If to show the owned car of a car agency //
    if( task == "normalCarCard" ){

        // Creating tag elements //
        let carButtonsContainer = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        // Adding classes //
        carButtonsContainer.classList.add("carButtonsContainer");
        editButton.classList.add("editButton");
        deleteButton.classList.add("deleteButton");
        editButton.innerText = "Edit";
        deleteButton.innerText = "Delete";
        editButton.onclick = ()=>{openEditCarModal(vehicleDetails.vehicleNo);};
        deleteButton.onclick = ()=>{deleteCarDetails(vehicleDetails.vehicleNo);};

        // Assigning values to the attributes //
        label1.innerText = "Vehicle Number :";
        label2.innerText = "Seating Capacity :";
        label3.innerText = "Agency Name :";
        label4.innerText = "Rent Per Day :";
        value1.innerText = vehicleDetails.vehicleNo;
        value2.innerText = vehicleDetails.seatingCapacity + " Persons";
        value3.innerText = vehicleDetails.ownedBy;
        value4.innerText = "₹ " + vehicleDetails.rentPerDay + " /-";

        // Wrapping up the tags //
        basicVehicleDetails1.appendChild(label1);
        basicVehicleDetails1.appendChild(value1);
        basicVehicleDetails1.appendChild(label2);
        basicVehicleDetails1.appendChild(value2);

        basicVehicleDetails2.appendChild(label3);
        basicVehicleDetails2.appendChild(value3);
        basicVehicleDetails2.appendChild(label4);
        basicVehicleDetails2.appendChild(value4);

        carButtonsContainer.appendChild(editButton);
        carButtonsContainer.appendChild(deleteButton);
        normalCarCard.appendChild(carButtonsContainer);
    }
    // If to show the Booked cars of a car agency //
    else if( task == "bookedCarCard" ){

        // Assigning values to the attributes //
        label1.innerText = "Vehicle Number :";
        label2.innerText = "Booked By :";
        label3.innerText = "From Date :";
        label4.innerText = "To Date :";
        value1.innerText = vehicleDetails.vehicleNo;
        value2.innerText = vehicleDetails.rentedTo;
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
    }


    // Returning car card element //
    return normalCarCard;
}



// Function to show normal car (Owned Cars) of the agency on the screen //
function showOwnedCars(){

    // Getting the all owned car details //
    getOwnedCars();
    let carsContainer = document.getElementById("carsContainer");
    carsContainer.innerHTML = "";

    // Iterating through all the Owned car's details //
    for(let key in ownedCars){
        carsContainer.appendChild(getNormalOrBookedCarCard("normalCarCard", ownedCars[key]));
    }
}



// Function to show Booked cars of the agency on the screen //
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
                
                if( response.totalBookedCars == 0 ){
                    alert("No Booked Car to Show !!!");
                }
                else{
                    let carsContainer = document.getElementById("carsContainer");
                    carsContainer.innerHTML = "";

                    // Iterating through all the booked cars //
                    for(let key in response.bookedCars){
                        carsContainer.appendChild(getNormalOrBookedCarCard("bookedCarCard", response.bookedCars[key]));
                    }
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
document.getElementById("addNewCar").addEventListener("click", openAddCarModal);
document.getElementById("ownedCars").addEventListener("click", showOwnedCars);
document.getElementById("bookedCars").addEventListener("click", showBookedCars);
document.getElementById("availableCarsToRent").addEventListener("click", ()=>{window.open("../../PHP/availableCarsToRent.php", "_self");});
document.getElementById("logout").addEventListener("click", logoutUser);
document.getElementById("closeButton").addEventListener("click", closeModel);


// Calling the Function to show normal car (Owned Cars) on the screen //
showOwnedCars();