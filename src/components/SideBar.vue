<template>
  <div class="sidebar">
    <nav>
      <img src="../assets/logo.png" class="logo">
      <router-link to="/" class="link"><span>Home</span></router-link>
      <router-link to="/second" class="link">Segunda</router-link>
      <router-link to="/third" class="link">Tercera</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
}
</script>

<style scoped>
.sidebar{
  
  width: 25vw;
  height: 100vh;
  background-color: #009cff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.logo{
  width: 150px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: white;
}
</style>
