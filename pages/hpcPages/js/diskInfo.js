Vue.component('dynamicTr',{
	props:['diskmessage'],
	template:'<tr><td v-for="(value,key) in diskmessage"><slot :value="value"></slot></td></tr>'
})

var infos = [
		{name:1,source:"192.168.10.217",hasused:2,total:100,read:10,write:100,cpu:20,memory:10,ishealthy:0},
		{name:2,source:"192.168.10.216",hasused:2,total:100,read:10,write:100,cpu:20,memory:10,ishealthy:1}
		];

var info = {name:2,source:"192.168.10.216",hasused:2,total:100,read:10,write:100,cpu:20,memory:10,ishealthy:1};

var ost = new Array();

var diskShow= new Vue({
	el:"#ostDisk",
	data:{
		diskMessages:infos,
		test:[]
	},
	created:function() {
		this.$nextTick(()=>{
      this.getDiskInfos();
		})

  },
	methods:{
		getDiskInfos:function() {
				console.log("getDiskInfos调用");
				getFromWS("/examples/api/sshexec.template","",ost,getData);
     		console.log("ost="+ost);
    }
	}
})



var getData = function() {
		console.log("回调函数执行");
 		diskShow.test = ost;
}









