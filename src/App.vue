<template>
  <div id="app">
    <div class="head">
      <p class="name">INFINITY BADMINTON CLUB</p>
      <img class="logo" src="./assets/logo.jpeg"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @px2rem: 144rem;
.head {
  height: 80/@px2rem;
  position: relative;
  /*<!--border-bottom: solid 4/@px2rem #5cadff;-->*/
  background-color: #fff;
  color: #000;
  border-bottom: solid 4/@px2rem #dcdee2;
  .name {
    font-size: 28/@px2rem;
    font-weight: 600;
    height: 100%;
    line-height: 80/@px2rem;
    padding-left: 80/@px2rem;
  }
  .logo {
    position: absolute;
    left: 20/@px2rem;
    top: 15/@px2rem;
    width: 50/@px2rem
  }
}

</style>
