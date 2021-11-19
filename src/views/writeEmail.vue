<template>
  <div class="page">
    <div class="pop" v-show="isshow">
      <div
        class="qrcode_box flex_col"
        :class="this.isshow ? 'qrcode_box_active' : ''"
      >
        <div class="qrcode_w1 flex_row">
          <div class="line"></div>
          请妥善保存二维码
          <div class="line"></div>
        </div>
        <div class="qrcode_w2">扫码即可查看回复内容</div>
        <img class="qrcode_img" src="../img/QRcode.png" alt="" />
        <div class="qrcode_w3" @click="goindex">关闭</div>
      </div>
    </div>
    <div class="head">
      <img class="img" src="../img/logo-black.png" alt="" />
      校长信箱
    </div>
    <div class="main_box">
      <div class="main">
        <div class="text_box">
          <el-input
            class="title"
            v-model="info.title"
            placeholder="请输入不超过20字的标题"
          ></el-input>
          <el-input
            class="content"
            type="textarea"
            placeholder="请输入内容限500字以内"
            v-model="info.content"
            maxlength="500"
            :autosize="{ minRows: 13, maxRows: 13 }"
          >
          </el-input>
        </div>
      </div>
    </div>
    <el-button class="btn" @click="onSubmit">确定提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        title: "",
        content: "",
        idCard: "",
      },
      isshow: false,
    };
  },
  created() {
    let routerParams = this.$route.query.idCard;
    console.log(routerParams);
    this.info.idCard = routerParams;
  },
  methods: {
    onSubmit() {
      this.$api.user
        .saveMailbox({
          createBy: this.info.idCard,
          problemDescription: this.info.content,
          theme: this.info.title,
        })
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.$toast(res.data.msg);
          } else {
            console.log(res);
            this.$toast(res.data.msg);
          }
        });
      this.isshow = true;
    },
    goindex() {
      this.isshow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.flex_col {
  display: flex;
  flex-direction: column;
}
.flex_row {
  display: flex;
  flex-direction: row;
}
.page {
  width: 100%;
  height: 100vh;
  background: #f5f6f7;
  display: flex;
  flex-direction: column;
  .pop {
    z-index: 998;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);

    .qrcode_box {
      z-index: 999;
      transition-duration: 1s;
      transform: scale(0);
      width: 631px;
      height: 546px;
      background: #ffffff;
      border-radius: 13px;
      align-items: center;
      justify-content: space-evenly;
      .qrcode_w1 {
        font-size: 35px;
        font-weight: bold;
        color: #010101;
        align-items: center;
        .line {
          margin: 0 30px;
          width: 65px;
          height: 1px;
          background: #707070;
        }
      }
      .qrcode_w2 {
        font-size: 40px;
        color: #4b98f7;
      }
      .qrcode_img {
        width: 250px;
        height: 250px;
        opacity: 1;
        border-radius: 0px;
      }
      .qrcode_w3 {
        font-size: 26px;
        color: #d1d1d1;
      }
    }
    .qrcode_box_active {
      transition-duration: 1s;
      transform: scale(1);
    }
  }
  .head {
    display: flex;
    width: 100%;
    height: 125px;
    background: #ffffff;

    font-size: 36px;
    color: #3e4d70;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 6px solid #3e83e9;
    .img {
      margin-left: 275px;
      margin-right: 25px;
      width: 449px;
      height: 86px;
    }
  }
  .main_box {
    flex: 1;
    overflow-y: scroll;
    .main {
      margin: 22px auto 0px;
      width: 1352px;
      height: 1098px;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      .text_box {
        width: 1180px;
        height: 90%;
        padding: 30px 86px 0px;
        .title {
          font-size: 30px;
          font-weight: bold;
          color: #272727;
          border: none;
          line-height: 76px;
          background: url(../img/line-bg.png) repeat;
          background-size: 20px 76px;
        }
      }
    }
  }
  .btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 6%;
    margin: auto;
    width: 380px;
    height: 61px;
    background: #3e83e9;
    border: 1px solid #e3e3e3;
    opacity: 1;
    border-radius: 31px;
    font-size: 24px;
    color: #ffffff;
  }
}
::v-deep .el-input__inner {
  border: none;
  padding: 0;
}
::v-deep input[class="el-input__inner"]::-webkit-input-placeholder {
  font-size: 30px;
  font-weight: bold;
  color: #a5a5a5;
}
::v-deep .el-textarea__inner {
  font-size: 24px;
  color: #3e4d70;
  line-height: 76px;
  background: url(../img/line-bg.png) repeat;
  background-size: 20px 76px;
  border: none;
  padding: 0;
}
::v-deep textarea[class="el-textarea__inner"]::-webkit-input-placeholder {
  font-size: 24px;
  color: #3e4d70;
}
</style>