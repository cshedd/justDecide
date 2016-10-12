//access the database
var ref = new Firebase('https://webdevprojectut.firebaseio.com/');

//reference the user portion of database
var usersRef = ref.child("users");

//user name provided by user
var userName;

//T/F if userName already in database
var inDatabase;

//reference the chat portion of database
var chatRef = ref.child("chat");

//sets the user in the database if not already in there
function setUser(name){
  ref.once("value",function(snapshot){
    inDatabase = snapshot.child("users/"+ name).exists();

    if (inDatabase){
      console.log("User already exists!");
    }
    else{
      usersRef.child(name).set({
        name: name,
        vote: false
      });
      console.log("User added as " + userName + "!");
    }
    //load the buttons 
    buttons();
  });
}

//Adds new message to firebase
function addMessage(){
  var message = $("#btn-input").val();

  var now = moment().valueOf();

  if (message == ""){
    alert("you said nothing");
  }
  else{
    var newMessage = {
      name: userName,
      message: message,
      time: now
    }
    chatRef.push().set(newMessage);
  }
  $("#btn-input").val("");
}


//load the chat
function loadChat(childSnapshot, prevChildKey){
  var key =childSnapshot.key();
  var name = childSnapshot.val().name;
  var message = childSnapshot.val().message;
  var time = childSnapshot.val().time;
  var timeFromNow = moment(time).fromNow();

  $(".chat").append("<li id="+ key +" class='left clearfix'><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>" + name + "</strong> <small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + timeFromNow + "</small></div><p>" + message + "</p></div></li>");
}

//refresh the chat
function refeshChat(){
  chatRef.on("child_added", function(childSnapshot,prevChildKey){
    var key =childSnapshot.key();
    var name = childSnapshot.val().name;
    var message = childSnapshot.val().message;
    var time = childSnapshot.val().time;
    var timeFromNow = moment(time).fromNow();
    $("#" + key).html("<li id="+ key +" class='left clearfix'><div class='chat-body clearfix'><div class='header'><strong class='primary-font'>" + name + "</strong> <small class='pull-right text-muted'><span class='glyphicon glyphicon-time'></span>" + timeFromNow + "</small></div><p>" + message + "</p></div></li>");
  });
}

//Main function
function main() {
  swal({
    title: "Hello there!",
    text: "Please enter your name:",
    type: "input",
    showCancelButton: false,
    closeOnConfirm: true,
    confirmButtonText: "Submit",
    inputPlaceholder: "Firstname Lastname"},
    function(name) {
      if (name === false) return false;
      if (name === "") {
        swal.showInputError("Please enter your name:");
        return false;
      }
      setUser(name);
      userName = name;
      $("#btn-chat").on("click", addMessage);
      chatRef.on("child_added", loadChat);
      setInterval('refeshChat()', 60000);


    });
}

main();


// Closes Chat Room Box
	$('.closeChat').on('click',function(){
		$('.collapse').collapse('hide');
	});

//resize the page based on window size
$(window).on("resize", function () {
	function addChatClass() {
		var viewportWidth = $(window).width();
    if (viewportWidth > 1150) {
      $('.panel-collapse.collapse').addClass("in");
    }
		if (viewportWidth < 1150) {
      $('.panel-collapse.collapse.in').removeClass("in");
    }
    if (viewportWidth < 480) {
      $('.panel-collapse.collapse.in').removeClass("in");
    }
	}
	addChatClass();
}).resize();



// VOTES ////////////////////////////////////////////////////////////////

//References the places node
var placesRef = ref.child("places");


//updates the votes on the screen
function updateVote(){
  placesRef.on("child_added",function(childSnapshot,prevChildKey){
    var key = childSnapshot.key();
    var votes = childSnapshot.val().votes;
    if (key == "optionOne"){
      $("#voteCount1").html(votes);
    }
    else{
      $("#voteCount2").html(votes);
    }
  });  
}

//Main function for the voting buttons
function buttons(){

  ref.once("value", function(snapshot){
    var optionOne = snapshot.child("places/optionOne").val();
    var optionTwo = snapshot.child("places/optionTwo").val();

    //load the first button
    $("#imageOne").append("<img class='img-responsive' value=1 src=" + optionOne.imgFilePath +">");
    $("#nameOne").html(optionOne.name);
    $("#voteCount1").html(optionOne.votes);

    //load the second button
    $("#imageTwo").append("<img class='img-responsive' value=2 src=" + optionTwo.imgFilePath +">");
    $("#nameTwo").html(optionTwo.name);
    $("#voteCount2").html(optionTwo.votes);

    //if user already voted 
    var alreadyVoted = false;

    //who the user already voted for 
    var votedFor = 0;

    //has user already voted
    var userVote = snapshot.child("users/" + userName).val();

    //when vote is made
    $('.imageButton').on('click', function() { 

      //alert that the vote was received 
      swal({title: "Vote Received!",   
        text: "Thank you for participating",
        type: "success", confirmButtonColor: "#2ecc71",
        confirmButtonText: "Close",
        closeOnConfirm: true });

      //button 1 or 2 
      var buttonValue = $(this).attr("value");

      //if user has clicked button one and not voted
      if (buttonValue == 1 && alreadyVoted == false){

          var button = ref.child("places/optionOne");
          var count = snapshot.child("places/optionOne").val().votes;
          var inUser = ref.child("users/" + userName);
          var userVote = snapshot.child("users/" + userName).val().vote;
          console.log(userVote);
          if (userVote == true){
            swal({title: "Can't vote twice!",   
              text: "Thank you for participating",
              type: "error", confirmButtonColor: "#2ecc71",
              confirmButtonText: "Close",
              closeOnConfirm: true });
          }
          else{
            count += 1;             
          }

          button.update({
            votes:count
          });
          alreadyVoted = true;
          votedFor = buttonValue;

          inUser.update({
            vote: alreadyVoted
          });
      }

      // if user has clicked button two and not voted 
      else if (buttonValue == 2 && alreadyVoted == false){
          var button = ref.child("places/optionTwo");
          var count = snapshot.child("places/optionTwo").val().votes;
          var inUser = ref.child("users/" + userName);
          var userVote = snapshot.child("users/" + userName).val().vote;
          console.log(userVote);
          if (userVote == true){
            swal({title: "Can't vote twice!",   
              text: "Thank you for participating",
              type: "error", confirmButtonColor: "#2ecc71",
              confirmButtonText: "Close",
              closeOnConfirm: true });
          }
          else{
            count += 1;             
          }

          button.update({
            votes:count
          });
          alreadyVoted = true;
          votedFor = buttonValue;


          inUser.update({
            vote: alreadyVoted
          });
      }

      //if user already voted
      else if(alreadyVoted == true){
        swal({title: "Can't vote twice!",   
          text: "Thank you for participating",
          type: "error", confirmButtonColor: "#2ecc71",
          confirmButtonText: "Close",
          closeOnConfirm: true });

        // if (votedFor == 1 && buttonValue==2){
        //   var button = ref.child("places/optionTwo");
        //   var count = snapshot.child("places/optionTwo").val().votes;
        //   console.log("first count:" + count);
        //   count += 1; 
        //   console.log("second count: " + count);

        //   button.update({
        //     votes:count
        //   })

        //   var otherButton = ref.child("places/optionOne");
        //   var otherCount = snapshot.child("places/optionOne").val().votes;
        //   otherCount -= 1;
        //   otherButton.update({
        //     votes:otherCount
        //   })

        //   alreadyVoted = true;
        //   votedFor = buttonValue;
        //   console.log("voted for is:" + votedFor);

        // }
        // else if (votedFor == 2 && buttonValue==1){
        //   var button = ref.child("places/optionOne");
        //   var count = snapshot.child("places/optionOne").val().votes;
        //   console.log("first count:" + count);
        //   count += 1; 
        //   console.log("second count: " + count);

        //   button.update({
        //     votes:count
        //   })

        //   var otherButton = ref.child("places/optionTwo");
        //   var otherCount = snapshot.child("places/optionTwo").val().votes;
        //   otherCount -= 1;
        //   otherButton.update({
        //     votes:otherCount
        //   })

        //   alreadyVoted = true;
        //   votedFor = buttonValue;
        //   console.log("voted for is:" + votedFor);

        // }
      }
      // update vote on the screen
      updateVote();
    });
  })
}

//initialize the votes for the first time (only once)
function mainImages(){

  placesRef.set({
   optionOne: {
     name: "Barton Spring Pool",
     imgFilePath: 'assets/images/Barton-Springs.jpg',
     votes: 0
   },
   optionTwo: {
     name: "Hey Cupcake",
     imgFilePath: 'assets/images/Hey-Cupcake.jpg',
     votes: 0 
   }
  });

}
