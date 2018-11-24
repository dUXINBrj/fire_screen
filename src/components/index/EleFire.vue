<template>
  <div class="container flex-cloumn" id="ele-fire">
    <header>电气火灾监控系统
      <el-select v-model="hostcode" size="mini">
        <el-option
          v-for="item in hostOption"
          :key="item.hostcode"
          :label="item.hostname"
          :value="item.hostcode">
        </el-option>
      </el-select>
    </header>
    <div class="flex1">
      <el-col :span="10">
        <EchartsDash
        unit='mA'
        :data='dashData'
        :showTitle='true'>
        </EchartsDash>
      </el-col>
      <el-col :span="14">
        <Thermometer :data='thermometerData'></Thermometer>
      </el-col>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import Title from '../common/Title';
import EchartsDash from '../common/EchartsDash';
import Thermometer from '../common/Thermometer';
export default {
  components: {
    Title,
    EchartsDash,
    Thermometer
  },
  data() {
    return {
      hostcode: '',
      hostOption: [],
      dashData: {
        min: 0,
        max: 0,
        num: 0
      },
      thermometerData: {
        min: 0,
        max: 0,
        num: 0
      }
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
          this.hostcode = res.data.WSListReturn.root[0].hostcode;
        } else {
          this.hostOption = [];
          this.hostcode = '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getData() {
      let params = {
        hostcode: this.hostcode
      };
      this.$request({
        url: this.$api.getDeviceBizValue.url,
        method: this.$api.getDeviceBizValue.method
      }, params).then(res => {
        if (res.data.stringReturn.success && res.data.stringReturn.reObject.length) {
          this.dashData.max = res.data.stringReturn.reObject[0].attributemaxval;
          this.dashData.min = res.data.stringReturn.reObject[0].attributeminval;
          this.dashData.num = res.data.stringReturn.reObject[0].bizvalue;
          this.thermometerData.max = res.data.stringReturn.reObject[1].attributemaxval;
          this.thermometerData.min = res.data.stringReturn.reObject[1].attributeminval;
          this.thermometerData.num = res.data.stringReturn.reObject[1].bizvalue;
        } else {
          this.reset();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    reset() {
      this.dashData.max = 0;
      this.dashData.min = 0;
      this.dashData.num = 0;
      this.thermometerData.max = 0;
      this.thermometerData.min = 0;
      this.thermometerData.num = 0;
    }
  },
  watch: {
    buildingid() {
      if (this.buildingid) {
        this.getHost();
      }
    },
    hostcode() {
      if (this.hostcode) {
        this.getData();
      } else {
        this.reset();
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
  padding: 10px 0;
  position: relative;
}
.el-col-10 {
  height: 100%;
}
.el-col-14 {
  height: 100%;
}
#ele-fire .el-select {
  width: 30%;
  float: right;
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
