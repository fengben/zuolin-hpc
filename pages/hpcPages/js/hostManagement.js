//代表当前显示的哪一种主机列表。添加，删除同类的主机会用到
var global_signal = 0;
var zoolina_and ="$^@^$";
$(function () {
    console.log('in hostManagement.js');
    admin_host_list();
    console.log('Done');
});

//处理返回字符串
function clean_result(str, need_link = 0) {
    tmp = str.split("\n");
    if (need_link == 0) {
        for (i = 0; i < tmp.length - 1; ++i) {
            tmp[i] = "<br>" + tmp[i] + "</br>";
            console.log(tmp[i]);
        }
    }
    else {
        for (i = 0; i < tmp.length - 1; ++i) {
            tmp[i] = "<br><a href='javacript:void(0);' onclick='host_group_list("+tmp[i] +")'> " + tmp[i] + "</a></br>";
            // tmp[i] = "<br>" + tmp[i] + "</br>";
            console.log(tmp[i]);
        }
    }
    res = tmp.join("");
    return res;
};

//显示管理主机列表
function admin_host_list() {
    var result = new Array();
    var parase_result = function () {
        console.log(result[0])
        var res = clean_result(result[0])
        $('#host-list').html(res)
    };
    global_signal = 0;
    getFromWS("/hostManagement/hostManagement.template", "opt=0", result, parase_result);
};

//显示提交主机列表
function submit_host_list() {
    var result = new Array();
    var parase_result = function () {
        console.log(result[0])
        var res = clean_result(result[0])
        $('#host-list').html(res)
    };
    global_signal = 1;
    getFromWS("/hostManagement/hostManagement.template", "opt=1", result, parase_result);
};

//显示主机集群群组列表
function control_host_list() {
    var result = new Array();
    var parase_result = function () {
        console.log(result[0])
        var res = clean_result(result[0], 1);
        res = "<div id='hostGroups'>"+res+"</div>";
        res = res + "<div id='groupHostList'></div>"
        $('#host-list').html(res)
    };
    global_signal = 2;
    // getFromWS("/hostManagement/hostManagement.template", "opt=2", result, parase_result);
    getFromWS("/hostManagement/hostGroup.template", "opt=0", result, parase_result);

};
// 显示主机集群主机列表
function host_group_list(host_group){
    alert(host_group);
    var result = new Array();
    var parase_result = function () {
        console.log(result[0])
        var res = clean_result(result[0]);
        // res = "<div id='hostGroups'>"+res+"</div>";
        $('#groupHostList').html(res)
    };
    global_signal = 2;
    // getFromWS("/hostManagement/hostManagement.template", "opt=2", result, parase_result);
    var para = "opt=1"+zoolina_and+"host_group="+host_group;
    getFromWS("/hostManagement/hostGroup.template", para, result, parase_result);
};
//显示执行主机列表
function exec_host_list() {
    var result = new Array();
    var parase_result = function () {
        console.log(result[0])
        var res = clean_result(result[0])
        $('#host-list').html(res)
    };
    global_signal = 3;
    getFromWS("/hostManagement/hostManagement.template", "opt=3", result, parase_result);
};

function get_input() {
    return $("#host-textbox").val();
};

function add_host() {
    hostname = get_input();
    if (hostname == "") {
        return
    }
    result = new Array();
    parase_result = function () {
        location.reload();
    };
    para = "";
    opt = global_signal;
    para += "opt=" + opt;
    para += "$^@^$";
    para += "hostname=" + hostname;
    getFromWS("/hostManagement/addHost.template", para, result, parase_result);
};

function del_host() {
    hostname = get_input();
    if (hostname == "") {
        return
    }
    result = new Array();
    parase_result = function () {
        location.reload();
    };
    para = "";
    opt = global_signal;
    para += "opt=" + opt;
    para += "$^@^$";
    para += "hostname=" + hostname;
    getFromWS("/hostManagement/delHost.template", para, result, parase_result);
}

function modify_host() {
    hostname = get_input();
    result = new Array();
    if (hostname == "") {
        return
    }
    parase_result = function () {
        location.reload();
    };
    para = "";
    opt = global_signal;
    para += "opt=" + opt;
    para += "$^@^$";
    para += "hostname" + hostname;
    getFromWS("/hostManagement/modifyHost.template", para, result, parase_result);
}

function shut_down() {
    hostname = get_input();
    result = new Array();
    parase_result = function () {
        location.reload();
    };
    getFromWS("/hostManagement/shutDown.template", hostname, result, parase_result);
}