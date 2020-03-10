// Add this script to required pages in the head tag
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// Core firebase
// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js"></script>
// Firebase firestore, auth
// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-firestore.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.10.0/firebase-auth.js"></script>

// (function (){
    console.log("app works");

    var firebaseConfig = {
        apiKey: "AIzaSyAF1yL7K0lMUPYljmuQBQlGR-z_RkjUjaA",
        authDomain: "kisaandost-1a1a.firebaseapp.com",
        databaseURL: "https://kisaandost-1a1a.firebaseio.com",
        projectId: "kisaandost-1a1a",
        storageBucket: "kisaandost-1a1a.appspot.com",
        messagingSenderId: "766182983991",
        appId: "1:766182983991:web:3570fcac78d212b4a8b2b2"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
      

      var fireauth = firebase.auth();
      var provider = new firebase.auth.GoogleAuthProvider();
      
      function googleSigninProcess() {
        console.log('starting google signin');
        fireauth.signInWithPopup(provider).then(function (result) {
          var user = result.user;
      
          console.log('Signed in as : ' + user.displayName);
          location.replace('forum.html');
          // ...
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
      
          console.log('ERROR : ' + errorCode + ' : ' + errorMessage);
        });
      }
      
      function registrationProcess() {
        console.log('starting registration');
      }
      
      function phoneSignin() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          }
        });
      }

// Author Ralphin

//needed varaibles
let nameDOM = document.querySelector('#name');
let emailDOM = document.querySelector('#email');
let mobileDOM = document.querySelector('#Mobilenumber');
let aadharDOM = document.querySelector('#aadharnumber');
let OTPDOM = document.querySelector('#OTP');
let modalDOM = document.querySelector('#captchacode')

//no needed
// function signInWithEmail(){
//     let email = emailDOM.value;
//     let password = passwordDOM.value;
 
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(() =>{
//         console.log('email user account creation succcessful')
//     })
//     .catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         alert('UserAccount creation with email, problem: '+errorMessage)
//         // ...
//       });
// }
firebase.auth().languageCode = 'en';
(function recaptcha(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptchacontainer');
    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
      });
})();



function register(){
    var phoneNumber = '+91'+mobileDOM.value
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
    console.log(confirmationResult);
    $('#myModal').modal('show')
    window.confirmationResult = confirmationResult;
    }).catch(function (error) {
    console.log('Error',error)
    });
}



function getOTP() {
    const otp = parseInt(OTPDOM.value);
    confirmationResult.confirm(otp).then(function (result) {
        console.log(result);
        var user = result.user;
        // ...
      }).catch(function (error) {
        console.log(error);
      });
}