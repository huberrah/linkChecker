//Firebase application setup
// ------------------------------------------------

//Initialize Firebase
// ------------------------------------------------
var config = {
apiKey: " AIzaSyDIIk9FUdVhGNEyqH-aBRH6PsyflXM_p78 ",
authDomain: "cors-db.firebaseapp.com",
databaseURL: "https://cors-db.firebaseio.com",
storageBucket: "cors-db.appspot.com",
messagingSenderId: "500614585161"
};

firebase.initializeApp(config);


// Elements
// ------------------------------------------------
var db = firebase.database();
var form = document.querySelector("form");
var set = document.querySelector(".resultSet");
var urlField = document.querySelector('#url');
var outputField = document.getElementById('output');
var get = document.querySelector('#get');
var push = document.querySelector('#push');
var urlEl, statusEl, result;


// Events
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', loadState);
get.addEventListener('click', makeCorsRequest);
push.addEventListener('click', submitForm)

// Cors function
// ------------------------------------------------
function makeCorsRequest(event) {
    event.preventDefault();
    urlField.innerHTML = '';
    outputField.innerHTML = '';
    console.log('fn makeCorsRequest');
    
    doCORSRequest({
                  method: this.id === 'post' ? 'POST' : 'GET',
                  url: urlField.value,},
                  function printResult(result){
                  outputField.value = result;
                  this.result = result;
                  });
}



// Firebase function
// ------------------------------------------------

function submitForm() {
    console.log('fn submitForm');
    event.preventDefault();
    var status = outputField.value;
    console.log(status);
    
    var ref = db.ref('status');
    
    var statusObj = {
    url: urlField.value,
    content: outputField.value
    }
    
    
    
    //push the status to the DB
    ref.push(statusObj);
}

function loadState() {
    db.ref('status').on('value', createStatuses);
}


function createStatuses(results) {
    console.log('createStatuses', results.val());
    var newStatuses = results.val();
    
    //reset message board
    set.innerHTML = '';
    
    for(var id in newStatuses) {
        createStatus(id, newStatuses[id]);
    }
    
    
}

function createStatus(id, status){
    var li = document.createElement("li");
    li.innerHTML = status.url + ' ' + status.content;
    li.id = urlField.value;
    set.appendChild(li);
}

//Console JS
//Set JQuery for CORS
//Restrict the fields per heroku (add whitelist etc)
jQuery.ajaxPrefilter(function(options) {
                     if (options.crossDomain && jQuery.support.cors) {
                     options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                     }
                     });

//this function is modified from Cors-HerokuApp which belongs to Rob Wu
function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, 'https://cors-anywhere.herokuapp.com/' + options.url);
    console.log("Url is "+ options.url);
    
    x.onload = x.onerror = function() {
        printResult(x.status);
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    
    x.send(options.data);
    urlEl = options.url
    statusEl = x.status;
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
} 