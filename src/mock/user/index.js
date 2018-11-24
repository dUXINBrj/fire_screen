import ApiPath from '@/api';

const Mock = require('mockjs');

Mock.mock(ApiPath.getUserInfo.url, ApiPath.getUserInfo.method, {
  'retCode': 0,
  'responseDate': {
    'name': 'duxin'
  },
  'retMessage': 'success'
});
