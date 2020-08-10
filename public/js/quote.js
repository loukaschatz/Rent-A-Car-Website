 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCtvyFhVtLVTjnFMZI8MAHG_p47NBroRwQ",
    authDomain: "kastrirentacar.firebaseapp.com",
    databaseURL: "https://kastrirentacar.firebaseio.com",
    projectId: "kastrirentacar",
    storageBucket: "kastrirentacar.appspot.com",
    messagingSenderId: "985851782551",
    appId: "1:985851782551:web:743dc88b7f64b4547f90d2",
    measurementId: "G-DZ2ZE94851"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Reference messages collection
  var messagesRef = firebase.database().ref('quotes')

document.querySelector('.btn-primary').addEventListener('click', submitForm);

// Submit Form
function submitForm(e){
    e.preventDefault();

    // Getting the values from the form
    const pickup = document.getElementById('pickup').value
    const reLocation = document.getElementById('return').value
    const pickUpDate = document.getElementById('pickupdate').value
    const returnDate = document.getElementById('returndate').value
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const tel = document.getElementById('telephone').value

    // Save quote
    saveMessage(pickup, reLocation, pickUpDate, returnDate, name, email, tel)

    alert('Message sent!')

    // Clear form
    document.querySelector('#contact').reset()
}

// Save quote to firebase
function saveMessage(pickup, reLocation, pickUpDate, returnDate, name, email, tel){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        pickup: pickup,
        reLocation: reLocation,
        pickUpDate: pickUpDate,
        returnDate: returnDate,
        name: name,
        email: email,
        tel: tel
    })
}