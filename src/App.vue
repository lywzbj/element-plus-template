

<template>
  <div class="container">
    <div class="container">
      <Top />
      <div class="content">
        <router-view />
      </div>
      <Bottom />
    </div>
  </div>
</template>


<script setup lang="ts">
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 800px;
  }




}
</style>
