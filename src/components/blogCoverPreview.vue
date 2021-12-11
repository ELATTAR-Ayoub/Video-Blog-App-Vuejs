<template lang="">
    <div class='modale'>
        <div class='flex justify-center p-5 shadow-lg items-center flex-col min-w-1/2 min-h-1/3 max-w-3/4 md:max-w-1/2 bg-primary text-secondary rounded-lg'> 
            <img :src="this.blogCoverPhoto" alt="Blog Cover Photo">
            <button @click="closePreview" class='w-1/2 p-4 m-4 rounded-lg bg-secondary text-primary hover:bg-sideColor'>Close</button>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    closePreview() {
      this.$store.commit("openBlogPhotoPreview");
    },
  },
  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
  },
};
</script>
<style lang="scss">
.modale {
  @apply absolute z-30 top-0 left-0 flex justify-center items-center w-full h-full bg-secondary bg-opacity-50;
}
</style>