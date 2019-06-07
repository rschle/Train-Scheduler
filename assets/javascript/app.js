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

      var newTrain = {
          name: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      $("#train-name").val("");
      $("#destination").val("");
      $("#train-time").val("");
      $("#frequency").val("");

  });
