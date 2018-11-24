<template>
  <div class="container flex-cloumn">
    <Title></Title>
    <div class="flex1">
        <div class="height6">
          <el-col :span="10">
            <img width="100%" height="100%" ref='buildingimg' :src="buildingInfo.imgurl ? buildingInfo.imgurl : errorImg" @error="buildingImgError">
          </el-col>
          <el-col :span="14">
            <div class="flex-cloumn detail">
              <div class="flex1">地址：{{buildingInfo.address}}</div>
              <div class="flex1">运维单位：{{buildingInfo.operator_name}}</div>
              <div class="flex1">联系人：{{buildingInfo.firecontactname}}</div>
              <div class="flex1">电话：{{buildingInfo.firecontacttel}}</div>
            </div>
          </el-col>
        </div>
        <div class="height4 flex-cloumn">
          <div class="flex flex1" style="align-items: center;">
            <button style="margin-right:10px" @click="check">查岗</button>
            <button @click="getCheckRecord">查岗记录</button>
          </div>
          <div style="width:100%;height:42px">
            <el-col :span="10">
              设备数<br>
              {{buildingInfo.deviceTotalCount}}
            </el-col>
            <el-col :span="14">
              独立式探测器<br>
              {{buildingInfo.detectorCount}}
            </el-col>
          </div>
        </div>
    </div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="isCheck"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      width="30%">
      <div v-loading="true" style="height: 150px;width: 100%"></div>
      <p style="text-align: center;margin: 10px 0;font-size: 20px">正在查岗中，请稍后。。。</p>
    </el-dialog>
    <CheckRecord :hostcode="buildingInfo.checkmanhostcode"></CheckRecord>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Title from '../common/Title';
import errorImg from '../../assets/img/error-img.png';
import CheckRecord from './CheckRecord';
export default {
  components: {
    Title,
    CheckRecord
  },
  data() {
    return {
      buildingInfo: {},
      errorImg,
      // 正在查岗中 弹窗
      isCheck: false
    };
  },
  mounted() {
    // 查岗的定时器
    window.checkTimeout = null;
  },
  methods: {
    getBuildingInfo() {
      let params = {
        buildingid: this.buildingid
      };
      this.$request({
        url: this.$api.getBuildingDetail.url,
        method: this.$api.getBuildingDetail.method
      }, params).then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.buildingInfo = res.data.stringReturn.reObject;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getCheckRecord() {
      if (!this.buildingInfo.checkmanhostcode) {
        this.$message.warning('该单位未设置默认查岗主机！');
        return false;
      }
      Event.$emit('openCheckRecord');
    },
    buildingImgError() {
      this.$refs.buildingimg.src = this.errorImg;
    },
    check() {
      if (!this.buildingInfo.checkmanhostcode) {
        this.$message.warning('该单位未设置默认查岗主机！');
        return false;
      }
      let params = {
        hostcode: this.buildingInfo.checkmanhostcode,
        start: 0,
        limit: 20
      };
      this.$request({
        url: this.$api.getHostInfo.url,
        method: this.$api.getHostInfo.method
      }, params).then(res => {
        if (!res.data.WSListReturn.success || res.data.WSListReturn.root.length === 0) {
          window.showNoticeErr('未找到主机');
          return false;
        }
        let hostData = res.data.WSListReturn.root[0];
        let browers = window.myBrowser();
        if (browers !== 'IE' && hostData.camera_code !== null) {
          window.showNoticeErr('请使用IE浏览器进行视频查岗');
          return false;
        }
        let hostid = hostData.hostid;
        let obj = {
          hostid: hostid
        };
        this.$request({
          url: this.$api.checkHost.url,
          method: this.$api.checkHost.method
        }, obj).then(res => {
          if (res.data.stringReturn.success === false) {
            let message = res.data.stringReturn.message;
            window.showNoticeErr(message);
            return false;
          }
          if (hostData.camera_code !== null) {
            let planId = res.data.stringReturn.reObject;
            let cameraCode = hostData.camera_code;
            let data = {
              planId,
              cameraCode
            };
            Event.$emit('checkVideo', data);
          } else {
            clearTimeout(window.checkTimeout);
            this.isCheck = true;
            window.checkTimeout = setTimeout(() => {
              this.isCheck = false;
            }, 10000);
          }
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    }
  },
  watch: {
    buildingid() {
      this.getBuildingInfo();
    }
  },
  computed: {
    ...mapGetters(['buildingid'])
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
}
.container > div {
  display: inline-block;
}
.height6 {
  height: 60%;
  width: 100%;
}
.height4 {
  height: 40%;
  width: 100%;
}
.height4 button {
  background: #1b2830;
  border: 1px solid #0e568e;
  color: #fff;
  padding: 3px 5px;
}
.height6 .el-col {
  height: 100%;
}
.detail {
  width: 100%;
  height: 100%;
}
.detail div {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding-left: 10px;
}
.height4 .el-col {
  text-align: left;
  line-height: 20px;
}
</style>
