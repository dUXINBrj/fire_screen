<template>
  <div class="flex-cloumn">
    <div class="blank"></div>
    <div class="flex1">
      <div class="line">
        <div class="circle" :style="styleObj">
          <span class="num">{{data.num}}m</span>
        </div>
      </div>
    </div>
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    styleObj() {
      if (this.data.min === 0 && this.data.max === 0) {
        return {
          top: '50%'
        };
      }
      let _num = this.data.num < this.data.min ? this.data.min : this.data.num;
      _num = _num > this.data.max ? this.data.max : _num;
      if (this.data.min === _num) {
        return {
          bottom: '0'
        };
      }
      if (this.data.max === _num) {
        return {
          top: '50%'
        };
      }
      let length = this.data.max - this.data.min;
      let value = this.data.num - this.data.min;
      let percent = (value / length) * 100;
      return {
        bottom: percent + '%'
      };
    }
  }
};
</script>

<style scoped>
.blank {
  clear: both;
  width: 100%;
  height: 15px;
}
.line {
  position: relative;
  width: 4px;
  height: 100%;
  margin: 0 auto;
  border-radius: 5px;
  background: -webkit-linear-gradient(right, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -o-linear-gradient(left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -moz-linear-gradient(left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: linear-gradient(to left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
}
.circle {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  left: -6px;
  background: -webkit-linear-gradient(right, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -o-linear-gradient(left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: -moz-linear-gradient(left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
  background: linear-gradient(to left, rgba(22, 129, 130, 0.8), rgba(37, 225, 226, 0.8));
}
.title {
  width: 100%;
  text-align: center;
  padding-top: 10px;
  color:rgba(37, 225, 226);
}
.num {
  position: absolute;
  left: -30px;
  top: 0;
  color:rgba(37, 225, 226);
}
</style>
