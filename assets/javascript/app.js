var trainName = '';
var destination = '';
var frequency = '';
var firstTrain = '';

var firebaseConfig = {
    apiKey: "AIzaSyAIZOZUGsUGmRUM6rq0puYt7CTaUeNdf3s",
    authDomain: "trainscheduler-fbd30.firebaseapp.com",
    databaseURL: "https://trainscheduler-fbd30.firebaseio.com",
    projectId: "trainscheduler-fbd30",
    storageBucket: "",
    messagingSenderId: "275128111590",
    appId: "1:275128111590:web:4ac160f09d14bac8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrain = $('#first-train-input').val().trim();
    // "Setting values in the database"
    newTrain = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
    }
    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);

    alert("New train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");

});


