<template lang="">
    <div class='w-full bg-sideColor p-8'>
        <div class="containerX bg-sideColor p-2 md:p-8 flexCenter text-primary flexCenter flex-col lg:flex-row">
            <div>
                <h1 class="text-5xl font-semibold py-2" v-if="post.welcomeScreen">{{post.title}}</h1>
                <p class=" text-lg py-2" v-if="post.welcomeScreen">{{post.description}}</p>
                <div v-if="!user"
                    class="w-full md:w-3/4 flexCenter justify-between py-4 pr-0 md:pr-16  font-bold flex-col md:flex-row">
                    <router-link
                        class="bg-primary flexCenter text-sideColor rounded-md w-full md:w-1/2 p-4 text-center text-lg transition-all hover:bg-primary-light "
                        :to="{ name: 'Login' }">Login <eva-icon class="ml-2" fill='#2659E8' name="arrow-forward"
                            width='18px' height='18px'></eva-icon>
                    </router-link>
                    <span class="m-4">or</span>
                    <router-link class=" text-primary border-b border-primary" :to="{ name: 'Register' }">Register
                    </router-link>
                </div>
                <div v-if="user"
                    class="w-full md:w-3/4 flexCenter justify-between py-4 pr-0 md:pr-16  font-bold flex-col md:flex-row">
                    <router-link
                        class="bg-primary flexCenter text-sideColor rounded-md w-full md:w-1/2 p-4 text-center text-lg transition-all hover:bg-primary-light "
                        :to="{ name: 'NewBlog' }">Create Blog<eva-icon class="ml-2" fill='#2659E8' name="plus-circle"
                            width='18px' height='18px'></eva-icon>
                    </router-link>
                    <span class="m-4">or</span>
                    <router-link class=" text-primary border-b border-primary" :to="{ name: 'Blogs' }">View Blogs
                    </router-link>
                </div>
            </div>
            <div class="w-full md:w-3/4">
                <img class="w-full" v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
                    alt="blog image">
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: "hblog",
  props: ["post"],
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="">
</style>