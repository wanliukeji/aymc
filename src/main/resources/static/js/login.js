import toast from 'static/vue/toast'
export default {
    components: {toast},
}
var load = new Vue({
    el: '#panel-body',
    data: {
        info: {
            account:'',
            password:''
        }
    },
    headers: {"Content-Type": "applicat ion/json;charset=utf-8"},
    methods: {
        //登录判断
        submit: function () {
            if (this.info.account == ''){
                alert('请输入账号');
                return;
            }
            if (this.info.password == ''){
                alert('请输入密码');
                return;
            }
            var url = "api/login";
            this.$http.post(url, JSON.stringify(this.info), {emulateJSON: true}).then(function (res) {
               console.log(JSON.stringify(res.data));
                if (res.status == 200) {

                    if (res.data.data == true){
                        alert('登录成功');
                    } else {

                    }
                } else {
                    load.$Modal.success({
                        title: "提示",
                        content: "修改成功"
                    });
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            }, function (res) {
                console.log(JSON.stringify(res));
            });
        }
    }
});


