var tag_data = [];
var snapshots = [];
var selected_tags = [];


// var path = require('path');
// var path;
// require(["path"], function(result){
//     var path = result;
// });

// var jQuery = 'jQuery';



// // ES5
require([jQuery], function(result){
    jQuery = result;
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function getTags(){
}

function printTags(){
}
function selectTag(tag){

}

function fisherYates(a){
  for (i = a.length -1; i > 0; i--){
    var j = Math.floor(Math.random() * i);
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

$(document).keydown(function(event){
    if(event.which=="17")
        cntrlIsPressed = true;
});

$(document).keyup(function(){
  cntrlIsPressed = false;
});

var cntrlIsPressed = false;


var resizing = false;

function resizedw(){
  console.log("RESIZE!!!");
  var w = $(window).width();
  if (w < 450){
    console.log(1);
    $("#auto_grid").css({"grid-template-columns": "repeat(1, 1fr)"});
  }
  else if (w < 900){
    console.log(2);
    $("#auto_grid").css({"grid-template-columns": "repeat(2, 1fr)"});
  }   
  else if (w < 1350){
    console.log(3);
    $("#auto_grid").css({"grid-template-columns": "repeat(3, 1fr)"});
  }
  else{
    console.log(4);
    $("#auto_grid").css({"grid-template-columns": "repeat(4, 1fr)"});
  }
}

var doit;

window.onload= function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};

window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};

// $(window).resize(function(){
//   if (!resizing){
//     resizing = true;
//     console.log("RESIZE");
//     var w = $(window).width();
//     if (w < 500){
//       $("#auto_grid").css({"grid-template-columns": "repeat(1, 1fr)"});
//     }
//     else if (w < 1000){
//       $("#auto_grid").css({"grid-template-columns": "repeat(2, 1fr)"});
//     }   
//     else if (w < 1500){
//       $("#auto_grid").css({"grid-template-columns": "repeat(3, 1fr)"});
//     }
//     else{
//       $("#auto_grid").css({"grid-template-columns": "repeat(4, 1fr)"});
//     }
//   }
//   resizing = false;
// });




function goToWorks(){
  var pos = $("#auto_grid").offset();
  $("#screens").css({"scroll-snap-type": "none"});
  // $('#screens').animate({scrollTop: pos.top}, 2000);
  $('#screens').animate({scrollTop: pos.top}, 2000,
    function(){
      console.log(2);
      $("#screens").css({"scroll-snap-type": "y mandatory"});
    });
  }
// function goToWorks(){
//   $("#screens").css({"scroll-snap-type": "none"});
//   var pos = $("#auto_grid").offset();
  // $('html, body').animate({scrollTop: pos.top}, 2000, () => {
  //   $("#screens").css({"scroll-snap-type": "y mandatory"});
  // });
  // });
//   $('html, body').animate({scrollTop: pos.top}, 2000);
// }


function createGrid(){
  $.getJSON( "archive/catalog.json", function(data) {
    for (i = 0; i < data.length; i++){
      var arr1 = ["./archive", data[i]["folder"], "thumbnail.jpg"];
      var snap_path = (arr1.join('/'));
      var arr2 = ['<button class = \"snapbutton\" style = \"background-image: url(\'', snap_path, '\');\"></button>'];
      var img_in_div = (arr2.join(""));
      $("#auto_grid").append(img_in_div);
      // $(img_in_div).prependTo($('#auto_grid'));
    };
  });
}
function createChart(){
  $.getJSON( "archive/catalog.json", function(data) {
      var temp_data = {};
      for (i = 0; i < data.length; i++){
        for (j = 0; j < data[i]["tags"].length; j++){
          if (data[i]["tags"][j] in temp_data){
            temp_data[data[i]["tags"][j]]++;
          }
          else{
            temp_data[data[i]["tags"][j]] = 1 + Math.floor(Math.random() * Math.floor(3));
          }
        }
      }
      for (const key in temp_data){
        tag_data.push({x: key, value: temp_data[key]});
      }

    tag_data = fisherYates(tag_data);
    var data = [
      {x: "learning", value: 80},
      {x: "includes", value: 56},
      {x: "lists", value: 44},
      {x: "meaning", value: 40},
      {x: "useful", value: 36},
      {x: "different", value: 32}
    ];
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(["#CD3F3E"]);
    chart = anychart.tagCloud(tag_data);
    var interactivity = chart.interactivity();
    // interactivity.hoverMode("byX");    
    interactivity.selectionMode("multiSelect");
    // interactivity.selectionMode("singleSelect");
    chart.angles([0]);
    chart.colorScale(customColorScale);
    chart.textSpacing(10);
    chart.mode("rect");
    chart.tooltip(false);
    chart.normal().fill("#CD3F3E");
    chart.hovered().fill("#CD3F3E");
    chart.selected().fill("#000000");
    chart.normal().fontFamily("aileronLight");
    // chart.maxItems(5);



    // chart.normal().fontWeight(600);

    // set the container id
    chart.container("container");

    chart.listen("pointClick", function(e){
      tag = e.point.get("x");
      i = selected_tags.indexOf(tag);
      if (!cntrlIsPressed){
        selected_tags = [tag];
      }
      else if (i == - 1){
        selected_tags.push(tag);
      }
      else{
        selected_tags.splice(i, 1);
      }
      // window.open(url, "_blank");
    });

    // initiate drawing the chart


    chart.draw();
    $('text[id^="ac_simple-text"]').css("cursor", "crosshair");
    $('text[id^="ac_simple-text"]').css("cursor", "crosshair");
    $('text[id^="ac_simple-text"]').mousedown(function(){
      if ($(this).data('clicked', true)){
      }
      // else{
      // }
          
          // $(this).toggle();
    });
    //check this
    //https://stackoverflow.com/questions/20004885/change-style-of-div-on-click-and-change-again-on-unclick
  });
}