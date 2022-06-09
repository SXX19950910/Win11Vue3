<template>
  <div id="bottom-handle" class="border-t">
  </div>
</template>

<script>
export default {
  name: 'BottomHandle',
  data() {
    return {}
  }
}
</script>

<style lang="less">
#bottom-handle {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: sans-serif;
  text-align: center;
  line-height: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  padding: 24px 40px;
}
</style>