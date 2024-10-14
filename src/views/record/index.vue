<template>
  <div
    style="
      width: 100%;
      text-align: left;
      padding: 32px;
      box-sizing: padding-box;
      height: 100%;
    "
  >
    <waitMakeCer  />
  </div>
</template>

<script>
import waitMakeCer from "./waitMakeCer.vue";

export default {
  data() {
    return {
      name: "1",
    };
  },
  components: {
    waitMakeCer,
  },
  watch: {
    $route: {
      // $route可以用引号，也可以不用引号  监听的对象
      handler() {
        if (this.$route.query.tab) {
          this.name = this.$route.query.tab;
        }
      },
      deep: true, // 深度观察监听 设置为 true
      immediate: true, // 第一次初始化渲染就可以监听到
    },
    name: {
      handler(to) {
        this.$router.push({ name: "record", query: { tab: to } });
      },
      deep: true, // 深度观察监听 设置为 true
      immediate: true, // 第一次初始化渲染就可以监听到
    },
  },
};
</script>

<style scoped></style>