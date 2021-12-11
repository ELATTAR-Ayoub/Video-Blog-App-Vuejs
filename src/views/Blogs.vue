<template lang="">
    <div class="w-full relative">
        <div class="containerX  justify-between flex-col p-5 capitalize">
            <div class='flexCenter justify-between'>
            </div>
            <div class="blogCards-container">
                <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
            </div>
        </div>
    </div>
</template>
<script>
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "blogs",
  components: { BlogCard },
  methods: {},
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
  },
  beforeDestroy() {
    this.$store.commit("toggleEditPost", false);
  },
};
</script>
<style lang="scss">
.blogsConainer {
  @apply pt-4;
}
</style>