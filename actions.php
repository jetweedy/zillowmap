<?php

error_reporting(E_ALL);

//header("Content-type:text/plain");
$json = $_POST['items'];
$items = json_decode($json);

?>
<html>
	<head>
		<script>
		var items = [];

		<?php
		foreach ($items as $item) {
			print "items.push(".json_encode($item).");";
		}
		?>
		</script>

		<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyBpm2A0DiAP6gb7KpEhT0zWTHh8EBripC0"></script>
		<script type="text/javascript" src="/tools/jetMap/jetMap.js"></script>

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
			function putPin() {
				console.log(this.item);
				geocoder.geocode( { 'address': this.item.address}, function(results, status) {
					if (status == 'OK') {
						console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
						map.addMarker({
							"title":this.item.address + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this.item.details,
							"content":
//								"<img style='width:200px; margin:5px;' src='" + this.item.image + "' /><br />"
								"<a href='"+this.item.link+"' target='_blank'>" + this.item.address + "<br />" + this.item.details + "</a>",
							"color":"aae",
							"label":"",
							"latitude":results[0].geometry.location.lat(),
							"longitude":results[0].geometry.location.lng()
						});
					}
				}.bind({item:this.item}));
			}
			for (var a=0;a<items.length;a++) {
				var item = items[a];
				setTimeout(putPin.bind({item:item}), to++ * 500);
			}
		</script>	
	</body>
</html>











