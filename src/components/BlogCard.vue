<template lang="">
  <div class="flexCenter relative">
    <div v-show="this.$store.state.deleteWarning"
      class="p-2 z-50 shadow rounded-lg absolute w-3/4 bg-primary text-secondary">
      <h2 class="text-center font-semibold text-red-500 text-3xl">Warning</h2>
      <p class=" text-lg font-medium text-center">Are you sure you want to delete <span
          class="font-semibold">"{{post.blogTitle}}"</span> and all its
        history with it?
      </p>
      <div class="flexCenter mt-4">
        <button @click="toggleDeleteWarning"
          class="main-btn w-1/2 mr-2 py-4 px-0 bg-secondary hover:bg-secondary-dark ">Cancel</button>
        <button @click="deletePost" class="main-btn w-1/2 py-4 px-0 bg-red-500 hover:bg-red-700">Delete it</button>
      </div>
    </div>
    <div
      class="bloCard flexCenter p-2 transition-all relative  flex-col cursor-pointer bg-white hover:bg-gray-100 rounded-lg">

      <div v-show="editPost" class='flexCenter absolute top-0 right-0 m-4 bg-transparent'>

        <div @click="updateBlog"
          class="transition-all flexCenter rounded-full p-4 m-1 bg-secondary bg-opacity-90 hover:bg-sideColor">
          <eva-icon fill='#fff' width='14px' height='14px' name="edit"></eva-icon>
        </div>
        <div @click="toggleDeleteWarning"
          class="transition-all flexCenter rounded-full p-4 m-1 bg-secondary bg-opacity-90 hover:bg-sideColor">
          <eva-icon fill='#fff' width='14px' height='14px' name="trash-2-outline"></eva-icon>
        </div>

      </div>
      <router-link :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}" class=''>
        <div class="flexCenter bg-cover w-full max-h-20rem rounded-lg overflow-hidden">
          <img class="w-full rounded-lg" :src="post.blogCoverPhoto" alt="Blog Cover Photo">
        </div>
        <div class="w-full flexCenter ">
          <div class="w-full text-secondary">
            <h2 class="no-overflow-2lines font-semibold text-lg w-full">{{post.blogTitle}}</h2>
            <p class="no-overflow text-base w-full text-opacity-50">{{post.profileUsername}}</p>
            <p class="no-overflow text-sm w-full text-opacity-50">{{new Date(post.date).toLocaleString('en-us',
              {dateStyle: "long"})}}</p>
          </div>
            <div class='rounded-full overflow-hidden w-16 h-16 mx-auto relative flexCenter m-2 mr-0'>
            <img v-show="post.profilePicture" :src="post.profilePicture"
              alt="creater profile picture">
            <span v-show="!post.profilePicture" class="
              bg-sideColor rounded-full
              text-primary w-14 h-14
              flexCenter cursor-pointer
              uppercase profilePictureModalSpan
            ">{{post.profileUsername.slice(0, 2) }}</span>
          </div>

        </div>
      </router-link>
    </div>
  </div>



</template>

<script>
export default {
  name: "BlogCard",
  props: ["post"],
  component: {},
  computed: {
    editPost() {
      return this.$store.state.editPost;
    },
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.post.blogID);
    },
    updateBlog() {
      this.$router.push({
        name: "UpdateBlog",
        params: { blogid: this.post.blogID },
      });
    },
    toggleDeleteWarning() {
      this.$store.commit("openDeleteWarning");
    },
  },
};
</script>

<style lang="scss">
.bloCard {
  min-height: 150px;
}

.bloCard {
  @apply w-semi-big md:w-full;
}
</style>