<template>
  <div class="Infor">
    <h3>展会预约信息</h3>
    <div class="content1">
      <mt-field label="姓名" placeholder="请输入您的姓名" v-model="name"></mt-field>
      <mt-field label="手机号" placeholder="请输入您的手机号" type="tel" v-model="mobile" :attr="{ maxlength: 11 }"></mt-field>
      <mt-field label="证件号码" placeholder="请输入您的身份证号码"  v-model="cardid"></mt-field>
    </div>
    <mt-button type="primary" class="primary" @click="submits">提交</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subject: "",
      name: "",
      mobile: "",
      cardid: ""
    };
  },
  mounted() {
    this.subject = this.$route.query.id || "";
    document.title = this.$route.query.title || "";
    this.wxopenid = this.$route.query.wxopenid || "";
    console.log(this.subject);
  },
  methods: {
    submits() {

return
      let data = {
        reg: "2018",
        accountname: "weixin",
        wxopenid: this.wxopenid,
        name: this.name,
        mobile: this.mobile,
        cardid: this.cardid,
        subject: this.subject
      };
      if (this.isTrue()) {
        this.axios
          .get(`Subject_Reg/${JSON.stringify(data)}`)
          .then(_ => {
              this.$toast('预约成功')
          })
          .catch(_ => {});
      }
    },
    isTrue() {
      let reg =/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (!this.name) {
        this.$toast("姓名不能为空")
        return false;
      }
      if(!this.mobile){
      this.$toast("手机号码不能为空")
        return false;
      }
      if(this.mobile.length!=11){
        this.$toast("请输入正确的手机号码")
        return false;
      }
       if(!this.cardid){
      this.$toast("证件号码号码不能为空")
        return false;
      }
       if(!reg.test(this.cardid)){
      this.$toast("请输入正确的证件号码")
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.Infor {
  h3 {
    text-align: center;
    font-size: 0.56rem;
    font-weight: 500;
    margin: 0.3rem;
  }
  .content1 {
    margin: 2.8rem 0.3rem 1.2rem 0.3rem;
    border: none;
  }
  .primary {
    margin: 0.3rem;
    width: 9.4rem;
  }
}
</style>
