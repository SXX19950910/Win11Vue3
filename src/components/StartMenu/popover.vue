<template>
  <div class="start-popover" :class="{ 'show': panel.startMenuVisible }">
    <el-input prefix-icon="search" size="large" placeholder="在此键入以搜索"></el-input>
  </div>
</template>

<script setup>
import { usePanelStore } from '@/store/panel'
import { ElInput } from 'element-plus'

const panel = usePanelStore()

</script>

<style lang="less">
.start-popover {
  padding: 30px;
  width: 640px;
  height: 720px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  transition: all 0.15s ease-in-out;
  position: absolute;
  border-radius: 8px;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  &.show {
    top: -735px;
  }
  .el-input {
    --el-input-border-color: #F0F0F0;
    --el-input-focus-border-color: #F0F0F0;
    --el-input-hover-border-color: #F0F0F0;
    .el-icon {
      font-size: 18px;
    }
    .el-input__wrapper {
      position: relative;
      overflow: hidden;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #0067C0;
      }
    }
    .el-input__inner {
      &::placeholder {
        color: #616161;
      }
    }
  }
}
</style>