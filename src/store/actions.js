import * as types from './types';
export default {
  hideAside: ({commit, state}) => {
    commit(types.HIDEASIDE);
  },
  hideAsideAction: ({commit, state}, status) => {
    commit(types.HIDEASIDEBAR, status);
  },
  setBuildingId: ({commit, state}, id) => {
    commit(types.SETBUILDINGID, id);
  },
  setBuildingName: ({commit, state}, name) => {
    commit(types.SETBUILDINGNAME, name);
  },
  setBuildingType: ({commit, state}, type) => {
    commit(types.SETBUILDINGTYPE, type);
  },
  setLinkBuildingType: ({commit, state}, type) => {
    commit(types.SETLINKBUILDINGTYPE, type);
  },
  setCameraCode: ({commit}, cameraCode) => {
    commit(types.SETCAMERACODE, cameraCode);
  },
  setVideoStatus: ({commit}, showVideo) => {
    commit(types.SETVIDEOSTATUS, showVideo);
  }
};
