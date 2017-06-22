
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


  //Submit ingredients or search for a recipe. Toggle.
  $("#find-recipe-btn").on("click", function () {
    $(".ingredient-search").hide();
    $(".recipe-search").show();
  });

  $("#find-ingredient-btn").on("click", function () {
    $(".recipe-search").hide();
    $(".ingredient-search").show();
  });


  var ingredients = [];
  var ingredientCount = 0;
  var recipe = [];
  var recipeCount = 0;
  var clickPart;

  //To submit a list of user ingredients.
  $(".submit-ingredient").on("click", function () {
    var ingredientInput = $("#ingredient-input").val().trim();
    ingredients.push(ingredientInput);
    var pIngredient = $("<p>").text(ingredientInput);
    ingredientCount++;
    // NEED TO FIGURE OUT A WAY TO KEEP THE INGREDIENT COUNT FROM INCREASING BY ONE WHEN NO TEXT IS ENTERED UPON SUBMIT.
    console.log(ingredientCount);
    console.log(ingredients);

    var ingredientsSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=";
    var ingredientsSearchKey = "&number=1&limitLicense=false&fillIngredients=true&ranking=1&limitLicense=false&mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";


    if (ingredientInput === "") {
      console.log("Please choose at least one ingredient.");
      // $("#ingredient-input").clear();
    } else if (ingredientCount === 6) {
      $("#ingredient-input").val("");
      // $("#ingredient-input").clear();
      console.log("No more.")

    } else {
      $(".ingredient-list").append(pIngredient);
      $("#ingredient-input").val("");
      // $("#ingredient-input").clear();



      // This will be where we will put the objects from the array.
      var ingredientsQueryUrl = ingredientsSearchUrl;
    };

  });


  $(".submit-all").on("click", function () {
    var allIngredients = $(".ingredient-list").val().trim();
    console.log(allIngredients);

    //First part
    var fridgeSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=";

    //Second part
    var fridgeSearchKey = "&number=10&limitLicense=false&fillIngredients=true&ranking=1&limitLicense=false&mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";

    var ingredientsOutput = ingredients.join('+');

    var url = fridgeSearchUrl + ingredientsOutput + fridgeSearchKey;

    console.log(ingredientsOutput);

    //Ajax call for the image.
    $.ajax({
      url: url,
      data: {
        ingredients: ingredientsOutput,
        number: 10,
        method: "GET"
      }

    }).done(function (response) {


      // For loop to run through all of the objects in the array.
      for (var i = 0; i < response.length; i++) {
        var fridgeImage = response[i].id;
        var recipeInput = response[i].id;
        var dataId = response[i].id;
        var mealurl = "recipepage.html?id=" + response[i].title;


        var resultID = `tab-${i}`;
        var titleID = `title-${i}`;
        var linkID = `link-${i}`;
        var imageID = `image-${i}`;

        var thisResult = `
          <div class="tabpanel" class="tab-pane active" id="panel-${i}">
	          <div class="row masonry-container">
		          <div class="col-md-4 col-sm-6 item">
                			<div class="thumbnail">
                        				<div class="caption">
                                                                   				                          
                                                                                                     <h3 id="title-${i}"></h3>
                                  <a id="${linkID}" href="#">
                                  <img id="${imageID}" /> </a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        `;

        $("#search-result").append(thisResult);

        $('#image-'+i).attr("src", response[i].image).attr("dataId", dataId);
        $('#title-'+i).text(response[i].title);
        $('#link-'+i).attr("href", mealurl);
        $('#title-'+i).text(response[i].title);

        $('#link-'+ i).on('click', function() {
          $(this).addClass('clickPart')
        });

        // var recipeSearchKey = "?mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";

        // var recipeSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeInput + "/summary" + recipeSearchKey;

        // $.ajax ({
        // 	url: recipeSearchUrl,
        // 	method: "GET"
        // }).done(function(response) {
        // 	console.log(response);
        // 	console.log("This is the caption number: " + i);
        // 	// $(".caption" + i).text(response.summary);
        // 	// $(".caption" + i).append();
        // 	var desc = response.summary;
        // 	var cap = $("<p>").html(desc);
        // 	$(".caption").append(cap);

        // });


      };


    });

  });

  //To search a desired recipe.
  $(".submit-recipe").on("click", function () {
    var recipeInput = $("#recipe-input").val().trim();
    recipe.push(recipeInput);

    // Second part of the URL
    var recipeSearchKey = "&mashape-key=ksQNPjlaz5mshWX43x5882DMHPUtp1ynBxNjsnjPXrtU69MEyX";
    //First part
    var recipeSearchUrl = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=10&limitLicense=false&query=" + recipeInput + recipeSearchKey;

    var imagesUrl = "https://spoonacular.com/recipeImages/"




    $.ajax({
      url: recipeSearchUrl,
      number: 10,
      method: "GET"
    }).done(function (response) {
      console.log(response.results);

      for (var i = 0; i < 10; i++) {
        var fridgeImage = response.results[i].id;
        var recipeInput = response.results[i].id;
        var imagesFileName = response.results[i].image;
        var dataId = response.results[i].id;
        console.log(fridgeImage);

        //Append images.
        $(".meal-results" + i).attr("src", imagesUrl + imagesFileName).attr("dataId", dataId);
        $(".meal-results" + i).append();
        console.log(dataId);

        //Append titles.
        $(".title" + i).text(response.results[i].title);
        $(".title" + i).append();

      };
    });
  })

});


