
// https://www.tutorialspoint.com/how-to-get-image-data-url-in-javascript
function getDataUrl(img) {
   // Create canvas
   const canvas = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   // Set width and height
   canvas.width = img.width;
   canvas.height = img.height;
   // Draw the image
   ctx.drawImage(img, 0, 0);
   return canvas.toDataURL('image/jpeg');
}

// https://stackoverflow.com/questions/5684303/javascript-window-open-pass-values-using-post
function openWindowWithPost(url, data) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";
    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

/*
function load_jquery() {
	var script = document.createElement('script');
	script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	$(document).ready(runZillowMapper);
}
*/


function openZillowMap() {
	chrome.storage.local.get(['jet_zillowmap'], function(data) {
		if (typeof data.jet_zillowmap != "undefined" || typeof data.jet_zillowmap.items != "undefined") {
			var items = data.jet_zillowmap.items;
			var json = JSON.stringify(items);
			openWindowWithPost("https://trianglewebtech.com/chrome/zillowmap/actions.php", {items:json});
		}
	});
	chrome.storage.local.remove("jet_zillowmap");
}

function continueZillowMapper(force) {
//	console.clear();
	if (typeof force == "undefined") { force = false; }
	console.log("continueZillowMapper()");

	chrome.storage.local.get(['jet_zillowmap'], function(data) {
		console.log("data", data);
		//// If it exists and it's not empty...
		if (typeof data.jet_zillowmap != "undefined" 
			&& typeof data.jet_zillowmap.items != "undefined"
			&& (
				data.jet_zillowmap.items.length > 0
				|| !!force
			)
		) {
			console.log("continuing with zillowmapper!");
			var jet_zillowmap = data.jet_zillowmap;
			console.log("jet_zillowmap", jet_zillowmap);
			var details = [];

			var listcards = document.querySelectorAll(".list-card");
			for (var l=0;l<listcards.length;l++) {
				var details = listcards[l].querySelector(".list-card-details");
				var address = listcards[l].querySelector(".list-card-addr");
				var link = listcards[l].querySelector(".list-card-link");
				var image = listcards[l].querySelector(".list-card-top img");
				var item = {
					details:details.innerText
					,
					address:address.innerText
					,
					link:link.href
					,
					image:image.src
				}
				jet_zillowmap.items.push(item);
			}
			console.log("jet_zillowmap", jet_zillowmap);
			chrome.storage.local.set({jet_zillowmap});
			var buttons = document.querySelectorAll("button");
			for (var b=0;b<buttons.length;b++) {
				if (buttons[b].title=="Next page") {
					if (!buttons[b].disabled) {
						buttons[b].click();
						setTimeout(continueZillowMapper, 2000);
					} else {
						openZillowMap();
					}
				}
			}
		}
	});



}

function runZillowMapper() {
	console.log("runZillowMapper()");
	jet_zillowmap = {items:[]};
	chrome.storage.local.set({jet_zillowmap});
	continueZillowMapper(true);
}

function initZillowMapper() {
//	if (!$) { load_jquery(); } else { 
		runZillowMapper();
//	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender) {
		switch(request.action) {
			case "testFromBackground":
				console.log("test from background: " + request.data);
				break;
			case "testFromPopup":
				console.log("test from popup");
				break;
			case "runZillowMapper":
				runZillowMapper();
				break;
			case "continueZillowMapper":
				continueZillowMapper();
				break;
			case "openZillowMap":
				openZillowMap();
				break;


	}
});
	
//// Send a message from content to background
//chrome.runtime.sendMessage({action: "testFromContent"}, function(response) {});

