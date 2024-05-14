
<template>
  <div>
    <Header></Header>
    <PostsList></PostsList>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Header from '../components/Header.vue'
  import PostsList from '../components/posts/PostsList.vue'

  export default defineComponent({
    name: 'home',
    components: { Header, PostsList },
    
  })
</script>

<style scoped>

</style>
