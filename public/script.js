(function () {

    //Adding an event listener for as soon as the page loads.
    window.addEventListener("load", init);
    function init() {

         //Getting the search bar and submit button
        let searchButton = id('button');
        let searchBar = id('searchbar');
        //Creating an event listener for when the submit button is clicked, getting the content, and going to the appropriate endpoint.
        searchButton.addEventListener("click", function() {
            let locationName = searchBar.value;
            window.location.href = `/flowers/location/${locationName}`;
        })
        
        let saveButton = id("save-flower");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            window.location.href = `/flowers`
        });

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