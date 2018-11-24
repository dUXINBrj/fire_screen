<template>
  <div class="aside-icon display-box flex-cloumn" @click='redirect'>
    <div class="flex1 icon-container flex align-center" :class="{selected:selected}" ref="container" :style="width">
      <slot></slot>
    </div>
    <p class="aside-icon-title">{{title}}</p>
  </div>
</template>
<script>
// :url="'/index/warnings?buildingid=' + buildingid + '&buildingname=' + buildingname"
// 如果之后要求跳转到的页面查询对应单位的信息 接收的url应该如上
export default {
  props: ['title', 'selected', 'url'],
  data() {
    return {
      isMounted: false
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    redirect() {
      let mainUrl = this.$common.getUrl();
      window.location.replace(mainUrl + this.$api.redirect.url + '#' + this.url);
      // let parmas = {
      //   params: '#' + this.url
      // };
      // this.$request({
      //   url: this.$api.redirect.url,
      //   method: this.$api.redirect.method
      // }, parmas).then(res => {
      //   if (res.data.stringReturn && res.data.stringReturn.success) {
      //     this.eventList = res.data.stringReturn.reObject;
      //   }
      // }).catch(err => {
      //   console.log(err);
      // });
    }
  },
  computed: {
    width () {
      if (!this.isMounted) {
        return;
      }
      let styleObj = {};
      let width = this.$refs.container.offsetHeight - 2 + 'px';
      styleObj.width = width;
      return styleObj;
    }
  }
};
</script>

<style scoped>
.aside-icon {
  width: 100%;
  height: 100%;
  padding: 10px;
  cursor: pointer;
}
.display-box {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.aside-icon-title {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.icon-container {
  margin: 0 auto;
  border: 1px solid #11aad3;
  border-radius: 50%;
  background:rgba(10,109,138,0.7);
}
.selected {
  background:rgb(255, 255, 255,0);
}
</style>
