

var SAAgent = null;
var SASocket = null;
var CHANNELID = 104;
var CHANNELID_NAVIGATE = 106;
var ProviderAppName = "GParkProvider";
var parkingAddressJson;
var index = 0;
var radius;
var agentCallback = {
		onconnect : function(socket) {
			console.log("agentCallback");
			SASocket = socket;
			createHTML("startConnection");
			SASocket.setSocketStatusListener(function(reason) {
				console.log("Service connection lost, Reason : [" + reason + "]");
				disconnect();
			});
		},
		onerror : onerror
	};
var peerAgentFindCallback = {
		onpeeragentfound : function(peerAgent) {
			console.log("peer agent found: onpeeragentfound");
			try {
				if (peerAgent.appName == ProviderAppName) {
					SAAgent.setServiceConnectionListener(agentCallback);
					console.log(peerAgent);
					SAAgent.requestServiceConnection(peerAgent);
				} else {
					alert("Not expected app!! : " + peerAgent.appName);
				}
			} catch (err) {
				console
						.log("exception [" + err.name + "] msg[" + err.message
								+ "]");
			}
		},
		onerror : onerror
	}


window.onload = function() {
	setRadius(document.getElementById('settingtextbox').value);
	connect();
	//handle swipe right gesture
	$('.contents').on("swiperight", function() {
		if (index > 0) {
			index--;
			console.log("right" + index);
			createAddrView();
		}
	});

	//handle swipe left gesture
	$('.contents').on("swipeleft", function() {
		if (index < parkingAddressJson.length) {
			console.log("left" + index);
			createAddrView();
			index++;
		}
	});

	//handle swipe down gesture
	$('.contents').on("swipedown", function() {
		tizen.application.getCurrentApplication().exit();
	});
	//handle swipe up gesture
	$('.contents').on("swipeup", function() {
		tizen.application.getCurrentApplication().exit();
	});

	//handle double tap
	$('.contents').on(
			"click",
			function() {
				var tempIndex;
				if (index != 0) {
					tempIndex = index - 1
				} else {
					tempIndex = 0;
				}
				console.log(tempIndex);
				var latlng = parkingAddressJson[tempIndex].Latitude + ","
						+ parkingAddressJson[tempIndex].Longitude;
				console.log("Clicked contet:" + latlng + "index: " + index);
				sendLatLng(latlng);
			});
};

function connect() {
	if (SASocket) {
		return false;
	}
	try {
		webapis.sa.requestSAAgent(onsuccess, onerror);
	} catch (err) {
		console.log(err);
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function onsuccess(agents) {
	console.log(agents);
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];

			SAAgent.setServiceConnectionListener({
				onconnect : function(saSocket) {
					console.log(saSocket);
				},
				onerror : function(param) {
					console.log("OnError", param);
				}
			});
			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
		} else {
			alert("Not found SAAgent!!");
		}
	} catch (err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function onerror(err) {
	console.log("err [" + err.name + "] msg[" + err.message + "]");
}

function disconnect() {
	try {
		if (SASocket != null) {
			SASocket.close();
			SASocket = null;
			createHTML("closeConnection");
			console.log("Connection Closed");
		}
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function createHTML(log_string) {
	var log = document.getElementById('resultBoard');
	log.innerHTML = log.innerHTML + "<br> : " + log_string;
}

function onreceive(channelId, data) {
	createHTML(data);
}

function onreceivePA(channelId, data) {
	console.log("Actual data: " + data);
	createSlider(data);
}

function fetch() {
	SASocket.setDataReceiveListener(onreceivePA);
	console.log("GPark " + getRadius() * 1000);
	SASocket.sendData(CHANNELID, "GPark " + getRadius() * 1000);
	console.log("GPark success");
	//disconnect();
}

function createSlider(data) {
	$('#startDiv').hide();
	$('#setting_win').hide();
	$('#contents').show();

	parkingAddressJson = JSON.parse(data);
	console.log("Parsed data: " + parkingAddressJson);
	createAddrView();
	index++;
}

function createAddrView() {
	$('#nametextbox').html(parkingAddressJson[index].Name);
	$('#addresstextbox').html(parkingAddressJson[index].Address);
	var price = parkingAddressJson[index].Price;

	if (price != "null") {
		$('#pricetextbox').html(parkingAddressJson[index].Price + "€");
	}
	$('#distancetextbox').html(parkingAddressJson[index].Distance + "KM");
}

function done() {
	$('#setting_win').hide();
	$('#contents').show();
	setRadius(document.getElementById('settingtextbox').value);
	connect();
	fetch();
}

function settings() {
	$('#contents').hide();
	$('#setting_win').show();
}

function setRadius(rad) {
	this.radius = rad;
}

function getRadius() {
	if(this.radius == null)
		return 2;
	else
	return parseFloat(this.radius);
}

function sendLatLng(latlng) {
	connect();
	SASocket.sendData(CHANNELID_NAVIGATE, latlng);
}