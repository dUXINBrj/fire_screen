<template>
  <div id="EchatPie" class="flex-cloumn">
    <header>
      单位总数
    </header>
    <div class="flex1" ref="mychart"></div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/pie');
require('echarts/lib/component/markLine');
require('echarts/lib/component/legend');
export default {
  props: ['pieData'],
  data () {
    return {
      echart: '',
      timer: true
    };
  },
  mounted () {
    this.initCharts();
    const _this = this;
    window.onresize = () => {
      return (() => {
        if (_this.timer) {
          _this.timer = false;
          _this.echart.resize();
          setTimeout(() => {
            _this.timer = true;
          }, 300);
        };
      })();
    };
  },
  methods: {
    ...mapActions(['setBuildingType']),
    initCharts () {
      let dom = this.$refs.mychart;
      this.echart = echarts.init(dom);
      this.echart.setOption(this.opt);
      this.echart.on('click', data => {
        let type = data.name;
        let typeId = '';
        switch (type) {
          case '重点单位': typeId = '1'; break;
          case '一般单位': typeId = '2'; break;
          case '微型消防站': typeId = '3'; break;
          default: typeId = '0'; break;
        };
        if (this.buildingtype === typeId) {
          this.setBuildingType('0');
        } else {
          this.setBuildingType(typeId);
        }
      });
    }
  },
  computed: {
    ...mapGetters(['buildingtype']),
    opt () {
      let option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        color: ['#f5bc2f', '#11aad3', '#4ebc0d'],
        calculable: true,
        series: {
          type: 'pie',
          radius: ['25%', '40%'],
          center: ['50%', '50%'],
          data: [
            {value: this.pieData.normal, name: '一般单位'},
            {value: this.pieData.important, name: '重点单位'},
            {value: this.pieData.fire, name: '微型消防站'}
          ],
          label: {
            normal: {
              formatter: ' {a|{b} }{c|{c}} ',
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 10,
                  lineHeight: 20,
                  align: 'center'
                },
                c: {
                  align: 'center',
                  fontWeight: 'bold',
                  fontSize: 16
                }
              }
            }
          }
        }
      };
      return option;
    }
  },
  watch: {
    opt: {
      handler (options) {
        this.echart.setOption(options);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
#EchatPie {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
header {
  text-align: left;
  color: #fff;
}
</style>
