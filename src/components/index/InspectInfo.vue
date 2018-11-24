<template>
  <div class="container flex-cloumn">
    <Title word="智慧巡查管理系统" height="35px">+</Title>
    <div class="flex1">
      <el-col :span="12">
        <div class="container flex-cloumn inspect-info">
          <div class="flex1">下次巡检时间</div>
          <div class="flex1">20169</div>
          <div class="flex1">历史巡查完好率</div>
          <div class="flex1">123</div>
          <div class="flex1">历史巡查完成率</div>
          <div class="flex1">2132</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="container flex-cloumn">
          <div class="flex1 flex-cloumn">
            <div>上次巡查结果</div>
            <div class="flex1">
              <el-col :span="18">
                <div>
                  <p class="title">巡查日期</p>
                  <p>2018-11-03</p>
                </div>
                <div>
                  <p class="title">负责人</p>
                  <p>xxx</p>
                </div>
              </el-col>
            </div>
          </div>
          <div class="flex1 grade flex">
            评级： <i>A</i>
          </div>
          <div class="flex1 flex-cloumn">
            <div class="flex1 flex">
              <div style="width:95px">巡查完成率</div>
              <div class="flex1">
                <el-progress :percentage="40" color="#4ebc0d" :show-text="true"></el-progress>
              </div>
            </div>
            <div class="flex1 flex">
              <div style="width:95px">设备完好率</div>
              <div class="flex1">
                <el-progress :percentage="50" color="#11aad3" :show-text="true"></el-progress>
              </div>
            </div>
            <div class="flex1 flex">
              <div style="width:95px">遗留问题设备</div><div class="flex1 num">10个</div>
            </div>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import Title from '../common/Title';
export default {
  components: {
    Title
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 14px;
}
.el-col {
  height: 100%;
}
.el-col-12:nth-child(1) {
  border-right: 2px solid #0e568e;
}
.inspect-info div:nth-child(2n) {
  text-align: right;
  color: #0ae2c7;
}
.inspect-info div:nth-child(2n-1) {
  text-align: left;
  color: #fff;
}
.flex1 .el-col-12:nth-child(1) {
  padding-right: 10px;
}
.flex1 .el-col-12:nth-child(2) {
  padding-left: 10px;
}
.el-col-18 div {
  display: inline-block;
  width: 48%;
}
.el-col-18 div p {
  text-align: center;
}
.title {
  background:#1B2B30;
}
.grade {
  font-size: 16px;
  align-items:center;
}
.grade i {
  font-size: 24px;
  color: green;
  font-style: normal;
}
.num {
  font-style: normal;
  color: #11aad3;
}
p {
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.container div {
  overflow :hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
