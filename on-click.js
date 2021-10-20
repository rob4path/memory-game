document.addEventListener("DOMContentLoaded", () => {

 // ON CLICK BUTTONS
 $("#signOutBTN").click(signOut)
 $("#login").click(login)
 $("#register").click(register)

 $("#play").click(play)
 $("#onePlayer").click(onePlayer)
 $("#twoPlayers").click(twoPlayers)
 $("#chooseFast").click(chooseFast)
 $("#chooseProverbs").click(chooseProverbs)
 $("#chooseMore").click(chooseMore)
 $("#refreshBtn").click(refresh)
 $("#continueBtn").click(continueGame)
 $("#addVerseBtn").click(function () { addVerse('createInput') })
 $("#createBoard").click(createBoard)
 $("#pushVerseBtn").click(pushVerses)

 $("#game-info").css("display", "none")
 $("#refreshContinueBtn").css("display", "none");
 $("#home").css("display", "none")
 $("#pushVerseBtn").css("display", "none")
 $("#selectBox").change(changeSet)
 // $(".menu").show();

 // HIDE-SHOW TOGGLE MENU
 $("#home").click(function () {
   $("#menu").show(500)
   $("#auth").hide(500);
   $("#playersName").hide(500);
   $("#playersModeBtn").hide(500);
   $("#chooseSetBtn").hide(500);
   $("#addVerseDiv").hide(500);
   $("#game-info").hide(500);
   $("#grid").hide(500);
   $("#refreshContinueBtn").hide(500);
   $("#home").hide(500);

 });

 $("#auth").css("display", "none")
 $("#loginBTN").click(function () {
   $("#auth").toggle(500);
 });

 $("#playersName").css("display", "none")
 $("#playersNameInputMenu").click(function () {
   $("#playersName").toggle(500);
 });

 $("#playersModeBtn").css("display", "none")
 $("#playersModeMenu").click(function () {
   $("#playersModeBtn").toggle(500);
 });

 $("#chooseSetBtn").css("display", "none")
 $("#chooseSetMenu").click(function () {
   $("#chooseSetBtn").toggle(500);
 });

 $("#addVerseDiv").css("display", "none")
 $("#addVerseMenu").click(function () {
   $("#addVerseDiv").toggle(500);
   showCardArrayVerses(cardArrayTest)
 });

});