<template>
<div class="content flex-cloumn">
    <div class="flex1">
      <div class="box-content">
        <div class="unit">°c</div>
        <div id="thermometer">
          <div class="container">
            <div class="box" :class="{redShadowBox: warn}">
              <div class="line-box">
                <div class="num-icon" :style="numIconStyle">
                  <p :class="{red: warn}">{{data.num}}</p>
                  <i class="iconfont icon-xuanze"></i>
                </div>
                <div class="line-long relative">
                  <div class="num">{{data.min}}</div>
                </div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-long"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-long"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-short"></div>
                <div class="line-long-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-long-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-long-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-short-red"></div>
                <div class="line-long-red relative">
                  <div class="num">{{data.max}}</div>
                </div>
              </div>
            </div>
            <div class="circle" :class="{redShadowCircle: warn}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">温 度</div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    numIconStyle() {
      if (this.data.min === 0 && this.data.max === 0) {
        return {
          right: '45%'
        };
      }
      let _num = this.data.num < this.data.min ? this.data.min : this.data.num;
      _num = _num > this.data.max ? this.data.max : _num;
      if (this.data.min === _num) {
        return {
          left: '-11px'
        };
      }
      if (this.data.max === _num) {
        return {
          right: '17px'
        };
      }
      let length = this.data.max - this.data.min;
      let value = this.data.num - this.data.min;
      let percent = (value / length) * 100;
      return {
        left: percent + '%'
      };
    },
    warn() {
      if (this.data.min === 0 && this.data.max === 0) {
        return false;
      }
      let num = (this.data.max - this.data.min) / 2;
      let value = this.data.num - this.data.min;
      if (value > num) {
        return true;
      } else {
        return false;
      }
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
.box-content {
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.unit {
  position: absolute;
  right: 20px;
  top: 20px;
  color: rgba(37, 225, 226);
  font-size: 16px;
}
#thermometer {
  display: inline-block;
  width: 236px;
  height: 31px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  bottom: 30px;
}
.container {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 30px;
}
.circle {
  z-index: 998;
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: -webkit-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -o-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -moz-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: linear-gradient(to top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
}
.box {
  z-index: 999;
  padding: 3px 0;
  width: 226px;
  height: 3px;
  border-radius: 5px;
  position: absolute;
  bottom: 5px;
  left: 9px;
  background: -webkit-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -o-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -moz-linear-gradient(top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: linear-gradient(to top, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
}
.line-box {
  width: 210px;
  height: 15px;
  position: absolute;
  left: 13px;
  top: -15px;
}
.line {
  background: #ff4439;
  width: 2px;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  bottom: 3px;
  left: 3px;
}
.line-long {
  display: inline-block;
  width: 2px;
  height: 15px;
  background: rgba(37, 225, 226, 1);
  margin-right: 1px;
}
.line-long-red {
  display: inline-block;
  width: 2px;
  height: 15px;
  background: red;
  margin-right: 1px;
}
.line-short {
  display: inline-block;
  width: 2px;
  height: 7px;
  background: rgba(37, 225, 226, 1);
  margin-right: 1px;
}
.line-short-red {
  display: inline-block;
  width: 2px;
  height: 7px;
  background: red;
  margin-right: 1px;
}
.relative {
  position: relative;
}
.num {
  position: absolute;
  color: rgba(37, 225, 226, 1);
  left: -3px;
  top: -15px;
}
.num-icon {
    position: absolute;
    width: 23px;
    top: -30px;
}
.num-icon p {
  text-align: center;
}
.icon-xuanze {
  color: rgba(37, 225, 226, 1);
  width: 100%;
  text-align: center;
  display: inline-block;
}
.redShadowBox {
  -webkit-box-shadow: inset 1px 1px 60px rgba(0, 0, 0, 0.1), 5px 0px 25px rgba(243, 9, 42, 0.9);
  box-shadow: inset 1px 1px 60px rgba(0, 0, 0, 0.1), 5px 0px 25px rgba(243, 9, 42, 0.9);
}
.redShadowCircle {
  -webkit-box-shadow: iinset 1px 1px 60px rgba(0, 0, 0, 0.1), 0 0 25px rgba(243, 9, 42, 0.9);
  box-shadow: inset 1px 1px 60px rgba(0, 0, 0, 0.1), 0 0 25px rgba(243, 9, 42, 0.9);
}
.red {
  color: red !important;
}
</style>
