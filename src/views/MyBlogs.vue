<template lang="">
    <div class="w-full relative">
        <div class="containerX  justify-between flex-col p-5 capitalize">
            <div class='flexCenter justify-between'>
                <h1 class="md:text-3xl text-xl font-semibold">Your Published Blogs</h1>
                <div class="capitalize">
                    <label for="editpostcheckbox" class="toggle md:text-xl text-base">
                        <input type="checkbox" v-model="editPost" class="toggle__input" id="editpostcheckbox" />
                        <span class="toggle-track">
                            <span class="toggle-indicator">
                                <span class="checkMark">
                                    <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path
                                            d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z">
                                        </path>
                                    </svg>
                                </span>
                            </span>
                        </span>
                        toggle edit post</label>
                </div>
            </div>
            <div class="blogCards-container">
                <BlogCard :post="post" v-for="(post, index) in myBlogs" :key="index" />
            </div>
            <!-- <div v-show="!blogs" class="w-full h-full pt-small flexCenter opacity-80 text-4xl">
                <p>You have no blogs created yet...</p>
            </div> -->
        </div>
    </div>
</template>
<script>
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "blogs",
  data() {
    return {
      blogs: null,
    };
  },
  components: { BlogCard },
  methods: {},
  computed: {
    myBlogs() {
      return this.$store.getters.myPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
  },
  beforeDestroy() {
    this.$store.commit("toggleEditPost", false);
  },
};
</script>
<style lang="scss">
.toggle {
  align-items: center;
  border-radius: 100px;
  display: flex;
  font-weight: 700;
  margin-bottom: 16px;
}

.toggle:last-of-type {
  margin: 0;
}

.toggle__input {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.toggle__input:not([disabled]):active + .toggle-track,
.toggle__input:not([disabled]):focus + .toggle-track {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #121943;
}

.toggle__input:disabled + .toggle-track {
  cursor: not-allowed;
  opacity: 0.7;
}

.toggle-track {
  background: #e5efe9;
  border: 1px solid #5a72b5;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  height: 30px;
  margin-right: 12px;
  position: relative;
  width: 60px;
}

.toggle-indicator {
  align-items: center;
  background: #121943;
  border-radius: 24px;
  bottom: 2px;
  display: flex;
  height: 24px;
  justify-content: center;
  left: 2px;
  outline: solid 2px transparent;
  position: absolute;
  transition: 0.25s;
  width: 24px;
}

.checkMark {
  fill: #fff;
  height: 20px;
  width: 20px;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}

.toggle__input:checked + .toggle-track .toggle-indicator {
  background: #121943;
  transform: translateX(30px);
}

.toggle__input:checked + .toggle-track .toggle-indicator .checkMark {
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
}

@media screen and (-ms-high-contrast: active) {
  .toggle-track {
    border-radius: 0;
  }
}

.blogsConainer {
  @apply pt-4;
}
</style>