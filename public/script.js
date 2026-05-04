(function () {

    //Adding an event listener for as soon as the page loads.
    window.addEventListener("load", init);
    function init() {
        

        //Quick check to see if geolocation is working.
        if ("geolocation" in navigator) {
            console.log("Geolocation services working");
        } else {
            console.log("Geolocation servies are not working");
        }

        //Using the geolocation API to get the users current location (more specifically, their latitude and longitude)
        navigator.geolocation.getCurrentPosition((position) => {
        displayOutsideInfo(position.coords.latitude, position.coords.longitude);
        });

        function displayOutsideInfo(latitude, longitude){
                let uvText = id('uv-text')
                let temperatureText = id('temperature-text')

                //Fetching data from UV api
                fetch(`https://currentuvindex.com/api/v1/uvi?latitude=${latitude}&longitude=${longitude}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                    })
                    .then((responseData) => {

                        if (responseData.ok){
                            uvText.textContent = responseData.now.uvi;
                        }
                        else {
                            uvText.textContent = "Something went wrong." + responseData.message;
                        }

                    })
                    .catch((error) => {
                    console.error("Error:", error);
                    });

                    
                    //Fetching data from AQI api
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&forecast_days=1&temperature_unit=fahrenheit`)
                    .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                    })
                    .then((responseData) => {

                        if (responseData.current.temperature_2m !== 'undefined'){
                            temperatureText.textContent = responseData.current.temperature_2m + ' ° Farenheit';
                        }
                        else {
                            temperatureText.textContent = "Something went wrong.";
                        }
                    })
                    .catch((error) => {
                    console.error("Error:", error);
                    });
            }
        

 


         //Getting the search bar and submit button
        let searchButton = id('button');
        let searchBar = id('searchbar');
        //Creating an event listener for when the submit button is clicked, getting the content, and going to the appropriate endpoint.
        searchButton.addEventListener("click", function() {
            let locationName = searchBar.value;
            window.location.href = `/flowers/location/${locationName}`;
        })
        
        let saveButton = id("save-flower");
        if(saveButton){
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });
        }

        let closeButton = id("cancel-btn");
        if(closeButton){
        closeButton.addEventListener("click", function (e) {
            window.location.href = `/flowers`
        });
        }

        let deleteButtons = qsa(".delete-btn");
        if(deleteButtons){
        for (let index = 0; index < deleteButtons.length; index++) {
            const element = deleteButtons[index];
            element.addEventListener("click", function (e) {
                deleteFlower(e.currentTarget.getAttribute("id"));
            });
        }
        }

        function deleteFlower(flowerID) {
        console.log("/flowers/" + flowerID);
        fetch("/flowers/" + flowerID, {
            method: "DELETE"
        })
            .then(() => {
                alert("Flower deleted");
                window.location.href = '/flowers';  
            })
            .catch(alert);
        }

        function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/flowers/", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((newProduct) => {
                window.location.href = `/flowers`;
            })
            .catch(alert);
    }
 
    }


    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(className) {
        return document.querySelectorAll(className);
    }

})();