<template lang="">
    <div class='w-full relative' >
      <Loading v-if="loading"/>
        <div class="fixed flex top-0 w-full h-2 bg-transparent">
            <div id="fHalfBar" class="bg-sideColor w-1/2 transform -translate-x-full h-2 transition-all"></div>
            <div id="sHalfBar" class="bg-sideColor w-1/2 transform -translate-x-doubleFull h-2 transition-all"></div>
        </div>
        <div class='containerX flexCenter mt-24 flex-col mx-auto w-full text-secondary capitalize'>
            <h1 class=" text-4xl font-semibold mb-1">Register to VBlog</h1>
            <p>a new member? Welcome to the family!</p>
            <form>
                <div id="step1">
                    <div class="login-section">
                        <input type="email" autocomplete="" placeholder=" " required v-model="email">
                        <label class="login-label">
                            <span class="login-content">email</span>
                        </label>
                    </div>
                    <div class="login-section mb-8">
                        <input v-on:change="checkPassword" type="password" autocomplete="" placeholder=" " required v-model="password">
                        <label class="login-label">
                            <span class="login-content">password</span>
                        </label>
                    </div>
                    <p v-show="error" class="log-error">{{this.errorMsg}}</p>
                    <div v-on:click="manageSteps" class="flexCenter main-btn mx-auto w-64 px-0 mb-2">Next
                        <eva-icon class="ml-2" fill='#fff' width='18px' height='18px' name="arrow-forward"></eva-icon>
                    </div>
                </div>
                <!--  -->
                <div id="step2" class="hidden">
                    <div class="file-input justify-center ">
                        <p class="font-bold border-secondary">Profle picture</p>
                        <input type="file" @change="filePhotoChange" ref="profilePicture" accept=".png, .jpg, .jpeg"
                            id="profile-picture" class="file relative">
                        <label class="p-4" for="profile-picture">Upload a Profle picture</label>
                        <p class="file-name w-60 no-overflow">File Chosen: {{this.$store.state.profilePictureName}}</p>
                    </div>

                    <div
                        class="relative z-10 flex items-center justify-center rounded-full shadow-lg mt-4 mx-auto w-56 h-56 overflow-hidden">
                        <img id="file-img" src="" class="h-full w-full " alt="Profle picture">
                    </div>

                    <div class="login-section">
                        <input type="text" autocomplete="" placeholder=" " required v-model="username">
                        <label class="login-label">
                            <span class="login-content">name</span>
                        </label>
                    </div>
                    <div class="login-section mb-8">
                        <input type="phone" autocomplete="" placeholder=" " required v-model="phone">
                        <label class="login-label">
                            <span class="login-content">phone</span>
                        </label>
                    </div>
                    <p v-show="error" class="log-error">{{this.errorMsg}}</p>
                    
                    <div class="submit-section mt-2 flexCenter flex-col">
                        <div v-on:click="manageSteps"
                          class="flexCenter main-btn mx-auto w-64 px-0 bg-secondary hover:bg-secondary-light">
                          <eva-icon class="mr-2" fill='#fff' width='18px' height='18px' name="arrow-back">
                          </eva-icon>Go back
                        </div>
                        <button @click.prevent="register" class='main-btn mt-3 w-64 px-0' >Register</button>
                    </div>
                </div>

            </form>
            <p> already have an account? try <router-link class="login-link" :to="{ name: 'Login' }">login</router-link>
            </p>
            <p> Go back <router-link class="login-link" :to="{ name: 'Home' }">Home</router-link>
            </p>
        </div>

    </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
import "firebase/storage";
//
import Loading from "../components/Loading.vue";

export default {
  name: "register",
  components: { Loading },
  data() {
    return {
      email: "",
      password: "",
      profilePicture: null,
      username: "",
      phone: "",
      error: null,
      errorMsg: "",
      loading: null,
    };
  },
  created() {},
  methods: {
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
    manageSteps() {
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      step1.classList.toggle("hidden");
      step2.classList.toggle("hidden");
      this.halfprocess();
    },
    halfprocess() {
      const fHalf = document.getElementById("fHalfBar");
      fHalf.classList.toggle("-translate-x-full");
      fHalf.classList.toggle("translate-x-0");
    },
    fullprocess() {
      const sHalf = document.getElementById("sHalfBar");
      sHalf.classList.toggle("-translate-x-doubleFull");
      sHalf.classList.toggle("translate-x-0");
    },
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.profilePicture &&
        this.username !== "" &&
        this.phone !== ""
      ) {
        this.loading = true;
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const storageRef = firebase.storage().ref();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const res = await createUser;

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
            const dataBase = db.collection("users").doc(res.user.uid);
            await dataBase.set({
              profileID: dataBase.id,
              username: this.username,
              email: this.email,
              phone: this.phone,
              profilePicture: profilePictureDownloadURL,
            });
            const user = await firebase.auth().currentUser;
            user.sendEmailVerification();
            this.fullprocess();
            this.loading = false;
            this.$router.push({ name: "Login" });
          }
        );
        // generate a special id for the user

        return;
      }
      this.loading = false;
      this.error = true;
      this.errorMsg =
        "Please fill out all the fields and choose a picture for your profile!";
      return;
    },
    checkPassword() {
      if (this.password !== "" && this.password.length < 6) {
        this.error = true;
        this.errorMsg = "Password should be atleast 6 characters long!";
      } else {
        this.error = false;
        this.errorMsg = "";
      }
    },
    checkForm(input) {
      const symbols = ["[", "]", "(", ")", "|", ",", "!", "*", "`", ";"];
      for (let i = 0; i < symbols.length; i++) {
        if (input.includes(i)) {
          this.error = true;
          this.errorMsg =
            "You can't use symbols like [,],(,),|,!,*,`,; or a Comma";
          return;
        }
        this.error = false;
        this.errorMsg = "";
      }
    },
  },
  computed: {
    getProfilePictureName() {
      return this.$store.state.ProfilePictureName;
    },
  },
};
</script>
<style lang="">
</style>