


//----------------------------  html functions  -------------------------

//------------instractions toggle

 $(".instractions").hide();
  $(".instractions-btn").click(function (e) {
    
    $(".instractions").toggle();

  })
  
  document.querySelector(".instractions-btn").onclick = function () { 

    setTimeout( () =>{

      $(".instractions").hide();

    },3000);

  };


  //--------------------------Change names

  $("#name-player-1-btn").click(function (e) {
    let inputOne= $("#name-player-1").val();
    $(".player-one").html(inputOne) ;
  })
  

  $("#name-player-2-btn").click(function (e) {
    let inputTwo= $("#name-player-2").val();
    $(".player-two").html(inputTwo) ;
  })
  




  //-----------------------------------






