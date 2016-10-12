var ref = new Firebase('https://webdevprojectut.firebaseio.com/');

var placesRef = ref.child("places");


function loadButtons(){

	placesRef.once("value", function(snapshot){
		var optionOne = snapshot.child("optionOne").val();
		var optionTwo = snapshot.child("optionTwo").val();

		$("#imageOne").append("<img class='img-responsive' src=" + optionOne.imgFilePath +">");
		$("#nameOne").html(optionOne.name);
		$("#voteCount1").html(optionOne.votes);

		$('.imageButton1').on('click', function() { 
			swal({title: "Vote Received!",   
				text: "Thank you for participating",
				type: "success", confirmButtonColor: "#2ecc71",
				confirmButtonText: "Close",
				closeOnConfirm: true });

		});

		$("#imageTwo").append("<img class='img-responsive' src=" + optionTwo.imgFilePath +">");
		$("#nameTwo").html(optionTwo.name);
		$("#voteCount2").html(optionTwo.votes);

		$('.imageButton2').on('click', function() {
			swal({title: "Vote Received!",
				text: "Thank you for participating",
				type: "success", confirmButtonColor: "#2ecc71",
				confirmButtonText: "Close",
				closeOnConfirm: true });
		});

	})
}

function mainImages(){

	var hour = moment().format("LTS");
	console.log("the hour is: " + hour);
	//later add that if the date changes so do the two suggestions 
	//reset the vote 
	// if the time of day is midnight reset

	// placesRef.set({
	// 	optionOne: {
	// 		name: "Barton Spring Pool",
	// 		imgFilePath: 'assets/images/Barton-Springs.jpg',
	// 		votes: 0
	// 	},
	// 	optionTwo: {
	// 		name: "Hey Cupcake",
	// 		imgFilePath: 'assets/images/Hey-Cupcake.jpg',
	// 		votes: 0 
	// 	}
	// });

	loadButtons();

}

mainImages();