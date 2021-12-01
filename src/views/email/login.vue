<template>
  <div class="page">
    <div class="box flex_row">
      <div class="box_left">
        <div>
          <img class="img" src="../../img/logo-w.png" alt="" />
        </div>
        <div class="box_left_w">校长信箱</div>
      </div>
      <div class="box_right">
        <div class="right_box">
          <div class="right_box_w1">信息登记</div>
          <div class="right_box_w2">WELCOME TO THE SYSTEM</div>
          <el-form
            :model="info"
            :rules="rules"
            ref="ruleForm"
            class="demo-form-inline"
          >
            <el-form-item prop="userName">
              <el-input
                v-model="info.userName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="this.type === '1'" prop="idCard">
              <el-input
                v-model="info.idCard"
                placeholder="请输入身份证"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="!(this.type === '1')" prop="passWord">
              <el-input
                v-model="info.passWord"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="info.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-input
                maxlength="8"
                v-model="info.verificationCode"
                placeholder="请输入验证码"
              >
                <el-button @click="getCode()" slot="append">{{
                  text
                }}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="btn"
                type="primary"
                @click="onSubmit('ruleForm')"
                >{{
                  this.type === "1" ? "给校长写信" : "管理员登录"
                }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: this.$route.query.type ? this.$route.query.type : "1", //'1':普通员工;'2':管理员
      info: {
        userName: "",
        passWord: "",
        idCard: "",
        phone: "",
        verificationCode: "",
      },
      rules: {
        // 姓名判断
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请填写正确的身份证号",
            trigger: "blur",
          },
        ],
        // 密码判断
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // 手机号码判断
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请填写正确的手机号",
            trigger: "blur",
          },
        ],
        // 验证码判断
        verificationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
      num: 60,
      text: "获取验证码",
      status: false,
      timer: null,
    };
  },
  created() {},
  mounted() {
    console.log("type=", this.type);
  },
  methods: {
    onSubmit(info) {
      this.$refs[info].validate((valid) => {
        sessionStorage.setItem("info", JSON.stringify(this.info));
        if (valid) {
          if (this.type === "1") {
            this.$router.push({
              path: "/email/writeEmail",
              query: {
                id: this.id,
              },
            });
            console.log("type=", this.type);
          } else {
            this.$router.push({
              path: "/email/viewDetail",
              query: {
                id: this.id,
              },
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      if (this.info.phone == "") {
        this.$message.error("请输入手机号");
        return;
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(this.info.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }

      if (this.status) {
        console.log("请等待");
        return;
      }
      console.log("获取验证码");
      this.status = true;
      this.loading();

      this.timer = setInterval(() => {
        if (this.num === 0) {
          this.timer && this.clearTimer();
          this.reset();
        } else {
          this.loading();
        }
      }, 1000);
    },
    reset() {
      //重置
      this.num = 60;
      this.status = false;
      this.text = "获取验证码";
    },
    loading() {
      this.num -= 1;
      this.text = this.num + "S";
    },
    clearTimer() {
      //清除定时器
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  background: url(../../img/bg.png) no-repeat;
  background-size: cover;
}
.box {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .box_left {
    font-size: 64px;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 20px;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.45);
    .img {
      width: 547px;
    }
    .box_left_w {
      margin-left: 100px;
    }
  }
  .box_right {
    margin-left: 125px;
    width: 543px;
    height: 675px;
    background: #ffffff;
    opacity: 1;
    border-radius: 16px;
    .right_box {
      margin: 30px 50px;
      text-align: center;
      .right_box_w1 {
        font-size: 40px;
        color: #3e83e9;
      }
      .right_box_w2 {
        margin: 15px 0 30px;
        font-size: 20px;
        color: #6b6b6b;
      }
    }
    .btn {
      margin-top: 40px;
      width: 438px;
      height: 64px;
      background: #3e83e9;
      box-shadow: 0px 10px 24px rgba(44, 102, 200, 0.28);
      font-size: 28px;
      color: #ffffff;
      border-radius: 60px;
    }
  }
}

// ::v-deep input[class="el-input__inner"]::-webkit-input-placeholder {
//   font-size: 23px;
//   font-weight: 500;
//   color: #a5a5a5;
// }
::v-deep .el-input__inner {
  width: 446px;
  height: 71px;
  background: #f8f8f8;
  font-size: 23px;
  border-radius: 36px;
  border: 1px solid #fff;
  text-align: center;
}
::v-deep .el-input-group__append {
  width: auto;
  position: absolute;
  border: none;
  right: 12px;
  bottom: 22px;
  background: none;
  font-size: 16px;
  color: #3e83e9;
}
</style>