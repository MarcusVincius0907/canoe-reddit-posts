
<template>
  <navbar
    class="w-full bg-white h-20 flex justify-center items-center px-2 py-1 custom-borders-top custom-borders-bottom"
  >
    <div class="w-full max-w-5xl flex items-center">
      <div class="w-full max-w-80">
        <img class="h-16" src="../assets/logo.png" alt="canoe logo" />
      </div>
      <v-text-field
        v-model="search"
        density="compact"
        label="Enter a community..."
        prepend-inner-icon="mdi mdi-magnify"
        variant="outlined"
        flat
        hide-details
        single-line
      ></v-text-field>
    </div>
  </navbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ActionTypes } from "../store/modules/Posts/actions";

export default defineComponent({
  name: "header",
  setup() {
    return {
      search: ref(""),
      timeout: ref(0),
      postsLimit: 25,
    };
  },

  mounted() {
    this.search = this.$store.state.PostModule.community;
  },

  watch: {
    search(newVal) {
      if (newVal) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.$store.dispatch(
            ActionTypes.GET_POSTS_LIST,
            newVal,
            this.postsLimit
          );
        }, 500);
      }
    },
  },
});
</script>
