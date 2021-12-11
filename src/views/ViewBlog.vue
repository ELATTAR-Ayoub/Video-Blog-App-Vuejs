<template lang="">
    <div class="flexCenter justify-start flex-col w-full pb-12" v-if="currentBlog">
        <div class='flexCenter w-full bg-secondary-dark'>
        <video class="md:w-4/5 w-full" controls :poster="this.currentBlog[0].blogCoverPhoto" :src="this.currentBlog[0].blogVideo" alt="blogTitle"></video>
        </div>
        <div class="md:w-4/5 w-full flexCenter justify-start md:px-0 px-4 pt-3">
            <div class="relative  rounded-full flexCenter overflow-hidden w-16 h-16 m-2 mr-0 ">
                <img v-show="this.currentBlog[0].profilePicture" class="w-full rounded-full" :src="this.currentBlog[0].profilePicture" alt="creater profile picture">
           <span v-show="!this.currentBlog[0].profilePicture" class="
              bg-sideColor rounded-full
              text-primary w-14 h-14
              flexCenter cursor-pointer
              uppercase profilePictureModalSpan
            ">{{this.currentBlog[0].profileUsername.slice(0, 2) }}</span>
            </div>
            <div class="w-full text-secondary ml-2">
                <h2 class="no-overflow-2lines font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl w-full">{{this.currentBlog[0].blogTitle}}</h2>
                <p class="no-overflow text-base md:text-lg w-full text-opacity-50">created by: {{this.currentBlog[0].profileUsername}}</p>
                <p class="no-overflow text-sm md:text-base  w-full text-opacity-50">{{new Date(this.currentBlog[0].date).toLocaleString('en-us',
                    {dateStyle: "long"})}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "ViewBlog",
  components: {},
  data() {
    return {
      currentBlog: null,
      playing: false,
      error: null,
      errorMessage: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogid;
    });
    console.log(this.currentBlog[0].blogVideo);
  },
  computed: {},
};
</script>
<style lang="scss">
</style>