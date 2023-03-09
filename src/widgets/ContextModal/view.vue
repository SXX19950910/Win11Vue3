<template>
  <div class="view-menu relative" :style="style">
    <transition name="slide-down">
      <div v-if="panel.viewMenuVisible" class="view-menu__content">
        <div class="border-b border-[#C8D0E7]">
          <div class="item rounded">
            <div class="flex items-center">
              <div class="circle mx-4 w-[4px] h-[4px] rounded-full bg-[#52565E]"></div>
              <big-icon class="mr-4" />
              <div>大图标</div>
            </div>
            <div class="tip text-12 text-[#4E4F55] ml-4 shrink-0">
              Ctrl + Shift + 2
            </div>
          </div>
          <div class="item rounded">
            <div class="flex items-center">
              <div class="circle mx-4 w-[4px] h-[4px] rounded-full bg-[#52565E]"></div>
              <middle-icon class="mr-4" />
              <div>中等图标</div>
            </div>
            <div class="tip text-12 text-[#4E4F55] ml-4 shrink-0">
              Ctrl + Shift + 2
            </div>
          </div>
          <div class="item rounded">
            <div class="flex items-center">
              <div class="circle mx-4 w-[4px] h-[4px] rounded-full bg-[#52565E]"></div>
              <small-icon class="mr-4" />
              <div>小图标</div>
            </div>
            <div class="tip text-12 text-[#4E4F55] ml-4 shrink-0">
              Ctrl + Shift + 2
            </div>
          </div>
        </div>
        <div class="border-b border-[#C8D0E7]">
          <div class="item rounded mt-[5px]">
            <div class="flex items-center">
              <el-icon class="mx-[12px] text-12 text-[#52565E]"><Check /></el-icon>
              <auto-sort-icon class="mr-4" />
              <div>自动排列图标</div>
            </div>
          </div>
          <div class="item rounded mt-[5px]">
            <div class="flex items-center">
              <el-icon class="mx-[12px] text-12 text-[#52565E]"><Check /></el-icon>
              <big-icon class="mr-4" />
              <div>将图标与网格对齐</div>
            </div>
          </div>
        </div>
        <div class="item mb-0 rounded mt-[5px]">
          <div class="flex items-center">
            <el-icon class="mx-[12px] text-12 text-[#52565E]"><Check /></el-icon>
            <big-icon class="mr-4" />
            <div>显示桌面图标</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { usePanelStore } from '@/store/panel'
import BigIcon from '@/components/icon/big.vue'
import MiddleIcon from '@/components/icon/middle.vue'
import SmallIcon from '@/components/icon/small.vue'
import AutoSortIcon from '@/components/icon/AutoSort.vue'

const panel = usePanelStore()
const props = defineProps({
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  }
})

const style = computed(() => {
  return {
    left: props.left + 'px',
    top: props.top + 'px'
  }
})

</script>

<style lang="less">
.slide-down-enter-active {
  transition: all 0.16s linear;
  top: 0;
}
.slide-down-leave-active {
  display: none;
}
.slide-down-enter-from {
  top: -213px;
}
.slide-down-leave-to {
  display: none;
}
.view-menu {
  height: 213px;
  overflow: hidden;
  &__content {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: 6px;
    position: absolute;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      margin-bottom: 4px;
      font-size: 14px;
      padding-right: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>