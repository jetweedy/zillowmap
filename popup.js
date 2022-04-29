
//// The code in here executes when you click the extension button in the browser bar
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

	//chrome.tabs.sendMessage(tabs[0].id, {action: "testFromPopup"}, function(response) {});  
	
	document.getElementById("btnInit").addEventListener("click", () => {
		chrome.tabs.sendMessage(tabs[0].id, {action: "init"}, function(response) {});
	})
	document.getElementById("btnContinue").addEventListener("click", () => {
		chrome.tabs.sendMessage(tabs[0].id, {action: "continue"}, function(response) {});
	})
	document.getElementById("btnOpenMap").addEventListener("click", () => {
		chrome.tabs.sendMessage(tabs[0].id, {action: "openZillowMap"}, function(response) {});		
	})

	chrome.tabs.sendMessage(tabs[0].id, {action: "runZillowMapper"}, function(response) {});
	window.close();

});


document.addEventListener('DOMContentLoaded', function () {
	//// Fetch the background page and run a callback on it within this page
	chrome.runtime.getBackgroundPage(function(bg) {
//				document.getElementById('test').innerHTML = bg.DATA.Test;
	});
});
