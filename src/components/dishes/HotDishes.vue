<template>
  <DishesList :fatherName="name"></DishesList>
</template>

<script>
  import DishesList from './DishesList'
  export default {
    data() {
      return {
        dishes: [],
        name:'热菜'
      }
    },
    components: {
      DishesList
    }
    
  }
</script>

<style>
</style>
