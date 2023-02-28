<template>
  <div id="windows" class="h-full flex flex-col justify-between" @click="handleClick">
    <div class="windows__content" />
    <bottom-handle />
  </div>
</template>

<script>
import BottomHandle from '@/components/BottomHandle/index.vue'
export default {
  name: 'App',
  components: {
    BottomHandle
  },
  methods: {
    handleClick() {
      this.$store.commit('panel/setWeatherVisible', false)
    }
  }
}
</script>

<style lang="less">
@import '@/styles/init.less';
#app {
  background-color: @primary-color;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/global-bg.jpg');
  overflow: hidden;
  background-position: center;
  background-size: cover;
  #windows {
    &__content {
    }
  }
}
</style>
