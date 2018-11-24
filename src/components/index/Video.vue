<template>
  <div class="content flex-cloumn">
    <Title word="安消联动">
      <el-tooltip placement="bottom">
        <div slot="content">
          首次使用若视频无法正常播放，<br />
          <a src="javascript:void(0);" class="downloadPlugn" @click="downloadPlugn">点击此处</a><br />
          下载视频插件后重启浏览器再试。
        </div>
        <i class="iconfont icon-yiwen"></i>
      </el-tooltip>
    </Title>
    <div class="flex1 flex align-center" v-if="showVideo && error">
      <div class="info">
        <p>{{errorMsg}}</p>
        <el-button size='mini' @click="videoInit()">点击重试</el-button>
      </div>
    </div>
    <div class="flex1 flex align-center noVideo" v-if="!cameraCode.length">
      当前单位没有可供使用的摄像头
    </div>
    <div class="flex1" v-if="!showVideo && cameraCode.length">
      <vue-scroll :ops="scrollOps">
        <div class="cameraItem overflow" @click="openVideo(item.cameracode)"  v-for="(item) in cameraCode" :key="item.cameracode">{{item.cameraname}}</div>
      </vue-scroll>
    </div>
    <div class="flex1 flex-cloumn" v-if="showVideo && !error">
      <div class="flex1">
        <object id="DPSDK_OCX" classid="CLSID:D3E383B6-765D-448D-9476-DFD8B499926D" style="width: 100%; height: 100%" codebase="DpsdkOcx.cab#version=1.0.0.0"></object>
      </div>
      <div class="close-container">
        <el-button type="danger" size="mini" @click="closeVideo">关闭视频</el-button>
        <el-button size="mini" v-if="!isTalking" @click="openTalk">打开语音</el-button>
        <el-button size="mini" v-if="isTalking" @click="closeTalk">关闭语音</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Title from '../common/Title';
export default {
  components: {
    Title
  },
  created() {
    Event.$on('videoError', function (val) {
      this.error = true;
      this.errorMsg = val;
    }.bind(this));
    // 手报火警打开视频直播
    Event.$on('fireVideoLive', function (data) {
      let cameraCode = data.camerainfo.cameracode;
      if (this.showVideo) {
        this.closeVideo();
        setTimeout(() => {
          this.openVideo(cameraCode);
        }, 1000);
      } else {
        this.openVideo(cameraCode);
      }
    }.bind(this));
    // 查岗视频
    Event.$on('checkVideo', function (data) {
      let cameraCode = data.cameraCode;
      let planId = data.planId;
      this.isCheckVideo = true;
      this.planId = planId;
      if (this.showVideo) {
        this.closeVideo();
        setTimeout(() => {
          this.openVideo(cameraCode);
        }, 1000);
      } else {
        this.openVideo(cameraCode);
      }
    }.bind(this));
    // 收报火警视频回放
    Event.$on('fireVideoReplay', function (data) {
      let startTime = data.startTime;
      let endTime = data.endTime;
      let cameraCode = data.data.camerainfo.cameracode;
      this.selCamera = cameraCode;
      if (this.showVideo) {
        this.closeVideo();
        setTimeout(() => {
          this.videoReplay(cameraCode, startTime, endTime);
        }, 1000);
      } else {
        this.videoReplay(cameraCode, startTime, endTime);
      }
    }.bind(this));
  },
  beforeDestroy: function () {
    Event.$off('videoError');
    Event.$off('fireVideoLive');
    Event.$off('fireVideoReplay');
    Event.$off('checkVideo');
  },
  data() {
    return {
      error: false,
      errorMsg: '',
      cameraCode: [],
      isCheckVideo: false, // 判断当前视频是否是查岗视频
      planId: '', // 查岗的id
      selCamera: '1000000$1$0$0',
      isTalking: false,
      scrollOps: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'number',
          scrollingX: false
        },
        bar: {
          vBar: {
            background: '#b9b9b9',
            keepShow: true,
            opacity: 0.5,
            hover: '#efefef'
          },
          hBar: {
            background: '#b9b9b9',
            keepShow: true,
            opacity: 0.5,
            hover: '#efefef'
          }
        }
      }
    };
  },
  methods: {
    ...mapActions(['setVideoStatus']),
    openVideo(cameraCode) {
      var browers = window.myBrowser();
      if (browers !== 'IE') {
        window.showNoticeErr('请使用IE浏览器进行视频');
        return false;
      }
      this.selCamera = cameraCode;
      this.setVideoStatus(true);
      setTimeout(() => {
        this.videoInit();
      }, 500);
    },
    closeVideo() {
      window.Func_StopRealplayByWndNo();
      window.Func_Logout();
      this.setVideoStatus(false);
      this.isTalking = false;
      if (this.isCheckVideo) {
        window.CheckVideoEndTime(this.planId);
        this.isCheckVideo = false;
      }
    },
    videoReplay(cameracode, startTime, endTime) {
      this.error = false;
      this.isTalking = false;
      window.initOCX();
      window.Func_Login('wsn2', 'wsn123456');
      window.Func_StartTimePlaybackByWndNo(cameracode, startTime, endTime);
    },
    videoInit() {
      this.error = false;
      this.isTalking = false;
      window.initOCX();
      window.Func_Login('wsn2', 'wsn123456');
      window.Func_StartRealplayByWndNo(this.selCamera);
    },
    openTalk() {
      this.isTalking = true;
      window.Func_StartTalk(this.selCamera);
    },
    closeTalk() {
      this.isTalking = false;
      window.Func_StopTalk(this.selCamera);
    },
    getCameraCode() {
      let params = {
        buildingid: this.buildingid
      };
      this.$request({
        url: this.$api.getCameraCode.url,
        method: this.$api.getCameraCode.method
      }, params).then(res => {
        if (res.data.stringReturn.success) {
          this.cameraCode = res.data.stringReturn.reObject;
        } else {
          this.cameraCode = [];
        }
      }).catch(err => {
        console.log(err);
      });
    },
    downloadPlugn() {
      window.location.href = window.videoPlugin;
    }
  },
  watch: {
    buildingid() {
      if (this.buildingid) {
        this.getCameraCode();
        if (this.showVideo) {
          this.closeVideo();
        }
      }
    }
  },
  computed: {
    ...mapGetters(['buildingid', 'showVideo'])
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.info {
  text-align: center;
  color: #fff;
}
.info p {
  padding: 10px 0;
}
.noVideo {
  color: #fff;
}
.cameraItem {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  margin-bottom: 5px;
  text-align: center;
  width: 49%;
  color: #fff;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #0e568e;
  background: #1b2830;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}
.cameraItem:nth-child(2n-1) {
  margin-right: 5px;
}
.cameraItem:hover {
  background: #0f8baf;
  border: 1px solid #0e568e;
}
.seled {
  background: #0f8baf !important;
  border: 1px solid #0e568e;
}
.close-container {
  width: 100%;
  height: 28px;
  padding-top: 5px;
  text-align: center;
}
.downloadPlugn {
  color: #0f8baf;
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
