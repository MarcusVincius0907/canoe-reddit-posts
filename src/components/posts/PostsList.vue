
<template>
  <v-card flat class="relative">
    <div class="w-full max-w-44 absolute">
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
    <v-data-table class="post-table" :items="items">
      <template v-slot:header.customData>
        <div></div>
      </template>
      <template v-slot:item.customData="{ item }">
        <div class="w-full flex flex-col my-4">
          <div class="flex justify-between">
            <div class="flex gap-4 items-center">
              <div
                class="rounded-full bg-slate-200 h-8 w-8 flex justify-center items-center"
              >
                <img
                  src="../../assets/user-default.png"
                  alt=""
                  width="20"
                  height="20"
                />
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
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { useDate } from "vuetify";
import { convertLightPostToTableData } from "../../helpers/post.helper";
import { ActionTypes } from "../../store/modules/Posts/actions";
import moment from "moment";

export default {
  data() {
    return {
      search: "",

      items: [
        {
          customData: {
            userName: "marcus",
            date: "Jan 1, 2024",
            title:
              "Looking for books, videos, or other resources on specific or general topics? Ask here!",
            descripton: "",
          },
          date: "",
        },
        {
          customData: {
            userName: "joao",
            date: "Jan 1, 2024",
            title: "The art of computer progamming by Donald E. Knuth",
            descripton:
              "The art of computer programming is a book worth reading as many students and professionals of computer science claim.\n\nI am thinking of starting the book. But there is a lot of confusion regarding the editions, volumes, and fascicles of the book. \n\nCan anyone please help in making sense of the order of this book series?\n\nThe latest edition of volume 1 is 3rd published in 1997. \n\nWhat about volume 2 and volume 3?\n\nAnd what's with the fascicles of volume 4? And how many volume 4s are there? I have found upto volume 4c. \n\nThese books arent mentioned on Amazon. Even on Donald's publisher account.\n\nA quick Google search reveals that there are 7 volumes of the book series. \n\nI read somewhere that volume 4b and 4c are volume 6 and 7. \n\nCan anyone help make sense of all this?",
          },
          date: "",
        },
      ],
    };
  },

  mounted() {
    this.$store.dispatch(ActionTypes.GET_POSTS_LIST, "computerscience", 25);
  },

  methods: {
    goToLink(url) {
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
};
</script>

<style>
.post-table .v-table__wrapper {
  overflow: hidden !important;
}
</style>