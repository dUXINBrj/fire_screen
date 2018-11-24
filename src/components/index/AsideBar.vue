<template>
  <div id="aside-bar" class="flex-cloumn animated" @mouseleave="hideAsideAction(true)" :class="{fadeInLeft:!hideAsideBar,fadeOutLeft:hideAsideBar}">
    <div class="close">
      <i class="iconfont icon-jiantou1"></i>
    </div>
    <div class="flex1">
      <el-col :span="12">
        <AsideIcon title="首页" url="/index/dashboard">
          <img :src="icon1" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="重点单位" url="/index/level1map?buildType=1">
          <img :src="icon2" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex1">
      <el-col :span="12">
        <AsideIcon title="一般单位" url="/index/level1map?buildType=2">
          <img :src="icon3" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="微型消防站" url="/index/level1map?buildType=3">
          <img :src="icon4" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex1">
      <el-col :span="12">
        <AsideIcon title="网络化管理">
          <img :src="icon5" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="建筑消防设施" url="/index/buildingFireDevice">
          <img :src="icon6" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex1">
      <el-col :span="12">
        <AsideIcon title="FAS系统">
          <img :src="icon7" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="警情管理" url="/index/warnings">
          <img :src="icon8" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex1">
      <el-col :span="12">
        <AsideIcon title="车联网">
          <img :src="icon9" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="宝船网">
          <img :src="icon10" width="70%">
        </AsideIcon>
      </el-col>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import AsideIcon from '../common/AsideIcon';
import img1 from '../../assets/img/home.png';
import img2 from '../../assets/img/important-unit.png';
import img3 from '../../assets/img/normal-unit.png';
import img4 from '../../assets/img/micro-fire.png';
import img5 from '../../assets/img/internet.png';
import img6 from '../../assets/img/building-fire.png';
import img7 from '../../assets/img/FAS.png';
import img8 from '../../assets/img/warnings.png';
import img9 from '../../assets/img/car.png';
import img10 from '../../assets/img/boat.png';

export default {
  data() {
    return {
      icon1: img1,
      icon2: img2,
      icon3: img3,
      icon4: img4,
      icon5: img5,
      icon6: img6,
      icon7: img7,
      icon8: img8,
      icon9: img9,
      icon10: img10
    };
  },
  components: {
    AsideIcon
  },
  methods: {
    ...mapActions(['hideAsideAction'])
  },
  computed: {
    ...mapGetters(['hideAsideBar'])
  }
};
</script>

<style scoped>
.el-col {
  height: 100%;
}
#aside-bar {
  position: absolute;
  left: 0;
  top: 60px;
  height: 85%;
  background: rgba(3, 17, 26, 0.6);
  border: 1px solid #0e568e;
  border-left: none;
  z-index: 99;
  border-top-right-radius:3px;
  border-bottom-right-radius:3px;
}
.close {
  position: absolute;
  right: -5px;
  top: 50%;
  color: #0e568e;
}
.close .iconfont {
  font-size: 20px !important;
}
</style>
