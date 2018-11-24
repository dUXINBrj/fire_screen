<template>
  <div id="building-smoke-list" class="flex-cloumn">
    <header>独立试探</header>
    <div class="flex1">
      <table class="list-table">
        <thead>
          <tr>
            <th>设备</th>
            <th>楼宇</th>
            <th>楼层</th>
            <th>状态</th>
            <th>数值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="index">
            <td>{{item.devicename}}</td>
            <td>{{item.house_name}}</td>
            <td>{{item.floor_name}}</td>
            <td :style="status(item.status)">{{item.status}}</td>
            <td>{{item.lastested_bizvalue}}</td>
          </tr>
        </tbody>
      </table>
      <p class="no-data" v-if="listData.length == 0">暂无数据</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      listData: []
    };
  },
  methods: {
    getList() {
      let parmas = {
        buildingid: this.buildingid
      };
      this.$request({
        url: this.$api.getDeviceSmoke.url,
        method: this.$api.getDeviceSmoke.method
      }, parmas).then(res => {
        if (res.data.WSListReturn && res.data.WSListReturn.success) {
          this.listData = res.data.WSListReturn.object;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    status(status) {
      let color = '';
      switch (status) {
        case '正常': color = '#4CBD0D'; break;
        case '火灾': color = '#BD0404'; break;
        case '火警': color = '#950505'; break;
        case '隐患': color = '#F6A937'; break;
        case '故障': color = '#FCD667'; break;
        default: break;
      };
      return {
        color: color
      };
    }
  },
  computed: {
    ...mapGetters(['buildingid'])
  },
  watch: {
    buildingid() {
      this.getList();
    }
  }
};
</script>

<style scoped>
#building-smoke-list {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
}
header {
  text-align: center;
  padding-bottom: 20px;
}
.list-table {
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
  height: 25px;
}
tbody tr {
  height: 25px;
}
tr:nth-child(2n) {
  background: rgba(255, 255, 255, 0.2);
}
.no-data {
  text-align: center;
  padding: 20px 0;
}
</style>
