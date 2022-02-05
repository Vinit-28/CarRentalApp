

// Function to request the server for the registration of a user //
function signUp(e){

    e.preventDefault();

    // Creating some request variables and response handler //
    let userType = document.getElementById("userType");

    let data = {
        "task" : "signup",
        "userId" : document.getElementById("userId").value,
        "password" : document.getElementById("password").value,
        "email" : document.getElementById("email").value,
        "address" : document.getElementById("address").value,
        "contact" : document.getElementById("contact").value,
        "userType" : userType.options[userType.selectedIndex].value,
    };
    
    let onLoadFunction = function(){
        
        if( this.status != 200 ){
            alert("Something Went Wrong !!!");
        }
        else{
            
            let responseText = this.responseText.replace(/(\r\n|\n|\r)/gm, "");
            if( responseText.includes("Success") || responseText.includes("Failed") ){
                let response = JSON.parse(responseText);
                // Displaying the Request Response Message // 
                alert(response.message);
                if( response.result == "Success" ){
                    window.location = "./login.php";
                }
            }
            else{
                alert(responseText);
            }
        }
    }
    // Making the AJAX Request //
    makeAJAXRequest("POST", "../SERVER/server.php", data, onLoadFunction, false);
}




// Binding the buttons with their handlers //
document.getElementById("register").addEventListener("click", signUp);
document.getElementById("login").addEventListener("click", (e)=>{
    e.preventDefault();
    window.open("./login.php", "_self");
});