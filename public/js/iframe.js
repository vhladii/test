
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
	"task1" : "jsTasks/task1#ArrayMethods.js",
	"taks2" : "task2#ArraySort.js",
	"taks3" : "task3#Request.js",
	"taks4" : "task4#ParseURL.js",
	"task5" : "task5#BrowserInfo.js"
};

function callBackOnMessage(event) {
	var obj = JSON.parse(event.data);
	var script = document.createElement("script");
	var divResult = document.getElementById("block-results");
	var file = files[obj["task"]];
	var code = obj["codeStr"];
	script.src = file;
	document.body.appendChild(script);
	
	while (divResult.firstChild) {
		divResult.removeChild(divResult.firstChild);
	}
	setCodeInScript(code);
}

function setCodeInScript(code) {
	var script = document.createElement("script");
	script.innerHTML += "try {\n";
	script.innerHTML += code;
	script.innerHTML += "\n} catch(ex) {\
						\n var err = new Error(ex.message);\
						\n err.name = ex.name;\n \
						logResult(err);\n}";
	document.body.appendChild(script);
}

