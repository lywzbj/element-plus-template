<template>
  <div class="top">
    <div class="content">
      <div class="left" >
        <img class="log" src="@/assets/vue.svg" alt="加载中"/>
        <p>xxxxxx</p>

        <div class="menu">
          <el-menu
              :default-active="1"
              mode="horizontal"
          >
            <el-menu-item index="1">主页</el-menu-item>
            <el-menu-item index="2" >项目</el-menu-item>
            <el-menu-item index="3" >清单</el-menu-item>
          </el-menu>
        </div>

      </div>



      <div class="right">
        <p class="help">个人中心</p>
        <p class="login">注销</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">







</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
      .menu {
        width: 280px;
        margin-left: 20px;
      }
    }




    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      .help {
        margin-right: 10px;
      }
    }




  }


}



</style>