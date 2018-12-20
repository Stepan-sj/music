<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from "@/components/m-header/m-header";
import Tab from "@/components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  },
  created() {
    console.log("组件app created");
  },
  mounted() {
    console.log("组件app mounted");
  },
  beforeMount() {
    console.log("组件app beforemountd");
  },
};
</script>

<style scoped lang="stylus">
@import './commons/stylus/variable';

#app {
  color: $color-theme;
}
</style>
