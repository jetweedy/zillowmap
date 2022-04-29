<?php

error_reporting(E_ALL);

//header("Content-type:text/plain");
$json = $_POST['addresses'];
$addresses = json_decode($json);

?>
<html>
	<head>
		<script>
		var addresses = [];	

		<?php
		foreach ($addresses as $address) {
			print "addresses.push('".$address."');";
		}
		?>
		console.log(addresses);
		</script>

		<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=_________________"></script>
		<script type="text/javascript" src="https://jonathantweedy.com/tools/jetMap/jetMap.js"></script>

		<style>
			body {
				font-family: "Century Gothic", sans-serif;
				font-size:.8em;
			}
			#myMap {
				width:99%;
				height:99%;
				border:3px solid #006;
			}
			.mapBubble {
				margin-right:20px;
			}
		</style>

	</head>
	<body>
		<div id="myMap"></div>
		<script type="text/javascript">
			geocoder = new google.maps.Geocoder();
			map = new jetMap({
				Container:document.getElementById("myMap")
			});
			var to = 0;
			function putPin(address) {
				geocoder.geocode( { 'address': this.address}, function(results, status) {
					if (status == 'OK') {
						console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
						map.addMarker({
							"title":this.address ,
							"content":this.address,
							"color":"aae",
							"label":"",
							"latitude":results[0].geometry.location.lat(),
							"longitude":results[0].geometry.location.lng()
						});
					}
				}.bind({address:this.address}));
			}
			for (var a=0;a<addresses.length;a++) {
				var address = addresses[a];
				console.log(address);
				setTimeout(putPin.bind({address:address}), to++ * 500);
			}
		</script>	
	</body>
</html>











