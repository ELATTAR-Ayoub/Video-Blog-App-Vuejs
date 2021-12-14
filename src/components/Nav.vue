<template>
  <header class="w-full bg-secondary flexCenter">
    <nav class="containerX flexCenter justify-between p-5 shadow-lg">
      <div class="watermark hover:-rotate-12">
        <router-link class="" :to="{ name: 'Home' }">VBlog </router-link>
      </div>
      <div class="nav-links w-full">
        <ul v-show="mobile">
          <router-link :to="{ name: 'Home' }">Home</router-link>
          <router-link :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link v-if="user" :to="{ name: 'NewBlog' }"
            >Create Blog
          </router-link>
          <router-link
            v-if="!user"
            class="
              bg-sideColor
              p-3
              px-4
              font-semibold
              rounded-md
              hover:bg-sideColor-light
              transition-all
            "
            :to="{ name: 'Login' }"
            >Login</router-link
          >
          <router-link
            v-if="!user"
            class="
              bg-sideColor-light
              p-3
              rounded-md
              font-semibold
              px-4
              text-center
              hover:bg-sideColor-dark
            "
            :to="{ name: 'Register' }"
            >Sign up</router-link
          >
        </ul>
      </div>
      <profileMenu v-if="user" v-show="mobile" />

      <eva-icon
        @click="toggleMobileNav"
        v-show="!mobile"
        class="cursor-pointer"
        width="32px"
        height="32px"
        name="menu"
        fill="#fff"
      ></eva-icon>
    </nav>

    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <div class="watermark self-start" @click="toggleMobileNav">
          <router-link class="" :to="{ name: 'Home' }">VBlog </router-link>
        </div>
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link v-if="user" :to="{ name: 'NewBlog' }"
          >Create Blog
        </router-link>
        <router-link
          v-if="!user"
          class="bg-sideColor p-3 w-full text-center hover:bg-sideColor-dark"
          :to="{ name: 'Login' }"
          >Login</router-link
        >
        <router-link
          v-if="!user"
          class="
            bg-sideColor-light
            p-3
            w-full
            text-center
            hover:bg-sideColor-dark
          "
          :to="{ name: 'Register' }"
          >Sign up</router-link
        >
        <!--  -->
        <div
          v-if="user"
          class="
            p-2
            shadow-md
            rounded-md
            text-primary
            flexCenter
            flex-col
            bg-secondary
            w-full
            max-w-sm
            mt-2
          "
        >
          <div
            class="flexCenter border-b border-primary border-opacity-50 pb-2"
          >
            <div
              class="
                w-16
                h-16
                relative
                rounded-full
                overflow-hidden
                mx-2
                flexCenter
              "
            >
              <priflePictureModal />
            </div>
            <div class="">
              <p class="no-overflow">{{ this.$store.state.profileUserName }}</p>
              <p class="no-overflow">{{ this.$store.state.profileEmail }}</p>
              <div class="no-overflow max-w-xs">
                Phone: {{ this.$store.state.profilePhone }}
              </div>
            </div>
          </div>
          <div class="flexCenter flex-col w-full">
            <router-link
              :to="{ name: 'Profile' }"
              class="flexCenter my-2 mb-1 w-full p-2 hover:bg-secondary-light"
              >Profile
              <eva-icon
                width="16"
                height="16"
                fill="#FFF"
                class="ml-2"
                name="person"
              ></eva-icon>
            </router-link>
            <router-link
              :to="{ name: 'MyBlogs' }"
              class="flexCenter my-2 mb-1 w-full p-2 hover:bg-secondary-light"
              >My Blogs
              <eva-icon
                width="16"
                height="16"
                fill="#FFF"
                class="ml-2"
                name="person"
              ></eva-icon>
            </router-link>
            <router-link
              :to="{ name: 'History' }"
              class="flexCenter my-2 mb-1 w-full p-2 hover:bg-secondary-light"
              >History
              <eva-icon
                width="16"
                height="16"
                fill="#FFF"
                class="ml-2"
                name="person"
              ></eva-icon>
            </router-link>
            <LogoutBtn />
          </div>
        </div>
      </ul>
    </transition>
  </header>
</template>

<script>
import profileMenu from "../components/profileMenu.vue";
import LogoutBtn from "../components/LogoutBtn.vue";
import priflePictureModal from "../components/ProfilePictureModal.vue";
export default {
  name: "nav",
  components: { profileMenu, LogoutBtn, priflePictureModal },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 768) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease-in-out;
}
.mobile-nav-enter {
  transform: translateX(-100%);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(-100%);
}
</style>