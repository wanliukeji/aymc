var load = new Vue({
    el: '#panel-body',
    data: {
        info: {
            account: '',
            password: '',
            email: '',
            pwd: ''
        }
    },
    headers: {"Content-Type": "application/json;charset=utf-8"},
    methods: {
        //用户注册
        submit: function () {
            if (this.info.account == '') {

            }
            if (this.info.password == '') {

            }
            if (this.info.email == '') {

            }
            if (this.info.pwd == '') {

            }
            if (this.info.pwd != this.info.password) {

            }

            var url = "api/register";
            this.$http.post(url, JSON.stringify(this.info), {emulateJSON: true}).then(function (res) {
                if (res.status == 200) {
                    this.items = res.data.data.records;
                } else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            }, function (res) {
                console.log(JSON.stringify(res));
            });
        }
    }
});


