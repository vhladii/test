
bindEvent(window, 'message', callBackOnMessage);

function bindEvent(element, eventName, eventHandler) {
	if (element.addEventListener) {
		element.addEventListener(eventName, eventHandler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + eventName, eventHandler);
	}
}

function sendMessage(msgStr) {
	window.parent.postMessage(msg, "*");
}
var files = {
	"task1" : "jsTasks/task1_ArrayMethods.js",
	"task2" : "jsTasks/task2_ArraySort.js",
	"task3" : "jsTasks/task3_Request.js",
	"task4" : "jsTasks/task4_ParseURL.js",
	"task5" : "jsTasks/task5_BrowserInfo.js"
};

function callBackOnMessage(event) {
	var obj = JSON.parse(event.data);
	var divResult = document.getElementById("block-results");
	var file = files[obj["task"]];
	var code = obj["codeStr"];
	var script = document.createElement("script");
	script.src = file;
	script.defer = true;
	
	setTimeout(function() {
		document.body.appendChild(script);
	},0);
	while (divResult.firstChild) {
		divResult.removeChild(divResult.firstChild);
	}
	setTimeout(function() {
		setCodeInScript(code);
	},500); 
}

function setCodeInScript(code) {
	var script = document.createElement("script");
	script.innerHTML += "var err = null;\ntry {\n";
	script.innerHTML += code;
	script.innerHTML += "\n} catch(ex) {\
						\n err = new Error(ex.message);\
						\n err.name = ex.name;\
						\n logResult(err);\n}\
						\nfinally {\
						\n sendResponse(err);\
						\n}";
	document.body.appendChild(script);
}

function sendResponse(err) {
	var message = "";
	
	if(err == null) {
		message = "OK";
	} else {
		message = "Error";
	}
	
	window.parent.postMessage(message, "*");
}

