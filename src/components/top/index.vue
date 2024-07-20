<template>
  <div class="top">
    <div class="content">
      <div class="left" >
        <img class="log" src="@/assets/vue.svg" alt="加载中"/>
        <p>礼金管理</p>
        <ul class="menu">
          <li :class="currentIndex === 0 ? 'active' : ''"  @click="setIndex(0,'/project')">礼金项目</li>
          <li :class="currentIndex === 1 ? 'active' : ''"  @click="setIndex(1,'/item')">礼金明细</li>
        </ul>
      </div>



      <div class="right">
        <p class="help">个人中心</p>
        <p class="login">注销</p>
      </div>`
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
let currentIndex = ref<number>(0)
let $router = useRouter();

const setIndex = (index:number,path:string) => {
  $router.push({path: path})
  currentIndex.value = index;
}






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
        display: flex;
        li {
          margin-left: 10px;
          color: #55a6fe;
        }
        li:active {
          border-bottom: solid 1px cadetblue;
        }
        .active {
          border-bottom: solid 1px cadetblue;
        }
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