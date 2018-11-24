<template>
  <div id="fire-device-bar" class="flex-cloumn" ref="mychart"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
require('echarts/lib/component/markLine');
require('echarts/lib/component/legend');
export default {
  props: ['data'],
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
        grid: {
          left: '0',
          right: '90px',
          bottom: '0',
          top: '20px'
          // containLabel: true
        },
        legend: {
          data: ['消防站在线', '水源在线', '消防站离线', '水源离线', '水源隐患', '水源故障'],
          orient: 'vertical',
          right: 0,
          textStyle: {
            color: '#999'
          }
        },
        xAxis: {
          show: false,
          splitLine: {
            show: false
          },
          type: 'category',
          // data: ['消防站', '水源', '消防站', '水源', '水源', '水源']
          data: ['消防站']
        },
        yAxis: {
          splitLine: {
            show: false
          },
          show: false,
          type: 'value'
        },
        series: [{
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '消防站在线',
          type: 'bar',
          data: [this.data.fireOnline],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#156172'
              }, {
                offset: 1,
                color: '#29FFFF'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        }, {
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '水源在线',
          type: 'bar',
          data: [this.data.waterOnline],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#177D4B'
              }, {
                offset: 1,
                color: '#28FF3F'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        }, {
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '消防站离线',
          type: 'bar',
          data: [this.data.fireOffline],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#333'
              }, {
                offset: 1,
                color: '#999'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        }, {
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '水源离线',
          type: 'bar',
          data: [this.data.waterOffline],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(2, 82, 8)'
              }, {
                offset: 1,
                color: '#999'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        }, {
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '水源隐患',
          type: 'bar',
          data: [this.data.waterWarning],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(234, 105, 13)'
              }, {
                offset: 1,
                color: 'rgb(247, 219, 117)'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
        }, {
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          name: '水源故障',
          type: 'bar',
          data: [this.data.waterError],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(224, 239, 9)'
              }, {
                offset: 1,
                color: 'rgb(247, 219, 117)'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            }
          }
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
#fire-device-bar {
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
