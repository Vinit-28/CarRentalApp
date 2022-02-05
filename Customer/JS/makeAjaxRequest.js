

// Function to encode an object recursively //
function encodeObjectRecursively(dataObject){

    for(let key in dataObject){

        if( typeof(dataObject[key]) == 'string' ){
            dataObject[key] = encodeURIComponent(dataObject[key]);
        }
        else if( typeof(dataObject[key]) == 'object' ){
            encodeObjectRecursively(dataObject[key]);
        }
    }
}



// Function to make a AJAX request to the Server //
function makeAJAXRequest(requesType, serverUrl, data, onLoadFunction, async=true){

    encodeObjectRecursively(data);
    console.log(data);


    // Creating the XHR Object //
    let xhrObject = new XMLHttpRequest();
    xhrObject.open(requesType, serverUrl, async);
    xhrObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    // After getting the Response from the Server this Function will be executed //
    xhrObject.onload = onLoadFunction;

    // Making the Request //
    xhrObject.send("request="+JSON.stringify(data));
}