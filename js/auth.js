
    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyA-pe3RvKdYeU_dgat5mUYZwutAvVdPCgk",
    authDomain: "testingfirebase-e23c9.firebaseapp.com",
    databaseURL: "https://testingfirebase-e23c9.firebaseio.com",
    projectId: "testingfirebase-e23c9",
    storageBucket: "testingfirebase-e23c9.appspot.com",
    messagingSenderId: "257168791245",
    appId: "1:257168791245:web:203a152f146d2d19343b84"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);    


const auth = firebase.auth();




function logIN(){

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    username = localStorage.getItem('UserName');
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Log In error : " + errorMessage);
            document.getElementById('errorHTML').innerHTML = "Wrong Credentials!!!";
            // ...
        })
    }

var username;

function signUP(){

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    username = document.getElementById('username').value;
    console.log(username)
            auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Sign Up In error : " + errorMessage);
                // ...
            })
    }

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var email = user.email;
      var userID = user.uid;
      console.log("Returning Username " + username);
      localStorage.setItem('UserName',username);
      localStorage.setItem('userID', userID);
        window.location.href = "chat.html";
    } else {
      // User is signed out.
      // ...
      console.log("User signed out :(");
    }
  });

