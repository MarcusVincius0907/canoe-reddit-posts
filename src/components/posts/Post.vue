
<template>
  <main class="w-full max-w-5xl m-auto mt-20">
    <PostsList></PostsList>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostFilter from "./PostFilter.vue";
import PostsList from "./PostsList.vue";

export default defineComponent({
  name: "Post",
  components: { PostsList, PostFilter },
});
</script>