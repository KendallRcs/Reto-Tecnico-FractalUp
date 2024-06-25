<template>
  <div id="app">
    <SideBar/>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #c6f4ff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: black;
  font-weight: bold;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
}
.main-content {
  width: 75vw;
  margin-left: 25vw;
  overflow-y: auto;
  padding: 1rem;
}
.container{
  width: 100%;
  margin: 1rem auto 0 auto;
}
</style>
