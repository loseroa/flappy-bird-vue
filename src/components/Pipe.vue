<template>
  <div>
   <div v-for="(pipe, index) in getPipesList" :key="index">
      <div class="pipe top"
      :style="{
      left: getLeftPosition + index*170 + 'px',
      top: pipe.topHeight + 'px'}" />
      <div class="pipe bottom"
      :style="{
      left: getLeftPosition + index*170 + 'px',
      top: pipe.topHeight + 400 + 'px'}" />
   </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pipe',
  computed: {
    ...mapGetters({
      getPipesList: 'pipe/getPipesList',
      getLeftPosition: 'pipe/getLeftPosition'
    })
  }
}
</script>
<style scoped>
.pipe {
  position: absolute;
  width: 52px;
  height: 300px;
  transition: left 200ms;
}
.top {
  transform: scaleY(-1);
  background: url('../assets/sprites/pipe-green.png');
}

.bottom {
  background: url('../assets/sprites/pipe-green.png');
}
</style>
