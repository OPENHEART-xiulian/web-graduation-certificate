<template>
  <div
    style="display: flex; flex-direction: column; font-family: 'PingFang HK'"
  >
    <div style="display: flex; align-items: center; margin: 50px auto">
      <img
        alt=""
        src="../assets/logo.png"
        style="display: block; width: 50px; height: 50px"
      />
      <div style="display: flex; flex-direction: column; font-weight: bolder">
        <span style="font-size: 18px">广东省道路运输协会</span
        ><span style="font-size: 7px"
          >GUANGDONG ROAD TRANSPORT ASSOCIATION</span
        >
      </div>
    </div>
    <h2>XXXXXXX检验检测机构人员<br />培训证书查询</h2>
    <span
      style="font-size: 12px; font-weight: normal; font-family: 'PingFang SC'"
      >（点击图片可放大，也可长按保存）</span
    >
    <viewer :images="[mainHost + '/trainCertificate/preview?id=' + id]">
      <img
        :src="mainHost + '/trainCertificate/preview?id=' + id"
        alt="证书图片"
        style="display: block; width: 90%; margin: 0 auto"
      />
    </viewer>
  </div>
  <Modal
    v-model="isShow"
    :closable="false"
    :mask-closable="false"
    class="vertical-center-modal"
    footer-hide
    title="提示"
  >
    <p
      style="
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        line-height: 50px;
        color: #e4393c;
      "
    >
      {{ msg }}
    </p>
  </Modal>
</template>

<script>
import { downLoad, httpAjax, mainHost } from "@/https/http.js";

export default {
  name: "",
  data() {
    return {
      mainHost,
      id: this.$route.query.id,
      isShow: false,
      msg: "",
    };
  },
  methods: {
    downLoadImg() {
      downLoad("/trainCertificate/preview?id=" + this.id, "证书.png");
    },
  },
  mounted() {
    httpAjax(
      "preview",
      "get",
      {
        id: this.id,
      },
      function (res) {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.isShow = true;
        this.msg = "该证书不存在或已被删除";
      },
      false
    );
  },
};
</script>

<style scoped></style>