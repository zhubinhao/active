import {Toast} from 'antd-mobile';
import Config from 'config';
const {checkbindApi,getopenidApi} = Config;

// 获取openid
const getOpenid = (openid,url) => {
  var current_url = encodeURIComponent(url);
  var redirect_uri = "https://mall.reedsec.com/public/service/wxuserinfo?domain="+current_url;
  if(openid == null || openid === "null"){
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx34ceafb24e932a3a&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    localStorage.setItem("leyuyuanOpenid",this.getUrlParam("leyuyuanOpenid"));
  }
}

const getCode = (url) => {
  var current_url = encodeURIComponent(url);
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx34ceafb24e932a3a&redirect_uri='+current_url+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
}


const bindCheck = (url) => {
  // 每次进入页面都要登录授权，拿到code调用接口获取openid，通过openid去验证该学生是否被绑定，没有绑定就去绑定页面，绑定过了就返回当前页面
    if(getUrlParam('code')){
      const code = getUrlParam('code');
      // 拿到code获取openid
      const openid_postData = {
        reg:'2018',
        accountname:'weixin',
        code:code
      }
  
      ajax({
        url: `${getopenidApi}/${JSON.stringify(openid_postData)}`,
        data: {},
        success: function(data) { //返回接受信息
          // 查看用户是否绑定
          const bind_postData = {
            reg:'2018',
            accountname:'weixin',
            openid:data.openid
          }
          const openid = data.openid;
          ajax({
            url: `${checkbindApi}/${JSON.stringify(bind_postData)}`,
            data: {},
            success: function(data) { //返回接受信息
              if(data.code != '0'){
                localStorage.setItem("leyuyuanOpenid",openid);
                window.location.href = window.location.origin + window.location.search + '#/';
              }else{
                // Toast.info('已绑定',1);
                const bindinfo = {
                  class:data.class,
                  school:data.school,
                  student_id:data.student,
                }
                localStorage.setItem('bindInfo',JSON.stringify(bindinfo));
              }
            },
            fail: function(data) {
  
            }
          })
        },
        fail: function(data) {
  
        }
      })
    }else{
      // getCode(url);
      console.log('去拿code');
    }
}

export default {
  getUrlParam,
  getOpenid,
  ajax,
  getCode,
  pathToBase64,
  bindCheck
}