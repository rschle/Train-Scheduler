// Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyArf1xAl-D8nOnn-hrbcwPdUNBBxZbwACE",
    authDomain: "trainscheduler-95f77.firebaseapp.com",
    databaseURL: "https://trainscheduler-95f77.firebaseio.com",
    projectId: "trainscheduler-95f77",
    storageBucket: "trainscheduler-95f77.appspot.com",
    messagingSenderId: "543578823816",
    appId: "1:543578823816:web:bebbb57e4ec86a6b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  //button for adding a train
  $(".btn.btn-primary").on("click", function(event){
      event.preventDefault();


      //Grabbing user input
      var trainName = $("#train-name").val().trim();
      var trainDestination = $("#destination").val().trim();
      var trainTime = $("#train-time").val().trim();
      var trainFrequency = $("#frequency").val().trim();

      var newTrain = database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
      });

      // console.log(newTrain.name);
      // console.log(newTrain.destination);
      // console.log(newTrain.time);
      // console.log(newTrain.frequency);

      //clearing input fields
      $("#train-name").val("");
      $("#destination").val("");
      $("#train-time").val("");
      $("#frequency").val("");

  });

  database.ref().on("child_added", function(snapshot){
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

  //storing train's first time of the day in a variable 
    var startTime = moment().format(trainTime, "HH:mm");
    console.log(startTime);
  //have to store current time in a variable
    var timeNow = moment();
      console.log("Time now is: " + moment(timeNow).format("HH:mm"));


  //to find out how many minutes until the next train, we first need to figure out 
  //the difference between the start time for the train and the current time

    var timeDiff = Math.abs(moment(startTime, "HH:mm").diff(timeNow, "minutes"));
      console.log(timeDiff)

    var remainderTime = timeDiff % trainFrequency;
    console.log(remainderTime);

    var minAway = trainFrequency - remainderTime;
    console.log(minAway);

    var nextTrainArrival = moment().add(minAway, "minutes");

    console.log(moment(nextTrainArrival).format("HH:mm"));


    var trTrain = $("<tr>");
    trTrain.append($("<td>").text(trainName));
    trTrain.append($("<td>").text(trainDestination));
    trTrain.append($("<td>").text(trainFrequency));
    trTrain.append($("<td>").text(moment(nextTrainArrival).format("HH:mm")));
    trTrain.append($("<td>").text(minAway));
    $(".table").append(trTrain);

  });