<template>
  <router-view />
</template>
<script>
import logo from "@/assets/logo.png";

export default {
  data() {
    return {};
  },

  mounted() {
    const link = document.getElementsByTagName("link")[0];
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = logo; //icon图标
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>