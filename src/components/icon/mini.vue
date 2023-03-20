<template>
  <div class="mini-icon relative">
    <div class="mini-icon__top"></div>
    <div class="mini-icon__bottom"></div>
  </div>
</template>

<script setup>
</script>

<style lang="less">
.mini-icon {
  &__top {
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-radius: 2px;
    position: relative;
    z-index: 100;
    background-color: #CDCDCD;
  }
  &__bottom {
    width: 8px;
    height: 8px;
    border: 1px solid #000;
    border-radius: 2px;
    position: absolute;
    top: -3px;
    right: -3px;

  }
}
</style>