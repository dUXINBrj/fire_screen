<template>
  <div id="statistics" class="flex-cloumn">
    <Title word="统计"></Title>
    <div class="container">
      <el-row>
        <el-col :span="14">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>总数</th>
                <th>未处理</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img :src="fire1">火灾</td>
                <td>{{countData.fireConfirmTotalCount}}</td>
                <td>{{countData.fireConfirmNotDealCount}}</td>
              </tr>
              <tr>
                <td><img :src="fire2">火警</td>
                <td>{{countData.fireTotalCount}}</td>
                <td>{{countData.fireNotDealCount}}</td>
              </tr>
              <tr>
                <td><img :src="warning">隐患</td>
                <td>{{countData.warnTotalCount}}</td>
                <td>{{countData.warnNotDealCount}}</td>
              </tr>
              <tr>
                <td><img :src="error">故障</td>
                <td>{{countData.errorTotalCount}}</td>
                <td>{{countData.errorNotDealCount}}</td>
              </tr>
            </tbody>
          </table>
        </el-col>
        <el-col :span="10">
          <div style="width:100%;height:100%" class="flex-cloumn">
            <div class="flex1">人员</div>
            <div class="flex1"><i class="iconfont icon-renyuan"></i>值班<span>{{countData.ondutyCount}}</span></div>
            <div class="flex1"><i class="iconfont icon-weixiugongguanli"></i>维修<span>{{countData.operationCount}}</span></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import fire1 from '../../assets/img/fire1.png';
import fire2 from '../../assets/img/fire2.png';
import warning from '../../assets/img/warning.png';
import error from '../../assets/img/error.png';

import Title from '../common/Title';
export default{
  props: ['countData'],
  data() {
    return {
      fire1: fire1,
      fire2: fire2,
      warning: warning,
      error: error
    };
  },
  components: {
    Title
  }
};
</script>
<style scoped>
#statistics {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
#statistics .container {
  flex: 1;
}
.el-row {
  width: 100%;
  height: 100%;
}
.el-col {
  height: 100%;
}
table {
  width: 100%;
  height: 100%;
  font-size: 12px;
  table-layout:fixed;
  border-right: 1px solid #0e568e;
}
th, td {
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
tr th {
  color: #fff;
}
tr th:nth-child(1) {
  width: 40%;
}
tr th:nth-child(2) {
  width: 30%;
}
tr th:nth-child(3) {
  width: 30%;
}
tr td {
  text-align: center;
}
tr td:nth-child(1) {
  color: #fff;
}
tr td:nth-child(2) {
  color: #0ae2c7;
}
tr td:nth-child(3) {
  color: #0ae2c7;
}
.flex-cloumn div {
  text-align: center;
  color: #fff;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.flex1 span{
  color: #0ae2c7;
  padding-left: 8px;
}
.iconfont {
  color: #0ae2c7;
  padding-right: 2px;
}
.iconfont::after {
  content: '·';
}
td img {
  width: 18px;
  margin-right: 5px;
}
</style>
