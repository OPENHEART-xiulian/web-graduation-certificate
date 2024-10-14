<script setup>
import { mainHost } from "@/https/http.js";
import { useElementSize } from "@vueuse/core";
import { computed, ref } from "vue";
// eslint-disable-next-line no-undef
defineProps(["id"]);
const token = localStorage.getItem("token");
const el = ref(null);
const { height, width } = useElementSize(el);
const isError = computed(() => {
  return Math.round(height.value) === 378 && Math.round(width.value) === 260;
});
</script>

<template>
  <div>
    <div v-show="id" :class="['photo']">
      <div class="icon">
        <Tooltip content="尺寸不对" placement="bottom-end" style="z-index: 999">
          <Icon
            v-if="!isError"
            color="black"
            size="20"
            type="md-information-circle"
          />
        </Tooltip>
      </div>
      <img
        ref="el"
        :src="mainHost + '/file/find?id=' + id + '&token=' + token"
        alt=""
        class="visibility_img"
      />
      <img
        :src="mainHost + '/file/find?id=' + id + '&token=' + token"
        alt=""
        class="img_box"
      />
    </div>
    <div v-show="!id" style="width: 65px; margin: 20px 0; font-size: 13px">
      请上传照片
    </div>
  </div>
</template>

<style scoped>
.photo {
  width: 65px;
  position: relative;
  z-index: 1000;
  margin: 0 auto 10px;

  .img_box {
    width: 100%;
    display: block;
  }
}

.visibility_img {
  visibility: hidden;
  position: absolute;
  top: -100%;
  left: -100%;
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
}

.photo-error {
  position: relative;

  &::after {
    display: block;
    content: "尺寸不对";
    width: 100%;
    height: 100%;
    position: absolute;
    line-height: 95px;
    top: 0;
    left: 0;
    background-color: rgba(228, 57, 60, 0.4);
    z-index: 10;
    color: #000;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>