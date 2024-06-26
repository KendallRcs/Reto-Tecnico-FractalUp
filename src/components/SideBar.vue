<template>
  <div>
    <b-button class="menu-btn" @click="toggleSidebar()">
      <b-icon icon="list"></b-icon>
    </b-button>
    <div class="sidebar">
      <nav>
        <img src="../assets/img/logo.png" class="logo">
        <router-link to="/" class="link"><span>Home</span></router-link>
        <router-link to="/second" class="link">Segunda</router-link>
        <router-link to="/third" class="link">Tercera</router-link>
      </nav>
    </div>

    <div class="sidebar-responsive hidden">
      
      <nav v-if="isSidebarVisible">
        <b-button @click="toggleSidebar()">
          <b-icon icon="x-lg"></b-icon>
        </b-button>
        <img src="../assets/img/logo.png" class="logo">
        <router-link to="/" class="link"><span @click="toggleSidebar()">Home</span></router-link>
        <router-link to="/second" class="link"><span @click="toggleSidebar()">Segunda</span></router-link>
        <router-link to="/third" class="link"><span @click="toggleSidebar()">Tercera</span></router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      isSidebarVisible: false,
      showMenu: false
    }
  },
  methods: {
    toggleSidebar() {
      console.log("toggleSidebar")
      const sidebar = document.querySelector('.sidebar-responsive')
      if(sidebar){
        if (!this.showMenu) {
          this.showMenu = !this.showMenu;
          sidebar.classList.remove('hidden');
        } else {
          this.showMenu = !this.showMenu;
          sidebar.classList.add('hidden');
        }
      }
      this.isSidebarVisible = !this.isSidebarVisible
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 25vw;
  height: 100vh;
  background-color: #009cff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.sidebar-responsive{
  display: none;
}
.hidden {
  transform: translateX(-1000px) !important;
  transition: all 0.6s ease;
}
.menu-btn {
  display: none;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
}
.link{
  transition: all 0.3s ease;
}
.link:hover{
  background-color: white;
  color: #009cff;
  border-radius: 5px;

}
@media screen and (max-width: 768px){
  .sidebar{
    display: none;
  }
  .menu-btn {
    display: block;
    position: fixed;
    top: 25px;
    left: 10px;
    z-index: 999;
    
  }
  .sidebar-responsive{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background-color: #009cff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.6s ease;
  }
  .logo{
    width: 40vw;
  }
}
</style>
