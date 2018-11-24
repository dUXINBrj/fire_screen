<template>
  <div id="index-container">
    <div class="aside-container" @mouseover="hideAsideAction(false)"  v-show="hideAsideBar">
      <div class="showAside">
        <i class="iconfont icon-shouqi_m"></i>
      </div>
    </div>
    <AsideBar></AsideBar>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-container>
          <el-header height="45px">
            <TitleLine></TitleLine>
            上海市崇明区“消防雪亮工程”综合管理系统一期
            <TitleLine></TitleLine>
            <div class="loginOut">
              <el-dropdown trigger="click" @command="handleCommand">
                <div class="el-dropdown-link">
                  <span class="username">欢迎，{{username}}</span>
                  <!-- <img class="header-icon" src="../assets/img/img.gif"> -->
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="loginout"><i class="iconfont icon-tuichudenglu"></i> 退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="7">
                <el-row type="flex" class="flexbox">
                  <div>
                    <Statistics :countData="StatisticsData"></Statistics>
                  </div>
                  <div>
                    <EchartLine :lineData="fireWarningLineData"></EchartLine>
                  </div>
                  <div>
                    <EchartPie :pieData="unitCountPieData"></EchartPie>
                  </div>
                  <div>
                    <EventList :handle="true"></EventList>
                  </div>
                </el-row>
              </el-col>
              <el-col :span="17">
                <div class="map-container">
                  <Map></Map>
                </div>
                <div class="map-container2 flex">
                  <div class="line-top">
                    <TitleLine></TitleLine>
                  </div>
                  <div>
                    <Progress :data="fireDeviceProgressData"></Progress>
                  </div>
                  <div>
                    <FireDeviceBar :data="fireDeviceBarData"></FireDeviceBar>
                  </div>
                  <div>
                    <FireDeviceLine></FireDeviceLine>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="12">
        <el-header height="45px" class="welcome-title">
          <TitleLine></TitleLine>
          <div class="welcome-text" @dblclick="editWelcomeWord = true" v-show="!editWelcomeWord">{{welcomeWord}}</div>
          <input type="text" v-focus="editWelcomeWord" v-show="editWelcomeWord" v-model="welcomeWord" @blur="saveWelcomeWord" class="title-word-input">
          <TitleLine></TitleLine>
        </el-header>
        <el-main>
          <el-row type="flex" class="right-container">
            <div class="flex flex1">
              <div style="height:50%;z-index:19;" class="unit-list">
                <UnitList></UnitList>
              </div>
              <div style="height:50%">
                <UnitListLink></UnitListLink>
              </div>
            </div>
            <div class="flex flex1">
              <div class="flex1">
                <BuildingInfo></BuildingInfo>
              </div>
              <div class="flex1">
                <Video></Video>
              </div>
              <div class="flex1">
                <InspectInfo></InspectInfo>
              </div>
            </div>
            <div class="flex flex1">
              <div class="flex1">
                <FireWater></FireWater>
              </div>
              <div class="flex1">
                <EleFire></EleFire>
              </div>
              <div class="flex1">
                <FireSysStatus></FireSysStatus>
              </div>
            </div>
          </el-row>
        </el-main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import TitleLine from '../common/TitleLine';
import AsideBar from './AsideBar';
import Statistics from './Statistics';
import EchartLine from './EchartLine';
import EchartPie from './EchartPie';
import EventList from './EventList';
import Map from './Map';
import Progress from './Progress';
import FireDeviceLine from './FireDeviceLine';
import UnitList from './UnitList';
import FireDeviceBar from './FireDeviceBar';
import BuildingSmokeList from './BuildingSmokeList';
import UnitListLink from './UnitListLink';
import BuildingInfo from './BuildingInfo';
import InspectInfo from './InspectInfo';
import FireWater from './FireWater';
import EleFire from './EleFire';
import FireSysStatus from './FireSysStatus';
import Video from './Video.vue';
export default {
  components: {
    TitleLine,
    AsideBar,
    Statistics,
    EchartLine,
    EchartPie,
    EventList,
    Map,
    Progress,
    FireDeviceLine,
    UnitList,
    FireDeviceBar,
    BuildingSmokeList,
    UnitListLink,
    BuildingInfo,
    InspectInfo,
    FireWater,
    EleFire,
    FireSysStatus,
    Video
  },
  data() {
    return {
      welcomeWord: '',
      editWelcomeWord: false,
      fireWarningLineData: {
        months: [],
        fire: [],
        warning: []
      },
      unitCountPieData: {
        important: 0,
        normal: 0,
        fire: 0
      },
      StatisticsData: {
        errorNotDealCount: '',
        errorTotalCount: '',
        fireConfirmNotDealCount: '',
        fireConfirmTotalCount: '',
        fireNotDealCount: '',
        fireTotalCount: '',
        ondutyCount: '',
        operationCount: '',
        warnNotDealCount: '',
        warnTotalCount: ''
      },
      unitListData: [],
      fireDeviceProgressData: {
        waterCount: 0,
        fireCount: 0,
        personCount: 0
      },
      fireDeviceBarData: {
        fireOnline: 0,
        waterOnline: 0,
        fireOffline: 0,
        waterOffline: 0,
        waterWarning: 0,
        waterError: 0
      }
    };
  },
  mounted() {
    // TODO 增加websocket推送 增加共用方法
    Event.$on('dashboardFire', function (val) {
      this.showNotify(val.data, val.startTime, val.isVideo);
    }.bind(this));
    // 收到推送修改当前建筑
    Event.$on('changeBuildingId', function (data) {
      this.setBuildingId(data.buildingid);
      this.setBuildingName(data.buildingName);
      this.setLinkBuildingType(data.buildingtype);
    }.bind(this));
    // 收到火警推送刷新数据
    Event.$on('websocketFireOn', function () {
      this.getStatisticsDatae();
      this.getFireWarningLine();
    }.bind(this));
    this.getWelcomeWord();
    this.getStatisticsDatae();
    this.getFireWarningLine();
    this.getBUildingCountPie();
    this.getFireDevice();
  },
  beforeDestroy: function () {
    Event.$off('dashboardFire');
    Event.$off('changeBuildingId');
    Event.$off('websocketFireOn');
  },
  methods: {
    ...mapActions(['hideAsideAction', 'setBuildingId', 'setBuildingName', 'setLinkBuildingType']),
    handleCommand(command) {
      if (command === 'loginout') {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // eslint-disable-next-line
          window.location.replace(window.loginOut);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    showNotify(data, startTime, isVideo) {
      let houseName = data.housename || '';
      let floorName = data.floorname || '';
      this.$notify({
        title: '火警报警',
        position: 'bottom-right',
        dangerouslyUseHTMLString: true,
        duration: 0,
        onClose: function () {
          window.stopTitleTwinkle();
        },
        customClass: 'notifyClass',
        message: `<div class="notify-content flex align-center">${data.buildingName} ${houseName} ${floorName}发生火警<div class="notify-fire-detail" onclick='fireDetai(${JSON.stringify(data)}, ${startTime}, ${isVideo}, this)'>查看详情</div></div>`
      });
    },
    getWelcomeWord() {
      let params = {
        configid: 7
      };
      this.$request({
        url: this.$api.getWelcomeText.url,
        method: this.$api.getWelcomeText.method
      }, params).then(res => {
        if (res.data.stringReturn.success) {
          this.welcomeWord = res.data.stringReturn.reObject;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    saveWelcomeWord() {
      this.editWelcomeWord = false;
      let params = {
        configid: 7,
        systemvalue: this.welcomeWord
      };
      this.$request({
        url: this.$api.saveWelcomeText.url,
        method: this.$api.saveWelcomeText.method
      }, params).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    getFireWarningLine() {
      this.$request({
        url: this.$api.getFireWarningLine.url,
        method: this.$api.getFireWarningLine.method
      }, '').then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.fireWarningLineData.months = res.data.stringReturn.reObject.months;
          this.fireWarningLineData.fire = res.data.stringReturn.reObject.fireMonthCount;
          this.fireWarningLineData.warning = res.data.stringReturn.reObject.warningMonthCount;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getBUildingCountPie() {
      this.$request({
        url: this.$api.getBuildingCount.url,
        method: this.$api.getBuildingCount.method
      }, '').then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.unitCountPieData.important = res.data.stringReturn.reObject.keyUnit;
          this.unitCountPieData.normal = res.data.stringReturn.reObject.normalUnit;
          this.unitCountPieData.fire = res.data.stringReturn.reObject.miniatureFireStationCount;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getStatisticsDatae() {
      this.$request({
        url: this.$api.getStatisticsDatae.url,
        method: this.$api.getStatisticsDatae.method
      }, '').then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.StatisticsData.errorNotDealCount = res.data.stringReturn.reObject.errorNotDealCount;
          this.StatisticsData.errorTotalCount = res.data.stringReturn.reObject.errorTotalCount;
          this.StatisticsData.fireConfirmNotDealCount = res.data.stringReturn.reObject.fireConfirmNotDealCount;
          this.StatisticsData.fireConfirmTotalCount = res.data.stringReturn.reObject.fireConfirmTotalCount;
          this.StatisticsData.fireNotDealCount = res.data.stringReturn.reObject.fireNotDealCount;
          this.StatisticsData.fireTotalCount = res.data.stringReturn.reObject.fireTotalCount;
          this.StatisticsData.ondutyCount = res.data.stringReturn.reObject.ondutyCount;
          this.StatisticsData.operationCount = res.data.stringReturn.reObject.operationCount;
          this.StatisticsData.warnNotDealCount = res.data.stringReturn.reObject.warnNotDealCount;
          this.StatisticsData.warnTotalCount = res.data.stringReturn.reObject.warnTotalCount;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getFireDevice() {
      this.$request({
        url: this.$api.getFireDevice.url,
        method: this.$api.getFireDevice.method
      }, '').then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.fireDeviceProgressData.waterCount = res.data.stringReturn.reObject.waterCount;
          this.fireDeviceProgressData.fireCount = res.data.stringReturn.reObject.firestationCount;
          this.fireDeviceProgressData.personCount = res.data.stringReturn.reObject.ondutyPersonnelCount;

          this.fireDeviceBarData.fireOnline = res.data.stringReturn.reObject.fireStationOnlineCount;
          this.fireDeviceBarData.waterOnline = res.data.stringReturn.reObject.waterOnlineCount;
          this.fireDeviceBarData.fireOffline = res.data.stringReturn.reObject.fireStationOfflineCount;
          this.fireDeviceBarData.waterOffline = res.data.stringReturn.reObject.waterOfflineCount;
          this.fireDeviceBarData.waterWarning = res.data.stringReturn.reObject.waterWarningCount;
          this.fireDeviceBarData.waterError = res.data.stringReturn.reObject.waterErrorCount;
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters(['hideAsideBar']),
    username() {
      // eslint-disable-next-line
      let username = window.userName;
      // eslint-disable-next-line
      return username ? username : '';
    }
  }
};
</script>

<style scoped>
.el-dropdown{
    color: #efefef;
    height: 40px;
    float: right;
  }
  .el-dropdown-link{
    height: 40px;
    cursor: pointer;
  }
.loginOut {
  position: absolute;
  right: 20px;
  top: 9px;
  width: 150px;
  height: 40px;
  font-size: 12px;
}
#index-container{
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: #03111a;
}
.showAside {
  position: absolute;
  left: -5px;
  top: 50%;
  z-index: 999;
}
.aside-container {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 10px;
  width: 20px;
  z-index: 999;
}
.showAside .iconfont {
  font-size: 20px !important;
  color: #0e568e;
}
.welcome-title {
  color: #bc0404 !important;
}
.welcome-text {
  width: 100%;
  height: 100%;
}
.el-row, .el-col {
  height: 100%;
}
.el-col {
  position: relative;
}
.el-header {
  color: #fff;
  line-height: 45px;
  text-align: center;
  font-size: 24px;
  position: relative;
  padding: 0;
}
.el-main {
  padding: 0;
  position: absolute;
  top: 65px;
  bottom: 0;
  left: 10px;
  right: 10px;
}
.flexbox {
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-direction: column;
}
.flexbox>div {
  flex: 1;
}
.flexbox>div:nth-child(2) {
  padding: 5px 0;
}
.flexbox>div:nth-child(3) {
  padding-bottom: 5px;
}
.map-container {
  width: 100%;
  height: 69%;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.flex1 {
  flex: 1;
}
.map-container2 {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 30%;
  position: relative;
  padding: 8px 5px 0 5px;
}
.map-container2>div{
  flex: 1;
}
.map-container2>div:nth-child(2) {
  padding: 0 5px;
}
.right-container>div {
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-box-direction: column;
}
.right-container>div>div:nth-child(2) {
  margin-right: 5px;
}
.right-container>div:nth-child(2) {
  margin: 0 5px;
}
.right-container>div:nth-child(3) {
  margin-left: 5px;
}
.line-top {
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  height: 5px;
}
.unit-list {
  height: 33.3333333%;
  z-index: 19;
}
.title-word-input {
  color: red;
  text-align: center;
  font-size: 20px;
  position: absolute;
  width: 100%;
  left: 0;
  top: 9px;
  height: 90%;
}
</style>
