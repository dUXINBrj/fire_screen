<template>
  <div class="content flex-cloumn">
    <div class="flex1">
      <div class="box" ref='mychart'></div>
    </div>
    <div class="title" v-if='showTitle'>剩余电流</div>
  </div>
</template>
<script>
const echarts = require('echarts/lib/echarts');
// 引入仪表图组件
require('echarts/lib/chart/gauge');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  props: ['showTitle', 'unit', 'data'],
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
  data() {
    return {
      echart: '',
      timer: true
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
    opt() {
      let option = {
        backgroundColor: '#03111a',
        tooltip: {
          // formatter: '{a} <br/>{c} {b}'
          formatter: '{c}' + this.unit
        },
        toolbox: {
          show: false
        },
        series: [{
          name: '量值',
          type: 'gauge',
          min: this.data.min,
          max: this.data.max,
          splitNumber: 5,
          radius: '90%',
          axisLine: {// 坐标轴线
            lineStyle: {// 属性lineStyle控制线条样式
              color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
              width: 3,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          axisLabel: {// 坐标轴小标记
            textStyle: {// 属性lineStyle控制线条样式
              fontWeight: 'bolder',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          axisTick: {// 坐标轴小标记
            length: 15, // 属性length控制线长
            lineStyle: {// 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          splitLine: {// 分隔线
            length: 25, // 属性length控制线长
            lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          pointer: {// 分隔线
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5
          },
          title: {
            textStyle: {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            offsetCenter: [0, '50%'], // x, y，单位px
            textStyle: {
              fontWeight: 'bolder',
              color: 'rgba(37, 225, 226)',
              fontSize: '14px'
            },
            formatter: this.data.num + this.unit
          },
          data: [{value: this.data.num}]
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
.content {
  width: 100%;
  height: 100%;
}
.title {
  height: 30px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: rgba(37, 225, 226);
}
.box {
  height: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
