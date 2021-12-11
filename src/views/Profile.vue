<template lang="">
    <div class='w-full h-full flexCenter relative'>
        <Modale v-if="modalActive" :modalHeader="modalHeader" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
        <Loading v-if="loading"/>
        <div class="containerX capitalize flexCenter flex-col pt-12">
            <h1 class=" text-center font-semibold text-3xl">account settings</h1>
            <div class="settings">
                <div class="file-input justify-center self-start">
                        <p class="font-bold border-secondary">Profle picture</p>
                        <input type="file" @change="filePhotoChange" ref="profilePicture" accept=".png, .jpg, .jpeg"
                            id="profile-picture" class="file relative">
                        <label class="p-4" for="profile-picture">Upload a Profle picture</label>
                        <p class="file-name w-60 no-overflow">File Chosen: {{this.$store.state.profilePictureName}}</p>
                    </div>
                <div
                    class="relative flex items-center justify-center rounded-full shadow-xl mt-6 mb-0 mx-auto w-56 h-56 overflow-hidden">
                    <priflePictureModal/>
                </div>
                <div class="login-section">
                    <input type="text"  required v-model="username">
                    <label class="login-label">
                        <span class="login-content">username</span>
                    </label>
                </div>
                <div class="login-section valid opacity-50">
                    <input disabled type="email" required v-model="email">
                    <label class="login-label">
                        <span class="login-content">email</span>
                    </label>
                </div>
                <div class="login-section">
                    <input type="phone" required v-model="phone">
                    <label class="login-label">
                        <span class="login-content">phone</span>
                    </label>
                </div>
                <div class='flexCenter justify-evenly'>
                    <router-link class="flexCenter main-btn px-8 mx-2 " :to="{ name: 'ForgotPassword' }">reset password
                        <eva-icon class='ml-2' fill='#fff' width='18px' height='18px' name="refresh"></eva-icon>
                    </router-link>
                    <button @click.prevent="updateProfile" class="flexCenter main-btn px-8 mx-2">save changes
                        <eva-icon class='ml-2' fill='#fff' width='18px' height='18px' name="save"></eva-icon>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import Modale from "../components/Modale";
import Loading from "../components/Loading";
import priflePictureModal from "../components/ProfilePictureModal.vue";
export default {
  name: "ForgorPassword",
  data() {
    return {
      modalActive: null,
      loading: null,
      modalHeader: "Updated",
      modalMessage: "Your profile has been updated!",
      profilePicture: null,
    };
  },
  components: { Modale, Loading, priflePictureModal },
  methods: {
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
    filePhotoChange() {
      var reader = new FileReader();
      this.profilePicture = this.$refs.profilePicture.files[0];
      const fileName = this.profilePicture.name;
      this.$store.commit("profilePictureNameChange", fileName);
      this.$store.commit(
        "createprofilePictureURL",
        URL.createObjectURL(this.profilePicture)
      );
      const fileImg = document.getElementById("file-img");
      fileImg.title = this.profilePicture.name;
      reader.onload = function (event) {
        fileImg.src = event.target.result;
      };
      reader.readAsDataURL(this.profilePicture);
    },
    updateProfile() {
      this.loading = true;
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(
        `document/UserProfilePictures/${this.getProfilePictureName}`
      );
      docRef.put(this.profilePicture).on(
        "state_changed",
        (snapchot) => {
          console.log(snapchot);
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.error = true;
          this.errorMsg = "We jumped into an error unfrotuanlly";
        },
        async () => {
          const profilePictureDownloadURL = await docRef.getDownloadURL();
          this.$store.commit(
            "profilePictureNameChange",
            this.profilePictureName
          );
          this.$store.commit(
            "createprofilePictureURL",
            profilePictureDownloadURL
          );
          this.$store.dispatch("updateUserProfile");
          this.modalActive = !this.modalActive;
          this.loading = false;
        }
      );
    },
  },
  computed: {
    username: {
      get() {
        return this.$store.state.profileUserName;
      },
      set(payload) {
        this.$store.commit("changeUserName", payload);
      },
    },
    phone: {
      get() {
        return this.$store.state.profilePhone;
      },
      set(payload) {
        this.$store.commit("changePhone", payload);
      },
    },
    profilePictureName: {
      get() {
        return this.$store.state.profilePictureName;
      },
      set(payload) {
        this.$store.commit("profilePictureNameChange", payload);
      },
    },
    profilePictureFileURL: {
      get() {
        return this.$store.state.profilePictureFileURL;
      },
      set(payload) {
        this.$store.commit("createprofilePictureURL", payload);
      },
    },
    email() {
      // we don't want user to change email, that why it has no set.
      return this.$store.state.profileEmail;
    },
  },
};
</script>
<style lang="scss" scoped>
.settings {
  @apply w-full lg:w-1/2 md:w-3/4 p-8 rounded-md flex flex-col items-center justify-center;
}
.login-section {
  @apply my-10;
}
.valid .login-label .login-content {
  transform: translateY(-175%);
  font-size: 13px;
}
.valid .login-label::after {
  @apply transform translate-x-0 z-10 opacity-100;
}
</style>