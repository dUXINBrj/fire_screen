<template>
  <div id="unit-list" class="flex-cloumn">
    <Title word="单位列表" height="25px"></Title>
      <div class="flex1 list-container">
        <vue-scroll :ops="scrollOps">
          <UnitListItem
          @click='changeSel'
          v-for="(item,index) in unitList"
          :key="index"
          :unitId="item.id"
          :unitName="item.text"
          :buildingType="item.buildingtype"
          :fire="item.fire"
          :selected="item.id == buildingid">
          {{item.text}}
          </UnitListItem>
          <div v-if="!unitList.length" class="no-data">暂无数据</div>
        </vue-scroll>
      </div>
      <div class="search-container">
        <input type="text" class="search" placeholder="查找单位" v-model="searchVal">
        <i class="iconfont icon-chazhao" @click="getUnitList"></i>
      </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import Title from '../common/Title';
import UnitListItem from '../common/UnitListItem';
export default {
  components: {
    Title,
    UnitListItem
  },
  mounted() {
    this.getUnitList();
    Event.$on('findUnit', function (buildingname) {
      this.searchVal = buildingname;
      this.findUnit();
    }.bind(this));
  },
  beforeDestroy: function () {
    Event.$off('findUnit');
  },
  data () {
    return {
      unitList: [],
      scrollOps: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'number',
          scrollingX: false
        },
        bar: {
          vBar: {
            background: '#b9b9b9',
            keepShow: true,
            opacity: 0.5,
            hover: '#efefef'
          },
          hBar: {
            background: '#b9b9b9',
            keepShow: true,
            opacity: 0.5,
            hover: '#efefef'
          }
        }
      },
      searchVal: ''
    };
  },
  methods: {
    ...mapActions(['setBuildingId', 'setBuildingName', 'setLinkBuildingType']),
    getUnitList() {
      let buildingType = 1;
      if (this.searchVal) {
        buildingType = 0;
      }
      let params = {
        buildingtype: buildingType,
        buildingname: this.searchVal
      };
      this.$request({
        url: this.$api.getUnitList.url,
        method: this.$api.getUnitList.method
      }, params).then(res => {
        if (res.data.treeNodeList.length) {
          // 设置初始化选中的单位
          this.setBuildingId(res.data.treeNodeList[0].id);
          let list = [];
          res.data.treeNodeList.forEach((item, index) => {
            list.push(item);
            let treeObj = JSON.parse(list[index].text);
            for (let i in treeObj) {
              list[index].text = i;
              list[index].fire = treeObj[i].fireCount;
              list[index].error = treeObj[i].errorCount;
              list[index].warn = treeObj[i].warningCount;
              list[index].offline = treeObj[i].offlineCount;
              list[index].handlerFireStatus = treeObj[i].handlerFireStatus;
              list[index].errorCaseStatus = treeObj[i].errorCaseStatus;
            }
          });
          this.setBuildingName(list[0].text);
          this.setLinkBuildingType(list[0].buildingtype);
          this.unitList = list;
        } else {
          this.unitList = [];
        }
      }).catch(err => {
        console.log(err);
      });
    },
    findUnit() { // 用于查看发生火警的单位 查找出来的结果不用默认选中
      let params = {
        buildingtype: 0,
        buildingname: this.searchVal
      };
      this.$request({
        url: this.$api.getUnitList.url,
        method: this.$api.getUnitList.method
      }, params).then(res => {
        if (res.data.treeNodeList.length) {
          let list = [];
          res.data.treeNodeList.forEach((item, index) => {
            list.push(item);
            let treeObj = JSON.parse(list[index].text);
            for (let i in treeObj) {
              list[index].text = i;
              list[index].fire = treeObj[i].fireCount;
              list[index].error = treeObj[i].errorCount;
              list[index].warn = treeObj[i].warningCount;
              list[index].offline = treeObj[i].offlineCount;
              list[index].handlerFireStatus = treeObj[i].handlerFireStatus;
              list[index].errorCaseStatus = treeObj[i].errorCaseStatus;
            }
          });
          this.unitList = list;
        } else {
          this.unitList = [];
        }
      }).catch(err => {
        console.log(err);
      });
    },
    changeSel(unitInfo) {
      if (this.showVideo) {
        window.showNoticeWarn('正在视频通讯中');
        return false;
      }
      this.setBuildingId(unitInfo.id);
      this.setBuildingName(unitInfo.name);
      this.setLinkBuildingType(unitInfo.buildingType);
    }
  },
  computed: {
    ...mapGetters(['buildingid', 'showVideo'])
  }
};
</script>
<style scoped>
#unit-list {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #fff;
}
/* .list-container {
  overflow-y: auto;
} */
#unit-list .el-col-12:nth-child(2n-1) {
  padding-right: 3px;
}
#unit-list .el-col-12:nth-child(2n) {
  padding-left: 3px;
}
.no-data {
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.more {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.iconfont {
  font-size: 12px;
  color: #0e568e;
  cursor: pointer;
}
.search-container {
  width: 100%;
  height: 25px;
  text-align: center;
  padding: 10px 0;
}
.search {
  width: 60%;
  height: 25px;
  padding: 0 10px;
  border: 1px solid #11aad3;
  border-radius: 10px;
  background-color: transparent;
  color: #fff;
  outline:none;
}
.icon-chazhao {
  color: #11aad3;
  font-size: 24px;
  vertical-align: bottom;
  display: inline-block;
}
</style>
