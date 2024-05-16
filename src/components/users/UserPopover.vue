<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          class="rounded-full bg-slate-200 h-8 w-8 flex justify-center items-center cursor-pointer"
        >
          <img
            :src="user ? user?.iconUrl : '../../assets/user-default.png'"
            alt=""
            width="20"
            height="20"
          />
        </div>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            :prepend-avatar="user?.iconUrl"
            :subtitle="`Born ${user?.birthDate}`"
            :title="user?.name"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="font-bold text-xl px-4">
          {{ user?.title }}
        </div>

        <v-divider></v-divider>

        <div class="flex px-4 text-lg gap-5 pb-2">
          <div class="flex flex-col">
            <div>Post Karma</div>
            <div>{{ user.postKarma }}</div>
          </div>
          <div class="flex flex-col">
            <div>Comment Karma</div>
            <div>{{ user.commentKarm }}</div>
          </div>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { ActionTypes } from "../../store/modules/Users/actions";

export default defineComponent({
  name: "user-popover",
  props: {
    userName: {
      required: true,
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      fav: ref(true),
      menu: ref(false),
      message: ref(false),
      hints: ref(true),
    };
  },

  mounted() {
    if (!this.user) {
      this.$store.dispatch(ActionTypes.GET_USER_BY_NAME, this.userName);
    }
  },

  computed: {
    user() {
      return this.$store.state?.UsersModule?.userList.find(
        (user) => user.name === this.userName
      );
    },
  },
});
</script>