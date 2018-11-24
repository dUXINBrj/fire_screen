<template>
  <div class="content flex-cloumn" id="fireSysState">
    <header>火灾报警系统状态</header>
    <div class="flex1">
      <el-col :span='12'>
        <table class="device-table">
          <thead>
            <tr>
              <td></td>
              <td style="width:40%">数量</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="device-statu" :class="{fire:hostFire}">火 警</td>
              <td>{{deviceFireNum}}</td>
            </tr>
            <tr>
              <td class="device-statu" :class="{error:deviceeError}">故 障</td>
              <td>{{deviceeErrorNum}}</td>
            </tr>
            <tr>
              <td class="device-statu" :class="{green:deviceStart}">启 动</td>
              <td>{{deviceStartNum}}</td>
            </tr>
            <tr>
              <td class="device-statu" :class="{green:deviceBack}">反 馈</td>
              <td>{{deviceBackNum}}</td>
            </tr>
            <tr>
              <td class="device-statu" :class="{error:deviceSupervise}">监 管</td>
              <td>{{deviceSuperviseNum}}</td>
            </tr>
            <tr>
              <td class="device-statu" :class="{green:deviceShield}">屏 蔽</td>
              <td>{{deviceShieldNum}}</td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col :span='12'>
        <div class="content flex-cloumn">
          <p class="title">用户信息传输装置</p>
          <div class="select" id="fire-sys-status-host">
            <el-select v-model="hostid" size="mini">
              <el-option
                v-for="item in hostOption"
                :key="item.hostid"
                :label="item.hostname"
                :value="item.hostid">
              </el-option>
            </el-select>
          </div>
          <div class="flex1 flex-cloumn">
            <div class="flex2 flex align-center">
              <div class="box flex align-center" :class="{fire:hostFire}">手 动 火 警</div>
            </div>
            <div class="flex1 flex align-center">
              <div class="box flex align-center" :class="{error:hostError}">故 障</div>
            </div>
            <div class="flex1 flex align-center">
              <div class="box flex align-center" :class="{green:hostEle}">备 电</div>
            </div>
            <div class="flex1 flex align-center">
              <div class="box flex align-center" :class="{grey:hostOffline}">离 线</div>
            </div>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      hostid: '',
      hostOption: [],
      deviceFireNum: 0,
      deviceeErrorNum: 0,
      deviceStartNum: 0,
      deviceBackNum: 0,
      deviceSuperviseNum: 0,
      deviceShieldNum: 0,
      deviceFire: false,
      deviceeError: false,
      deviceStart: false,
      deviceBack: false,
      deviceSupervise: false,
      deviceShield: false,
      hostFire: false,
      hostError: false,
      hostEle: false,
      hostOffline: false
    };
  },
  methods: {
    getHost() {
      let params = {
        buildingid: this.buildingid,
        isComboxSelect: true
      };
      this.$request({
        url: this.$api.getHost.url,
        method: this.$api.getHost.method
      }, params).then(res => {
        if (res.data.WSListReturn.success && res.data.WSListReturn.root.length) {
          this.hostOption = res.data.WSListReturn.root;
          this.hostid = res.data.WSListReturn.root[0].hostid;
        } else {
          this.deviceOption = [];
          this.hostid = '';
          this.resetHost();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getHostStatu() {
      let params = {
        hostid: this.hostid
      };
      this.$request({
        url: this.$api.getHostStatu.url,
        method: this.$api.getHostStatu.method
      }, params).then(res => {
        if (res.data.stringReturn.success) {
          this.hostFire = Boolean(res.data.stringReturn.reObject.manualAlarm);
          this.hostError = Boolean(res.data.stringReturn.reObject.errorstatus);
          this.hostEle = Boolean(res.data.stringReturn.reObject.mainelecerrorstatus);
          this.hostOffline = Boolean(res.data.stringReturn.reObject.offlinestatus);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getDeviceStatu() {
      let params = {
        buildingid: this.buildingid
      };
      this.$request({
        url: this.$api.getDeviceStatu.url,
        method: this.$api.getDeviceStatu.method
      }, params).then(res => {
        if (res.data.stringReturn.success) {
          this.deviceFireNum = res.data.stringReturn.reObject.fireCount;
          this.deviceeErrorNum = res.data.stringReturn.reObject.errorCount;
          this.deviceStartNum = res.data.stringReturn.reObject.startStatusCount;
          this.deviceBackNum = res.data.stringReturn.reObject.feedbackStatusCount;
          this.deviceSuperviseNum = res.data.stringReturn.reObject.superviseStatusCount;
          this.deviceShieldNum = res.data.stringReturn.reObject.shieldStatusCount;
          this.deviceFire = Boolean(res.data.stringReturn.reObject.fireShine);
          this.deviceeError = Boolean(res.data.stringReturn.reObject.errorShine);
          this.deviceStart = Boolean(res.data.stringReturn.reObject.startStatusCount);
          this.deviceBack = Boolean(res.data.stringReturn.reObject.feedbackStatusCount);
          this.deviceSupervise = Boolean(res.data.stringReturn.reObject.superviseStatusCount);
          this.deviceShield = Boolean(res.data.stringReturn.reObject.shieldStatusCount);
        } else {
          this.resetDevice();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    resetDevice() {
      this.deviceFireNum = 0;
      this.deviceeErrorNum = 0;
      this.deviceStartNum = 0;
      this.deviceBackNum = 0;
      this.deviceSuperviseNum = 0;
      this.deviceShieldNum = 0;
      this.deviceFire = false;
      this.deviceeError = false;
      this.deviceStart = false;
      this.deviceBack = false;
      this.deviceSupervise = false;
      this.deviceShield = false;
    },
    resetHost() {
      this.hostFire = false;
      this.hostError = false;
      this.hostEle = false;
      this.hostOffline = false;
    }
  },
  watch: {
    buildingid() {
      if (this.buildingid) {
        this.getHost();
        this.getDeviceStatu();
      }
    },
    hostid() {
      if (this.hostid) {
        this.getHostStatu();
      } else {
        this.resetHost();
      }
    }
  },
  computed: {
    ...mapGetters(['buildingid'])
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  color: #fff;
}
.content header {
  text-align: center;
  padding: 10px 0;
}
.el-col-12 {
  height: 100%;
}
.el-col-12:nth-child(1) {
  border-right: 2px solid #0e568e;
}
table {
  width: 100%;
  height: 100%;
  border-spacing:0px 5px;
}
td {
  text-align: center;
}
.device-statu {
  border: 1px solid #0e568e;
  background: #1B2830;
}
tbody tr td:nth-child(2) {
  color: rgb(37, 225, 226);
}
.fire {
  border-color: red !important;
  background: #3a0d12 !important;
}
.error {
  border-color: #EFEC3A !important;
  background: #4F5225 !important;
}
.green {
  border-color: #00A026 !important;
  background: #02441E !important;
}
.grey {
  border-color: #353435 !important;
  background: rgba(134, 134, 134, 0.4) !important;
}
.title {
  padding-left: 20px;
  height: 34px;
  line-height: 34px;
}
.el-select {
  width: 40%;
  float: right;
}
.flex2 {
  -webkit-box-flex: 2;
  -webkit-flex: 2;
  -ms-flex: 2;
  flex: 2;
}
.box {
  width: 70%;
  height: 70%;
  margin: 0 auto;
  border: 1px solid #0e568e;
  background: #1B2830;
}
</style>
