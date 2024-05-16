
<template>
  <div>
    <Header></Header>
    <Alert></Alert>
    <Post></Post>
    <Loader></Loader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Post from "../components/posts/Post.vue";
import Loader from "../components/Loader.vue";
import Alert from "../components/Alert.vue";

export default defineComponent({
  name: "home",
  components: { Header, Post, Loader, Alert },
});
</script>

<style scoped>
</style>
