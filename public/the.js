$(function() {
  var $h1 = $("h1");
  var $zip = $("input[name='zip']");
  $("form").on("submit", function(event) {
    event.preventDefault();
    var zipCode = $.trim($zip.val());
    $h1.text("Loading...");
    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    });
    request.done(function(data) {
      var windSpeed = data.windSpeed;
      var windBearing = data.windBearing;
      $h1.text("Windspeed is " + windSpeed + " at " + windBearing + " " + bearingToDirection(windBearing));
    });
    request.fail(function() {
      $h1.text("Error!");
    });
  });
});

function bearingToDirection(bearing) {
	if (bearing < 22 || bearing > 338) return "N";
	if (bearing < 67) return "NE";
	if (bearing < 112) return "E";
	if (bearing < 158) return "SE";
	if (bearing < 202) return "S";
	if (bearing < 248) return "SW";
	if (bearing < 292) return "W";
	if (bearing < 338) return "NW"
}
