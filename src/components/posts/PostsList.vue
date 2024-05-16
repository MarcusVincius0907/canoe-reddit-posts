
<template>
  <v-card flat class="relative">
    <div class="w-full max-w-44 absolute pl-4">
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi mdi-magnify"
        variant="outlined"
        flat
        hide-details
        single-line
      ></v-text-field>
    </div>
    <v-data-table
      class="post-table"
      :items="items"
      :page="page"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:header.customData>
        <div></div>
      </template>
      <template v-slot:item.customData="{ item }">
        <div class="w-full flex flex-col my-4">
          <div class="flex justify-between">
            <div class="flex gap-4 items-center">
              <div>
                <UserPopover :userName="item.customData.userName"></UserPopover>
              </div>
              <div class="font-bold text-gray-600">
                {{ item.customData.userName }}
              </div>
              <div class="italic">{{ item.customData.date }}</div>
            </div>
          </div>
          <div class="mt-5">
            <div class="text-2xl font-bold">
              {{ item.customData.title }}
            </div>
            <div v-if="item?.customData?.description" class="mt-3">
              {{ item.customData.description }}
            </div>
          </div>
          <div class="mt-5 flex gap-4">
            <div
              class="flex bg-gray-100 rounded-2xl max-w-24 justify-between p-2 gap-2 cursor-pointer hover:opacity-70"
            >
              <div>
                <v-icon icon="mdi mdi-arrow-up"></v-icon>
              </div>
              <div class="font-bold">{{ item.customData.score }}</div>
              <div>
                <v-icon icon="mdi mdi-arrow-down"></v-icon>
              </div>
            </div>
            <div
              class="flex bg-gray-100 rounded-2xl max-w-20 justify-center gap-2 py-2 px-4 cursor-pointer hover:opacity-70"
            >
              <div>
                <v-icon icon="mdi mdi-message-outline"></v-icon>
              </div>
              <div class="font-bold">{{ item.customData.comments }}</div>
            </div>
            <div
              class="flex bg-gray-100 rounded-2xl max-w-20 justify-center gap-2 py-2 px-6 cursor-pointer hover:opacity-70"
              @click="goToLink(item.customData.shareUrl)"
            >
              <div>
                <v-icon icon="mdi mdi-tray-arrow-up"></v-icon>
              </div>
              <div class="font-bold">Share</div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.date="{ item }">
        <div class="flex justify-end items-start mt-5 h-full">
          <v-icon icon="mdi mdi-dots-horizontal"></v-icon>
        </div>
      </template>

      <template v-slot:bottom>
        <div class="text-center pt-2 pb-10">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { convertLightPostToTableData } from "../../helpers/post.helper";
import { defineComponent, ref } from "vue";
import UserPopover from "../users/UserPopover.vue";

export default defineComponent({
  name: "post-list",
  components: { UserPopover },
  setup() {
    return {
      search: ref(""),
      items: ref([]),
      page: ref(1),
      itemsPerPage: ref(5),
    };
  },

  methods: {
    goToLink(url: string) {
      window.open(url, "_blank");
    },
  },

  computed: {
    posts() {
      if (this.$store.state.PostModule.postsList) {
        return convertLightPostToTableData(
          this.$store.state.PostModule.postsList
        );
      }
      return [];
    },

    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },

  watch: {
    posts: {
      handler(newVal) {
        this.items = [...newVal];
      },
      deep: true,
    },

    search(newVal) {
      if (newVal) {
        this.items = this.posts.filter(
          (post) =>
            post.customData.title
              .toLowerCase()
              .includes(newVal.toLowerCase()) ||
            post.customData.description
              .toLowerCase()
              .includes(newVal.toLowerCase())
        );
      }
    },
  },
});
</script>

<style>
.post-table .v-table__wrapper {
  overflow-y: hidden !important;
}
</style>