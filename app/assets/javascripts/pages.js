
function initialize() {

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
  		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var defaultBounds = new google.maps.LatLngBounds(
    	new google.maps.LatLng(32.801993,-80.085236), // lower left
    	new google.maps.LatLng(32.92369,-79.833924)); // upper right
	map.fitBounds(defaultBounds);

  var input = /** @type {HTMLInputElement} */(document.getElementById('searchBoxTarget'));
  var searchBox = new google.maps.places.SearchBox(input);
  var markers = [];

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
	}; // remove all markers

	myArray = [];  
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
		places_id: place.id
      });
	      
	  markers.push(marker);
	  myArray.push(marker);
	
      bounds.extend(place.geometry.location);
    } // end for-loop to build markers onto the amap

    map.fitBounds(bounds);
	addSomeListeners(myArray);

  }); // end event listener for places_changed

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

} // end initialize

function renderCommentForm(placeID, userID) {
	$("#putFormHere").html(
		'<form accept-charset="UTF-8" action="/comments" class="form-horizontal" id="new_comment" method="post" data-remote="true"><input name="utf8" type="hidden" value="✓">' +
		$('#tokenTag').html() +
		'<div class="input-prepend"><span class="add-on"><i class="icon-comments"></i></span>' +
		'<input class="span9" id="comment_body" name="comment[body]" size="20" type="text" placeholder="Comment">' +
		'<input class="number_field" id="comment_place_id" name="comment[place_id]" type="hidden" value=' + placeID +'>' +
		'<input class="number_field" id="comment_user_id" name="comment[user_id]" type="hidden" value=' + userID +'>' +
		'<input class="btn btn-primary" name="commit" type="submit" value="Done">' +
		'</form>'
		);	
}

function renderComments(comment) {
	$("#putCommentsHere").append( 
		'<p><img width="15" src=' + comment.user.profile_image +' />' +
		comment.body + '</p>'
	); // end append
	
}

function makeClickCallback(theArray, i) {  
   return function() {  
		// get all comments associated with the place
		$("#putPlaceHere").html(
			"<p>" + theArray[i].title + "</p>"
			);
		// find or create the place and store the id of the place
		$.get("/places/?place=" + theArray[i].places_id,
			function(data) {
				womdittyPlaceID = data.id;
				currentUserID = $('#currentUserID').html();
				renderCommentForm(womdittyPlaceID, currentUserID);
			}, "json"); // end $.get
		$.get("/comments/?place=" + theArray[i].places_id,
			function(data) {
				$("#putCommentsHere").html("");
				for ( var j = 0; j < data.length; j++){
						renderComments(data[j]);
					}; // end for
				}, //end function(data)
				"json"); //end $.get
   };  // end return function
} // end makeClickCallback

function addSomeListeners(theArray){
	
	for (var i = 0; i < theArray.length; i++ ) {
      	var marker = new google.maps.Marker({
        	map: theArray[i].map,
        	icon: theArray[i].icon,
        	title: theArray[i].title,
        	position: theArray[i].position,
			places_id: theArray[i].places_id
      	});
		google.maps.event.addListener(marker, 'click', makeClickCallback(theArray, i) );
	} // end for-loop to add event listeners to each marker
	
} // end addSomeListeners