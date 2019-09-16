var load = new Vue({
    el: '#panel-body',
    data: {
        items: [],
        obj: {
            context: '',
            pageNo: 0,
            pageSize: 1
        },
        total:10
    },
    //初始化数据
    created: function(){
        this.seach();
    },
    filters: {
        formatDate:function (value) {
            var date = new Date(value);
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            return year + '-' + month + '-' + day + '-' + ' ' + hours + ':' + minutes + ':' + seconds;
        }
    },
    headers: {"Content-Type": "application/json;charset=utf-8"},
    methods: {
        //页面搜索 初始化
        seach:function () {
            var url = "/api/record/getPage";
            this.$http.post(url, JSON.stringify(this.obj), {emulateJSON: true}).then(function (res) {
                if (res.status == 200) {
                    this.items = res.data.data.records;
                    //异步刷新
                    this.created;
                } else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            }, function (res) {
                console.log(JSON.stringify(res));
            });
        },
        prevSeach:function(){
            this.obj.pageNo -= 1;
            if (this.obj.pageNo < 0){
                this.obj.pageNo = 0;
            }
            this.seach();
        },
        pageSeach:function(){
            this.seach();
        },
        nextSeach:function () {
            if(this.total > this.obj.pageNo){
                this.obj.pageNo += 1;
                this.seach();
            }else {
                this.total = this.obj.pageNo;
                this.seach();
            }
        }
    }
});


var vm = new Vue({
    el: '#exampleModel',
    data: {
        info: {
            video_id: '',
            img_id: ''
        },
        upath: '',
        v_result: '',
        v_uping: 0,
        p_upath: '',
        p_result: '',
        p_uping: 0
    },
    headers: {"Content-Type": "application/json;charset=utf-8"},
    methods: {
        //保存数据
        postSaveData: function () {
            var url = "/api/record/save";
            this.$http.post(url, JSON.stringify(this.info), {emulateJSON: true}).then(function (res) {
                if (res.status == 200) {
                    console.log("保存成功");
                } else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            }, function (res) {
                console.log(JSON.stringify(res));
            });
        },
        //上传视频
        fileupload_video: function () {
            var zipFormData = new FormData();
            zipFormData.append('v_file', this.upath);
            console.log(JSON.stringify(zipFormData));
            let config = {headers: {'Content-Type': 'multipart/form-data'}};
            this.uping = 1;
            this.$http.post('/upload_video', zipFormData, config).then(function (res) {
                var resultobj = res.data;
                var vid = JSON.stringify(res.data.data.id);
                this.info.video_id = vid;
                this.v_uping = 0;
                this.v_result = resultobj.msg;
            }).catch(function (error) {
                console.log(error);
            });
        },
        //上传图片
        fileupload_img: function () {
            var zipFormData = new FormData();
            zipFormData.append('p_file', this.upath);
            console.log(JSON.stringify(zipFormData));
            let config = {headers: {'Content-Type': 'multipart/form-data'}};
            this.p_uping = 1;
            this.$http.post('/upload_img', zipFormData, config, {emulateJSON: false}).then(function (res) {
                var resultobj = res.data;
                var id = JSON.stringify(res.data.data.id);
                this.info.img_id = id;
                this.p_uping = 0;
                this.p_result = resultobj.msg;
            }).catch(function (error) {
                console.log(error);
            });
        },
        getFile: function (event) {
            this.upath = event.target.files[0];
            if (this.upath != '' && (this.upath.type == 'image/png' || this.upath.type == 'image/jpeg')) {
                alert('audio');
                this.fileupload_img();
            } else if (this.upath != '' && (this.upath.type == 'video/mp4')) {
                alert('video');
                this.fileupload_video();
            }
        }
    }
})
