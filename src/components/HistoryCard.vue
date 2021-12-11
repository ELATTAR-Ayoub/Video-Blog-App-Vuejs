<template lang="">
    <div
        class="HistoryCard w-full flexCenter items-start p-4 m-2 transition-all relative  flex-col cursor-pointer border border-secondary border-opacity-50 text-primary bg-secondary hover:bg-secondary-dark rounded-lg">
        <p>You <span class=" font-semibold">{{post.historyType}}d</span> a blog <span
                class="font-bold">"{{post.blogTitle}}"</span> at <span class=" font-medium">{{new
                Date(post.date).toLocaleString('en-us',
                {dateStyle: "full"})}}</span></p>
        <router-link :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}" class="main-btn p-2 mt-2">vue that
            blog page</router-link>
    </div>

</template>

<script>
export default {
  name: "HistoryCard",
  props: ["post"],
  component: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
</style>