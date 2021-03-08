<template lang="pug">
  #app
    #nav
      router-link(to="/") ホーム |
      router-link(to="/fixedcost")  固定費
      signOutBtn  
      router-view
</template>

<script>
import signOutBtn from './components/SignOut/SignOutBtn.vue'
export default {
  components: {
    signOutBtn
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 100px;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 18px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
      font-size: 22px;
    }
  }
}
</style>
