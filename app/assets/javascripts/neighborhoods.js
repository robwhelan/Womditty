var censusData;

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

		// hanahan
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.899480,-80.011711),
			new google.maps.LatLng(32.955961,-80.041752),
			new google.maps.LatLng(32.974828,-80.040722),
			new google.maps.LatLng(32.961866,-80.000725),
			new google.maps.LatLng(32.921529,-79.991455),
			new google.maps.LatLng(32.926140,-79.990940),
			new google.maps.LatLng(32.925996,-79.990253),
			new google.maps.LatLng(32.924699,-79.988708),
			new google.maps.LatLng(32.924843,-79.986305),
			new google.maps.LatLng(32.926572,-79.985962),
			new google.maps.LatLng(32.927869,-79.986477),
			new google.maps.LatLng(32.929454,-79.988194),
			new google.maps.LatLng(32.929454,-79.990597),
			new google.maps.LatLng(32.930895,-79.990940),
			new google.maps.LatLng(32.932479,-79.991455),
			new google.maps.LatLng(32.934641,-79.991627),
			new google.maps.LatLng(32.935937,-79.990082),
			new google.maps.LatLng(32.935793,-79.987679),
			new google.maps.LatLng(32.935649,-79.986649),
			new google.maps.LatLng(32.933488,-79.985790),
			new google.maps.LatLng(32.932047,-79.985447),
			new google.maps.LatLng(32.932768,-79.983387),
			new google.maps.LatLng(32.933488,-79.982014),
			new google.maps.LatLng(32.934064,-79.981327),
			new google.maps.LatLng(32.935505,-79.980640),
			new google.maps.LatLng(32.937522,-79.982357),
			new google.maps.LatLng(32.940403,-79.982014),
			new google.maps.LatLng(32.941268,-79.984417),
			new google.maps.LatLng(32.942276,-79.984417),
			new google.maps.LatLng(32.943429,-79.982700),
			new google.maps.LatLng(32.945301,-79.982529),
			new google.maps.LatLng(32.944581,-79.980297),
			new google.maps.LatLng(32.943717,-79.978065),
			new google.maps.LatLng(32.941412,-79.976521),
			new google.maps.LatLng(32.941412,-79.974461),
			new google.maps.LatLng(32.939107,-79.974804),
			new google.maps.LatLng(32.936946,-79.975147),
			new google.maps.LatLng(32.935361,-79.975319),
			new google.maps.LatLng(32.933344,-79.974632),
			new google.maps.LatLng(32.931903,-79.973087),
			new google.maps.LatLng(32.930606,-79.971027),
			new google.maps.LatLng(32.929886,-79.970684),
			new google.maps.LatLng(32.924987,-79.970684),
			new google.maps.LatLng(32.922105,-79.966393),
			new google.maps.LatLng(32.919656,-79.961414),
			new google.maps.LatLng(32.920088,-79.957981),
			new google.maps.LatLng(32.918070,-79.957809),
			new google.maps.LatLng(32.916629,-79.957809),
			new google.maps.LatLng(32.915621,-79.956093),
			new google.maps.LatLng(32.914036,-79.955578),
			new google.maps.LatLng(32.910000,-79.951973),
			new google.maps.LatLng(32.908127,-79.953003),
			new google.maps.LatLng(32.906398,-79.954720)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Hanahan</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 200,
			maxHeight: 200,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.934208,-80.008648 ),
		    map: map,
		    title: 'Hanahan'
		});

	  	infowindow.open(map,marker);

		// end hanahan

		// north charleston
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.824211,-79.953690),
			new google.maps.LatLng(32.828827,-79.964676),
			new google.maps.LatLng(32.834020,-79.968109),
			new google.maps.LatLng(32.834597,-79.976349),
			new google.maps.LatLng(32.835751,-79.989395),
			new google.maps.LatLng(32.831712,-79.999695),
			new google.maps.LatLng(32.828250,-80.011368),
			new google.maps.LatLng(32.829404,-80.018234),
			new google.maps.LatLng(32.846712,-80.039520),
			new google.maps.LatLng(32.846712,-80.047760),
			new google.maps.LatLng(32.870937,-80.069733),
			new google.maps.LatLng(32.873820,-80.078659),
			new google.maps.LatLng(32.881894,-80.081406),
			new google.maps.LatLng(32.898038,-80.112991),
			new google.maps.LatLng(32.940115,-80.164490),
			new google.maps.LatLng(32.977564,-80.114365),
			new google.maps.LatLng(32.983324,-80.095139),
			new google.maps.LatLng(32.996859,-80.058060),
			new google.maps.LatLng(32.990236,-80.054970),
			new google.maps.LatLng(32.985916,-80.047760),
			new google.maps.LatLng(32.980156,-80.044327),
			new google.maps.LatLng(32.963163,-80.044327),
			new google.maps.LatLng(32.938674,-80.039177),
			new google.maps.LatLng(32.898903,-80.016518),
			new google.maps.LatLng(32.902939,-79.974289),
			new google.maps.LatLng(32.900633,-79.961586),
			new google.maps.LatLng(32.898903,-79.958153),
			new google.maps.LatLng(32.887948,-79.962616),
			new google.maps.LatLng(32.878146,-79.961586),
			new google.maps.LatLng(32.879875,-79.965019),
			new google.maps.LatLng(32.872955,-79.963303),
			new google.maps.LatLng(32.867477,-79.960556),
			new google.maps.LatLng(32.859114,-79.955750),
			new google.maps.LatLng(32.853057,-79.939957),
			new google.maps.LatLng(32.847289,-79.931717),
			new google.maps.LatLng(32.842962,-79.932747),
			new google.maps.LatLng(32.834308,-79.933090),
			new google.maps.LatLng(32.828539,-79.933434),
			new google.maps.LatLng(32.830558,-79.940987),
			new google.maps.LatLng(32.823634,-79.951630)
			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> North Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.913459,-80.106495 ),
		    map: map,
		    title: 'North Charleston'
		});

	  	infowindow.open(map,marker);
		// end north charleston
		
		
		// goose creek
	  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.911297,-79.951630),
			new google.maps.LatLng(32.914756,-79.932404),
			new google.maps.LatLng(32.926860,-79.939270),
			new google.maps.LatLng(32.932623,-79.939957),
			new google.maps.LatLng(32.937810,-79.938583),
			new google.maps.LatLng(32.938963,-79.929657),
			new google.maps.LatLng(32.941268,-79.928284),
			new google.maps.LatLng(32.947606,-79.930344),
			new google.maps.LatLng(32.953944,-79.931030),
			new google.maps.LatLng(32.959706,-79.920731),
			new google.maps.LatLng(32.967771,-79.927597),
			new google.maps.LatLng(32.967771,-79.932060),
			new google.maps.LatLng(32.966331,-79.935493),
			new google.maps.LatLng(32.967483,-79.939613),
			new google.maps.LatLng(32.971804,-79.941330),
			new google.maps.LatLng(32.975548,-79.941330),
			new google.maps.LatLng(32.979580,-79.942360),
			new google.maps.LatLng(32.983612,-79.942017),
			new google.maps.LatLng(32.987644,-79.943390),
			new google.maps.LatLng(32.993691,-79.939613),
			new google.maps.LatLng(32.997722,-79.938927),
			new google.maps.LatLng(33.001178,-79.938927),
			new google.maps.LatLng(33.005209,-79.940643),
			new google.maps.LatLng(33.009239,-79.939270),
			new google.maps.LatLng(33.013558,-79.943390),
			new google.maps.LatLng(33.015573,-79.946480),
			new google.maps.LatLng(33.019891,-79.951286),
			new google.maps.LatLng(33.022770,-79.955406),
			new google.maps.LatLng(33.022194,-79.957123),
			new google.maps.LatLng(33.021618,-79.960213),
			new google.maps.LatLng(33.020755,-79.962616),
			new google.maps.LatLng(33.020179,-79.967766),
			new google.maps.LatLng(33.020179,-79.973259),
			new google.maps.LatLng(33.021043,-79.993515),
			new google.maps.LatLng(33.022194,-79.997635),
			new google.maps.LatLng(33.030542,-80.013428),
			new google.maps.LatLng(33.039176,-80.009995),
			new google.maps.LatLng(33.040903,-80.011368),
			new google.maps.LatLng(33.039752,-80.017204),
			new google.maps.LatLng(33.038313,-80.022697),
			new google.maps.LatLng(33.035147,-80.029564),
			new google.maps.LatLng(33.032844,-80.035057),
			new google.maps.LatLng(33.034859,-80.059433),
			new google.maps.LatLng(33.032269,-80.065613),
			new google.maps.LatLng(33.028527,-80.075226),
			new google.maps.LatLng(33.027088,-80.079002),
			new google.maps.LatLng(33.024209,-80.088959),
			new google.maps.LatLng(33.009239,-80.088272),
			new google.maps.LatLng(33.002905,-80.088615),
			new google.maps.LatLng(32.999738,-80.092049),
			new google.maps.LatLng(32.993115,-80.087242),
			new google.maps.LatLng(32.995995,-80.070419),
			new google.maps.LatLng(32.998298,-80.057373),
			new google.maps.LatLng(32.987932,-80.046387),
			new google.maps.LatLng(32.982172,-80.046043),
			new google.maps.LatLng(32.977852,-80.045013),
			new google.maps.LatLng(32.977276,-80.037117),
			new google.maps.LatLng(32.972380,-80.022011),
			new google.maps.LatLng(32.968923,-80.004845),
			new google.maps.LatLng(32.960570,-80.006561),
			new google.maps.LatLng(32.952504,-80.001755),
			new google.maps.LatLng(32.934064,-79.997292),
			new google.maps.LatLng(32.927148,-79.995575),
			new google.maps.LatLng(32.919656,-79.990425),
			new google.maps.LatLng(32.923114,-79.992485),
			new google.maps.LatLng(32.925131,-79.992485),
			new google.maps.LatLng(32.925996,-79.990082),
			new google.maps.LatLng(32.923690,-79.989395),
			new google.maps.LatLng(32.926860,-79.984932),
			new google.maps.LatLng(32.930030,-79.986305),
			new google.maps.LatLng(32.929742,-79.989395),
			new google.maps.LatLng(32.930606,-79.991455),
			new google.maps.LatLng(32.935505,-79.992142),
			new google.maps.LatLng(32.936081,-79.988365),
			new google.maps.LatLng(32.936081,-79.986305),
			new google.maps.LatLng(32.932912,-79.985275),
			new google.maps.LatLng(32.934064,-79.980125),
			new google.maps.LatLng(32.936369,-79.980812),
			new google.maps.LatLng(32.937522,-79.982185),
			new google.maps.LatLng(32.940691,-79.982185),
			new google.maps.LatLng(32.940980,-79.983902),
			new google.maps.LatLng(32.942996,-79.984245),
			new google.maps.LatLng(32.945301,-79.982872),
			new google.maps.LatLng(32.943861,-79.978065),
			new google.maps.LatLng(32.941556,-79.974632),
			new google.maps.LatLng(32.939539,-79.976006),
			new google.maps.LatLng(32.937810,-79.972572),
			new google.maps.LatLng(32.935217,-79.974289),
			new google.maps.LatLng(32.931759,-79.973946),
			new google.maps.LatLng(32.929166,-79.969826),
			new google.maps.LatLng(32.925996,-79.969482),
			new google.maps.LatLng(32.921961,-79.965363),
			new google.maps.LatLng(32.919656,-79.959869),
			new google.maps.LatLng(32.920808,-79.957809),
			new google.maps.LatLng(32.916197,-79.957123),
			new google.maps.LatLng(32.915044,-79.955750),
			new google.maps.LatLng(32.911586,-79.953346)			];
			
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Goose Creek</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.010823,-80.033711 ),
		    map: map,
		    title: 'Goose Creek'
		});

	  	infowindow.open(map,marker); // end goose creek

		
		
		// west ashley
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.775440,-79.956436),
		new google.maps.LatLng(32.789872,-79.972916),
		new google.maps.LatLng(32.798530,-79.976692),
		new google.maps.LatLng(32.819018,-79.968109),
		new google.maps.LatLng(32.829404,-79.977379),
		new google.maps.LatLng(32.830558,-79.986649),
		new google.maps.LatLng(32.829116,-80.001411),
		new google.maps.LatLng(32.826519,-80.004845),
		new google.maps.LatLng(32.823923,-80.009308),
		new google.maps.LatLng(32.824788,-80.017891),
		new google.maps.LatLng(32.828539,-80.021324),
		new google.maps.LatLng(32.831712,-80.022011),
		new google.maps.LatLng(32.839501,-80.034714),
		new google.maps.LatLng(32.845270,-80.039177),
		new google.maps.LatLng(32.845846,-80.049820),
		new google.maps.LatLng(32.840366,-80.061150),
		new google.maps.LatLng(32.821037,-80.089989),
		new google.maps.LatLng(32.812959,-80.103035),
		new google.maps.LatLng(32.798819,-80.104408),
		new google.maps.LatLng(32.785543,-80.059776),
		new google.maps.LatLng(32.782656,-80.025444),
		new google.maps.LatLng(32.777749,-79.999352),
		new google.maps.LatLng(32.775729,-79.962273)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> West Ashley</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.803148,-80.04232 ),
		    map: map,
		    title: 'West Ashley'
		});

	  	infowindow.open(map,marker); // end west ashley

		// summerville
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(33.064500,-80.182343),
		new google.maps.LatLng(32.986204,-80.262680),
		new google.maps.LatLng(32.971804,-80.224228),
		new google.maps.LatLng(32.957401,-80.186462),
		new google.maps.LatLng(32.949335,-80.176163),
		new google.maps.LatLng(32.968347,-80.150757),
		new google.maps.LatLng(32.987932,-80.109558),
		new google.maps.LatLng(33.013846,-80.160370),
		new google.maps.LatLng(33.030542,-80.143204)
		];
		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Summerville</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(33.015573,-80.182396),
		    map: map,
		    title: 'Summerville'
		});

	  	infowindow.open(map,marker); // end summerville

		// downtown Charleston
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.811804,-79.963646),
		new google.maps.LatLng(32.799252,-79.967594),
		new google.maps.LatLng(32.794346,-79.967937),
		new google.maps.LatLng(32.792037,-79.967766),
		new google.maps.LatLng(32.790882,-79.966221),
		new google.maps.LatLng(32.789728,-79.963646),
		new google.maps.LatLng(32.786409,-79.959526),
		new google.maps.LatLng(32.782079,-79.955406),
		new google.maps.LatLng(32.779337,-79.950600),
		new google.maps.LatLng(32.780636,-79.949226),
		new google.maps.LatLng(32.780636,-79.948025),
		new google.maps.LatLng(32.774285,-79.945450),
		new google.maps.LatLng(32.769955,-79.936695),
		new google.maps.LatLng(32.769522,-79.928799),
		new google.maps.LatLng(32.772842,-79.926910),
		new google.maps.LatLng(32.772986,-79.925537),
		new google.maps.LatLng(32.775007,-79.925365),
		new google.maps.LatLng(32.784965,-79.921932),
		new google.maps.LatLng(32.785543,-79.923992),
		new google.maps.LatLng(32.785976,-79.923992),
		new google.maps.LatLng(32.786409,-79.925194),
		new google.maps.LatLng(32.788140,-79.924679),
		new google.maps.LatLng(32.789295,-79.923477),
		new google.maps.LatLng(32.801128,-79.930000),
		new google.maps.LatLng(32.801272,-79.931374),
		new google.maps.LatLng(32.804446,-79.933777),
		new google.maps.LatLng(32.806466,-79.933434),
		new google.maps.LatLng(32.806466,-79.934978),
		new google.maps.LatLng(32.809496,-79.934978),
		new google.maps.LatLng(32.813680,-79.930687),
		new google.maps.LatLng(32.814834,-79.930859),
		new google.maps.LatLng(32.816998,-79.933434),
		new google.maps.LatLng(32.819162,-79.933777),
		new google.maps.LatLng(32.822336,-79.933949),
		new google.maps.LatLng(32.813103,-79.961758),
		new google.maps.LatLng(32.823923,-79.935150),
		new google.maps.LatLng(32.822624,-79.948540),
		new google.maps.LatLng(32.820460,-79.957809)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> Downtown Charleston</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.772842,-79.933804),
		    map: map,
		    title: 'Downtown Charleston'
		});

	  	infowindow.open(map,marker); // end downtown charleston


		// james island
	  	var neighborhoodCoordinates_01 =
		[
		new google.maps.LatLng(32.765336,-79.999695),
		new google.maps.LatLng(32.761872,-79.999695),
		new google.maps.LatLng(32.760717,-80.003128),
		new google.maps.LatLng(32.757541,-80.006218),
		new google.maps.LatLng(32.751189,-80.007935),
		new google.maps.LatLng(32.746858,-80.004845),
		new google.maps.LatLng(32.742237,-80.004845),
		new google.maps.LatLng(32.734440,-80.005531),
		new google.maps.LatLng(32.728086,-80.007248),
		new google.maps.LatLng(32.725776,-80.005188),
		new google.maps.LatLng(32.725487,-80.001755),
		new google.maps.LatLng(32.722021,-79.995575),
		new google.maps.LatLng(32.721154,-79.990768),
		new google.maps.LatLng(32.716822,-79.986305),
		new google.maps.LatLng(32.706711,-79.985962),
		new google.maps.LatLng(32.702089,-79.985962),
		new google.maps.LatLng(32.699489,-79.984245),
		new google.maps.LatLng(32.691399,-79.985619),
		new google.maps.LatLng(32.688509,-79.989395),
		new google.maps.LatLng(32.686776,-79.997978),
		new google.maps.LatLng(32.681574,-80.001411),
		new google.maps.LatLng(32.678107,-79.999008),
		new google.maps.LatLng(32.676373,-79.993515),
		new google.maps.LatLng(32.677240,-79.989738),
		new google.maps.LatLng(32.678107,-79.981155),
		new google.maps.LatLng(32.680418,-79.972916),
		new google.maps.LatLng(32.684753,-79.967079),
		new google.maps.LatLng(32.686487,-79.958839),
		new google.maps.LatLng(32.690821,-79.949570),
		new google.maps.LatLng(32.700933,-79.942360),
		new google.maps.LatLng(32.707578,-79.937553),
		new google.maps.LatLng(32.711044,-79.937897),
		new google.maps.LatLng(32.715089,-79.945107),
		new google.maps.LatLng(32.715955,-79.938583),
		new google.maps.LatLng(32.718844,-79.928284),
		new google.maps.LatLng(32.721154,-79.932060),
		new google.maps.LatLng(32.722599,-79.919014),
		new google.maps.LatLng(32.726065,-79.913864),
		new google.maps.LatLng(32.724909,-79.906654),
		new google.maps.LatLng(32.728086,-79.900131),
		new google.maps.LatLng(32.726353,-79.893951),
		new google.maps.LatLng(32.735307,-79.888802),
		new google.maps.LatLng(32.739638,-79.888115),
		new google.maps.LatLng(32.743681,-79.880219),
		new google.maps.LatLng(32.750900,-79.879875),
		new google.maps.LatLng(32.750900,-79.890175),
		new google.maps.LatLng(32.750034,-79.891548),
		new google.maps.LatLng(32.747724,-79.892921),
		new google.maps.LatLng(32.744547,-79.894638),
		new google.maps.LatLng(32.747435,-79.898071),
		new google.maps.LatLng(32.752633,-79.897728),
		new google.maps.LatLng(32.752633,-79.902534),
		new google.maps.LatLng(32.754654,-79.917297),
		new google.maps.LatLng(32.753210,-79.919357),
		new google.maps.LatLng(32.752055,-79.923820),
		new google.maps.LatLng(32.758696,-79.926224),
		new google.maps.LatLng(32.761872,-79.936867),
		new google.maps.LatLng(32.755520,-79.943047),
		new google.maps.LatLng(32.758118,-79.946823),
		new google.maps.LatLng(32.761006,-79.946823),
		new google.maps.LatLng(32.762160,-79.949226),
		new google.maps.LatLng(32.762738,-79.954033),
		new google.maps.LatLng(32.763315,-79.946136),
		new google.maps.LatLng(32.767068,-79.942360),
		new google.maps.LatLng(32.771976,-79.950600),
		new google.maps.LatLng(32.767646,-79.961586),
		new google.maps.LatLng(32.766202,-79.970512),
		new google.maps.LatLng(32.766202,-79.976349),
		new google.maps.LatLng(32.764470,-79.981155),
		new google.maps.LatLng(32.767068,-79.988022),
		new google.maps.LatLng(32.767646,-79.993858)
		];

		
		// build the neighborhood polygon
		var neighborhoodPolygon_01;			
		neighborhoodPolygon_01 = new google.maps.Polygon({
		    paths: neighborhoodCoordinates_01,
		    strokeColor: "#737392",
		    strokeOpacity: 0.8,
		    strokeWeight: 2,
		    fillColor: "#737392",
		    fillOpacity: 0.35
		  });

		// call the neighborhood onto the map
		neighborhoodPolygon_01.setMap(map);

		// create the info window
		var contentString_01 = '<h4><i class=icon-home ></i> James Island</h4>'

		var infowindow = new InfoBubble({
		    content: contentString_01,
			maxWidth: 130,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(32.726065,-79.96267),
		    map: map,
		    title: 'James Island'
		});

	  	infowindow.open(map,marker); // end james island

			// johns island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.768223,-80.015488),
			new google.maps.LatLng(32.765336,-80.007935),
			new google.maps.LatLng(32.759562,-80.014114),
			new google.maps.LatLng(32.751478,-80.012054),
			new google.maps.LatLng(32.743392,-80.009995),
			new google.maps.LatLng(32.730686,-80.010681),
			new google.maps.LatLng(32.721443,-80.005875),
			new google.maps.LatLng(32.714511,-79.990768),
			new google.maps.LatLng(32.706422,-79.990082),
			new google.maps.LatLng(32.696600,-79.990082),
			new google.maps.LatLng(32.689665,-79.993515),
			new google.maps.LatLng(32.684464,-80.004501),
			new google.maps.LatLng(32.675795,-80.003815),
			new google.maps.LatLng(32.665969,-80.001755),
			new google.maps.LatLng(32.656141,-80.014114),
			new google.maps.LatLng(32.643422,-80.020294),
			new google.maps.LatLng(32.638797,-80.051193),
			new google.maps.LatLng(32.620870,-80.084839),
			new google.maps.LatLng(32.619135,-80.107498),
			new google.maps.LatLng(32.619714,-80.124664),
			new google.maps.LatLng(32.612195,-80.151443),
			new google.maps.LatLng(32.606989,-80.170670),
			new google.maps.LatLng(32.598891,-80.180969),
			new google.maps.LatLng(32.601783,-80.193329),
			new google.maps.LatLng(32.585585,-80.211182),
			new google.maps.LatLng(32.593684,-80.221481),
			new google.maps.LatLng(32.615087,-80.227661),
			new google.maps.LatLng(32.622605,-80.255127),
			new google.maps.LatLng(32.648048,-80.250320),
			new google.maps.LatLng(32.651516,-80.236588),
			new google.maps.LatLng(32.670015,-80.226974),
			new google.maps.LatLng(32.678107,-80.208435),
			new google.maps.LatLng(32.692555,-80.208435),
			new google.maps.LatLng(32.695444,-80.201569),
			new google.maps.LatLng(32.700644,-80.201569),
			new google.maps.LatLng(32.700644,-80.191269),
			new google.maps.LatLng(32.706422,-80.180283),
			new google.maps.LatLng(32.706422,-80.156937),
			new google.maps.LatLng(32.707578,-80.143890),
			new google.maps.LatLng(32.719710,-80.165176),
			new google.maps.LatLng(32.731263,-80.169296),
			new google.maps.LatLng(32.732996,-80.169983),
			new google.maps.LatLng(32.742237,-80.163116),
			new google.maps.LatLng(32.749168,-80.156250),
			new google.maps.LatLng(32.749168,-80.139084),
			new google.maps.LatLng(32.756675,-80.131531),
			new google.maps.LatLng(32.771110,-80.130844),
			new google.maps.LatLng(32.780347,-80.120544),
			new google.maps.LatLng(32.785543,-80.106125),
			new google.maps.LatLng(32.783811,-80.096512),
			new google.maps.LatLng(32.778615,-80.091019),
			new google.maps.LatLng(32.776306,-80.078659),
			new google.maps.LatLng(32.769955,-80.073166),
			new google.maps.LatLng(32.767646,-80.067673),
			new google.maps.LatLng(32.774574,-80.049820),
			new google.maps.LatLng(32.772842,-80.042267),
			new google.maps.LatLng(32.771110,-80.034027),
			new google.maps.LatLng(32.766491,-80.025101)
			];

			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = '<h4><i class=icon-home ></i> Johns Island</h4>'

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.673194,-80.04541),
			    map: map,
			    title: 'Johns Island'
			});

		  	infowindow.open(map,marker); // end johns island


			// sullivans island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.766924,-79.864769),
			new google.maps.LatLng(32.764759,-79.865627),
			new google.maps.LatLng(32.763027,-79.863739),
			new google.maps.LatLng(32.758263,-79.859276),
			new google.maps.LatLng(32.754365,-79.853783),
			new google.maps.LatLng(32.753643,-79.848633),
			new google.maps.LatLng(32.754365,-79.843140),
			new google.maps.LatLng(32.759706,-79.835415),
			new google.maps.LatLng(32.761872,-79.831467),
			new google.maps.LatLng(32.763748,-79.823570),
			new google.maps.LatLng(32.763315,-79.822025),
			new google.maps.LatLng(32.771254,-79.814129),
			new google.maps.LatLng(32.774574,-79.812584),
			new google.maps.LatLng(32.774574,-79.810867),
			new google.maps.LatLng(32.777172,-79.812584),
			new google.maps.LatLng(32.773852,-79.819279),
			new google.maps.LatLng(32.771687,-79.824772),
			new google.maps.LatLng(32.767501,-79.835587),
			new google.maps.LatLng(32.764037,-79.841938),
			new google.maps.LatLng(32.761872,-79.848461),
			new google.maps.LatLng(32.760428,-79.850864),
			new google.maps.LatLng(32.762738,-79.857731),
			new google.maps.LatLng(32.764614,-79.860992)
			];
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Sullivan's Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.757541,-79.844355),
			    map: map,
			    title: 'Sullivans Island'
			});

		  	infowindow.open(map,marker); // end sullivans island
		
			// isle of palms
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.774430,-79.810867),
			new google.maps.LatLng(32.774718,-79.806061),
			new google.maps.LatLng(32.783089,-79.791298),
			new google.maps.LatLng(32.784533,-79.786663),
			new google.maps.LatLng(32.786986,-79.781685),
			new google.maps.LatLng(32.795644,-79.758854),
			new google.maps.LatLng(32.801416,-79.737568),
			new google.maps.LatLng(32.801416,-79.735165),
			new google.maps.LatLng(32.806178,-79.725895),
			new google.maps.LatLng(32.813103,-79.718685),
			new google.maps.LatLng(32.814546,-79.717827),
			new google.maps.LatLng(32.817575,-79.720402),
			new google.maps.LatLng(32.819162,-79.722805),
			new google.maps.LatLng(32.817142,-79.727955),
			new google.maps.LatLng(32.811083,-79.731560),
			new google.maps.LatLng(32.809352,-79.736881),
			new google.maps.LatLng(32.806610,-79.749241),
			new google.maps.LatLng(32.804879,-79.755592),
			new google.maps.LatLng(32.805023,-79.761600),
			new google.maps.LatLng(32.804879,-79.762974),
			new google.maps.LatLng(32.797953,-79.780312),
			new google.maps.LatLng(32.795500,-79.785976),
			new google.maps.LatLng(32.788862,-79.789925),
			new google.maps.LatLng(32.783089,-79.801083),
			new google.maps.LatLng(32.779337,-79.808464)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Isle of Palms</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.802138,-79.740341),
			    map: map,
			    title: 'Isle of Palms'
			});

		  	infowindow.open(map,marker); // end isle of palms

			// daniel island
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.861997,-79.937210),
			new google.maps.LatLng(32.855653,-79.932747),
			new google.maps.LatLng(32.853057,-79.927940),
			new google.maps.LatLng(32.844116,-79.924164),
			new google.maps.LatLng(32.836905,-79.925537),
			new google.maps.LatLng(32.833443,-79.925880),
			new google.maps.LatLng(32.827673,-79.925880),
			new google.maps.LatLng(32.822192,-79.923134),
			new google.maps.LatLng(32.819306,-79.918327),
			new google.maps.LatLng(32.819018,-79.913864),
			new google.maps.LatLng(32.827096,-79.902878),
			new google.maps.LatLng(32.832000,-79.899788),
			new google.maps.LatLng(32.837193,-79.898415),
			new google.maps.LatLng(32.842385,-79.899101),
			new google.maps.LatLng(32.844981,-79.900818),
			new google.maps.LatLng(32.856230,-79.900818),
			new google.maps.LatLng(32.859690,-79.901505),
			new google.maps.LatLng(32.865458,-79.892921),
			new google.maps.LatLng(32.870937,-79.893951),
			new google.maps.LatLng(32.875839,-79.893951),
			new google.maps.LatLng(32.871514,-79.889145),
			new google.maps.LatLng(32.871514,-79.884682),
			new google.maps.LatLng(32.871514,-79.879189),
			new google.maps.LatLng(32.881317,-79.876099),
			new google.maps.LatLng(32.885354,-79.879189),
			new google.maps.LatLng(32.897462,-79.882278),
			new google.maps.LatLng(32.900056,-79.888115),
			new google.maps.LatLng(32.895444,-79.893951),
			new google.maps.LatLng(32.899480,-79.896698),
			new google.maps.LatLng(32.896020,-79.908714),
			new google.maps.LatLng(32.889966,-79.905281),
			new google.maps.LatLng(32.889966,-79.910088),
			new google.maps.LatLng(32.884489,-79.917641),
			new google.maps.LatLng(32.878434,-79.916267),
			new google.maps.LatLng(32.876992,-79.922104),
			new google.maps.LatLng(32.872379,-79.932060),
			new google.maps.LatLng(32.866035,-79.939613)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Daniel Island</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 200,
				maxHeight: 200,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.847505,-79.908592),
			    map: map,
			    title: 'Daniel Island'
			});

		  	infowindow.open(map,marker); // end daniel island



			// Mount PLeasant
		  	var neighborhoodCoordinates_01 =
			[
			new google.maps.LatLng(32.812382,-79.906654),
			new google.maps.LatLng(32.807188,-79.903564),
			new google.maps.LatLng(32.795933,-79.906998),
			new google.maps.LatLng(32.791892,-79.907341),
			new google.maps.LatLng(32.786409,-79.906654),
			new google.maps.LatLng(32.784677,-79.904251),
			new google.maps.LatLng(32.788718,-79.887085),
			new google.maps.LatLng(32.792470,-79.881935),
			new google.maps.LatLng(32.785831,-79.879875),
			new google.maps.LatLng(32.784677,-79.877472),
			new google.maps.LatLng(32.772553,-79.860306),
			new google.maps.LatLng(32.773131,-79.856529),
			new google.maps.LatLng(32.777749,-79.851379),
			new google.maps.LatLng(32.815844,-79.795418),
			new google.maps.LatLng(32.851038,-79.764519),
			new google.maps.LatLng(32.872379,-79.738770),
			new google.maps.LatLng(32.886218,-79.722290),
			new google.maps.LatLng(32.916485,-79.757996),
			new google.maps.LatLng(32.918215,-79.770012),
			new google.maps.LatLng(32.925131,-79.779968),
			new google.maps.LatLng(32.928877,-79.787521),
			new google.maps.LatLng(32.926860,-79.791641),
			new google.maps.LatLng(32.925419,-79.812241),
			new google.maps.LatLng(32.918215,-79.817734),
			new google.maps.LatLng(32.924267,-79.830437),
			new google.maps.LatLng(32.908127,-79.835243),
			new google.maps.LatLng(32.881317,-79.843826),
			new google.maps.LatLng(32.873532,-79.837990),
			new google.maps.LatLng(32.875839,-79.845200),
			new google.maps.LatLng(32.872090,-79.850693),
			new google.maps.LatLng(32.866323,-79.857216),
			new google.maps.LatLng(32.862286,-79.870949),
			new google.maps.LatLng(32.863151,-79.880905),
			new google.maps.LatLng(32.856806,-79.894295),
			new google.maps.LatLng(32.849596,-79.892235),
			new google.maps.LatLng(32.847289,-79.888458),
			new google.maps.LatLng(32.840078,-79.885368),
			new google.maps.LatLng(32.838347,-79.889488),
			new google.maps.LatLng(32.829116,-79.892921),
			new google.maps.LatLng(32.825365,-79.891891),
			new google.maps.LatLng(32.824788,-79.894295),
			new google.maps.LatLng(32.818152,-79.901848)
			];
			
			// build the neighborhood polygon
			var neighborhoodPolygon_01;			
			neighborhoodPolygon_01 = new google.maps.Polygon({
			    paths: neighborhoodCoordinates_01,
			    strokeColor: "#737392",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#737392",
			    fillOpacity: 0.35
			  });

			// call the neighborhood onto the map
			neighborhoodPolygon_01.setMap(map);

			// create the info window
			var contentString_01 = "<h4><i class=icon-home ></i> Mt Pleasant</h4>"

			var infowindow = new InfoBubble({
			    content: contentString_01,
				maxWidth: 130,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(32.825365,-79.818528),
			    map: map,
			    title: 'Mt Pleasant'
			});

		  	infowindow.open(map,marker); // end mt pleasant

// ********** duty stations

// nuclear power school
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.967807,-79.969740),
	new google.maps.LatLng(32.967123,-79.970255),
	new google.maps.LatLng(32.967087,-79.972658),
	new google.maps.LatLng(32.966439,-79.974117),
	new google.maps.LatLng(32.965431,-79.974074),
	new google.maps.LatLng(32.965035,-79.973474),
	new google.maps.LatLng(32.964855,-79.972916),
	new google.maps.LatLng(32.965215,-79.971457),
	new google.maps.LatLng(32.964855,-79.970212),
	new google.maps.LatLng(32.964495,-79.970083),
	new google.maps.LatLng(32.964243,-79.969139),
	new google.maps.LatLng(32.964495,-79.968238),
	new google.maps.LatLng(32.963955,-79.967165),
	new google.maps.LatLng(32.963883,-79.965920),
	new google.maps.LatLng(32.965035,-79.964247),
	new google.maps.LatLng(32.965755,-79.964247),
	new google.maps.LatLng(32.966331,-79.964290),
	new google.maps.LatLng(32.967663,-79.964848),
	new google.maps.LatLng(32.968383,-79.965448),
	new google.maps.LatLng(32.968383,-79.966478),
	new google.maps.LatLng(32.967843,-79.967036),
	new google.maps.LatLng(32.967267,-79.967637),
	new google.maps.LatLng(32.967771,-79.968023),
	new google.maps.LatLng(32.967735,-79.968753),
	new google.maps.LatLng(32.967699,-79.969053),
	new google.maps.LatLng(32.967807,-79.969397)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Nuclear Power School</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.965899,-79.966095),
		map: map,
		title: 'Nuclear Power School'
	});

	infowindow.open(map,marker); // end nuclear power school


// prototype
	var dutyStationCoordinates = 
	[
	new google.maps.LatLng(32.945950,-79.932060),
	new google.maps.LatLng(32.942078,-79.932296),
	new google.maps.LatLng(32.941052,-79.931717),
	new google.maps.LatLng(32.941934,-79.929442),
	new google.maps.LatLng(32.942276,-79.928842),
	new google.maps.LatLng(32.942330,-79.928069),
	new google.maps.LatLng(32.942708,-79.927661),
	new google.maps.LatLng(32.943050,-79.927597),
	new google.maps.LatLng(32.945968,-79.929013),
	new google.maps.LatLng(32.946382,-79.929335),
	new google.maps.LatLng(32.946562,-79.929872),
	new google.maps.LatLng(32.946328,-79.930344),
	new google.maps.LatLng(32.945932,-79.930365),
	new google.maps.LatLng(32.945481,-79.930623),
	new google.maps.LatLng(32.945031,-79.931245),
	new google.maps.LatLng(32.945679,-79.931803)
	];

	var dutyStationPolygon;			
	dutyStationPolygon = new google.maps.Polygon({
		paths: dutyStationCoordinates,
		strokeColor: "red",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "red",
		fillOpacity: 0.35
	});

	// call the duty station onto the map
	dutyStationPolygon.setMap(map);

	// create content for an info bubble
	var contentString = '<h4><i class=icon-asterisk></i> Prototype</h4>'

	var infowindow = new InfoBubble({
		content: contentString,
		maxWidth: 125,
		maxHeight: 100,
		padding: 5
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(32.943618,-79.930796),
		map: map,
		title: 'Prototype'
	});

	infowindow.open(map,marker); // end prototype


	// joint base charleston
		var dutyStationCoordinates = 
		[
		new google.maps.LatLng(32.877425,-80.060120),
		new google.maps.LatLng(32.882903,-80.064411),
		new google.maps.LatLng(32.900777,-80.075569),
		new google.maps.LatLng(32.903083,-80.069389),
		new google.maps.LatLng(32.907839,-80.063038),
		new google.maps.LatLng(32.911297,-80.063038),
		new google.maps.LatLng(32.917926,-80.064411),
		new google.maps.LatLng(32.919800,-80.061150),
		new google.maps.LatLng(32.922249,-80.059261),
		new google.maps.LatLng(32.924987,-80.054798),
		new google.maps.LatLng(32.914756,-80.045872),
		new google.maps.LatLng(32.905533,-80.037117),
		new google.maps.LatLng(32.894579,-80.026646),
		new google.maps.LatLng(32.892849,-80.027676),
		new google.maps.LatLng(32.885642,-80.042953),
		new google.maps.LatLng(32.881461,-80.050850),
		new google.maps.LatLng(32.878290,-80.058060)
		];

		var dutyStationPolygon;			
		dutyStationPolygon = new google.maps.Polygon({
			paths: dutyStationCoordinates,
			strokeColor: "red",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "red",
			fillOpacity: 0.35
		});

		// call the duty station onto the map
		dutyStationPolygon.setMap(map);

		// create content for an info bubble
		var contentString = '<h4><i class=icon-asterisk></i> Joint Base Charleston</h4>'

		var infowindow = new InfoBubble({
			content: contentString,
			maxWidth: 125,
			maxHeight: 100,
			padding: 5
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(32.895876,-80.041422),
			map: map,
			title: 'Joint Base Charleston'
		});

		infowindow.open(map,marker); // end joint base charleston


		// coast guard station
			var dutyStationCoordinates = 
			[
			new google.maps.LatLng(32.775160,-79.943637),
			new google.maps.LatLng(32.775242,-79.942253),
			new google.maps.LatLng(32.773464,-79.942017),
			new google.maps.LatLng(32.773311,-79.943079),
			new google.maps.LatLng(32.773248,-79.943250),
			new google.maps.LatLng(32.773906,-79.944248),
			new google.maps.LatLng(32.774502,-79.944463),
			new google.maps.LatLng(32.774619,-79.943680)
			];

			var dutyStationPolygon;			
			dutyStationPolygon = new google.maps.Polygon({
				paths: dutyStationCoordinates,
				strokeColor: "red",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "red",
				fillOpacity: 0.35
			});

			// call the duty station onto the map
			dutyStationPolygon.setMap(map);

			// create content for an info bubble
			var contentString = '<h4><i class=icon-asterisk></i> USCG</h4>'

			var infowindow = new InfoBubble({
				content: contentString,
				maxWidth: 125,
				maxHeight: 100,
				padding: 5
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(32.774141,-79.943874),
				map: map,
				title: 'Coast Guard'
			});

			infowindow.open(map,marker); // end coast guard 


	//renderNeighborhoods(map);
	//renderDutyStations();

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