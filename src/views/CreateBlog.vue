<template lang="">
    <div class="w-full relative">
      <Loading v-show="loading"/>
        <blogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
        <blogVideoPreview v-show="this.$store.state.blogVideoPreview"/>
        <div class="containerX flexCenter justify-between flex-col p-5 capitalize">
            <h1 class="md:text-4xl text-2xl font-semibold mb-1 normal-case">Create a Blog</h1>
            <p class=' paragraph'>share your happy moment with the world!</p>
            
            <div class="w-full flexCenter flex-col lg:flex-row mt-12">
                <div class="login-section mt-1 mb-2 md:mb-1 mr-0 lg:mr-4">
                    <input type="text" required v-model="blogTitle">
                    <label class="login-label text-xl">
                        <span class="login-content">Blog Title</span>
                    </label>
                </div>
                <div class="flex justify-center items-start w-full lg:w-60 flex-col md:mr-2 mr-0">
                    <div class="file-input justify-center md:w-60 w-full ">
                        <input type="file" @change="filePhotoChange" ref="blogPhoto" accept=".png, .jpg, .jpeg"
                            id="blog-photo" class="file relative">
                        <label class="p-4 w-full " for="blog-photo">Upload Cover
                            Photo</label>
                        <p class="file-name md:w-60 w-full m-2 no-overflow">File Chosen: {{this.$store.state.blogPhotoName}}</p>
                    </div>
                    <button @click="openPhotoPreview" class="main-btn px-8 md:w-60 w-full " :class="{'opacity-50': !this.$store.state.blogPhotoFileURL}">Preview
                        Photo</button>
                </div>
                <div class="flex justify-center items-start w-full lg:w-60 flex-col">
                    <div class="file-input justify-center md:w-60 w-full ">
                        <input type="file" @change="fileVideoChange" accept=".mp4, .ogg, .WebM" ref="blogVideo" id="blog-video"
                            class="file relative">
                        <label class="p-4 w-full" for="blog-video">Upload Blog Video</label>
                        <p class="file-name md:w-60 w-full m-2 no-overflow">File Chosen: {{this.$store.state.blogVideoName}}</p>
                    </div>
                    <button @click="openVideoPreview" class="main-btn px-8 md:w-60 w-full " :class="{'opacity-50': !this.$store.state.blogVideoFileURL}">Preview
                        Video</button>
                </div>

            </div>
            <div :class="{hidden: !error}" class="log-error mt-2 mb-2 font-semibold text-center">
                <p>Error: {{this.errorMessage}}</p>
            </div>
            <div class="submit-section mt-5 p-2 flexCenter md:flex-row flex-col">
                <router-link class='flexCenter bg-red-500 hover:bg-red-400 main-btn md:mr-2 md:mb-0 mb-3 md:w-60 w-56 px-0' :to="{ name: 'Home' }">Cancel
                    <eva-icon class="ml-2 transform rotate-45" fill='#fff' width='18px' height='18px'  name="plus"></eva-icon>
                </router-link>
                <button @click="editBlog" 
                    class="flexCenter main-btn mx-auto md:w-60 w-56 px-0 ">Upload Blog
                    <eva-icon class="ml-2" fill='#fff' width='18px' height='18px' name="edit">
                    </eva-icon>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import blogCoverPreview from "../components/blogCoverPreview.vue";
import blogVideoPreview from "../components/blogVideoPreview.vue";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading.vue";
export default {
  name: "createBlog",
  components: {
    blogCoverPreview,
    blogVideoPreview,
    Loading,
  },
  data() {
    return {
      blogPhoto: null,
      blogVideo: null,
      error: null,
      errorMessage: null,
      loading: null,
      editorSetting: {
        modules: {
          vedioResize: {},
        },
      },
    };
  },
  methods: {
    filePhotoChange() {
      this.blogPhoto = this.$refs.blogPhoto.files[0];
      const fileName = this.blogPhoto.name;
      this.$store.commit("blogPhotoNameChange", fileName);
      this.$store.commit(
        "createblogPhotoURL",
        URL.createObjectURL(this.blogPhoto)
      );
    },
    openPhotoPreview() {
      this.$store.commit("openBlogPhotoPreview");
    },
    //
    fileVideoChange() {
      this.blogVideo = this.$refs.blogVideo.files[0];
      const fileName = this.blogVideo.name;
      this.$store.commit("blogVideoNameChange", fileName);
      this.$store.commit(
        "createblogVideoURL",
        URL.createObjectURL(this.blogVideo)
      );
    },
    openVideoPreview() {
      this.$store.commit("openBlogVideoPreview");
    },
    editBlog() {
      if (this.blogPhoto && this.blogVideo && this.blogTitle) {
        this.error = false;
        this.uploadBlog();
        return;
      }
      this.error = true;
      this.errorMessage = "Please fill up all the fields.";
      return;
    },
    async uploadBlog() {
      if (this.error === false) {
        if (this.blogVideo && this.blogPhoto) {
          this.loading = true;
          const storageRef = firebase.storage().ref();

          const docRef = storageRef.child(
            `document/BlogVideos/${this.blogCoverVideoName}`
          );

          const docCoverPhotoRef = storageRef.child(
            `document/BlogCoverPhotos/${this.blogCoverPhotoName}`
          );

          // I choosed here putting the image doc instead of the video doc because the image take a long time loading
          // ans firebase can't find its url inside the document
          docCoverPhotoRef.put(this.blogPhoto).on(
            "state_changed",
            (snapchot) => {
              console.log(snapchot);
            },
            (err) => {
              console.log("err creating");
              console.log(err);
              this.loading = false;
              this.error = true;
              this.errorMessage = "We jumped into an error!";
            },
            async () => {
              const videoDownloadURL = await docRef.getDownloadURL();
              const coverPhotoDownloadURL =
                await docCoverPhotoRef.getDownloadURL();
              const timestamp = await Date.now();
              const dataBase = await db.collection("blogPosts").doc();
              await dataBase.set({
                blogID: dataBase.id,
                blogTitle: this.blogTitle,
                blogCoverPhoto: coverPhotoDownloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogVideo: videoDownloadURL,
                blogVideoName: this.blogCoverVideoName,
                profileID: this.profileId,
                date: timestamp,
                finished: false,
              });

              const dataBase2 = await db.collection("blogHistory").doc();
              await dataBase2.set({
                historyID: dataBase2.id,
                historyType: "create",
                profileID: this.profileId,
                blogID: dataBase.id,
                date: timestamp,
              });
              this.loading = false;
              this.$router.push({
                name: "ViewBlog",
                params: { blogid: dataBase.id },
              });
            }
          );
        }
        return;
      }
      this.error = true;
      this.errorMessage =
        "Please ensure you filled all the boxes and your start time and end time are well formatted";
      this.error = false;
      this.errorMessage = "";
      return;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogCoverVideoName() {
      return this.$store.state.blogVideoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.login-section input:focus + .login-label .login-content,
.login-section input:valid + .login-label .login-content {
  transform: translateY(-125%);
  font-size: 15px;
}
</style>