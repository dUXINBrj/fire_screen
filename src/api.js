const serviceModule = {
  getUserInfo: {
    url: '/getUserInfo',
    method: 'post'
  },
  getWelcomeText: {
    url: '/user/findSystemConfig.json',
    method: 'post'
  },
  saveWelcomeText: {
    url: '/user/modSystemConfig.json',
    method: 'post'
  },
  getFireWarningLine: {
    url: '/devicefirecase/countFIreCaseAndWarningCase.json',
    method: 'post'
  },
  getBuildingInfo: {
    url: '/building/getallbuildinginfo.json',
    method: 'post'
  },
  getBuildingDetail: {
    url: '/building/buildingDetail.json',
    method: 'post'
  },
  getBuildingCount: {
    url: '/building/buildingCount.json',
    method: 'post'
  },
  getCheckRecord: {
    url: '/checkmanlog/findCheckManLogByPage.json',
    method: 'post'
  },
  getStatisticsDatae: {
    url: '/ondutyPersonnelInfo/findErrorAndOndutyCount.json',
    method: 'post'
  },
  getUnitList: {
    url: '/building/getBuildingNode.json',
    method: 'post'
  },
  getEventList: {
    url: '/devicefirecase/findFireOrWarnOrErrorCase.json',
    method: 'post'
  },
  findFirePage: {
    url: '/devicefirecase/finddevicefirecasepage.json',
    method: 'post'
  },
  getFireDevice: {
    url: '/ondutyPersonnelInfo/findOndutyOrWaterOrFirestationCount.json',
    method: 'post'
  },
  getDeviceSmoke: {
    url: '/device/findDeviceByBuildingAndSmokeFeeling.json',
    method: 'post'
  },
  getHostInfo: {
    url: '/host/findfirehostinfo.json',
    method: 'post'
  },
  getHost: {
    url: '/host/findfirehostbybuilding.json',
    method: 'post'
  },
  getHostStatu: {
    url: '/host/findFireHostStatus.json',
    method: 'post'
  },
  getDeviceStatu: {
    url: '/device/findDeviceStatusAndCount.json',
    method: 'post'
  },
  getDeviceByBuildingAndSubType: {
    url: '/device/findDeviceByBuildingIdAndDeviceSubTypeId.json',
    method: 'post'
  },
  getDeviceBizValue: {
    url: '/device/findLatestedBizValueByDeviceCode.json',
    method: 'post'
  },
  getCameraCode: {
    url: '/camera/findBigScreenRelationCameraByBuilding.json',
    method: 'post'
  },
  checkHost: {
    url: '/checkmanlog/checkman.json',
    method: 'post'
  },
  redirect: {
    url: '/user/bigScreenToDisplayPlatform.do',
    method: 'post'
  }
};

const ApiSetting = {...serviceModule};

export default ApiSetting;
