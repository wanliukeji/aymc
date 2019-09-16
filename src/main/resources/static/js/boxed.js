
var load = new Vue({
    el: '#panel-body',
    data: {
        items: []
    },
    //初始化数据
    created: function () {
        this.getInfos();
    },
    headers: {"Content-Type": "application/json;charset=utf-8"},
    methods: {
        getInfos: function () {
            var url = "/api/vfile/list";
            this.$http.post(url, {ids: null}, {emulateJSON: true}).then(function (res) {
                if (res.status == 200) {
                    this.items = res.data.data;
                } else {
                    console.log('ERROR:' + JSON.stringify(res.data));
                }
            }, function (res) {
                console.log(JSON.stringify(res));
            });
        }
    }
});


var vm = new Vue({
    el: '#exampleVideoIn',
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
            var url = "/api/video/save";
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
            let config = {headers: {'Content-Type': 'multipart/form-data'}};
            this.uping = 1;
            this.$http.post('/upload_video', zipFormData, config).then(function (res) {
                var resultobj = res.data;
                var vid = JSON.stringify(res.data.data.id);
                this.info.video_id = vid;
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
            }).catch(function (error) {
                console.log(error);
            });
        },
        getFile: function (event) {
            this.upath = event.target.files[0];
            if (this.upath != '' && (this.upath.type == 'image/png' || this.upath.type == 'image/jpeg')) {
                this.fileupload_img();
            } else if (this.upath != '' && (this.upath.type == 'video/mp4')) {
                this.fileupload_video();
            }
        }
    }
})
