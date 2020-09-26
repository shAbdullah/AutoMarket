<template>
  <div>
        <app-header />
         <router-view></router-view>
  </div>

    
</template>

<script>
import Header from './components/header/header.vue'
export default {
   data () {
      return {
     
      }
    },
    components:{
        'app-header':Header
    },
  computed: {
     
    },
    methods: {
    
    }}
</script>
