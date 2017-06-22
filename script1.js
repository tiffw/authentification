// 1) User inputs ingredients
// 2) Returns results based on user inputs as keywords in the ajax call
// 3) If or when the user selects a recipe result, it takes them to page 3
// 4) Page three shows the individual recipe (Description, Prep, Ingredients, and Image)
// 5) Selecting ingredients will show the user what stores have that item (or variation of that item),
// 	and any other information -- including where the store is located

// Firebase Init
 // var config = {
 //   apiKey: "AIzaSyDajeVzARkijIBYGudhnqI2Xvy93OjIt74",
 //   authDomain: "foodapp-39e77.firebaseapp.com",
 //   databaseURL: "https://foodapp-39e77.firebaseio.com",
 //   projectId: "foodapp-39e77",
 //   storageBucket: "foodapp-39e77.appspot.com",
 //   messagingSenderId: "188944854486"
 // };
 // firebase.initializeApp(config);

 $(document).ready(function () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBKSGxNhb2LEZeI4U7nwl8Jb8WpP7t6VnI",
      authDomain: "mush-52d46.firebaseapp.com",
      databaseURL: "https://mush-52d46.firebaseio.com",
      projectId: "mush-52d46",
      storageBucket: "foodapp-39e77.appspot.com",
      messagingSenderId: "755973008880"
    };

    // var firebase = new Firebase("https://foodapp-39e77.firebaseio.com");

    firebase.initializeApp(config);
    

  var provider = new firebase.auth.GoogleAuthProvider();

  $(".login").click(function() {
      console.log("my name is gt", firebase);

    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("logout").style.visibility = "show";

  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log("hey what's up!");
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log("firebase errror heress", error)
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      });

    $(".logout").click(function() {
      console.log("logging out", firebase);

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    });
  });

var fridgeInput = "";
var fridgeRecipes = "";

var videoPlay = "";
var videoId = "";
var videoComplete = "";

var ingredients = [];
var ingredientCount = 0;
var recipe = [];
var recipeCount = 0;

function fridgeSubmit() {

	$(".submit-ingredient").on("click", function() {

		var fridgeSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=";
		var fridgeSearchKey = "&number=10&limitLicense=false&fillIngredients=true&ranking=1&limitLicense=false&mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";

		var ing = $("#ingredient-input").val();
		// var ing2 = $("#ingredient-2").val().trim();
		// var ing3 = $("#ingredient-3").val().trim();
		// var ing4 = $("#ingredient-4").val().trim();
		// var ing5 = $("#ingredient-5").val().trim();

		// JSON.stringify(ing1);

		console.log("Button Pressed!");
		console.log(ing1.length);
		// console.log(ing2.length);
		// Create a variable that contains the end point URL, ingredients, and API Key
		var fridgeQueryURL = fridgeSearchUrl + ing1 + fridgeSearchKey;

		console.log(fridgeQueryURL);
		// AJAX call to spoonacular API to retrieve data based on user inputs (ingredients)
		$.ajax ({
			url: fridgeQueryURL,
			method: "GET"
		}).done(function(response) {
			// console.log(ing1);
			// Iterates through the objects returned from the AJAX call
			for(x = 0; x < response.length; x++) {
				console.log(response[x].title);
				console.log(response[x].id);
				var fridgeImage = response[x].id;
				fridgeImage.attr(src, response[x].image);

				var fidgeTitle = response[x].title;
				var fridgeId = response[x].id;

				var fridgeImage = response[x].id;
				fridgeImage.attr(src, response[x].image);
				$(".image-results").append();
	    	}

	    	//append to html (dom)
		});
	});
}


function recipeSearch() {
		// If the user clicks a recipe that is output, this ajax call fires off and returns to the user more
		// information about the selected recipe.
	$().on("click", function() {
		var recipeSearchKey = "?mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";
		var recipeInput = fridgeImage;
		var recipeSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeInput + "/summary" + recipeSearchKey;

		// if()
		$.ajax ({
			url: recipeSearchUrl,
			method: "GET"
		}).done(function(response) {
			console.log(response.summary);

		})
	})
}

function videoSearch() {
		// Displays a video of the recipe
		var videoSearchKey = "&mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";
		var videoInput = "rice";
		var videoSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/videos/search?excludeingredients=&includeingredients=&maxLength=999&minLength=0&number=1&offset=0&query=" + videoInput + videoSearchKey;
		var videoResult = "";

		$.ajax ({
			url: videoSearchUrl,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			// videoPlay = "https://wwww.youtube.com/embed/watch?v=";
			videoId = (response.videos[0].youTubeId);
			videoComplete = videoPlay + videoId
			console.log(videoId);
			$(".video-player").attr("src", "https://www.youtube.com/embed/" + videoId);
		})
}

function goBack() {
	$(".button").on("click", function() {
		// back to index.html
	})
}



$(document).ready(function() {
	// console.log("test");
	// Hides two divs -- used for later
	$(".masonry-container").hide();
	fridgeSubmit();


//Need to toggle between the two.
	$("#find-recipe-btn").on("click", function () {
		$(".ingredient-search").hide();
		$(".recipe-search").show();
	});

	$("#find-ingredient-btn").on("click", function () {
		$(".recipe-search").hide();
		$(".ingredient-search").show();
	});

	//To submit a list of user ingredients.
	$(".submit-ingredient").on("click", function(){
		var ingredientInput = $("#ingredient-input").val().trim();
		ingredients.push(ingredientInput);
		var pIngredient = $("<p>").text(ingredientInput);
		ingredientCount++;
		// NEED TO FIGURE OUT A WAY TO KEEP THE INGREDIENT COUNT FROM INCREASING BY ONE WHEN NO TEXT IS ENTERED UPON SUBMIT.
		console.log(ingredientCount);

		
		if (ingredientInput === "") {
			console.log("Please choose at least one ingredient.");
		} else if (ingredientCount === 6) {
			$("#ingredient-input").val("");
			console.log("No more.")

		} else {
			$(".ingredient-list").append(pIngredient);
			$("#ingredient-input").val("");

		};

	});


	//To submit a desired recipe.
	$(".submit-recipe").on("click", function(){
		var recipeInput = $("#recipe-input").val().trim();
		recipe.push(recipeInput);
		console.log(recipe);
	})
})