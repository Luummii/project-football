<template lang="html">
  <nav>
    <div class="logo">
      <img src="../assets/img/logo.png">
    </div>      
    <ul>
      <router-link v-for="(item, index) in itemsMenu" tag="li" :key="index" :to="item.path">{{ item.name }}</router-link>
    </ul>    
  </nav>
</template>

<script>
import routes from '../routes'

export default {    
  data () {
    return {
      itemsMenu: routes      
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo
  text-align center
  img
    width 40px
    height 40px
    margin-top 10px 

nav
  background-color #2D2E40
  font-size 16px
  position fixed
  top 0
  left 0
  bottom 0
  width 180px

  ul
    padding-left 10px

    li
      color #005954
      list-style none
      margin-top 8px

    li:hover
      color #00B5AC
      cursor pointer 
      transition .8s

    li.router-link-active 
      color #00B5AC
</style>