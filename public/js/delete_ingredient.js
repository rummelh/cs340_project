function deleteIngredient(ingredient_ID) {
    //Citation for the follow code:
    //Date: 5/24/2023
    //Adapted from nodejs-starter-app steps 3-8 to fit project 
    //https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js
        // Put our data we want to send in a javascript object
        let data = {
            ingredient_ID: ingredient_ID
        };
    
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-ingredient-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
    
        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
    
                // Add the new data to the table
                deleteRow(ingredient_ID);

                location.reload();
    
            }
            else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    }
    
    
    function deleteRow(ingredient_ID){
    
        let table = document.getElementById("ingredient-table");
        for (let i = 0, row; row = table.rows[i]; i++) {
           //iterate through rows
           //rows would be accessed using the "row" variable assigned in the for loop
           if (table.rows[i].getAttribute("data-value") == ingredient_ID) {
                table.deleteRow(i);
                break;
           }
        }
    }