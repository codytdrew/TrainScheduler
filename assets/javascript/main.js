
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAi1TFO8HeWckW5nO7k-m9rCj_aFy10jLc",
    authDomain: "trainscheduler-32f74.firebaseapp.com",
    databaseURL: "https://trainscheduler-32f74.firebaseio.com",
    projectId: "trainscheduler-32f74",
    storageBucket: "trainscheduler-32f74.appspot.com",
    messagingSenderId: "244766730750"
  };
  firebase.initializeApp(config);

  //Create a variable to reference the database
  var database = firebase.database();

  //Variables
  var trainName = "";
  var trainDestination = "";
  var trainTime = "";
  var trainFrequency = 0;

  //Captures the submit button
  $("#submission").on("click", function(event) {
    event.preventDefault();

    //Stored user input data about train information in variables
  trainName = $('#add-train-name').val().trim();
  trainDestination = $('#add-train-destination').val().trim();
  trainTime = $('#add-train-time').val().trim();
  trainFrequency = $('#add-train-frequency').val().trim();
    
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  //Pushing to database
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFrequency: trainFrequency
  });
    $('form')[0].reset();
  });

  //Main Process w/ Initial Code
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    //updated the variable with data from the database
    trainName = snapshot.val().trainName;
    trainDestination = snapshot.val().trainDestination;
    trainTime = snapshot.val().trainTime;
    trainFrequency = snapshot.val().trainFrequency;

    //moment.js methods for time calls and calculations.  May be encountering an error with the current time.  Minutes Away may be larger than the frequency interval
    var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
    //Creates a moment of current date and time and storing it in variable whenever user clicks submit
    var nowMoment = moment();

    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
    var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    var minutesAway = frequency - minutesSinceLastArrival;

    var nextArrival = nowMoment.add(minutesAway, 'minutes');
    var formatNextArrival = nextArrival.format("HH:mm");

      //Where my moment.js train info should populate
      var tRow = $('<tr>');

      var nameTd = $('<td>').text(trainName);
      console.log(nameTd);
      var destinationTd = $('<td>').text(trainDestination);
      var firstTrainTd = $('<td>').text(trainTrain);
      var frequencyTd = $('<td>').text(trainFrequency);
      var arrivalTd = $('<td>').text(formatNextArrival);
   
      //append the data to the rows in the table 
      tRow.append(nameTd).append(destinationTd).append(firstTrainTd).append(frequencyTd).append(arrivalTd);
   

      //Can't get the data to show up :/
      $('#train-scheduler').append(tRow);

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
