<template>
  <div class="relative">
    <el-tooltip content="开始" effect="light" :show-arrow="false" >
      <div class="start-menu" :class="{ active: state.startMenuVisible }" @click.stop="handleClick">
        <div class="start-menu__content">
          <div class="top-row flex gap-[1px]">
            <div class="item one"></div>
            <div class="item two"></div>
          </div>
          <div class="bottom-row flex gap-[1px] mt-[1px]">
            <div class="item three"></div>
            <div class="item four"></div>
          </div>
        </div>
      </div>
    </el-tooltip>
    <popover />
  </div>
</template>

<script setup>
import { ElTooltip } from 'element-plus'
import Popover from './popover.vue'
import { usePanelStore } from '@/store/panel'

const state = usePanelStore()



const handleClick = () => {
  state.startMenuVisible = !state.startMenuVisible
}

</script>

<style lang="less">
.start-menu {
  padding: 7px;
  border-radius: 4px;
  transition: 0.2s ease background-color;
  &__content {
    transition: 0.1s ease all;
  }
  &:active {
    .start-menu__content {
      transform: scale(0.8);
      .item.one {
        background: #1B98E3;
      }
    }
  }
  &.active:active {
    .item.one {
      background: linear-gradient(120deg, #4FD0FE, #25A3E9);
    }
    &.two {
      background-color: #1B98E3;
    }
    &.three {
      background-color: #0E88DB;
    }
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
  &.active {
    .item.two {
      background: linear-gradient(120deg, #4CD0FE, #24A2E9);
    }
    .item.three {
      background: linear-gradient(45deg, #4ACEFD, #23A1E8);
    }
    .item.four {
      animation: dodge 0.05s ease;
    }
    @keyframes dodge {
      0% {
        background: linear-gradient(45deg, #4ACEFD, #23A1E8);
      }
      50% {
        background: linear-gradient(45deg, #4ACEFD, #23A1E8);
      }
      100% {
        background: #0E88DB;
      }
    }
  }
  .item {
    width: 12px;
    height: 12px;
    transition: 0.15s ease all;
    &.one {
      background: linear-gradient(120deg, #4FD0FE, #25A3E9);
      border-top-left-radius: 2px;
    }
    &.two {
      background-color: #1B98E3;
      border-top-right-radius: 2px;
    }
    &.three {
      background-color: #0E88DB;
      border-bottom-left-radius: 2px;
    }
    &.four {
      background-color: #0E88DB;
      border-bottom-right-radius: 2px;
    }
  }
}
</style>