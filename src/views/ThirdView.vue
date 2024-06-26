<template>
  <div>
    <div class="header-responsive">
      <div class="d-flex justify-content align-items-center">
        <p class="h1 mb-2 menu-btn" style="font-size: 40px;" @click="callToggleSidebar()"><b-icon icon="list"></b-icon></p>
      </div>
      <img src="../assets/img/logo.png" class="logo-responsive">
    </div>
    <div class="container">
      <h1>Esta es la tercera vista</h1>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueBus from 'vue-bus';

Vue.use(VueBus);

export default {
  name: 'ThirdView',
  methods: {
    callToggleSidebar() {
      this.$bus.$emit('toggleSidebar');
    }
  }
}
</script>

<style scoped>

.header-responsive{
    display: none;
}
@media screen and (max-width: 768px){
  .header-responsive{
    display: flex;
    background-color: #009cff;
    padding: 1rem;
    height: 15vh;
    position: sticky;
    top: 0px;
    width: 100vw;
    z-index: 100;
  }
  .logo-responsive{
    height: 100%;
    margin: 0 auto;
    display: block;
  }
}
</style>