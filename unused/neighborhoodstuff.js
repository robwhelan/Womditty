// put loop here for all neighborhoods in the city
	<% City.first.neighborhoods.each do |neighborhood| %>
				
		// make boundaries for a neighborhood by looping through all coordinates
		<% @coordinates = Coordinate.where(:neighborhood_id => neighborhood.id).order(:coordinate_number) %>
	  	var neighborhoodCoordinates =
		<%= render '../../public/neighborhood_'+ neighborhood.id.to_s %>

		// build the neighborhood polygon
		var neighborhoodPolygon;			
		neighborhoodPolygon = new google.maps.Polygon({
		    paths: neighborhoodCoordinates,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });
		
		// call the neighborhood onto the map
		neighborhoodPolygon.setMap(map);
		
		// create the info window
		var contentString = '<h4><i class=icon-home ></i> <%= neighborhood.name %> (<%= User.where(:neighborhood_id => neighborhood.id).count.to_s %>)</h4>'
			// put loop here for drive time calculations
			<% neighborhood.city.duty_stations.each do |duty_station| %>
				// check to see if anyone in the neighborhood commutes to the duty station
				<% neighborhood_population = User.where(:neighborhood_id => neighborhood.id, :duty_station_id => duty_station.id).count %>
				<% if neighborhood_population > 0 %>
					// if so, create a line in the popup window that shows the average drive time
					+ '<p>To <%= duty_station.name %> : <%= duty_station.drive_time_from(neighborhood) %> min (<%= neighborhood_population %>)</p>'
				<% end %>
			<% end %>

			// end loop for drive time calcs
			
		var infowindow = new InfoBubble({
		    content: contentString,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(<%= neighborhood.center_coordinate.lat %>, <%= neighborhood.center_coordinate.lng %> ),
		    map: map,
		    title: '<%= neighborhood.name %>'
		});

	  	infowindow.open(map,marker);

		// end loop for each neighborhood in the city
	<% end %>