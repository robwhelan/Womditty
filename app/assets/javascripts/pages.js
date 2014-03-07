
var tour = new Tour({
	backdrop: false,
	template: "<div class='popover tour'>" +
	  "<div class='arrow'></div>" +
	  "<h3 class='popover-title' style='background-color:#3333CC;color:#FFF;'></h3>" +
	  "<div class='popover-content'></div>" +
	  "<div class='popover-navigation'>" +
	    "<button class='btn btn-default' data-role='prev'>« Prev</button>" +
	    "<span data-role='separator'> </span>" +
	    "<button class='btn btn-default' data-role='next'>Next »</button>" +
	    "<button class='btn btn-default' data-role='end'>End tour</button>" +
	  "</div>" +
	"</div>"
});

var thumbsUpElement = "#" + $('i')[0].id;

tour.addSteps([
  {
    element: "input#post_body", // string (jQuery selector) - html element next to which the step popover should be shown
    title: "Say or Ask Anything", // string - title of the popover
	placement: "top",
    content: "Schools, commutes, restaurants, grocery stores, neighborhoods? Local or newbie, start the conversation here. (1 of 5)", // string - content of the popover
	onShow: function(tour) {
		ga('send', 'event', 'Tour', 'Start');
	},
  	onNext: function(tour) {
		ga('send', 'event', 'Tour', 'Next Button Pressed', 'From Step 1');
	},
  },
  {
    element: "#attachmentButton",
    title: "Attachments",
	placement: "bottom",
    content: "Share photos and locations of your favorite places. (2 of 5)",
  	onNext: function(tour) {
		ga('send', 'event', 'Tour', 'Next Button Pressed', 'From Step 2');
	},
  	onPrev: function(tour) {
		ga('send', 'event', 'Tour', 'Prev Button Pressed', 'From Step 2');
	}
  },
  {
    element: "#userButton",
    title: "People in the Room",
	placement: "top",
    content: "Counts how many people are in the forum; click to start a private chat with one of them. (3 of 5)",
  	onPrev: function(tour) {
		ga('send', 'event', 'Tour', 'Prev Button Pressed', 'From Step 3');
	},
	onNext: function(tour) {
		ga('send', 'event', 'Tour', 'Next Button Pressed', 'From Step 3');
	}
  },
  {
    element: "#privateChatButton",
    title: "My Private Chats",
	placement: "top",
    content: "Click here to get to your private conversations. (4 of 5)",
  	onNext: function(tour) {
		ga('send', 'event', 'Tour', 'Next Button Pressed', 'From Step 4');
	},
  	onPrev: function(tour) {
		ga('send', 'event', 'Tour', 'Prev Button Pressed', 'From Step 4');
	}
  },
  {
    element: "#forumTitle",
    title: "Change Forums",
	placement: "bottom",
    content: "You can enter any forum based on the area and type of people you're interested in. Click here to change. (5 of 5)",
  	onPrev: function(tour) {
		ga('send', 'event', 'Tour', 'Prev Button Pressed', 'From Step 5');
	},
	onHide: function(tour) {
		ga('send', 'event', 'Tour', 'Ended', 'At Completion');
	}
  },
]);


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

function renderPost(data){
	
	$('#chat').append(
	'<div class="row">' +
	'<div class="panel panel-default">' +
	'<div class="panel-body">' +
	'<div class="col-xs-2">' +
	'<img width=40 src=' + data.user_image + ' class="img-rounded" />' +
	'<p style="font-size:70%;margin:0;line-height:10px;">' + data.user_name + '</p>' +
	'</div>' +
	'<div class="col-xs-10">' +
	'<p>' + data.message + '</p>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>')

}

function renderPhoto(data){
	
	$('#chat').append(
	'<div class="row">' +
	'<div class="panel panel-default">' +
	'<div class="panel-body">' +
	'<div class="col-xs-2">' +
	'<img width=40 src=' + data.user_image + ' class="img-rounded" />' +
	'<p style="font-size:70%;margin:0;line-height:10px;">' + data.user_name + '</p>' +
	'</div>' +
	'<div class="col-xs-10">' +
	'<img src=' + data.image_url + ' class="img-responsive" />' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>')

};

function renderLocation(data){
	var base = '/pages/map';
	var group = 'group=' + data.group;
	var reference = 'reference=' + data.reference;
	var url = base + '?' + group + '&' + reference;
	
	$('#chat').append(
	'<div class="row">' +
	'<div class="panel panel-default">' +
	'<div class="panel-body">' +
	'<div class="col-xs-2">' +
	'<img width=40 src=' + data.user_image + ' class="img-rounded" />' +
	'<p style="font-size:70%;margin:0;line-height:10px;">' + data.user_name + '</p>' +
	'</div>' +
	'<div class="col-xs-10">' +
	'<a href=' + url + '><h4><span class="glyphicon glyphicon-map-marker"></span>' +
	data.message +
	'</h4></a>'+
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>')
	
};
