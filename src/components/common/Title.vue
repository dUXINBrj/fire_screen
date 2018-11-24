<template>
  <div id="subTitle" :style="style">
    <TitleLine></TitleLine>
    {{word}}
    <div class="slot" :style="style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import TitleLine from './TitleLine';
export default{
  props: ['word', 'height'],
  components: {
    TitleLine
  },
  data () {
    return {
      style: {
        height: '20px',
        lineHeight: '20px'
      }
    };
  },
  watch: {
    height() {
      if (this.height) {
        this.style.height = this.height;
        this.style.lineHeight = this.height;
      } else {
        this.style.height = '20px';
        this.style.lineHeight = '20px';
      }
    }
  }
};
</script>
<style scoped>
#subTitle {
  font-size: 14px !important;
  position: relative;
  padding-top: 7px;
  padding-bottom: 7px;
  color: #fff;
  text-align: left;
}
.slot {
  float: right;
  cursor: pointer;
  color: #11a7cf;
}
.line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
