/* eslint-disable */
window.getPath=function(){
  //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
  var curWwwPath=window.document.location.href;
  //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
  var pathName=window.document.location.pathname;
  var pos=curWwwPath.indexOf(pathName);
  //获取主机地址，如： http://localhost:8083
  var localhostPaht=curWwwPath.substring(0,pos);
  return(localhostPaht);
};
window.videoPlugin=getPath()+'/fireinforesilt/DPSDK_OCX_Win32andWin64.zip';
//Y-M-D格式时间转换为时间戳
function transdate(time){
    var date=new Date();
    date.setFullYear(time.substring(0,4));
    date.setMonth(time.substring(5,7)-1);
    date.setDate(time.substring(8,10));
    return Date.parse(date);
}
window.getTime=function (val) {
  var newDate=new Date(val);
  var d=newDate.format('yyyy-MM-dd hh:mm:ss');
  return d;
};
// 结束查岗视频
function CheckVideoEndTime(checkmanlogid) {
  $.ajax({
    url:'/fireinfo/checkmanlog/endVideoTalk.json',
    type:'post',
    dataType:'json',
    data:{
      checkmanlogid:checkmanlogid
    }
  })
}
//判断浏览器
window.myBrowser=function(){
  var userAgent = navigator.userAgent;
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1){
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (!!window.ActiveXObject || "ActiveXObject" in window){
    return "IE";
  }//判断是否IE浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  };
};
//消息通知
function showNotice(str) {
    vm.$msg({
      message: str,
      type: 'info'
    });
  }
function showNoticeErr(str) {
    vm.$message({
      message: str,
      type: 'error'
    });
}
function showNoticeWarn(str) {
    vm.$message({
      message: str,
      type: 'warning'
    });
}
function showNoticeSuccess(str) {
    vm.$mmessagesg({
      message: str,
      type: 'success'
    });
}
/********查看火警关闭声音*********/
window.titleInterval=null;
window.winBlur=false;
window.onfocus = function() {
    winBlur = false;
};
window.onblur = function() {
    winBlur = true;
};
window.stopTitleTwinkle=function () {
    document.getElementById("bgMusic").pause();
    clearInterval(titleInterval);
    document.title = '物联网信息采集系统';
};

/********收到火警播放声音*********/
window.titleTwinkle=function () {
    // var noticNum=document.getElementsByClassName('el-notification__closeBtn');
    // if(noticNum.length!=0){
    //   document.getElementsByClassName('el-notification__closeBtn')[0].click();
    // }
    titleInterval=setInterval(function() {
      var title = document.title;
      if(winBlur){
        if (/新/.test(title) == false) {
          document.title = '【有新火警信息】';
        } else {
          document.title = '【　　　　        】';
        }
      }else{
        document.title='消防雪亮工程综合管理系统';
      }
    }, 500);
    document.getElementById("bgMusic").play();
};
/**********火警弹窗***********/
window.addInfo=function(data,isVideo){
    var startTime;
    $.ajax({
        url:'/fireinfo/building/getCurrentTime.json',
        dataType:'json',
        async: false,
        type:'post',
        success:function (res) {
            var _tiem=res.stringReturn.reObject;
            var _getTime=_tiem.substr(5);
            startTime=transdate(_getTime);
        },
        error:function () {
            startTime=Number(new Date());
        }
    });
    // 使用eventbus打开弹窗
    Event.$emit('dashboardFire',{
        data: data,
        startTime: startTime,
        isVideo: isVideo
    })
}
/********************************dashboard视频处理*****************************************/
/*
* @params data 收到手报火警推送的数据 包含火警信息 摄像头信息等
* @params startTime 火警发生的时间 如果点击播放视频的时间超过startTime三分钟就改为播放录像
*/
function fireDetai(data, startTime, isVideo, e) {
    stopTitleTwinkle();
    Event.$emit('websocketFireOff');
    var el=document.getElementsByClassName('notify-fire-detail');
    console.log(el);
    var index='';
    for(var i=0;i<el.length;i++){//因为存在多个通知 所以要判断点的是哪个通知的按钮 element自带的close方法调用无效
      if(e==el[i]){
        index=i;
        break;
      }else{continue}
    }
    document.getElementsByClassName('el-notification__closeBtn')[index].click();
    if (isVideo) {
      openVideoDashBoard(data,startTime);
    } else {
      changeDashboardBuilding(data);
    }
}
function changeDashboardBuilding(data) {
    Event.$emit('findUnit',data.buildingName);
    Event.$emit('changeBuildingId',data);
};
function openVideoDashBoard(data,startTime) {
    changeDashboardBuilding(data);
    var browers=myBrowser();
    if(browers!='IE'){
      showNoticeErr('请使用IE浏览器进行视频');
      return false;
    }
    $.ajax({
      url:'/fireinfo/building/getCurrentTime.json',
      dataType:'json',
      type:'post',
      success:function (res) {
        var _tiem=res.stringReturn.reObject;
        var endTime=_tiem.substr(5);
        endTime=transdate(endTime);
        if(endTime-startTime>=60000){
          var videoStartTime=data.devicefirecase.videobegintime.time;
          videoStartTime=new Date(videoStartTime).format('yyyy-MM-dd hh:mm:ss');
          var videoEndTime=data.devicefirecase.videoendtime.time;
          videoEndTime=new Date(videoEndTime).format('yyyy-MM-dd hh:mm:ss');
          dashboardVideoReplay(data,videoStartTime,videoEndTime);
        }else{
          dashboardVideoLive(data);
        }
      },
      error:function () {
        var endTime=Number(new Date());
        if(endTime-startTime>=60000){
          startTime=new Date(startTime);
          startTime=startTime.format('yyyy-MM-dd hh:mm:ss');
          endTime=new Date(endTime+60000);
          endTime=endTime.format('yyyy-MM-dd hh:mm:ss');
          dashboardVideoReplay(data,startTime,endTime);
        }else{
          dashboardVideoLive(data);
        }
      }
    });
}
function videoStartTime(cameraCode,devicefirecaseid) {
    $.ajax({
      url:'/fireinfo/devicefirecase/startVideoTalk.json',
      dataType:'json',
      type:'post',
      data:{
        cameracode:cameraCode,
        devicefirecaseid:devicefirecaseid
      }
    })
}
function dashboardVideoLive(data) {
    Event.$emit('fireVideoLive', data);
    videoStartTime(data.camerainfo.cameracode, data.devicefirecaseid);
}

function dashboardVideoReplay(data,startTime,endTime) {
    var _data = {
        data: data,
        startTime: startTime,
        endTime: endTime
    }
    Event.$emit('fireVideoReplay', _data);
}
window.websocketInit=function() {
    if ('WebSocket' in window) {
      if (window.location.protocol == 'http:') {
        preUrl = 'ws://' + window.location.host + '/fireinfo/firewebsocket.ws';
      }else {
        preUrl = 'wss://' + window.location.host + '/fireinfo/firewebsocket.ws';
      }
      window.websocket_handlerfirecase = new WebSocket(preUrl);
    } else {
      alert('Not support websocket')
    }
  
    //连接成功建立的回调方法
    websocket_handlerfirecase.onopen = function(event) {
      websocket_handlerfirecase.send("settopic:big_screen_fire");
    };
    //接收到消息的回调方法
    websocket_handlerfirecase.onmessage = function(event) {
        var objData=JSON.parse(event.data);
        stopTitleTwinkle();
        titleTwinkle();
        Event.$emit('websocketFireOn');
        if(objData.camerainfo){
            addInfo(objData,true);
        }else{
            addInfo(objData,false);
        }
    };
};
window.onload=function () {
  websocketInit();
};