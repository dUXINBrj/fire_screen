<template>
  <div class="container flex-cloumn">
    <div class="flex33">
      <el-col :span="12">
        <AsideIcon title="单位地图" :url="'/index/level2map/' + buildingid + '/' + buildingname + '/' + linkBuildingType + '/house'">
          <img :src="icon1" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="警情管理" :url="'/index/warnings'">
          <img :src="icon2" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex33">
      <el-col :span="12">
        <AsideIcon title="智慧巡查" :url="'/index/equipment'">
          <img :src="icon3" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="查岗巡检" :url="'/index/inspect'">
          <img :src="icon4" width="70%">
        </AsideIcon>
      </el-col>
    </div>
    <div class="flex33">
      <el-col :span="12">
        <AsideIcon title="建筑消防设施" :url="'/index/buildingFireDevice'">
          <img :src="icon5" width="70%">
        </AsideIcon>
      </el-col>
      <el-col :span="12">
        <AsideIcon title="统计报表" :url="'/index/report/fireCaseYearReport'">
          <img :src="icon6" width="70%">
        </AsideIcon>
      </el-col>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import img1 from '../../assets/img/map.png';
import img2 from '../../assets/img/fire-manage.png';
import img3 from '../../assets/img/equipment.png';
import img4 from '../../assets/img/inspect.png';
import img5 from '../../assets/img/device-fire.png';
import img6 from '../../assets/img/report.png';
import AsideIcon from '../common/AsideIcon';
export default {
  data() {
    return {
      icon1: img1,
      icon2: img2,
      icon3: img3,
      icon4: img4,
      icon5: img5,
      icon6: img6
    };
  },
  components: {
    AsideIcon
  },
  computed: {
    ...mapGetters(['buildingid', 'buildingname', 'linkBuildingType'])
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.el-col {
  height: 100%;
}
.flex33 {
  height: 33.33333%;
}
</style>
