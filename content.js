

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
		if (typeof data.jet_zillowmap != "undefined" || typeof data.jet_zillowmap.addresses != "undefined") {
			var addresses = data.jet_zillowmap.addresses;
			var json = JSON.stringify(addresses);
			openWindowWithPost("https://trianglewebtech.com/chrome/zillowmap/actions.php", {addresses:json});
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
			&& typeof data.jet_zillowmap.addresses != "undefined"
			&& (
				data.jet_zillowmap.addresses.length > 0
				|| !!force
			)
		) {
			var jet_zillowmap = data.jet_zillowmap;
			console.log("jet_zillowmap", jet_zillowmap);
			var elements = document.querySelectorAll("address.list-card-addr");
			for (var a=0;a<elements.length;a++) {
				jet_zillowmap.addresses.push(elements[a].innerText);
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
	jet_zillowmap = {addresses:[]};
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
			case "init":
				jet_zillowmap = {addresses:[]};
				chrome.storage.local.set({jet_zillowmap});
				chrome.storage.local.get(['jet_zillowmap'], function(jet_zillowmap) {
					console.log("init", jet_zillowmap);
				});
				break;
			case "continue":
				chrome.storage.local.get(['jet_zillowmap'], function(data) {
					if (typeof data.jet_zillowmap == "undefined" || typeof data.jet_zillowmap.addresses == "undefined") {
						jet_zillowmap = {addresses:[]};
					} else {
						var jet_zillowmap = data.jet_zillowmap;
					}
					console.log("then:", jet_zillowmap);
					for (var i=0;i<10;i++) {
						jet_zillowmap.addresses.push("Address " + i);
					}
					chrome.storage.local.set({jet_zillowmap});
					console.log("now:", jet_zillowmap);
				});
				break;


	}
});
	
//// Send a message from content to background
//chrome.runtime.sendMessage({action: "testFromContent"}, function(response) {});

