// Verify captcha selection
document.querySelector('form').addEventListener('submit', (event) => {
    const response = grecaptcha.getResponse();
    if(response.length == 0) 
    { 
        //reCaptcha not verified
        alert("Please select captcha!"); 
        event.preventDefault();
        return false;
    }else if (response.length > 0) {
        // Calling contactForm post from server.js
        fetch('/contactForm').then((res) => {
            res.json().then((data) => {
                console.log(data)
            })
        })
    }else {
        // Calling quote post from server.js
        fetch('/quote').then((res) => {
            res.json().then((data) => {
                console.log(data)
            })
        })
    }
})







