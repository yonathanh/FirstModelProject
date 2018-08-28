


//----------------------------  html functions  -------------------------


  $(".instractions").hide();
  $(".instractions-btn").click(function (e) {
    
    $(".instractions").toggle();

  })

  
  $("#name-player-1-btn").click(function (e) {
    let inputOne = querySelector("#name-player-1").value.innerHTML;
    querySelector(".player-one").innerHTML= inputOne;

  })
  

  $("#name-player-2-btn").click(function (e) {
    let inputTwo= $("#name-player-2").value;
    $(".player-two").HTML= inputTwo;

  })
  






