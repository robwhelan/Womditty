var censusData;


function clearForm(form) {
  // iterate over all of the inputs for the form
  // element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs,
    // password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    // checkboxes and radios need to have their checked state cleared
    // but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to -1
    // (this works for both single and multiple select elements)
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

function renderCommentForm(placeID, userID, placeName) {
	$("#putFormHere").html(
		'<form accept-charset="UTF-8" action="/posts" class="form-horizontal" id="new_post" method="post" data-remote="true"><input name="utf8" type="hidden" value="✓">' +
		$('#tokenTag').html() +
		'<div class="input-prepend"><span class="add-on"><i class="icon-comments"></i></span>' +
		'<input class="span9" id="post_body_from_map" name="post[body]" size="20" type="text" placeholder="Say something..." >' +
		'<input class="number_field" id="post_place_id" name="post[place_id]" type="hidden" value=' + placeID +'>' +
		'<input class="number_field" id="post_user_id" name="post[user_id]" type="hidden" value=' + userID +'>' +
		"<input class='text' id='post_tag_list' name='post[tag_list]' type='hidden' value=\"" + $("#postPlaceName").text() + "\">" +
		'<input class="btn btn-primary" name="commit" type="submit" value="Done">' +
		'</form>'
		);
	
	$('#new_post').submit(function(){
		$("#putCommentsHere").append(
			'<p>' + $("#postPlaceName").text() + ": " + $('input#post_body_from_map').val() + '</p>'
		)				
	});

}

function renderComments(post) {
	$("#putCommentsHere").append( 
		'<p><a href=/users/' + post.user.id +'><img width="30" src=' + post.user.profile_image +' /></a>' +
		post.body + '</p>'
	); // end append
	
}

function makeClickCallback(theArray, i) {  
   return function() {  
		// get all comments associated with the place
		$("#putPlaceHere").html(
			"<p id='postPlaceName'>" + theArray[i].title + "</p>"
			);
		// find or create the place and store the id of the place
		$.get("/places/?place=" + theArray[i].places_id + "&name=" + theArray[i].title,
			function(data) {
				womdittyPlaceID = data.id;
				womdittyPlaceName = data.name;
				currentUserID = $('#currentUserID').html();
				renderCommentForm(womdittyPlaceID, currentUserID, womdittyPlaceName);
			}, "json"); // end $.get
		$.get("/posts/?place=" + theArray[i].places_id,
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

function getCensusData(){
	// charleston 13330
	// Goose Creek 29815
	// Hanahan 32065
	// isle of palms 36115
	// ladson 39220
	// Mount Pleasant 48535
	// North Charleston 50875
	// sullivans island 70090
	// Summerville 70270
	
	
	$.get('http://api.census.gov/data/2011/acs5?get=NAME,B19013_001E&for=place:39220,36115,70090,13330,32065,70270,50875,29815,48535&in=state:45&key=a7ec1f8dd060fc3ae0e08877c47f2fe2805dcba5',
		function(data){
			censusData = data;
			}, 'json');

}

function printCensusData(){

	for (var i = 1; i < censusData.length; i++){
		$('body').append(censusData[i]);
	}

}