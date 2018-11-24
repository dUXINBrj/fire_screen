<template>
  <div id="EchatLine" class="flex-cloumn">
    <header>
      <span class="fire">火警</span>
      按月曲线图
      <span class="warning">隐患</span>
      </header>
    <div id="lineContainer" class="flex1" ref="mychart"></div>
  </div>
</template>
<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/line');
require('echarts/lib/component/markLine');
require('echarts/lib/component/legend');
export default {
  props: ['lineData'],
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
    initCharts () {
      let dom = this.$refs.mychart;
      this.echart = echarts.init(dom);
      this.echart.setOption(this.opt);
    }
  },
  computed: {
    opt () {
      let option = {
        title: {
          text: '折线图堆叠',
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        grid: {
          left: '10px',
          right: '15px',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#0e568e'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              width: '1',
              color: {
                colorStops: [{
                  offset: 0, color: '#0ae2c7'
                }, {
                  offset: 1, color: '#082a31'
                }]
              }
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          data: this.lineData.months
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              width: '1',
              color: {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#0ae2c7'
                }, {
                  offset: 1, color: '#082a31'
                }]
              }
            }
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          name: ' 火警',
          type: 'line',
          stack: '火警',
          color: 'red',
          data: this.lineData.fire
        },
        {
          name: '隐患',
          type: 'line',
          stack: '隐患',
          color: '#f6a937',
          data: this.lineData.warning
        }]
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
#EchatLine {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
header {
  text-align: center;
  color: #fff;
}
.fire {
  border-bottom: 2px solid red;
  float: left;
}
.warning {
  border-bottom: 2px solid #f6a937;
  float: right;
}
</style>
