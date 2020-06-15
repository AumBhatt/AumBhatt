var auth;

function loadFirebase() {
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
    auth = firebase.auth(); 
    getData();
}

var database, username, userID, user, user2, userFlag;




function getData() {

    database = firebase.database();
    userAssign();
    user = database.ref('chatApp/messages');
    user.on('value', fetchData, errData);
}


function sendTo(){
    var inp = document.getElementById('inputData').value;
    if( inp != "")
    {user.push({username : username, data : inp, userID : userID});}
    document.getElementById('inputData').value = "";
}

function userAssign(){
    username = localStorage.getItem('UserName');
    //localStorage.removeItem('UserName');
    userID = localStorage.getItem('userID');
    console.log(username + " : " + userID);
}
    

var flag=0;
function fetchData(data){

    var incomingData = data.val();
    console.log(incomingData);
    var dataKeys = Object.keys(incomingData);
    console.log("Keys : " + dataKeys);
    if(flag == 0){
        for(var i=0; i<dataKeys.length; ++i){
            var k = dataKeys[i];
            var actualData = incomingData[k]; 
                if(actualData.username === username){
                    console.log("Local User : " + actualData.username);
                    console.log("Data : "+ actualData.data);
                    printer(actualData, 'messageSent');
                }
                else{
                    console.log("Foreign User : " + actualData.username);
                    console.log("Data : "+ actualData.data);
                    printer(actualData, 'messageRecieve');
                }
        }
        flag = 1;
    }
    else{

            var k = dataKeys[dataKeys.length -1]
            var actualData = incomingData[k];
            if(actualData.username === username){
                console.log("Local User : " + actualData.username);
                console.log("Data : "+ actualData.data);
                printer(actualData, 'messageSent');
                
            }// if
            else{
                console.log("Foreign User : " + actualData.username);
                console.log("Data : "+ actualData.data);
                printer(actualData, 'messageRecieve');
                play();
            }

    }
}

function errData(){
    console.log("Error in loading Data from Firebase!");
}

function printer(dataVals,elm){
    var messageWrapper = document.getElementById('messageWrapper');
    var messageX = document.createElement('div');
    messageX.id = messageX.className = elm;
    messageX.className += " messageRecSend";


    var newText = document.createElement("div");

    newText.id = "textData";
    newText.className = "textData";





    var sName = document.createElement('span');
    sName.className = 'sName';
    sName.id = 'sName';
    
    sName.innerHTML = dataVals.username;
    
    newText.appendChild(sName);
    



    var textM = document.createElement('span');
    textM.id = textM.className = 'textMessage';

    textM.innerHTML = dataVals.data;
    
    newText.appendChild(textM);
    
    messageX.appendChild(newText);
    messageWrapper.appendChild(messageX);
}

// =========Play Sound on new message =======

function play() {
    var audio = new Audio('https://docs.google.com/uc?export=download&id=1y2H3YwB41pn9TQ3Gri-PZm4L33lT_Y2S');
    audio.play();
  }

  