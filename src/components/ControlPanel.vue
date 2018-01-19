<template lang="html">
  <nav> 
    <ul>
      <li>
        <button @click="$emit('go')">GO</button>
      </li>
    </ul>    
  </nav>
</template>

<script>

export default {    
  data () {
    return {
         
    }
  }
}
</script>

<style lang="stylus" scoped>

nav
  background-color #2D2E40
  font-size 16px
  position fixed
  right 0
  left 180px
  bottom 0
  height 50px

  ul
    padding-left 10px

    li
      list-style none


</style>