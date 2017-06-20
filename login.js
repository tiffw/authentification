
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
//     }).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//       });

//       firebase.auth().signOut().then(function() {
//         // Sign-out successful.
//       }).catch(function(error) {
//         // An error happened.
//       });
// });




//   firebase.initializeApp(config);

//   // Get Elements
//   const txtEmail = document.getElementById('txtEmail');
//   const txtPassword = document.getElementById('txtPassword');
//   const btnLogin = document.getElementById('btnLogin');
//   const btnSignUp = document.getElementById('btnSignUp');
//   const btnLogout = document.getElementById('btnLogout');

//   // Add login event
//   btnLogin.addEventListener('click', e=> {
//     // Get email and pass
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();
//     // Sign in
//   const promise = auth.signInWithEmailAndPassword(email, pass);
//   console.log(auth.signInWithEmailAndPassword);
//   promise.catch(e => console.log(e.message));
//   });
  
//   // Add signup event
//    btnSignUp.addEventListener('click', e => {
//     // Get email and pass
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();
//     // Sign in
//   const promise = auth.createUserWithEmailAndPassword(email, pass);
//   promise.catch(e => console.log(e.message));
//   });

//   btnLogOut.addEventListener('click', e=> {
//     firebase.auth().signOut();
//   });


//    // Add a realtime listener
//    firebase.auth().onAuthStateChanged(firebaseUser => {
//     if(firebaseUser) {
//       console.log(firebaseUser);
//       btnLogOut.classList.remove('hide');
//     } else {
//       console.log('test');
//       btnLogOut.classList.add('hide');
//     }
//    });

//    $(function() {
    
//     var $formLogin = $('#login-form');
//     var $formLost = $('#lost-form');
//     var $formRegister = $('#register-form');
//     var $divForms = $('#div-forms');
//     var $modalAnimateTime = 300;
//     var $msgAnimateTime = 150;
//     var $msgShowTime = 2000;

//     $("form").submit(function () {
//         switch(this.id) {
//             case "login-form":
//                 var $lg_username=$('#login_username').val();
//                 var $lg_password=$('#login_password').val();
//                 if ($lg_username == "ERROR") {
//                     msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
//                 } else {
//                     msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
//                 }
//                 return false;
//                 break;
//             case "lost-form":
//                 var $ls_email=$('#lost_email').val();
//                 if ($ls_email == "ERROR") {
//                     msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
//                 } else {
//                     msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
//                 }
//                 return false;
//                 break;
//             case "register-form":
//                 var $rg_username=$('#register_username').val();
//                 var $rg_email=$('#register_email').val();
//                 var $rg_password=$('#register_password').val();
//                 if ($rg_username == "ERROR") {
//                     msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
//                 } else {
//                     msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
//                 }
//                 return false;
//                 break;
//             default:
//                 return false;
//         }
//         return false;
//     });
    
//     $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
//     $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
//     $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
//     $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
//     $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
//     $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
//     function modalAnimate ($oldForm, $newForm) {
//         var $oldH = $oldForm.height();
//         var $newH = $newForm.height();
//         $divForms.css("height",$oldH);
//         $oldForm.fadeToggle($modalAnimateTime, function(){
//             $divForms.animate({height: $newH}, $modalAnimateTime, function(){
//                 $newForm.fadeToggle($modalAnimateTime);
//             });
//         });
//     }
    
//     function msgFade ($msgId, $msgText) {
//         $msgId.fadeOut($msgAnimateTime, function() {
//             $(this).text($msgText).fadeIn($msgAnimateTime);
//         });
//     }
    
//     function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
//         var $msgOld = $divTag.text();
//         msgFade($textTag, $msgText);
//         $divTag.addClass($divClass);
//         $iconTag.removeClass("glyphicon-chevron-right");
//         $iconTag.addClass($iconClass + " " + $divClass);
//         setTimeout(function() {
//             msgFade($textTag, $msgOld);
//             $divTag.removeClass($divClass);
//             $iconTag.addClass("glyphicon-chevron-right");
//             $iconTag.removeClass($iconClass + " " + $divClass);
//       }, $msgShowTime);
//     }
// });


