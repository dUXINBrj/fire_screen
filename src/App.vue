<template>
  <div id="Container">
    <transition mode="out-in" enter-active-class="animated zoomIn">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
#Container {
  width: 100%;
  height: 100%;
  background: #efefef;
}
</style>
