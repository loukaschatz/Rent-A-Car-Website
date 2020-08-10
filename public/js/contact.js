 /*// Your web app's Firebase configuration
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
  const messagesRef = firebase.database().ref('contact-message')

  document.getElementById('contact').addEventListener('submit', (e) => {
      e.preventDefault;

     const name = getInput('name')
     const email = getInput('email')
     const subject = getInput('subject')
     const message = getInput('message')

     // Save contact form
    saveMessage(name, email, subject, message)
  })

  function getInput(id) {
      return document.getElementById(id).value 
  }

  // Save contact form to firebase
    function saveMessage(name, email, subject, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        subject: subject,
        message: message
    })
}
*/

function submitEmailForm(form){
  var obj = new XMLHttpRequest();
  obj.onreadystatechange = function(){
    if(obj.readyState == 4) {
      if(obj.status == 200) {
        var x = JSON.parse(obj.responseText);
        alert(x.message);
      }
      else {
        alert("XMLHttp Status: " + obj.status + "; " + obj.statusText);
      }
    }
  };
  obj.open("post", form.action, true);
  obj.setRequestHeader("Content-Type", "application/json");
  obj.send(JSON.stringify({ name: form.name.value, email: form.email.value, subject: form.subject.value, message: form.message.value}));
  return false;
}