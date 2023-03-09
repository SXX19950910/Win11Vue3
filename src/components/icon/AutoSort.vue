<template>
  <div class="auto-sort-icon">
    <div class="w-[16px] h-[1px] bg-[#555] absolute top-[-1px] left-[-2px]"></div>
    <div class="w-[16px] h-[1px] bg-[#555] absolute bottom-[-1px] left-[-2px]"></div>
    <img src="@/assets/images/bolt.png" class="w-[12px] mt-[1px]" alt="" />
  </div>
</template>

<script setup>

</script>

<style lang="less">
.auto-sort-icon {
  width: 14px;
  height: 16px;
  border: 1px solid #555;
  position: relative;
  &:after {
    content: '';
    height: 18px;
    width: 1px;
    background-color: #555;
    position: absolute;
    top: -2px;
    right: -1px;
  }
  &:before {
    content: '';
    height: 18px;
    width: 1px;
    background-color: #555;
    position: absolute;
    top: -2px;
    left: -1px;
  }
}
</style>