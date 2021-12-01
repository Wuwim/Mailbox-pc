<template>
  <div class="page flex_col">
    <div class="head">
      <img class="img" src="../../img/logo-black.png" alt="" />
      校长信箱
    </div>
    <div class="main_box">
      <div class="main">
        <div class="text_box">
          <el-form
            :model="info"
            :rules="rules"
            :show-message="false"
            @validate="validate"
            ref="ruleForm"
            class="demo-form-inline"
          >
            <el-form-item prop="theme">
              <el-input
                class="title"
                v-model="info.theme"
                placeholder="请输入不超过20字的标题"
              ></el-input>
            </el-form-item>
            <el-form-item prop="problemDescription">
              <el-input
                class="content"
                type="textarea"
                placeholder="请输入内容限500字以内"
                v-model="info.problemDescription"
                maxlength="500"
                :autosize="{ minRows: 8, maxRows: 20 }"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="btn"
                type="primary"
                @click="onSubmit('ruleForm')"
                >确定提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 自定义弹框 -->
    <div class="pop" v-show="isshow">
      <div class="qrcode_box flex_col">
        <div class="qrcode_w1 flex_row">
          <div class="line"></div>
          请妥善保存二维码
          <div class="line"></div>
        </div>
        <div class="qrcode_w2">扫码即可查看回复内容</div>
        <img class="qrcode_img" src="../../img/QRcode.png" alt="" />
        <div class="qrcode_back" @click="goindex">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        checked: false,
        id: 0,
        userName: "",
        createBy: "",
        phone: "",
        theme: "",
        problemDescription: "",
        createTime: "",
        replyState: 0,
        reply: "",
        searchValue: null,
        updateBy: "",
        updateTime: "",
      },
      rules: {
        theme: [{ required: true, message: "请输入主题", trigger: "blur" }],
        problemDescription: [
          { required: true, message: "请输入内容描述", trigger: "blur" },
        ],
      },
      isshow: false,
    };
  },
  created() {},
  mounted() {
    this.list = JSON.parse(sessionStorage.getItem("info")); //本地获取数据
    this.info.userName = this.list.userName;
    this.info.createBy = this.list.idCard;
    this.info.phone = this.list.phone;
  },
  methods: {
    validate(rule, value, callback) {
      // console.log(rule, value, callback);
      if (value == false) {
        this.$message.error(callback);
      }
    },
    onSubmit(info) {
      this.$refs[info].validate((valid) => {
        sessionStorage.setItem("info", JSON.stringify(this.info));
        if (valid) {
          this.isshow = true;
          // 生成当前发送时间
          var myDate = new Date();
          this.info.createTime =
            myDate.getFullYear() +
            "-" +
            (myDate.getMonth() + 1) +
            "-" +
            myDate.getDate() +
            " " +
            myDate.getHours() +
            ":" +
            myDate.getMinutes() +
            ":" +
            myDate.getSeconds();
          console.log("createTiem:" + this.createTime);
          console.log("info", this.info);
          this.arr = JSON.parse(sessionStorage.getItem("noReplyList")); //本地获取数据
          this.arr.push(this.info);
          for (var i in this.arr) {
            this.arr[i].id = i;
            this.id = i;
          }
          sessionStorage.setItem("noReplyList", JSON.stringify(this.arr));
        } else {
          return false;
        }
      });
    },
    goindex() {
      this.isshow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.pop {
  z-index: 998;
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
}

.qrcode_box {
  z-index: 999;
  width: 631px;
  height: 546px;
  background: #ffffff;
  border-radius: 13px;
  align-items: center;
  justify-content: space-evenly;
}
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
  border-radius: 0px;
}
.qrcode_back {
  font-size: 26px;
  color: #d1d1d1;
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
}
.main {
  margin: 22px auto 0px;
  width: 1352px;
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
      background: url(../../img/line-bg1.png) repeat;
      background-size: 20px 76px;
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
  height: 60px;
  background: #3e83e9;
  border: 1px solid #e3e3e3;
  border-radius: 30px;
  font-size: 24px;
  color: #ffffff;
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
  background: url(../../img/line-bg.png) repeat;
  background-size: 20px 76px;
  border: none;
  padding: 0;
}
::v-deep textarea[class="el-textarea__inner"]::-webkit-input-placeholder {
  font-size: 24px;
  color: #3e4d70;
}
</style>

