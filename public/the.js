/* global $*/
$(function() {
  loadData();
  var df = 0;

  $("button").on("click", function(event) {
  	 df = df + 1;
  	 $("#DD").text(df);
  	 $("button").prop("disabled",true);
     loadData();
     console.log(1)
     setTimeout(function(){
     	console.log(2)
     	$("button").prop("disabled",false);
     }, 3000);
  });
  
  setInterval(loadData, 300000);
  
});

function loadData() {
    var $h3 = $("h3");
    var $data = $("#data");

    $data.html("<h3>Loading...</h3>");
    
    var request = $.ajax({
      url: "/api",
      dataType: "json"
    });
    request.done(function(data) {
      var windSpeed = data.windSpeed;
      var windBearing = data.windBearing;
      var windTxt = windSpeed + " mph at bearing " + windBearing + " (" + bearingToDirection(windBearing) + ")";
      var dateTxt = (new Date()).toString();
      var html = "<h3>" + windTxt + "</h3><h4>" + dateTxt + "</h4>";
      $data.fadeOut("fast", function() {
      	$(this).html(html).fadeIn("slow");
      });
      $("button").prop("disabled",false);
      
    });
    request.fail(function() {
      $h3.text("Error loading data");
    });
}

function bearingToDirection(bearing) {
	if (bearing < 22 || bearing > 338) return "N";
	if (bearing < 67) return "NE";
	if (bearing < 112) return "E";
	if (bearing < 158) return "SE";
	if (bearing < 202) return "S";
	if (bearing < 248) return "SW";
	if (bearing < 292) return "W";
	if (bearing < 338) return "NW";
}
