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
 
    }


    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(className) {
        return document.querySelectorAll(className);
    }

})();