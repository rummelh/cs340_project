
// Get the objects we need to modify
let updatePotionForm = document.getElementById('update-potion-form-ajax');

// Modify the objects we need
updatePotionForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let input_potion_name = document.getElementById("mySelect");
    let input_potion_effect = document.getElementById("input-potion_effect-update");
    let input_potion_color = document.getElementById("input-potion_color-update");
    let input_potion_price = document.getElementById("input-potion_price-update");

    // Get the values from the form fields
    let potion_nameValue = input_potion_name.value;
    let potion_effectValue = input_potion_effect.value;
    let potion_colorValue = input_potion_color.value;
    let potion_priceValue = input_potion_price.value;
    
    // currently the database table for potion does not allow updating values to NULL
    // so we must abort if being bassed NULL for price


    // Put our data we want to send in a javascript object
    let data = {
        potion_name: potion_nameValue,
        potion_effect: potion_effectValue,
        potion_color: potion_colorValue,
        potion_price: potion_priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-potion-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, potion_nameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, potion_ID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("potions-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == potion_ID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData.potion_name;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.potion_effect;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.potion_color;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.potion_price;
            
       }
    }
}
