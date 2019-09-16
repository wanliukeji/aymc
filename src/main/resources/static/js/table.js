var vm = new Vue({
        el: '#box',
        data: {
            message: 'Hello World!',
            name:'',
            user:{},
            users : []
        },
    headers : {"Content-Type": "application/json;charset=utf-8"},
    methods:{
        postApiData: function() {
            var url = "/login/getDate?name=chenny";
            this.$http.get(url).then(function (res) {
                if (res.status == 200){
                    this.user = JSON.stringify(res.data.data);
                }else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            },function (res) {
                console.log(JSON.stringify(res));;
            });
        },
        postUsers: function() {
            var url = "/api/getUsers";
            this.$http.post(url,null,{elementData : true}).then(function (res) {
                if (res.status == 200){
                    this.users = JSON.stringify(res.data.data);
                }else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            },function (res) {
                console.log(JSON.stringify(res.msg));;
            });
        }
    }
})
