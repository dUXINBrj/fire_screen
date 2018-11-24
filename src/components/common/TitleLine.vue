<template>
  <div class="content flex align-center">
    <div class="left"></div>
    <div class="line"></div>
    <div class="right"></div>
  </div>
</template>
<style scoped>
.content {
  width: 100%;
  height: 6px;
  position: relative;
}
.line {
  width: 100%;
  height: 2px;
  background: -webkit-linear-gradient(right, rgba(10, 226, 199, 0),rgba(10, 226, 199, 1));
  background: -o-linear-gradient(left, rgba(10, 226, 199, 0), rgba(10, 226, 199, 1));
  background: -moz-linear-gradient(left, rgba(10, 226, 199, 0), rgba(10, 226, 199, 1));
  background: linear-gradient(to left, rgba(10, 226, 199, 0), rgba(10, 226, 199, 1));
}
.left {
  height: 6px;
  width: 6px;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(10, 226, 199, 1);
}
.right {
  height: 6px;
  width: 6px;
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(10, 226, 199, 0);
}
</style>
