import * as types from './types';
import getters from './getters';
const state = {
  hideAside: false,
  asideWidth: '200px',
  hideAsideBar: true,
  buildingid: '',
  buildingname: '',
  buildingtype: '0',
  linkBuildingType: '',
  fireStatus: false,
  cameraCode: '123',
  showVideo: false
};

const mutations = {
  [types.HIDEASIDE] (state) {
    state.hideAside = !state.hideAside;
    if (state.hideAside) {
      state.asideWidth = '64px';
    } else {
      state.asideWidth = '200px';
    }
  },
  [types.HIDEASIDEBAR] (state, status) {
    state.hideAsideBar = status;
  },
  [types.SETBUILDINGID] (state, id) {
    state.buildingid = id;
  },
  [types.SETBUILDINGNAME] (state, name) {
    state.buildingname = name;
  },
  [types.SETBUILDINGTYPE] (state, type) {
    state.buildingtype = type;
  },
  [types.SETLINKBUILDINGTYPE] (state, type) {
    state.linkBuildingType = type;
  },
  [types.SETCAMERACODE] (state, cameraCode) {
    state.cameraCode = cameraCode;
  },
  [types.SETVIDEOSTATUS] (state, showVideo) {
    state.showVideo = showVideo;
  }
};

export default {
  state,
  mutations,
  getters
};
