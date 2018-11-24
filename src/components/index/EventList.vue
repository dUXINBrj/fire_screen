<template>
  <div id="Event-list" class="flex-cloumn">
    <Title word="警情管理">
      <div @click='getMore'>更多+</div>
    </Title>
    <div class="flex1">
      <table class="event-table">
        <thead>
          <tr>
            <th>单位</th>
            <th>系统状态</th>
            <th>回路号</th>
            <th>时间</th>
            <!-- <th v-if="handle">处理</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in eventList" :key="index">
            <td>{{item.buildingname}}</td>
            <td :style="status(item.status)">{{item.status}}</td>
            <td>{{item.returnaddress}}</td>
            <td>{{item.casebegintime | time}}</td>
            <!-- <td v-if="handle" :style="dealStatu(item)" @click="deal(item)">{{item | dealStatu}}</td> -->
          </tr>
        </tbody>
      </table>
      <p class="no-data" v-if="eventList.length == 0">暂无数据</p>
    </div>
    <el-dialog
      :append-to-body="true"
      title="处理火警"
      :visible.sync="dealFireWin"
      width="30%">
      <p style="text-align: center">
        <el-radio v-model="isrealfire" label="1">实警</el-radio>
        <el-radio v-model="isrealfire" label="0">误报</el-radio>
      </p>
      <p><i class="red">*</i>说明(300字以内)：</p>
      <p>
        <el-input
          type="textarea"
          :rows="4"
          :maxlength=300
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDealFire">提 交</el-button>
        <el-button @click="closeDealFireWin">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      title="详细信息"
      :visible.sync="detailDialog"
      width="70%">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="火警编号:">
              <span>{{detailData.devicefirecaseid}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="火警类别:">
              <span>{{detailData.firecasetype | firecasetype}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="发生时间:">
              <span>{{detailData.casebegintime | time}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="处理时间:">
              <span>{{detailData.casedealwithtime | time}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="处理状态:">
              <span>{{detailData.firecasestatus | firecasestatus}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="处理人:">
              <span>{{detailData.dealwithusername}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="上报状态:">
              <span>{{detailData.firerealtimestatus | firerealtimestatus}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="模式:">
              <span>{{detailData.isteststatus | isteststatus}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="所属建筑:">
              <span>{{detailData.buildingname}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="装置编码:">
              <span>{{detailData.host_code}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="子系统编码:">
              <span>{{detailData.subsystem_code}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="设备编码:">
              <span>{{detailData.devicecode}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="子系统类型:">
              <span>{{detailData.devicetype_name}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="设备类别:">
              <span>{{detailData.devicesubtype_name}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="设备名称:">
              <span>{{detailData.devicename}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="社会单位:">
              <span>{{detailData.userorgname}}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-position="left" inline class="tableDetailItem">
            <el-form-item label="服务单位:">
              <span>{{detailData.fireserviceorgname}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-form label-position="left" inline class="tableDetailItem">
        <el-form-item label="备注:">
          <span>{{detailData.firedesc}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Title from '../common/Title';
import {mapGetters} from 'vuex';
export default {
  props: ['handle'],
  components: {
    Title
  },
  data() {
    return {
      eventList: [],
      dealFireWin: false,
      detailDialog: false,
      detailData: {},
      isrealfire: '1',
      dealFireCaseId: '',
      textarea: ''
    };
  },
  mounted() {
    this.getEventList();
    Event.$on('websocketFireOn', function () {
      this.getEventList();
    }.bind(this));
  },
  beforeDestroy: function () {
    Event.$off('websocketFireOn');
  },
  filters: {
    dealStatu(item) {
      let str = '';
      if (item.status === '火警') {
        switch (item.dealwith) {
          case 0: str = '处理'; break;
          case 1: str = '已处理'; break;
          default: break;
        }
      } else if (item.status === '火灾') {
        str = '查看';
      } else {
        switch (item.dealwith) {
          case 0: str = '未处理'; break;
          case 1: str = '已处理'; break;
          default: break;
        }
      }
      return str;
    },
    firecasestatus(val) {
      if (val === 0) {
        return '已完成';
      } else if (val === 2) {
        return '待处理';
      } else if (val === 3) {
        return '待关闭';
      }
    },
    firerealtimestatus(statu) {
      if (statu === 0) {
        return '已恢复';
      } else if (statu === 2) {
        return '未恢复';
      }
    },
    isteststatus(statu) {
      if (statu === 0) {
        return '监管模式';
      } else if (statu === 1) {
        return '测试模式';
      }
    },
    firecasetype(statu) {
      if (statu === 1) {
        return '设备火警';
      } else if (statu === 3) {
        return '手动火警(用户信息传输装置)';
      } else if (statu === 2) {
        return '手动火警(子系统)';
      }
    }
  },
  methods: {
    getEventList() {
      let params = {};
      if (!this.handle) {
        params.buildingid = this.buildingid;
      }
      this.$request({
        url: this.$api.getEventList.url,
        method: this.$api.getEventList.method
      }, params).then(res => {
        if (res.data.stringReturn && res.data.stringReturn.success) {
          this.eventList = res.data.stringReturn.reObject;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    status(status) {
      let color = '';
      switch (status) {
        case '火灾': color = '#BD0404'; break;
        case '火警': color = '#950505'; break;
        case '隐患': color = '#F6A937'; break;
        case '故障': color = '#FCD667'; break;
        default: break;
      };
      return {
        color: color
      };
    },
    dealStatu(item) {
      let color = '';
      let cursor = '';
      if (item.status === '火灾') {
        switch (item.dealwith) {
          case 0: color = '#11a7cf'; cursor = 'pointer'; break;
          case 1: color = '#09e2c7'; cursor = 'default'; break;
          default: break;
        };
      } else if (item.status === '火警') {
        color = '#11a7cf';
        cursor = 'pointer';
      } else {
        color = '#09e2c7';
        cursor = 'default';
      }
      return {
        color: color,
        cursor: cursor
      };
    },
    closeDealFireWin() {
      this.dealFireWin = false;
      this.isrealfire = '1';
      this.dealFireCaseId = '';
      this.textarea = '';
    },
    submitDealFire() {
      if (!this.textarea) {
        this.$message({
          message: '处理说明不允许为空！',
          type: 'warning'
        });
        return false;
      }
      // 1--实警  2--误报
      // 1--处理  2--关闭
      let params = {
        operate: 1,
        devicefirecaseid: this.dealFireCaseId,
        isrealfire: this.isrealfire,
        firedesc: this.textarea
      };
      this.$request({
        url: this.$api.dealFire.url,
        method: this.$api.dealFire.method
      }, params).then(res => {
        if (res.data.stringReturn.success) {
          this.$message({
            message: '处理成功！',
            type: 'success'
          });
          this.dealFireWin = false;
          this.isrealfire = '1';
          this.dealFireCaseId = '';
          this.textarea = '';
        }
      }).catch(err => {
        console.log(err);
      });
    },
    deal(data) {
      if (data.status === '火警' && data.dealwith === 0) {
        this.dealFireCaseId = data.firecaseid;
        this.dealFireWin = true;
      }
      if (data.status === '火灾') {
        this.dealFireCaseId = data.firecaseid;
        this.getFireDetail();
      }
    },
    getFireDetail() {
      let params = {
        firecaseid: this.dealFireCaseId,
        limit: 10,
        start: 0
      };
      this.$request({
        url: this.$api.findFirePage.url,
        method: this.$api.findFirePage.method
      }, params).then(res => {
        if (res.data.WSListReturn.success && res.data.WSListReturn.root.length) {
          this.detailData = res.data.WSListReturn.root[0];
          this.detailDialog = true;
        } else {
          this.$message({
            message: '未查询到该火警信息',
            type: 'warning'
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getMore () {
      let mainUrl = this.$common.getUrl();
      window.location.replace(mainUrl + this.$api.redirect.url + '#' + '/index/warnings');
    }
  },
  watch: {
    buildingid() {
      if (!this.handle) {
        this.getEventList();
      }
    }
  },
  computed: {
    ...mapGetters(['buildingid'])
  }
};
</script>
<style scoped>
#Event-list {
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.red{
  font-style: normal;
  color: red;
}
.event-table {
  width: 100%;
  color: #fff;
}
td {
  text-align: center;
}
table {
  border-collapse: collapse;
}
th, td {
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  border: none;
}
thead tr {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 0;
  height: 30px;
}
tr:nth-child(2n) {
  background: rgba(255, 255, 255, 0.2);
}
.no-data {
  text-align: center;
  padding: 20px 0;
  color: #fff;
}
</style>
