$(document).ready(function(){

var config = {
    apiKey: "AIzaSyAMEts9hWARL7v2YSrt_n7YvLJ-sysEPmc",
    authDomain: "train-schedule-e55ef.firebaseapp.com",
    databaseURL: "https://train-schedule-e55ef.firebaseio.com",
    projectId: "train-schedule-e55ef",
    storageBucket: "",
    messagingSenderId: "548122629899"
  };

  firebase.initializeApp(config);

    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;
    var nextTrain = 0;
    var timeUntil = 0;

$("#submitButton").on("click", function(){

	event.preventDefault();

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

	var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	var difference = moment().diff(moment(timeConverted), "minutes");
	var timeRemainder = difference % frequency;
	var timeUntil = frequency - timeRemainder;
	var nextTrain = moment().add(timeUntil, "minutes").format("HH:mm");
	
    database.ref().push({
    	trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        timeUntil: timeUntil,
        nextTrain: nextTrain
    });

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrain").val("");
	$("#frequency").val("");
});

database.ref().on("child_added", function(snapshot) {

	var newLine = $("<tr></tr>"); 

	newLine.append('<td>' + snapshot.val().trainName + '</td>');
	newLine.append('<td>' + snapshot.val().destination + '</td>');
	newLine.append('<td>' + snapshot.val().frequency + '</td>');
	newLine.append('<td>' + snapshot.val().nextTrain + '</td>');
	newLine.append('<td>' + snapshot.val().timeUntil + '</td>');

	$("#tbody").append(newLine);
});

});