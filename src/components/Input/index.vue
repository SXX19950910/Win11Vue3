<template>
  <div class="search-input flex items-center bg-white rounded overflow-hidden py-2 px-4">
    <div class="shrink-0 text-[12px] pr-4">
      <i class="iconfont icon-sousuo"></i>
    </div>
    <input class="search-input__inner" placeholder="搜素网页" @focus="onfocus" @blur="onblur" />
    <div v-if="isActive" class="search-input__line"></div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    onfocus() {
      this.isActive = true
    },
    onblur() {
      this.isActive = false
    }
  }
}
</script>

<style lang="less">
.search-input {
  background-color: white;
  position: relative;
  &__inner {
    width: 100%;
    outline: 0;
    border: 0;
    &::placeholder {
      font-size: 14px;
    }
  }
  &__line {
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgb(18, 103, 52);
  }
}
</style>
