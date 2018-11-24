<template>
  <div class="container flex-cloumn" id="building-fire-device-statu">
    <Title word="建筑消防设施状态">
      <span @click='toLink'>+</span>
    </Title>
    <div class="flex1 flex-cloumn">
      <header>消防用水监控</header>
      <div class="flex1">
        <el-col :span="10">
          <div class="flex-cloumn">
              <el-select v-model="deviceDashCode" size="mini">
                <el-option
                  v-for="item in deviceOptionDash"
                  :key="item.devicecode"
                  :label="item.devicename"
                  :value="item.devicecode">
                </el-option>
              </el-select>
              <div class="flex1">
                <EchartsDash
                unit='Mpa'
                :data='dashData'
                ></EchartsDash>
              </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="flex-cloumn">
              <el-select v-model="deviceProgressCode" size="mini">
                <el-option
                  v-for="item in deviceOptionProgress"
                  :key="item.devicecode"
                  :label="item.devicename"
                  :value="item.devicecode">
                </el-option>
              </el-select>
              <div class="flex1 flex">
                <div class="flex1">
                  <VerticalProgress :data='progressData'>消防水箱</VerticalProgress>
                </div>
              </div>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Title from '../common/Title';
import EchartsDash from '../common/EchartsDash';
import VerticalProgress from '../common/VerticalProgress';
export default {
  components: {
    Title,
    EchartsDash,
    VerticalProgress
  },
  data() {
    return {
      deviceOptionDash: [],
      deviceDashCode: '',
      dashData: {
        min: 0,
        max: 0,
        num: 0
      },
      progressData: {
        min: 0,
        max: 0,
        num: 0
      },
      deviceOptionProgress: [],
      deviceProgressCode: ''
    };
  },
  methods: {
    toLink() {
      let mainUrl = this.$common.getUrl();
      window.location.replace(mainUrl + this.$api.redirect.url + '#' + '/index/buildingFireDevice');
    },
    getDeviceDash() {
      let type = '45,47,51';
      let params = {
        buildingid: this.buildingid,
        devicesubtypeids: type
      };
      this.$request({
        url: this.$api.getDeviceByBuildingAndSubType.url,
        method: this.$api.getDeviceByBuildingAndSubType.method
      }, params).then(res => {
        if (res.data.stringReturn.success && res.data.stringReturn.reObject.length) {
          this.deviceOptionDash = res.data.stringReturn.reObject;
          this.deviceDashCode = res.data.stringReturn.reObject[0].devicecode;
        } else {
          this.deviceOptionDash = [];
          this.deviceDashCode = '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getDeviceProgress() {
      let type = '46';
      let params = {
        buildingid: this.buildingid,
        devicesubtypeids: type
      };
      this.$request({
        url: this.$api.getDeviceByBuildingAndSubType.url,
        method: this.$api.getDeviceByBuildingAndSubType.method
      }, params).then(res => {
        if (res.data.stringReturn.success && res.data.stringReturn.reObject.length) {
          this.deviceOptionProgress = res.data.stringReturn.reObject;
          this.deviceProgressCode = res.data.stringReturn.reObject[0].devicecode;
        } else {
          this.deviceOptionProgress = [];
          this.deviceProgressCode = '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getDash() {
      let params = {
        devicecode: this.deviceDashCode
      };
      this.$request({
        url: this.$api.getDeviceBizValue.url,
        method: this.$api.getDeviceBizValue.method
      }, params).then(res => {
        if (res.data.stringReturn.success && res.data.stringReturn.reObject.length) {
          this.dashData.max = res.data.stringReturn.reObject[0].attributemaxval;
          this.dashData.min = res.data.stringReturn.reObject[0].attributeminval;
          this.dashData.num = res.data.stringReturn.reObject[0].bizvalue;
        } else {
          this.resetDash();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    resetDash() {
      this.dashData.max = 0;
      this.dashData.min = 0;
      this.dashData.num = 0;
    },
    getProgress() {
      let params = {
        devicecode: this.deviceProgressCode
      };
      this.$request({
        url: this.$api.getDeviceBizValue.url,
        method: this.$api.getDeviceBizValue.method
      }, params).then(res => {
        if (res.data.stringReturn.success && res.data.stringReturn.reObject.length) {
          this.progressData.min = res.data.stringReturn.reObject[0].attributeminval;
          this.progressData.max = res.data.stringReturn.reObject[0].attributemaxval;
          this.progressData.num = res.data.stringReturn.reObject[0].bizvalue;
        } else {
          this.resetProgressh();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    resetProgressh() {
      this.progressData.max = 0;
      this.progressData.min = 0;
      this.progressData.num = 0;
    }
  },
  watch: {
    buildingid() {
      if (this.buildingid) {
        this.getDeviceDash();
        this.getDeviceProgress();
      }
    },
    deviceDashCode() {
      if (this.deviceDashCode) {
        this.getDash();
      } else {
        this.resetDash();
      }
    },
    deviceProgressCode() {
      if (this.deviceProgressCode) {
        this.getProgress();
      } else {
        this.resetProgressh();
      }
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
  height: 100% !important;
  font-size: 14px;
  color: #fff;
}
header {
  text-align: center;
  padding-bottom: 10px;
}
.el-col-10 {
  height: 100%;
}
.el-col-14 {
  height: 100%;
}
.el-select {
  width: 80%;
  margin: 0 auto;
}
</style>
