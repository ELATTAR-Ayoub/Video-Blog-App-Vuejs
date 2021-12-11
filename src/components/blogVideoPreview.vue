<template lang="">
    <div class='modale'>
        <div class='flex justify-center p-5 items-center flex-col min-w-1/2 max-w-3/4 md:max-w-1/2 bg-primary text-secondary shadow-lg rounded-lg'> 
            <video id="blogVideo" class="w-full" :src="this.blogVideo" controls ></video>
            <button @click="closePreview" class='w-1/2 p-4 m-4 rounded-lg bg-secondary text-primary hover:bg-sideColor'>Close</button>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    closePreview() {
      document.getElementById("blogVideo").pause();
      this.$store.commit("openBlogVideoPreview");
    },
  },
  computed: {
    blogVideo() {
      return this.$store.state.blogVideoFileURL;
    },
  },
};
</script>
<style lang="scss">
.modale {
  @apply absolute z-30 top-0 left-0 flex justify-center items-start md:items-center pt-52 md:pt-0 w-full h-full bg-secondary bg-opacity-50;
}
</style>