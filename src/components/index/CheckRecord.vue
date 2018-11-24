<template>
<div>
  <el-dialog
    :append-to-body="true"
    title="查岗记录"
    :visible.sync="showDialog"
    width="70%"
    @open="dialogOpen"
    @close="closeDialog">
    <HostInfo :hostinfo="hostinfo"></HostInfo>
    <el-row :gutter="10">
      <el-col :span="12">
        &nbsp;
      </el-col>
      <el-col :span="12">
        <el-tooltip class="item" effect="dark" content="请选择日期" placement="bottom">
          <el-date-picker
            style="float: right;"
            v-model="CheckTime"
            type="datetimerange"
            unlink-panels
            :editable=false
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="search">
          </el-date-picker>
        </el-tooltip>
      </el-col>
    </el-row>
      <el-table
        :data="tableData"
        height="196"
        border
        stripe
        v-loading="isloading"
        style="width: 100%">
        <el-table-column
          :formatter="time"
          label="查岗时间"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="查岗发起用户"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          :formatter="checkReult"
          label="查岗结果"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="视频记录"
          width="100">
          <template slot-scope="scope">
            <el-button v-show="scope.row.cameracode!=null && scope.row.issuccess==1" type="text" @click="checkVideo_Replay(scope.row)" size="small">视频</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchData.currentPageNow"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchData.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </el-dialog>
</div>
</template>
<script>
import HostInfo from './recordHostInfo.vue';
export default {
  props: ['hostcode'],
  created() {
    Event.$on('openCheckRecord', function (val) {
      this.showDialog = true;
    }.bind(this));
  },
  beforeDestroy: function () {
    Event.$off('openCheckRecord');
  },
  components: {
    HostInfo
  },
  data() {
    return {
      showDialog: false,
      hostinfo: {},
      tableData: [],
      searchData: {
        hostcode: '',
        starttime: '',
        endtime: '',
        currentPageNow: 1,
        start: 0,
        limit: 10,
        plantype: 1
      },
      total: 0,
      CheckTime: null,
      isloading: false
    };
  },
  methods: {
    dialogOpen() {
      this.search();
      this.getHostInfo();
    },
    search() {
      if (this.CheckTime === null) {
        this.searchData.starttime = '';
        this.searchData.endtime = '';
      } else {
        let startTime = new Date(Number(this.CheckTime[0])).format('yyyy-MM-dd hh:mm:ss');
        let endTime = new Date(Number(this.CheckTime[1])).format('yyyy-MM-dd hh:mm:ss');
        this.searchData.starttime = startTime;
        this.searchData.endtime = endTime;
      }
      this.searchData.start = this.searchData.limit * (this.searchData.currentPageNow - 1);
      this.searchData.hostcode = this.hostcode;
      this.$request({
        url: this.$api.getCheckRecord.url,
        method: this.$api.getCheckRecord.method
      }, this.searchData).then(res => {
        if (res.data.WSListReturn && res.data.WSListReturn.success) {
          let root = res.data.WSListReturn.root;
          this.total = res.data.WSListReturn.totalProperty;
          this.tableData = root;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getHostInfo() {
      let params = {
        hostcode: this.hostcode,
        start: 0,
        limit: 20
      };
      this.$request({
        url: this.$api.getHostInfo.url,
        method: this.$api.getHostInfo.method
      }, params).then(res => {
        if (res.data.WSListReturn && res.data.WSListReturn.success) {
          if (res.data.WSListReturn.root.length) {
            this.hostinfo = res.data.WSListReturn.root[0];
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    time(val) {
      let newDate = new Date(val.checkmantime);
      let d = newDate.format('yyyy-MM-dd hh:mm:ss');
      return d;
    },
    checkReult(val) {
      let statu = val.issuccess * 1;
      if (statu === 1) {
        return '成功';
      } else if (statu === 2) {
        return '失败';
      } else {
        return '';
      }
    },
    closeDialog() {
      this.searchData.starttime = '';
      this.searchData.endtime = '';
      this.searchData.start = 0;
      this.searchData.currentPageNow = 1;
      this.CheckTime = null;
      this.total = 0;
      this.tableData = [];
    },
    handleSizeChange(val) {
      this.searchData.limit = val;
      if (this.searchData.currentPageNow * 1 === 1) {
        this.search();
      } else {
        this.searchData.currentPageNow = 1;
      }
    },
    handleCurrentChange(val) {
      this.searchData.currentPageNow = val;
      this.search();
    },
    checkVideo_Replay(data) {
      var browers = window.myBrowser();
      if (browers !== 'IE') {
        window.showNoticeErr('请使用IE浏览器进行视频');
        return false;
      }
      this.showDialog = false;
      let cameraCode = data.cameracode;
      let startTime = window.getTime(data.videobegintime);
      let endTime = window.getTime(data.videoendtime);
      let params = {
        startTime,
        endTime,
        cameraCode
      };
      Event.$emit('fireVideoReplay', params);
    }
  }
};
</script>
<style scoped>
  .el-pagination{
    text-align: center;
  }
  .el-table{
    margin-top: 10px;
  }
</style>
