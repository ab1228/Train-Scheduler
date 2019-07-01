var trainName = '';
var destination = '';
var frequency = '';
var firstTrain = '';
var nextArrival = '';

function hours() {
    var clock = moment().format('MMMM Do YYYY, HH:mm:ss');
    $("#clock").text(clock, 1000);
} setInterval(hours);


// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPK5NLT6wxwD8bNPUqgTBcJq2qCnaRuZ8",
    authDomain: "trainscheduler-b772e.firebaseapp.com",
    databaseURL: "https://trainscheduler-b772e.firebaseio.com",
    projectId: "trainscheduler-b772e",
    storageBucket: "",
    messagingSenderId: "437215777931",
    appId: "1:437215777931:web:6a804c184849a527"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// variable to reference the database
var database = firebase.database();

// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrain = $('#first-train-input').val().trim();
    // "Setting values in the database"
    var newTrain = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
    }
    // // Uploads train data to the database
    database.ref().push(newTrain);
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
});

database.ref().on('child_added', function (response) {
    var destinationT = (response.val().destination)
    var trainNameT = (response.val().trainName)
    var tFrequency = (response.val().frequency)
    var firstTrain = (response.val().firstTrain)

    ////Train time

    var firstTrainA = moment(firstTrain, "HH:mm").subtract(1, "days");
    var diffTime = moment().diff(moment(firstTrainA), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextArrival = moment(nextTrain).format('HH:mm');
    //ES6 Template Literals
    //`train Name:  ${response.val().trainName}`

    var tr = `<tr>
            <td>${trainNameT}</td>
            <td>${destinationT}</td>
            <td>${tFrequency}</td>
            <td>${nextArrival}</td>
            <td>${tMinutesTillTrain}</td>
            
        </tr>`

    $("#info-input").append(tr)
},
    function (errorObject) {
        console.log('Errors handled: ' + errorObject.code);
    }


);

