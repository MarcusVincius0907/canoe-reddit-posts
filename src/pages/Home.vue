
<template>
  <div>
    <Header></Header>
    <Post></Post>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Post from "../components/posts/Post.vue";

export default defineComponent({
  name: "home",
  components: { Header, Post },
});
</script>

<style scoped>
</style>
