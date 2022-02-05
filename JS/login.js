


// Function to request the server to login //
function login(e){

    e.preventDefault();

    let userId = document.getElementById("userId");
    let password = document.getElementById("password");

    // Creating some request variables and response handler //
    let data = {
        "task" : "login",
        "userId" : userId.value,
        "password" : password.value,
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
                    window.location = "./postLogin.php";
                }
                else{
                    alert(response.message);
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




// Binding the buttons with their hanlders //
document.getElementById("login").addEventListener("click", login);
document.getElementById("register").addEventListener("click", (e)=>{
    e.preventDefault();
    window.open("./signup.php", "_self");
});