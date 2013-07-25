// loop here for all duty stations in the city
	<% City.first.duty_stations.each do |duty_station| %>
	
	// make boundaries for a neighborhood by looping through all coordinates
		<% @coordinates = Coordinate.where(:duty_station_id => duty_station.id).order(:coordinate_number) %>
  		var dutyStationCoordinates = 
		<%= render '../../public/duty_station_'+ duty_station.id.to_s %>

		var dutyStationPolygon;			
		dutyStationPolygon = new google.maps.Polygon({
		    paths: dutyStationCoordinates,
		    strokeColor: "red",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "red",
		    fillOpacity: 0.35
		 });
		
		// call the neighborhood onto the map
		dutyStationPolygon.setMap(map);

		// create content for an info bubble
		var contentString = '<h4><i class=icon-asterisk></i> <%= duty_station.name %></h4>'

		var infowindow = new InfoBubble({
		    content: contentString,
			maxWidth: 125,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(<%= duty_station.center_coordinate.lat %>, <%= duty_station.center_coordinate.lng %> ),
		    map: map,
		    title: '<%= duty_station.name %>'
		});

	  	infowindow.open(map,marker);

	<% end %> // end loop for all duty stations in the city
	