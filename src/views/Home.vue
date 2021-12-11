<template>
  <div class="home">
    <HPost :post="welcomeScreen" />
    <div class="containerX flexCenter justify-between flex-col p-5 capitalize">
      <div class="blog-cards w-full">
        <h1 class="md:text-3xl text-2xl pl-2 font-semibold">Recent Blogs</h1>
        <div class="blogCards-container">
          <BlogCard
            :post="post"
            v-for="(post, index) in blogRecentPosts"
            :key="index"
          />
        </div>
      </div>
    </div>
    <HRegisterSection />
  </div>
</template>

<script>
import HPost from "../components/HPost.vue";
import HRegisterSection from "../components/HRegisterSection.vue";
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "home",
  components: { HPost, HRegisterSection, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Share your happy moments with the world.",
        description:
          "VBlog is a short-form, video-sharing app that allows users to create and share videos, on any topic.",
        welcomeScreen: true,
        photo: "share-happinesse",
      },
    };
  },
  computed: {
    blogRecentPosts() {
      return this.$store.getters.blogRecentPosts;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
