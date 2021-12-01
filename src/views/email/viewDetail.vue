<template>
  <div class="page">
    <div class="head flex_row">
      <div class="head_left">
        <img class="img" src="../../img/logo-black.png" alt="" />
        校长信箱
      </div>
      <div class="head_right">
        <div v-show="isShowBox" @click="resetTime" class="chance flex_col">
          <img class="img" src="../../img/resetTime.png" alt="" />
          重置时间
        </div>
        <div
          v-show="!isShowBox"
          @click="isShowPop = true"
          class="chance flex_col"
        >
          <img class="img" src="../../img/chance-blue.png" alt="" />
          筛选
        </div>
        <div
          v-show="isShowBox"
          @click="isShowPop = true"
          class="chance1 flex_col"
        >
          <img class="img" src="../../img/chance-w.png" alt="" />
          筛选
        </div>
        <el-input
          class="search"
          placeholder="请选择日期"
          suffix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
      </div>
    </div>
    <div class="fgx"></div>
    <div class="main_box flex_row">
      <div class="main_left flex_col">
        <div class="header flex_row">
          <div class="header_w flex_col" @click="showList = true">
            <span class="header_w_w">未回复({{ noReplyList.length }})</span>
            <div
              class="line_bottom"
              :class="showList ? 'line_bottom_checked' : ''"
            ></div>
          </div>
          <div class="header_w flex_col" @click="showList = false">
            <span class="header_w_w">已回复({{ repliedList.length }})</span>
            <div
              class="line_bottom"
              :class="showList ? '' : 'line_bottom_checked'"
            ></div>
          </div>
        </div>
        <div class="list_box">
          <div
            v-show="showList"
            class="list_item flex_row"
            :class="item.checked ? 'list_item_checked' : ''"
            v-for="(item, index) in noReplyList"
            :key="index"
            @click="chanced(index)"
          >
            <div class="list_left">
              <div class="number" :class="item.checked ? 'number_checked' : ''">
                {{ index + 1 }}
              </div>
            </div>
            <div class="list_right">
              <div class="title" :class="item.checked ? 'title_checked' : ''">
                {{ item.theme }}
              </div>
              <div
                class="content"
                :class="item.checked ? 'content_checked' : ''"
              >
                {{ item.problemDescription }}
              </div>
              <div class="time" :class="item.checked ? 'time_checked' : ''">
                {{ item.createTime }}
              </div>
            </div>
          </div>
          <div
            v-show="!showList"
            class="list_item flex_row"
            :class="item.checked ? 'list_item_checked' : ''"
            v-for="(item, index) in repliedList"
            :key="index + item"
            @click="chance(index)"
          >
            <div class="list_left">
              <div class="number" :class="item.checked ? 'number_checked' : ''">
                {{ index + 1 }}
              </div>
            </div>
            <div class="list_right">
              <div class="title" :class="item.checked ? 'title_checked' : ''">
                {{ item.theme }}
              </div>
              <div
                class="content"
                :class="item.checked ? 'content_checked' : ''"
              >
                {{ item.problemDescription }}
              </div>
              <div class="time" :class="item.checked ? 'time_checked' : ''">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_right">
        <div class="email_box" v-show="!showList">
          <div class="email">
            <div class="email_title">
              {{ msglist.theme }}
            </div>
            <div class="email_content">
              {{ msglist.problemDescription }}
            </div>
            <div class="email_person_msg flex_row">
              <div class="msg_left flex_row">
                <span class="name"> {{ msglist.userName }}</span>
                <img class="phone" src="../../img/admin-phone.png" alt="" />
                <span class="num"> {{ msglist.phone }}</span>
                <img class="idcard" src="../../img/admin-idcard.png" alt="" />
                <span class="num"> {{ msglist.createBy }}</span>
              </div>
              <div class="msg_right">
                {{ msglist.createTime }}
              </div>
            </div>
            <div class="email_asw_box">
              <span class="asw_asw">回复</span>：
              {{ msglist.reply }}
              <div class="stat_time">
                {{ msglist.updateTime }}
              </div>
            </div>
          </div>
        </div>
        <div class="email_box" v-show="showList">
          <div class="email">
            <div class="email_title">{{ noMsglist.theme }}</div>
            <div class="email_content">
              {{ noMsglist.problemDescription }}
            </div>
            <div class="email_person_msg flex_row">
              <div class="msg_left flex_row">
                <span class="name"> {{ noMsglist.userName }}</span>
                <img class="phone" src="../../img/admin-phone.png" alt="" />
                <span class="num"> {{ noMsglist.phone }}</span>
                <img class="idcard" src="../../img/admin-idcard.png" alt="" />
                <span class="num"> {{ noMsglist.createBy }}</span>
              </div>
              <div class="msg_right">
                {{ noMsglist.createTime }}
              </div>
            </div>
            <div class="asw_box_no">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10 }"
                placeholder="说点什么…"
                v-model="noMsglist.reply"
              >
              </el-input>
            </div>
            <div class="btn_box">
              <el-button
                class="btn"
                @click="updateMailbox(noMsglist.id, noMsglist.reply)"
                >提交</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop" v-show="isShowPop">
      <div
        class="qrcode_box flex_col"
        :class="this.isShowPop ? 'qrcode_box_active' : ''"
      >
        请选择时间段
        <div class="time_box flex_row">
          <div class="start_time flex_row">
            开始时间
            <van-datetime-picker
              v-model="startTime"
              type="date"
              title="选择年月日"
              :show-toolbar="false"
              :visible-item-count="3"
              :item-height="50"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </div>
          <div class="start_time flex_row">
            结束时间
            <van-datetime-picker
              v-model="endTime"
              type="date"
              title="选择年月日"
              :show-toolbar="false"
              :visible-item-count="3"
              :item-height="50"
              :min-date="minDate"
              :max-date="maxDate"
            />
          </div>
        </div>
        <el-button type="primary" class="btn_time" @click="sureTime()"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      id: "",
      searchValue: "",
      showList: true,
      isShowBox: false, //控制导航栏筛选按钮显示、隐藏
      isShowPop: false, //控制导航栏选择时间弹框显示、隐藏
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2025, 10, 1), //时间区间
      startTime: new Date(2021, 10, 9), //开始时间
      endTime: new Date(2021, 10, 9),
      startTimeValue: "", //时间返回值开始
      endTimeValue: "",//时间返回值结束
      repliedList: [],//回复列表
      noReplyList: [],//未回复列表
      msglist: {},//回复详情
      noMsglist: {},//未回复详情
      msg: [],//本地获取用户数据
      list: [],//本地获取信息列表数据
      chanceNum: 0,//点击未回复列表，返回的当前序列值
    };
  },
  created() {
    this.list = JSON.parse(sessionStorage.getItem("noReplyList")); //本地获取列表数据
    console.log("list", this.list);
  },
  mounted() {
    this.msg = JSON.parse(sessionStorage.getItem("info")); //本地获取用户数据
    // 依据replyState,给列表赋值
    for (var i in this.list) {
      if (this.list[i].replyState == 0) {
        this.noReplyList.push(this.list[i]);
      } else {
        this.repliedList.push(this.list[i]);
      }
    }
    console.log("this.noReplyList", this.noReplyList);
    console.log("this.repliedList", this.repliedList);
    // 判断列表是否为空，假使不为空，添加选中状态并给详情赋值
    if (!this.repliedList.length == 0) {
      this.repliedList[0].checked = true;
      this.msglist = this.repliedList[0];
    } else {
      this.msglist.theme = "当前列表暂无数据";
    }
    if (!this.noReplyList.length == 0) {
      this.noReplyList[0].checked = true;
      this.noMsglist = this.noReplyList[0];
    } else {
      this.noMsglist.theme = "当前列表暂无数据";
    }
    // 判断是否选择时间
    if (this.startTimeValue === "") {
      this.isShowBox = false;
    } else {
      this.isShowBox = true;
    }
  },
  methods: {
    search() {
      // this.getList(this.startTimeValue, this.endTimeValue, this.searchValue);
      // this.getList1(this.startTimeValue, this.endTimeValue, this.searchValue);
    },
    getList() {},
    getList1() {},
    // 改变列表选中状态
    chance(index) {
      for (var i in this.repliedList) {
        if (i == index) {
          this.repliedList[i].checked = true;
          this.msglist = this.repliedList[i];
        } else {
          this.repliedList[i].checked = false;
        }
      }
    },
    chanced(index) {
      for (var i in this.noReplyList) {
        if (i == index) {
          this.noReplyList[i].checked = true;
          this.noMsglist = this.noReplyList[i];
          this.chanceNum = index;
          console.log(this.chanceNum);
        } else {
          this.noReplyList[i].checked = false;
        }
      }
    },
    updateMailbox(id, reply) {
      console.log(id, reply);
      this.noMsglist.updateBy = this.msg.userName;

      if (this.noMsglist.reply == "") {
        this.$toast("请输入回复的内容");
        return false;
      }
      this.noMsglist.replyState = 1;

      var myDate = new Date();
      this.noMsglist.updateTime =
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
      console.log("noMsglist", this.noMsglist);
      this.noMsglist.checked = false;

      console.log("noMsglist111", this.noMsglist);
      this.list[id] = this.noMsglist;

      this.repliedList[0].checked = false;
      console.log("list", this.list);
      this.noReplyList[this.chanceNum].checked = false;
      sessionStorage.setItem("noReplyList", JSON.stringify(this.list));
      this.$router.go(0);
    },
    // 时间重置
    resetTime() {
      this.startTimeValue = "";
      this.endTimeValue = "";
      if (this.startTimeValue === "") {
        this.isShowBox = false;
      } else {
        this.isShowBox = true;
      }
    },
    //选择时间
    sureTime() {
      this.isShowPop = false;
      this.startTimeValue =
        this.startTime.getFullYear() +
        "-" +
        (this.startTime.getMonth() + 1) +
        "-" +
        this.startTime.getDate();
      this.endTimeValue =
        this.endTime.getFullYear() +
        "-" +
        (this.endTime.getMonth() + 1) +
        "-" +
        this.endTime.getDate();
      if (this.startTimeValue === "") {
        this.isShowBox = false;
      } else {
        this.isShowBox = true;
      }
      if (this.startTime > this.endTime) {
        this.$message.error("开始时间不能大于结束时间");
        return false;
      } else {
        this.getList(this.startTimeValue, this.endTimeValue, this.searchValue);
        this.getList1(this.startTimeValue, this.endTimeValue, this.searchValue);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pop {
  z-index: 998;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
}
.qrcode_box {
  z-index: 999;
  transition-duration: 1s;
  transform: scale(0);
  width: 725px;
  height: 404px;
  background: #ffffff;
  border-radius: 13px;
  align-items: center;
  justify-content: space-evenly;
  font-size: 24px;
  color: #2f2f2f;
  .time_box {
    width: 100%;
    justify-content: space-around;
    .start_time {
      padding: 15px;
      font-size: 18px;
      color: #b7b7b7;
      align-items: center;
      border: 1px solid #d8e2f0;
      box-shadow: 4px 3px 38px rgba(41, 27, 149, 0.13);
      border-radius: 6px;
    }
  }
  .btn_time {
    font-size: 20px;
    padding: 10px 80px;
  }
}
.qrcode_box_active {
  transition-duration: 1s;
  transform: scale(1);
}

.head {
  width: 100%;
  height: 13vh;
  background: #ffffff;
  // border-bottom: 6px solid #3e83e9;
  align-items: center;
  justify-content: space-between;
}
.head_left {
  margin-left: 50px;
  display: flex;
  align-items: center;
  font-size: 36px;
  color: #3e4d70;
  font-weight: bold;
  .img {
    margin-right: 25px;
    width: 449px;
    height: 86px;
  }
}
.head_right {
  display: flex;
  align-items: center;
  margin-right: 50px;
  .chance {
    white-space: nowrap;
    cursor: pointer;
    margin-right: 20px;
    padding: 5px 12px;
    font-size: 14px;
    color: #3e83e9;
    font-weight: 500;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 3px 10px rgba(12, 101, 255, 0.16);
    opacity: 1;
    border-radius: 11px;
    .img {
      width: 27px;
    }
  }
  .chance1 {
    white-space: nowrap;
    cursor: pointer;
    margin-right: 20px;
    padding: 5px 12px;
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    align-items: center;
    background: #0c65ff;
    box-shadow: 0px 3px 10px rgba(12, 101, 255, 0.16);
    opacity: 1;
    border-radius: 11px;
    .img {
      width: 27px;
    }
  }
  .search {
    ::v-deep .el-input__inner {
      position: relative;
      padding-left: 30px;
      width: 418px;
      height: 61px;
      background: #eeeeee;
      border: 1px solid #e3e3e3;
      opacity: 1;
      border-radius: 30px;
      font-size: 24px;
      color: #6e6e6e;
    }
    ::v-deep .el-input__icon {
      color: #444444;
      height: 105%;
      font-size: 24px;
      width: 45px;
    }
  }
}
.fgx {
  width: 100%;
  height: 0.5vh;
  background: #3e83e9;
}
.main_box {
}
.main_left {
  width: 462px;
  height: 86.5vh;
  background: #ffffff;
  border-right: 2px solid #d8d8d8d8;
}
.main_left .header {
  width: 100%;
  font-size: 20px;
  color: #101010;
  font-weight: bold;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e5e5e5;
}
.main_left .header .header_w {
  align-items: center;
  .header_w_w {
    margin-top: 20px;
  }
  .line_bottom {
    margin-top: 20px;
    width: 70%;
    height: 4px;
    background: #fff;
    opacity: 1;
    border-radius: 2px;
  }
  .line_bottom_checked {
    background: #3e83e9;
  }
}

.list_box {
  overflow-y: scroll;
}
.list_item {
  padding: 20px 45px 20px 40px;
  justify-content: space-between;
}
.list_item .list_left {
  .number {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    padding: 3px 6px;
    background: #3e83e9;
    border-radius: 6px 0px 6px 0px;
  }
  .number_checked {
    color: #3e83e9;
    background: #ffffff;
  }
}
.list_item .list_right {
  padding-left: 20px;
  width: 340px;
  .title {
    font-size: 20px;
    font-weight: 500;
    color: #141414;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title_checked {
    color: #ffffff;
  }
  .content {
    margin-top: 10px;
    font-size: 14px;
    color: #3e4d70;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .content_checked {
    color: #d9dde4;
  }
  .time {
    margin-top: 6px;
    font-size: 14px;
    color: #141414;
  }
  .time_checked {
    color: #ffffff;
  }
}

.list_item_checked {
  background: #75809a;
}

.list_box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
}
.list_box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  width: 4px;
  border-radius: 7px;
  background: #c6c7c7;
}

.main_right {
  width: 100%;
  height: 86.5vh;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}
.email_box {
  overflow-y: scroll;
  margin-top: 2%;
  width: 93%;
  height: 95%;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
}
.email_box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
}
.email_box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  width: 4px;
  border-radius: 7px;
  background: #c6c7c7;
}
.email {
  padding: 40px 80px;
}
.email_title {
  font-size: 36px;
  font-weight: bold;
  color: #272727;
  line-height: 76px;
  background: url(../../img/line-bg.png) repeat;
  background-size: 20px 76px;
}
.email_content {
  word-break: break-all;
  font-size: 24px;
  color: #3e4d70;
  line-height: 76px;
  background: url(../../img/line-bg.png) repeat;
  background-size: 20px 76px;
}
.email_person_msg {
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  .msg_left {
    color: #2e3f67;
    align-items: center;
    .name {
      font-size: 25px;
      font-weight: 500;
    }
    .phone {
      margin: 0 15px 0 24px;
      width: 18px;
      height: 27px;
    }
    .num {
      font-size: 20px;
    }
    .idcard {
      margin: 0 15px 0 24px;
      width: 35px;
      height: 27px;
    }
  }
  .msg_right {
    margin-right: 30px;
    font-size: 24px;
    font-weight: 500;
    color: #141414;
  }
}
.email_asw_box {
  margin-top: 30px;
  width: 96%;
  height: auto;
  background: #f2f6ff;
  border-radius: 10px;
  padding: 20px 20px 30px;
  font-size: 24px;
  line-height: 46px;
  word-break: break-all;
  .asw_asw {
    padding: 5px 10px;
    background: #80b3f2;
    font-size: 24px;
    color: #fff;
    border-radius: 3px;
  }
  .stat_time {
    text-align: right;
    font-size: 24px;
    font-weight: 500;
  }
}
.asw_box_no {
  margin-top: 30px;
  width: 96%;
  height: auto;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px 20px 30px;
  font-size: 24px;
  line-height: 46px;
  border: 1px solid #ccd0de;
}
.btn_box {
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-top: 30px;
    font-size: 24px;
    color: #ffffff;
    padding: 12px 70px;
    background: #3e83e9;
    border-radius: 31px;
  }
}

.main_right::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
}
.main_right::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  width: 4px;
  border-radius: 7px;
  background: #c6c7c7;
}

::v-deep .van-picker__columns {
  width: 200px;
}
::v-deep .el-textarea__inner {
  color: #010101;
  font-size: 20px;
  border: none;
  background: #f9f9f9;
}
::v-deep textarea[class="el-textarea__inner"]::-webkit-input-placeholder {
  color: #aaaaaa;
}
</style>