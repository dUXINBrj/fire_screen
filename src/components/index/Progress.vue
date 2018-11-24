<template>
  <div id="progress" class="flex-cloumn">
    <div class="title">消防设施</div>
    <div class="flex1">
      <div class="title">消防站总数</div>
      <div class="flex">
        <div class="flex1">
          <el-progress :percentage="fire" color="#4ebc0d" :show-text="false"></el-progress>
        </div>
        <div class="progress-text green">{{data.fireCount}}</div>
      </div>
    </div>
    <div class="flex1">
      <div class="title">值班人数</div>
      <div class="flex">
        <div class="flex1">
          <el-progress :percentage="person" color="#11aad3" :show-text="false"></el-progress>
        </div>
        <div class="progress-text blue">{{data.personCount}}</div>
      </div>
    </div>
    <div class="flex1">
      <div class="title">水源总数</div>
      <div class="flex">
        <div class="flex1">
          <el-progress :percentage="water" color="#09e2c7" :show-text="false"></el-progress>
        </div>
        <div class="progress-text blue2">{{data.waterCount}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    max() {
      let max = Math.max(this.data.waterCount, this.data.fireCount, this.data.personCount);
      return max || 1;
    },
    water() {
      return (this.data.waterCount / this.max) * 100;
    },
    fire() {
      return (this.data.fireCount / this.max) * 100;
    },
    person() {
      return (this.data.personCount / this.max) * 100;
    }
  }
};
</script>

<style scoped>
#progress {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #fff
}
.title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: left;
}
.progress-text {
  width:35px;
  font-size:16px;
  padding-left: 10px;
}
.el-progress {
  margin-top:8px;
}
.green {
  color: #4ebc0d;
}
.blue {
  color: #11aad3;
}
.blue2 {
  color: #09e2c7;
}
</style>
