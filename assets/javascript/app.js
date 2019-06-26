// var trainName = '';
// var destination = '';
// var frequency = '';
// var firstTrain = '';


// Your web app's Firebase configuration

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
    // // Uploads employee data to the database
    database.ref().push(newTrain);
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-train-input").val("");
});

database.ref().on('child_added', function (response) {
    console.log(response.val().destination)
    console.log(response.val().trainName)
    console.log(response.val().frequency)
    console.log(response.val().firstTrain)
    //ES6 Template Literals
    //`train Name:  ${response.val().trainName}`

    var tr = `<tr>
            <td>${response.val().destination}</td>
            <td>${response.val().trainName}</td>
            <td>${response.val().frequency}</td>
            <td>${response.val().trainName}</td>
        </tr>`

    $("#info-input").append(tr)
})

