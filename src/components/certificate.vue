<template>
  <div>
    <div style="text-align: center">
      {{ itemData.unitName + "/" + itemData.name }}
    </div>
    <div
      :id="'capture' + props.index"
      ref="capture"
      class="bg"
      style="
        padding: 10px;
        position: relative;
        margin: 0 auto;
        font-size: 18px;
        font-weight: bolder;
      "
      @mouseleave="mo"
      @mousemove="handleMouseMove"
      @click.stop="test"
    >
      <img alt="" class="bg" src="../assets/papers_back.png" />
      <!--动态填充内容-->
      <img
        :src="
          mainHost1 +
          '/file/find?id=' +
          itemData.certificateImgId +
          '&token=' +
          token
        "
        alt=""
        style="
          width: 107px;
          height: 146px;
          z-index: 100;
          position: absolute;
          top: 200px;
          left: 306px;
        "
      />
      <div
        style="
          position: absolute;
          top: 366px;
          left: 170px;
          width: 106px;
          text-align: center;
        "
      >
        {{ itemData.name }}
      </div>
      <span style="position: absolute; top: 366px; left: 376px">{{
        itemData.sex == 1 ? "女" : "男"
      }}</span>
      <span style="position: absolute; top: 366px; left: 576px">{{
        itemData.educationLevel
      }}</span>
      <span
              style="
          position: absolute;
          top: 408px;
          left: 172px;
          width: 460px;
          text-align: center;
        "
      >{{ itemData.duties }}</span
      >
      <span
              style="
          position: absolute;
          top: 454px;
          left: 172px;
          width: 460px;
          text-align: center;
        "
      >{{ itemData.professionalTitle }}</span
      >
      <span
        style="
          position: absolute;
          top: 490px;
          left: 271px;
          width: 351px;
          text-align: center;
        "
        >{{ itemData.IDCard }}</span
      >
      <span
        style="
          position: absolute;
          top: 536px;
          left: 240px;
          width: 382px;
          text-align: center;
        "
        >{{ itemData.unitName }}</span
      >
      <span
        style="
          position: absolute;
          top: 580px;
          left: 239px;
          width: 382px;
          text-align: center;
        "
        >广东省道路运输协会</span
      >
      <img
        v-if="
          itemData.trainContent.indexOf(1) != -1 ||
          itemData.trainContent.indexOf('三检合一培训') != -1
        "
        alt="icon"
        class="gou"
        src="../assets/gou.png"
        style="top: 637px; left: 590px"
      />
      <img
        v-if="
          itemData.trainContent.indexOf(2) != -1 ||
          itemData.trainContent.indexOf('法律法规培训') != -1
        "
        alt="icon"
        class="gou"
        src="../assets/gou.png"
        style="top: 686px; left: 590px"
      />
      <img
        v-if="
          itemData.trainContent.indexOf(3) != -1 ||
          itemData.trainContent.indexOf('质量体系培训') != -1
        "
        alt="icon"
        class="gou"
        src="../assets/gou.png"
        style="top: 736px; left: 590px"
      />

      <span style="position: absolute; top: 778px; left: 360px; font-size: 22px"
        >RTAGD-{{ itemData.certificateNo }}</span
      >
      <span
        style="
          position: absolute;
          top: 808px;
          left: 455px;
          font-size: 22px;
          letter-spacing: 2px;
        "
        >{{
          dateFormatt("yyyy年MM月dd日", new Date(itemData.trainingDate))
        }}</span
      >
      <vue-qr
        v-if="codeText"
        id="payQR"
        :size="50"
        :text="codeText"
        margin="0"
        style="position: absolute; top: 785px; left: 82px"
      >
      </vue-qr>

      <!--盖章-->
      <img
        v-if="isGZed"
        :style="{ top: imgTop + 'px', left: imgLeft + 'px', zIndex: 999 }"
        alt=""
        class="cer-class"
        src="../assets/zhang.png"
      />
      <!--&lt;!&ndash;鼠标背影&ndash;&gt;-->
      <img
        v-if="mouseInDIV"
        :style="{ top: bgTop + 'px', left: bgLeft + 'px' }"
        alt=""
        class="cer-bg"
        src="../assets/zhang.png"
      />
    </div>
    <!--// 触发按钮-->
  </div>
</template>

<script setup>
import { dateFormatt } from "@/js/utils.js";
import { defineProps, ref, watch } from "vue";
import domtoimage from 'dom-to-image';
import { dataURLtoFile } from "@/js/utils";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import { mainHost } from "@/https/http.js";
import { app } from "@/main.js";

const props = defineProps({
  index: Number,
  itemData: Object,
});
const codeText = ref(
  location.origin + location.pathname + "#/cer?id=" + props.itemData._id
);
watch(
  () => props.itemData,
  (newCount, oldCount) => {
    //监听数据变化  新打开窗口把章隐藏起来
    isGZed.value = false;
  }
);

let isGZed = ref(false); //是否已盖章
const mainHost1 = ref(mainHost);
const token = ref(localStorage.getItem("token"));
//鼠标是否在盒子里
let mouseInDIV = ref(false);
// 绑定你的容器
let capture = ref();
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

//图片偏离值
let imgTop = ref(0);
let imgLeft = ref(0);

//鼠标跟随的背影
let bgTop = ref(0);
let bgLeft = ref(0);
// 触发
const isShow = (callback) => {
  //判断是否已经盖章
  return new Promise((resolve, reject) => {
      domtoimage.toPng(document.querySelector("#capture" + props.index),{width: 1430,
            height: 936})
          .then(function (dataUrl1) {
              if (!isGZed.value) {
                  app.$Message["error"]({
                      background: true,
                      content: "发放失败！第" + (props.index + 1) + "张证书未盖章！",
                      duration: 3,
                  });
                  app.$Spin.hide();
                  return reject(new Error("含有未盖章证书"));
              }
              // 给容器加入这个canvas
              let dataUrl = dataURLtoFile(
                  dataUrl1,
                  props.itemData._id + "-" + props.itemData.name + ".png"
              );

              if (dataUrl) {
                  return resolve(dataUrl);
              }
          })
          .catch(function (error) {
              console.error('oops, something went wrong!', error);
          });






  });
};
//    盖章到中间
const gz = () => {
  isGZed.value = true;
  imgTop.value = 300;
  imgLeft.value = 260;
};
const test = () => {
  isGZed.value = true;
  imgTop.value = bgTop.value;
  imgLeft.value = bgLeft.value;
};

const handleMouseMove = (e) => {
  if (!mouseInDIV.value) {
    mouseInDIV.value = true;
  }
  const parent = document.getElementById("capture" + props.index);
  const pLf = parent.getBoundingClientRect().left;
  const pRg = parent.getBoundingClientRect().top;
  bgTop.value = e.pageY - pRg - 100;
  bgLeft.value = e.pageX - pLf - 100;
};
const mo = (e) => {
  mouseInDIV.value = false;
};

// 第二部：暴露方法
defineExpose({
  isShow,
  gz,
});
</script>

<style scoped>
/* 设置默认的checkbox样式 */
input.check-input[type="checkbox"] {
  -webkit-appearance: none; /* 移除默认样式 */
  outline: none;
  border-radius: 2px;
  border: 1px solid #4c4e4f;
  background: #fff;
  position: relative;
}

/* 设置选中状态下的checkbox样式 */
input.check-input[type="checkbox"]:checked {
  background-color: red; /* 你可以更改这个颜色为你想要的颜色 */
}

/* 显示对勾 */
#europe-collection-list input.check-input[type="checkbox"]:checked::after {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  background-image: url("https://files/check_d92be03b-2b9b-4819-8e5f-169818b5d9e8.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.cer-bg {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 200px;
  height: 200px;
  z-index: 888;
  opacity: 0.5;
}

.cer-class {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 200px;
  height: 200px;
  opacity: 0.8;
}

.bg {
  display: block;
  height: 914px;
  width: 1400px;
  z-index: 1;
  color: #000;
  font-weight: 400 !important;
  letter-spacing: 2px;
}

.gou {
  position: absolute;
  height: 28px;
  display: block;
}
</style>