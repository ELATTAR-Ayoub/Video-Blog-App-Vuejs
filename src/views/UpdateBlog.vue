<template lang="">
    <div class="w-full relative">
      <Loading v-show="loading"/>
        <blogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>
        <blogVideoPreview v-show="this.$store.state.blogVideoPreview"/>
        <div class="containerX flexCenter justify-between flex-col p-5 capitalize">
            <h1 class="text-4xl font-semibold mb-1 normal-case">Create a Blog</h1>
            <p class='text-center'>here you can edit your blog if you purhaps missed something when creating it!</p>
            
            <div class="w-full flexCenter flex-col lg:flex-row mt-12">
                <div class="login-section mt-1 mb-2 md:mb-1 mr-0 lg:mr-4">
                    <input type="text" required v-model="blogTitle">
                    <label class="login-label text-xl">
                        <span class="login-content">Blog Title</span>
                    </label>
                </div>
                <div class="flex justify-center items-start w-full lg:w-60 flex-col mr-2">
                    <div class="file-input justify-center ">
                        <input type="file" @change="filePhotoChange" ref="blogPhoto" accept=".png, .jpg, .jpeg"
                            id="blog-photo" class="file relative">
                        <label class="p-4 w-60" for="blog-photo">Upload Cover
                            Photo</label>
                        <p class="file-name w-60 no-overflow">File Chosen: {{this.$store.state.blogPhotoName}}</p>
                    </div>
                    <button @click="openPhotoPreview" class="main-btn px-8 w-60" :class="{'opacity-50': !this.$store.state.blogPhotoFileURL}">Preview
                        Photo</button>
                </div>
            </div>
            <div :class="{hidden: !error}" class="log-error mt-2 mb-2 font-semibold">
                <p>Error: {{this.errorMessage}}</p>
            </div>
            <div class="submit-section mt-5 p-2 flexCenter">
                <router-link class='flexCenter bg-red-500 hover:bg-red-400 main-btn mr-2 md:w-60 w-56 px-0' :to="{ name: 'Home' }">Cancel
                    <eva-icon class="ml-2 transform rotate-45" fill='#fff' width='18px' height='18px'  name="plus"></eva-icon>
                </router-link>
                <button @click="updateBlog" 
                    class="flexCenter main-btn mx-auto md:w-60 w-56 px-0 bg-sideColor hover:bg-secondary-dark">Save Changes
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
      error: null,
      errorMessage: null,
      loading: null,
      routeID: null,
      currentBlog: null,
      blogTitle: null,
    };
  },
  async mounted() {
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.routeID;
    });
    this.$store.commit("setBlogState", this.currentBlog[0]);
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
    async updateBlog() {
      const dataBase = await db.collection("blogPosts").doc(this.routeID);
      const dataBase2 = await db.collection("blogHistory").doc();
      const timestamp = await Date.now();

      if (this.blogTitle.length !== 0) {
        this.error = false;
        if (this.blogPhoto) {
          this.loading = true;
          const storageRef = firebase.storage().ref();

          const docCoverPhotoRef = storageRef.child(
            `document/BlogCoverPhotos/${this.blogCoverPhotoName}`
          );

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
              const coverPhotoDownloadURL =
                await docCoverPhotoRef.getDownloadURL();

              await dataBase.update({
                blogTitle: this.blogTitle,
                blogCoverPhoto: coverPhotoDownloadURL,
                blogCoverPhotoName: this.$store.state.blogPhotoName,
              });

              await dataBase2.set({
                historyID: dataBase2.id,
                historyType: "update",
                profileID: this.$store.state.profileId,
                blogID: dataBase.id,
                date: timestamp,
              });
              await this.$store.dispatch("updatePost", this.routeID);
              this.loading = false;
              this.$router.push({
                name: "ViewBlog",
                params: { blogid: dataBase.id },
              });
              window.location.reload();
            }
          );
          return;
        }
        this.loading = true;
        await dataBase.update({
          blogTitle: this.blogTitle,
        });
        await dataBase2.set({
          historyID: dataBase2.id,
          historyType: "update",
          profileID: this.$store.state.profileId,
          blogID: dataBase.id,
          date: timestamp,
        });
        await this.$store.dispatch("updatePost", this.routeID);
        this.loading = false;
        this.$router.push({
          name: "ViewBlog",
          params: { blogid: dataBase.id },
        });
        window.location.reload();
        return;
      }
      this.error = true;
      this.errorMessage = "Make sure that your filled up the title section.";
    },
    computed: {
      profileId() {
        return this.$store.state.profileId;
      },
      blogCoverPhotoName() {
        return this.$store.state.blogPhotoName;
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