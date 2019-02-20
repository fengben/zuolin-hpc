var ostIp = "192.168.10.214";



$(function () {
    remoteService("serverOrder.spe", function (obj) {
        initialize_websocket(obj[0], ostIp);
    });
});


function initialize_websocket(server_order, ip) {
    let socket_up;
    let started;
    let valid = true;
    let homea = homeAddress(false);
    let urlstr = "ws://" + homea + "ws" + server_order + "/template?script=examples/api/mytest.template&interval=1000&ip=" + ip;
    // let urlstr = "ws://"+homea+"ws"+server_order+"/template?script=examples/websocket/websocket1.template&interval=1000&num=0";
    if (typeof MozWebSocket != "undefined") {
        socket_up = new MozWebSocket(urlstr);
    }
    else {
        socket_up = new WebSocket(urlstr);
    }
    socket_up.onopen = function (evt) {
        started = true;
        //$("#show")[0].innerHTML = "showing...";
    };
    socket_up.onclose = function (evt) {
        if (started)
            return;
        if (!valid && evt.code == 1006) {  // can not connect
            alert("Web socket connection failed!");
        }
    };

    socket_up.onmessage = function (msg) {
        if (msg.data == "heartbeat") {
            return;
        }

        console.log("得到数据=" + msg.data);

        let infos = msg.data.split("\n")[4].replace(/\|/g, " ").split(/\s+/);
        console.log("得到数据切割=" + infos);
        console.log("ip=" + ip);
        //$("#show")[0].innerHTML = msg.data;

        console.log("执行渲染");
        cpu_arr.shift();
        cpu_arr.push(parseFloat(infos[6]));
        // alert(cpu_arr);
        // $(".mdt-read").html(infos[10]);
        // $(".mdt-write").html(infos[11]);
        // $(".mdt-cpu-idl").html(infos[6]);
        // $(".mdt-memory-free").html(infos[3]);

        if (msg.data.toString() === "__error__") {
            socket_up.close();
        }

    };
    socket_up.onerror = function (evt) {
        //alert(evt.data);
        valid = false;
    };
}





























