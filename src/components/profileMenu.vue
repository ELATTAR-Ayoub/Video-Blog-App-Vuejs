<template lang="">
    <div class="profile" ref="profile">
        <div @click='toggleprofileMenu' class="flexCenter rounded-full cursor-pointer bg-sideColor text-primary uppercase w-16 h-16 text-lg">
                          <ProfilePictureModal />

        </div>
        
        <div v-show="profileMenu" class="
            absolute z-50
            right-7
            top-mini
            p-2
            shadow-md
            rounded-md 
            text-primary
            flexCenter flex-col
            bg-secondary-dark max-w-sm
          ">
            <div class='flexCenter border-b border-primary border-opacity-50 pb-2'>
                
                <div class='flexCenter relative w-16 h-16 m-2'>
              <ProfilePictureModal />
                </div>
                
                <div class="">
                    <p class="no-overflow">{{ this.$store.state.profileUserName }}</p>
                    <p class="no-overflow">{{ this.$store.state.profileEmail }}</p>
                    <div class="no-overflow max-w-xs">Phone: {{
                        this.$store.state.profilePhone
                        }}</div>
                </div>
            </div>
            <div class="flexCenter flex-col w-full">
                <router-link  :to="{ name: 'Profile' }" class="flexCenter my-2 mb-1 w-full bg-secondary p-2 hover:bg-secondary-light">Profile <eva-icon
                        width="16" height="16" fill="#FFF" class="ml-2" name="person"></eva-icon>
                </router-link>
                <router-link  :to="{ name: 'MyBlogs' }" class="flexCenter my-2 mb-1 w-full bg-secondary p-2 hover:bg-secondary-light">My Blogs <eva-icon
                        width="16" height="16" fill="#FFF" class="ml-2" name="person"></eva-icon>
                </router-link>
                <router-link  :to="{ name: 'History' }" class="flexCenter my-2 mb-1 w-full bg-secondary p-2 hover:bg-secondary-light">History <eva-icon
                        width="16" height="16" fill="#FFF" class="ml-2" name="person"></eva-icon>
                </router-link>
            <LogoutBtn />
            </div>
        </div>
    </div>
</template>
<script>
import LogoutBtn from "../components/LogoutBtn.vue";
import ProfilePictureModal from "../components/ProfilePictureModal.vue";
export default {
  name: "profileMenu",
  components: { LogoutBtn, ProfilePictureModal },
  data() {
    return {
      profileMenu: null,
    };
  },
  methods: {
    toggleprofileMenu() {
      this.profileMenu = !this.profileMenu;
    },
  },
};
</script>
<style lang="">
</style>