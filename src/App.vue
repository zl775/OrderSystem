<template>
  <div id="app">
    <SideBar></SideBar>
    <div id="content">
      <nav class="conNav"></nav>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
  body,
  p {
    margin: 0;
  }

  body {
    background: url(./assets/images/bg.jpg) center top no-repeat;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  #app {
    display: flex;
    width: 100%;
  }

  .logo {
    height: 120px;
  }

  #content {
    width: 100%;
    position: relative;
  }

</style>
