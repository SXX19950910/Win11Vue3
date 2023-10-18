<template>
  <drag-app :icon="icon" icon-wdith="50" icon-height="50" name="Microsoft Edge" title="浏览 Web" @dblclick.stop="handleOpen"></drag-app>
  <drag-window v-if="app.edge.visible" :is-mini="app.edge.mini" ref="dragWin" handle-class="edge-app__header" @full="onFullChange" @end="onEnd" @resizing="onResize">
    <div class="edge-app rounded-[10px] overflow-hidden">
      <div class="edge-app__header flex items-center justify-between">
        <div class="left-tags pl-2 pt-2 h-full flex">
          <div class="tag-item text-12 bg-[#F7F7F7] h-full flex items-center justify-center px-2 rounded-t-[5px]">
            <div class="name max-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis">{{ state.url || oldUrl }}</div>
            <div class="ml-5 close-btn hover:bg-[#D0D0D0] w-[18px] h-[18px] flex items-center justify-center rounded-[2px]">
              <el-icon size="12"><CloseBold /></el-icon>
            </div>
          </div>
          <div class="add-btn text-17 w-[28px] h-[30px] flex items-center ml-1 rounded-sm justify-center hover:bg-[#ADADAD]">
            <el-icon><Plus /></el-icon>
          </div>
        </div>
        <div class="right-control flex">
          <div class="hide flex items-center justify-center h-[40px] w-[46px] hover:bg-[#B8B8B8]" @click.stop="handleMini">
            <div class="line w-[12px] h-[1px] bg-black"></div>
          </div>
          <div class="full flex items-center justify-center h-[40px] w-[46px] hover:bg-[#B8B8B8]" @click.stop="handleToggleFull">
            <mini-icon v-if="state.isFull" />
            <div v-else class="w-[10px] h-[10px] border border-black rounded-sm" />
          </div>
          <div class="close flex items-center justify-center h-[40px] w-[46px] hover:bg-[#E81123] hover:text-white" @click.stop="handleClose">
            <el-icon><Close /></el-icon>
          </div>
        </div>
      </div>
      <div class="edge-app__nav bg-[#F7F7F7] py-1 px-2">
        <div class="left-control flex items-center">
          <div class="back item rounded-sm text-black">
            <i class="iconfont icon-houtui text-[22px]"></i>
          </div>
          <div class="refresh item" @click="handleRefresh">
            <el-icon size="20">
              <Close v-if="state.loading" />
              <RefreshRight v-else />
            </el-icon>
          </div>
          <div class="home item" @click="handleGoHome">
            <i class="iconfont icon-zhuye-xian text-18"></i>
          </div>
        </div>
        <input v-model="link" class="search-box ml-2" placeholder="请输入关键字或URL" @keydown.enter="handleSearch" />
        <div class="more-box h-[32px] w-[40px] flex items-center justify-center ml-2 hover:bg-[#E4E4E4] rounded-sm">
          <el-icon size="12"><MoreFilled /></el-icon>
        </div>
      </div>
      <div class="edge-app__content">
        <iframe ref="iframe" class="iframe w-full h-full" :src="state.url" @load="onWebLoad" />
        <div v-if="state.resizing" class="absolute h-full w-full top-0 left-0" />
      </div>
    </div>
  </drag-window>
</template>

<script setup>
import {ref, reactive, toRaw} from 'vue'
import { sleep } from "@/utils";
import isUrlHttp from 'is-url-http'
import { useAppStore } from '@/store'
import MiniIcon from '@/components/icon/mini.vue'
import DragApp from '@/components/DragApp/index.vue'
import DragWindow from '@/components/DragWindow/index.vue'
import icon from '@/assets/images/app/edge.png'

const dragWin = ref(null)
const Edge = 'edge'
const iframe = ref(null)
const homeUrl = 'https://cn.bing.com/'

const state = reactive({
  isFull: false,
  loading: true,
  resizing: false,
  url: homeUrl
})

const oldUrl = ref('')
const link = ref(homeUrl)

const app = useAppStore()

const onFullChange = (full) => {
  state.isFull = full
}

const handleMini = () => {
  app.toggleMini(Edge)
  app.focusTask(Edge)
}

const handleToggleFull = () => {
  dragWin.value.toggleFullScreen()
}

const handleOpen = () => {
  app.focusTask(Edge)
  app.open(Edge)
}

const handleSearch = () => {
  state.loading = true
  if (isUrlHttp(link.value)) {
    state.url = link.value
  } else if (!link.value) {
    state.url = homeUrl
  } else {
    state.url = `https://www.bing.com/search?q=${link.value}`
  }
  link.value = toRaw(state.url)
}

const onWebLoad = () => {
  state.loading = !Boolean(state.url)
}

const onResize = () => {
  state.resizing = true
}

const onEnd = () => {
  state.resizing = false
}

const handleRefresh = async () => {
  oldUrl.value = toRaw(state.url)
  state.loading = true
  state.url = ''
  await sleep(500)
  state.url = oldUrl.value.toString()
}

const handleGoHome = () => {
  if (link.value === homeUrl && state.url === homeUrl) return
  link.value = homeUrl
  state.loading = true
  state.url = homeUrl
}

const handleClose = () => {
  app.close(Edge)
}

</script>

<style lang="less">
.edge-app {
  border: 1px solid #889BA8;
  height: 100%;
  &__header {
    height: 40px;
    background-color: #CDCDCD;
    .right-control {
      .full {
        &:hover {
          .mini-icon__top {
            background-color: #B8B8B8;
          }
        }
      }
    }
  }
  &__nav {
    display: flex;
    border-bottom: 1px solid #BFBFBF;
    .left-control {
      .item {
        width: 40px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        &:hover {
          background-color: #E4E4E4;
        }
      }
    }
    .search-box {
      height: 32px;
      width: 100%;
      background-color: white;
      border-radius: 32px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      font-size: 14px;
      padding-left: 15px;
      outline-color: #98BAEE;
    }
  }
  &__content {
    height: calc(100% - 81px);
    position: relative;
    .iframe {
      background-color: white;
    }
  }
}
</style>