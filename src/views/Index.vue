<template>
  <div class="home">
    <h3>{{obj.title}}</h3>
    <div class="top">
      <div>
        <span>主办方：</span>
        {{obj.sponsor}}
      </div>
      <div>
        <span>活动时间：</span>
        {{obj.start}}-{{obj.end}}
      </div>
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item
        v-for="(item,index) in img"
        :key="index"
        class="swipe-item"
        :style="{backgroundImage: 'url(' + item + ')'}"
      ></mt-swipe-item>
    </mt-swipe>
    <div class="content">
      <p>活动内容</p>
      <pre>{{obj.rermark}}</pre>
    </div>
    <mt-button type="primary" class="primary" @click="nactveTo" v-if="wxopenid">预约</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: [],
      obj: {},
      subject: "",
      wxopenid: "",
      isYue:true
    };
  },
  mounted() {
    this.subject = this.$route.query.id || "";
    this.code = this.$route.query.code || "";
    this.getData();
    if (this.code) {
      this.getOpenid();
    } else {
      this.getCode();
    }
  },
  methods: {
    getOpenid(url) {
      const data = {
        reg: "2018",
        accountname: "weixin",
        code: this.code
      };
      this.axios.get(`WX_GetUserOpenID/${JSON.stringify(data)}`).then(_ => {
        this.wxopenid = _.openid;
        this.getIs()
      }).catch(_=>{
       this.getCode();
      });
    },
    getCode(url) {
      let current_url = encodeURIComponent(location.href);
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx34ceafb24e932a3a&redirect_uri=" +
        current_url +
        "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
    },
    getIs() {
      let data = {
        reg: "2018",
        accountname: "weixin",
        subject: this.subject,
        wxopenid: this.wxopenid
      };
      this.axios.get(`Subject_Check/${JSON.stringify(data)}`).then(_ => {
        this.isYue = false;
      });
    },
    nactveTo() {
      if(this.isYue){
         this.$toast("您已预约过了")
         return  
      }
      this.$router.push({
        path: "infor",
        query: {
          id: this.subject,
          title: this.obj.title,
          wxopenid: this.wxopenid || "121"
        }
      });
    },
    getData() {
      let data = {
        reg: "2018",
        accountname: "weixin",
        subject: this.subject
      };
      this.axios
        .get(`Subject_Read/${JSON.stringify(data)}`)
        .then(_ => {
          console.log(_.start2);
          console.log(_.end2);
          let arr = [];
          for (let i = 1; i <= 5; i++) {
            arr.push(_[`url${i}`]);
          }
          this.img = arr.filter(res => res);
          this.obj = _;
          document.title = _.title;
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  /deep/ .mint-swipe {
    height: 260px;
  }
  h3 {
    text-align: center;
    font-size: 0.6rem;
    font-weight: 500;
    margin: 0.3rem;
  }
  .top {
    font-size: 0.38rem;
    margin: 0.3rem;
    div {
      margin-bottom: 0.2rem;
      color: gray;
      span {
        color: black;
      }
    }
  }
  .swipe-item {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    height: 260px;
    width: 100%;
  }
  .content {
    margin: 0.6rem 0.3rem 0.3rem;
    border: 1px solid lightgray;
    padding: 0 0.3rem 0.3rem 0.3rem;
    p {
      text-align: center;
      font-size: 0.5rem;
      margin: 0.3rem;
    }
    pre {
      white-space: pre-wrap;
      font-size: 0.38rem;
      line-height: 0.6rem;
    }
  }
  .primary {
    margin: 0.3rem;
    width: 9.4rem;
  }
}
</style>
