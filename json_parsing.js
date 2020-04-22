function dealWithJSON(){
	$(document).ready(function() {
	    $.getJSON( "archive/catalog.json", function(data) {
	        for (i = 0; i < data.length; i++){
	        	console.log(i);
	        }
	        // document.getElementById("demo").innerHTML = "Order for " + fname + " " + lname;   
	    });
	});
}


