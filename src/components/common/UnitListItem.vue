<template>
  <el-col :span="12">
    <div class="item flex" :class="{ seled:selected, fire:fire}" @click="handleclick">
      <span>
        <slot></slot>
      </span>
    </div>
  </el-col>
</template>
<script>
export default {
  props: ['selected', 'unitId', 'fire', 'unitName', 'buildingType'],
  methods: {
    handleclick() {
      let data = {
        id: this.unitId,
        name: this.unitName,
        buildingType: this.buildingType
      };
      this.$emit('click', data);
    }
  }
};
</script>
<style scoped>
.el-col-12 {
  text-align: center;
  padding-bottom: 5px;
  height: 20%;
}
.item {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #0e568e;
  align-items: center;
  justify-content: center;
  background: #1b2830;
  cursor: pointer;
  width: 100%;
  height: 100%;
  transition: background 0.2s ease-in-out;
}
.item:hover {
  background: #0f8baf;
  border: 1px solid #0e568e;
}
.seled {
  background: #0f8baf !important;
  border: 1px solid #0e568e;
}
.fire {
  background: rgb(124, 29, 33, 0.8);
  border: 1px solid rgb(173, 30, 37);
}
.item span {
  max-width: 100%;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
