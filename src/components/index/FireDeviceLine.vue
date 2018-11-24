<template>
  <div id="FireDeviceLine" class="flex-cloumn">
    <div class="title">消防设施巡查</div>
    <div id="lineContainer" ref="mychart" class="flex1"></div>
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
          trigger: 'axis',
          formatter: '{a0}: {c0}' + '%'
        },
        legend: {
          show: false
        },
        grid: {
          left: '0',
          right: '4%',
          bottom: '2%',
          top: '4%',
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
          data: ['1', '2', '3', '4', '5', '6月']
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
            show: true,
            textStyle: {
              color: '#fff'
            },
            interval: 'auto',
            formatter: '{value} %'
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '成功率',
          type: 'line',
          symbol: 'none',
          smooth: true,
          stack: '总量',
          color: 'rgba(41,255,255,1)',
          itemStyle: {
            normal: {
              label: {
                show: false
              }
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(41,255,255,1)'
              }, {
                offset: 1,
                color: 'rgba(41,255,255,0)'
              }])
            }
          },
          data: [70, 50, 80, 75, 90, 95]
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
#FireDeviceLine {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #fff;
}
.title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: left;
}
</style>
