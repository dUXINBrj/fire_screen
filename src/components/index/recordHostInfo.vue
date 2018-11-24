<template>
  <div class="hostInfo">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="主机类型:">
            <span>{{hostinfo.hosttype | hostType}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="主机编码:">
            <span>{{hostinfo.hostcode}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="主机名称:">
            <span>{{hostinfo.hostname}}</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="社会单位:">
            <span>{{hostinfo.userorgname}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="所属建筑:">
            <span>{{hostinfo.building_name}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="在线状态:">
            <span>{{hostinfo.onlinestatus | onlinestatus}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form label-position="left" inline class="tableDetailItem">
          <el-form-item label="有效状态:">
            <span>{{hostinfo.status | status}}</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['hostinfo'],
  filters: {
    hostType(val) {
      let statu = val * 1;
      if (statu === 1) {
        return '智能协议转换器';
      } else if (statu === 2) {
        return '用户信息传输装置';
      } else {
        return '';
      }
    },
    status(val) {
      let statu = val * 1;
      if (statu === 1) {
        return '启用';
      } else if (statu === 2) {
        return '禁用';
      } else {
        return '';
      }
    },
    onlinestatus(val) {
      let statu = val * 1;
      if (statu === 0) {
        return '离线';
      } else if (statu === 1) {
        return '在线';
      } else {
        return '';
      }
    }
  }
};
</script>
<style scoped>
  .hostInfo{
    width: 100%;
    height: 90px;
  }
</style>
