<template>
  <div id="windows" class="h-full flex flex-col justify-between">
    <div>内容翦</div>
    <bottom-handle />
  </div>
</template>

<script>
import BottomHandle from "@/components/BottomHandle";
export default {
  name: 'App',
  components: {
    BottomHandle
  }
}
</script>

<style lang="less">
@import "@/styles/init.less";
#app {
  background-color: @primary-color;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/images/global-bg.jpg");
  overflow: hidden;
  background-position: center;
  background-size: cover;
}
</style>
