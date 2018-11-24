<template>
  <div id="map">
    <baidu-map class="bm-view"
      :dragging="true"
      :double-click-zoom="false"
      :center="mapCenter"
      :map-click="false"
      :zoom="11"
      :keyboard="false"
      :max-zoom="20"
      :min-zoom="10"
      :scroll-wheel-zoom="true"
      :pinch-to-zoom="false"
      @ready="handler">
        <div v-for="(val) in buildingData" :key="val.buildingid">
          <bm-marker
          v-if="buildingFilter(val.buildingtype)"
          :key="val.buildingid"
          :position="val.position"
          :dragging="false"
          :animation="val.animate"
          :icon="val.mapicon"
          @click="mapClick(val.buildingname, val.buildingid)">
          </bm-marker>
        </div>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-control>
        <div class="mapControlContainer display-box">
          <div class="map-control">
            <div class="map-control-icon">
              <img :src="carIcon">
            </div>
             车联网
           </div>
          <div class="map-control" @click='toLink("/index/boat")'>
            <div class="map-control-icon">
              <img :src="boatIcon">
            </div>
             宝船网
           </div>
          <div class="map-control" @click='toLink("/index/level1map")'>
            <div class="map-control-icon">
              <img :src="mapIcon">
            </div>
              地图
          </div>
          <div class="right-control">
            <img :src="fireStatus ? fireLighting : fireLight">
          </div>
        </div>
      </bm-control>
    </baidu-map>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import iconGreen from '../../assets/img/map-green.png';
import iconRed from '../../assets/img/map-red.png';
import iconOrange from '../../assets/img/map-orange.png';
import iconYellow from '../../assets/img/map-yellow.png';
import iconGrey from '../../assets/img/map-grey.png';
import iconMicroFireGreen from '../../assets/img/micro-fire-green.png';
import iconMicroFireRed from '../../assets/img/micro-fire-red.png';
import iconMicroFireOrange from '../../assets/img/micro-fire-orange.png';
import iconMicroFireYellow from '../../assets/img/micro-fire-yellow.png';
import iconMicroFireGrey from '../../assets/img/micro-fire-grey.png';
import carIcon from '../../assets/img/car.png';
import boatIcon from '../../assets/img/boat.png';
import mapIcon from '../../assets/img/map.png';
import fireLight from '../../assets/img/fire-light.png';
import fireLighting from '../../assets/img/fire-lighting.png';

export default {
  data() {
    return {
      BMap: '',
      map: '',
      iconGreen,
      iconRed,
      iconOrange,
      iconYellow,
      iconGrey,
      iconMicroFireGreen,
      iconMicroFireRed,
      iconMicroFireOrange,
      iconMicroFireYellow,
      iconMicroFireGrey,
      carIcon,
      boatIcon,
      mapIcon,
      fireLight,
      fireLighting,
      mapCenter: {
        lng: 0,
        lat: 0
      },
      buildingInfo: [],
      fireStatus: false
    };
  },
  mounted() {
    window.fireTimeout = null;
    Event.$on('websocketFireOn', function () {
      this.getBuildingInfo();
      window.fireTimeout = setInterval(() => {
        this.fireStatus = !this.fireStatus;
      }, 200);
    }.bind(this));
    Event.$on('websocketFireOff', function () {
      clearInterval(window.fireTimeout);
    });
  },
  beforeDestroy: function () {
    Event.$off('websocketFireOn');
    Event.$off('websocketFireOff');
  },
  methods: {
    toLink(url) {
      let mainUrl = this.$common.getUrl();
      window.location.replace(mainUrl + this.$api.redirect.url + '#' + url);
    },
    // 地图加载完的钩子函数
    handler({BMap, map}) {
      this.BMap = BMap;
      this.map = map;
      this.mapCenter.lng = 121.502351;
      this.mapCenter.lat = 31.682148;
      var mapStyle = {style: 'midnight'};
      map.setMapStyle(mapStyle);
      this.getBuildingInfo();
    },
    getBuildingInfo() {
      this.$request({
        url: this.$api.getBuildingInfo.url,
        method: this.$api.getBuildingInfo.method
      }, '').then(res => {
        if (res.data.WSListReturn.success) {
          if (res.data.WSListReturn.root.length === 0) {
            this.buildingInfo = [];
          } else {
            this.buildingInfo = res.data.WSListReturn.root[0];
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mapClick(name, id) {
      let mainUrl = this.$common.getUrl();
      window.location.replace(mainUrl + this.$api.redirect.url + '#' + '/index/level2map/' + id + '/' + name + '/house');
    },
    buildingFilter(type) {
      if (this.buildingtype === '0') {
        return true;
      }
      if (type * 1 === this.buildingtype * 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapGetters(['buildingtype']),
    buildingData() {
      let obj = {};
      obj = this.buildingInfo;
      if (!obj.length) {
        return false;
      }
      obj.forEach((val, index) => {
        let mapIcon = this.iconRed;
        let animate = '';
        // 区分出微型消防站 微型消防站buildingtype = 3
        if (val.buildingtype === 3) {
          switch (val.building_case_status) {
            case 2: mapIcon = this.iconMicroFireRed; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 4: mapIcon = this.iconMicroFireRed; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 0: if (val.online_status === 0) {
              mapIcon = this.iconMicroFireGrey;
              animate = 'BMAP_ANIMATION_BOUNCE';
            } else {
              mapIcon = this.iconMicroFireGreen;
              animate = '';
            };break;
            case 1: mapIcon = this.iconMicroFireYellow; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 3: mapIcon = this.iconMicroFireYellow; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 7: mapIcon = this.iconMicroFireOrange; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            default: break;
          }
        } else {
          switch (val.building_case_status) {
            case 2: mapIcon = this.iconRed; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 4: mapIcon = this.iconRed; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 0: if (val.online_status === 0) {
              mapIcon = this.iconGrey;
              animate = 'BMAP_ANIMATION_BOUNCE';
            } else {
              mapIcon = this.iconGreen;
              animate = '';
            };break;
            case 1: mapIcon = this.iconYellow; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 3: mapIcon = this.iconYellow; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            case 7: mapIcon = this.iconOrange; animate = 'BMAP_ANIMATION_BOUNCE'; break;
            default: break;
          }
        }
        val.animate = animate;
        val.mapicon = {
          url: mapIcon,
          size: {width: 32, height: 32}
        };
        val.position = {
          lng: val.gisx,
          lat: val.gisy
        };
      });
      return obj;
    }
  }
};
</script>

<style scoped>
#map {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
}
.bm-view{
  height: 100%;
  width: 100%;
}
.mapControlContainer {
  padding: 10px;
  width: 100%;
}
.map-control {
  color: #fff;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.map-control-icon {
  border: 1px solid #11aad3;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: inline-block;
}
.map-control-icon img, .right-control img{
  width: 100%;
  height: 100%;
}
.right-control {
  float: right;
  width: 40px;
  height: 40px;
  margin: -8px;
}
</style>
