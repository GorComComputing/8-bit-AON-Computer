// установка всех longpoll
function set_longpoll() {
	longpoll('/poll', recv);
	//longpoll2('/is_act', recv2);
}


// установка longpoll
function longpoll(url, callback) {

    var req = new XMLHttpRequest (); 
    req.open ('POST', url, true); 

    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) { 
            if (req.status == 200) {
                callback(req.responseText);
                longpoll(url, callback);
            } else {
                //alert ("long-poll connection lost");
    		var box = document.getElementById("toast-body");
                //console.log(box.innerHTML);
    		box.innerHTML = "Связь с сервером потеряна";
    	
    		var toastLiveExample = document.getElementById("liveToast");
    		var toast = new bootstrap.Toast(toastLiveExample);
    		toast.show();
            }
        }
    };

    req.send(null);
}


// действие на странице при получении сообщения с сервера
function recv(msg) {
	//console.log(msg);
	const obj = JSON.parse(msg);
	console.log(obj.msg);
	
    	var box = document.getElementById("toast-body");
    	box.innerHTML = obj.msg;
    	
    	var toastLiveExample = document.getElementById("liveToast")
    	var toast = new bootstrap.Toast(toastLiveExample)
    	toast.show()
}

/*
// установка longpoll
function longpoll2(url, callback) {

    var req = new XMLHttpRequest (); 
    req.open ('POST', url, true); 

    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) { 
            if (req.status == 200) {
                callback(req.responseText);
                longpoll2(url, callback);
            } else {
                //alert ("long-poll connection lost");
                var box = document.getElementById("counter");
    		box.innerHTML = "Связь с сервером потеряна";
    	
    		var toastLiveExample = document.getElementById("liveToast")
    		var toast = new bootstrap.Toast(toastLiveExample)
    		toast.show()
            }
        }
    };

    req.send(null);
}


// действие на странице при получении сообщения с сервера
function recv2(msg) {
    	var box = document.getElementById("mesg");
    	box.innerHTML = msg + "\n";
    	var box2 = document.getElementById("mesg2");
    	box2.innerHTML = msg + "\n";
}*/
