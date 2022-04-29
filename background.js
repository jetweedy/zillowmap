
var DATA = {};
//// Initialize storage DATA.Test by getting/setting if necessary
////chrome.storage.sync.get(["Keys","to","fetch"], function(toPerformOnThisReturnedVar) {
chrome.storage.sync.get(["fbApiKey"], function(data) {
	DATA = data;
	if (typeof DATA.Test == "undefined") { DATA.Test = 0; }
	//// This line is necessary anywhere else that data is updated later
	////chrome.storage.sync.set({"Key":DATA.ValueForKey}, function () { /**/ });
	chrome.storage.sync.set({"Test":DATA.Test}, function () { /**/ });
});

/*
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete' && tab.active) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "continueZillowMapper"}, function(response) {});
	}
})
*/

//// Listen for messages
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		switch(request.action) {
			case "testFromContent":
				//// Increment the DATA.Test variable (to demonstrate a persistent change)
				if (typeof DATA.Test == "undefined") { DATA.Test = 0; }
				DATA.Test++;
				//// Send a message from background to content
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "testFromBackground", data:DATA.Test}, function(response) {});  
				});
				break;
	}
});















	
/*

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
	var context = "selection";
	var title = "Translate Selected Text";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

function babbleJetReplace(a,b) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage( tabs[0].id, {action:"replaceText", a:a, b:b}, function(response) {} );
	});
}

function babbleJetTranslate(text) {
	var revtext = "";
	for(var i=text.length-1;i>-1;i--) {
		revtext += text[i];
	}
	babbleJetReplace(text,revtext);
//	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//		chrome.tabs.sendMessage( tabs[0].id, {action:"popupTranslation", a:a, b:b}, function(response) {} );
//	});
}

// The onClicked callback function.
function onClickHandler(info, tab) {
	babbleJetTranslate(info.selectionText);
};

*/