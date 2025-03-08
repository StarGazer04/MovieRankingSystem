function inputPlaceholders(){
    var form_field = document.getElementsByTagName("input")
    form_field[1].placeholder = 'Username...';
    form_field[2].placeholder = 'Email...';
    form_field[3].placeholder = 'Password...';
    form_field[4].placeholder = 'Re-enter password...';

}


//implementation in backend. This is a frontend solution
function passwordsCheck(){
    //custom error message for mismatched passwords
    document.addEventListener("DOMContentLoaded", function() { //waits for web page (whole html document) to load before running code inside
        var form = document.querySelector("form"); //gets <form> inside register.html

        var password1 = document.getElementsByTagName("input")[3];
        var password2 = document.getElementsByTagName("input")[4];  

        var errorDisplay = document.createElement("small"); //creates <small>  html element
        errorDisplay.style.color = "red"
        errorDisplay.classList.add("error-message"); //assign class to <small> element
        password2.parentNode.appendChild(errorDisplay); // gets parent element <div class = 'input-box'> and adds error message below it

        form.addEventListener("submit", function(event) { //lstens for when user submits the form by clicking register
            if (password1.value !== password2.value) {
                event.preventDefault(); // stops form from submitting. without this, page will reload and user wont see message
                errorDisplay.textContent = "Error: Passwords do not match.";  
            } else {
                errorDisplay.textContent = ""; // clears error is passwords match
            }
        });
    });
}

inputPlaceholders();