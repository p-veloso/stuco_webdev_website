var a = 51;
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

var all_tags = [];
$(document).ready(function() {
    $.getJSON( "archive/catalog.json", function(data) {
        for (i = 0; i < data.length; i++){
          for (j = 0; j < data[i]["tags"].length; j++){
            all_tags.push(data[i]["tags"][j]);
          }
        }
        // document.getElementById("demo").innerHTML = "Order for " + fname + " " + lname;   
    });
});
var set_tags = new Set(all_tags);

function printTags(){
  console.log(all_tags);
}

