<template lang="">
    <div class='w-full relative'>
        <div class="containerX flexCenter flex-col p-5 capitalize">
            <h1 v-show="this.blogVideo" class="text-4xl font-semibold mb-1 normal-case">Edit your blog video</h1>
            <p v-show="this.blogVideo" class="mb-2">clip tour video the way you like others to see it.</p>
            <video v-show="this.blogVideo" controls id="blogVideo" class="w-full" :src="this.blogVideo"></video>
            <div v-show="!this.blogVideo" class="w-full flexCenter flex-col pt-12">
                <h1 class=" text-xl font-semibold mb-4">
                    There is no video here to play.
                </h1>
                <router-link class="flexCenter main-btn bg-secondary" :to="{ name: 'NewBlog' }">
                    <eva-icon class="mr-2" fill='#fff' width='18px' height='18px' name="arrow-back">
                    </eva-icon>Go Back
                </router-link>
            </div>


            <div v-show="this.blogVideo" class=" mx-auto w-full flexCenter justify-between">
                <div class="login-section flexCenter w-32 mx-0">
                    <input @change="resetTimeInput" type="text" maxlength="2" required v-model="startTimeMin">
                    <span class="twodots">:</span>
                    <input @change="resetTimeInput" type="text" maxlength="2" required v-model="startTimeSec">
                    <label class="login-label">
                        <span class="login-content">start time</span>
                    </label>
                </div>
                <div class="flexCenter">
                    <eva-icon @click="playVideo" v-show="!playing" class=" cursor-pointer" fill='#2659E8' width='64px'
                        height='64px' animation="pulse" name="play-circle"></eva-icon>
                    <eva-icon @click="playVideo" v-show="playing" class=" cursor-pointer" fill='#2659E8' width='64px'
                        height='64px' animation="pulse" name="pause-circle"></eva-icon>
                </div>
                <div class="login-section flexCenter w-32 mx-0">
                    <input type="text" maxlength="2" @change="resetTimeInput" required v-model="endTimeMin">
                    <span class="twodots">:</span>
                    <input type="text" maxlength="2" @change="resetTimeInput" required v-model="endTimeSec">
                    <label class="login-label">
                        <span class="login-content">end time</span>
                    </label>
                </div>
            </div>
            <div :class="{hidden: !error}" class="log-error mt-2 mb-2 font-semibold">
                <p>Error: {{this.errorMessage}}</p>
            </div>

            <div v-show="this.blogVideo" class="submit-section mt-5 p-2 flexCenter">
                <router-link class='flexCenter main-btn bg-secondary hover:bg-secondary-light mr-2 md:w-60 w-56 px-0'
                    :to="{ name: 'NewBlog' }">
                    <eva-icon class="mr-2" fill='#fff' width='18px' height='18px' name="arrow-back">
                    </eva-icon>Go Back
                </router-link>
                <button @click.prevent="uploadBlog" :class="{'opacity-50': error}"
                    class="flexCenter main-btn mx-auto md:w-60 w-56 px-0">Publish
                    Blog
                    <eva-icon class="ml-2" fill='#fff' width='18px' height='18px' name="paper-plane-outline">
                    </eva-icon>
                </button>
            </div>
        </div>

    </div>
</template>
<script>
// import firebase from "firebase/app";
// import db from "../firebase/firebaseInit";
export default {
  name: "editBlog",
  components: {},
  data() {
    return {
      video: document.getElementById("blogVideo"),
      startTimeMin: 0,
      startTimeSec: 0,
      endTimeMin: null,
      endTimeSec: null,
      videoStartTimeLength: null,
      videoEndTimeLength: null,
      playing: false,
      error: null,
      errorMessage: null,
    };
  },
  methods: {
    playVideo() {
      if (this.video.paused) {
        this.playing = true;
        this.video.play();
        return;
      }
      this.video.pause();
      this.playing = false;
    },
    resetTimeInput() {
      if (
        this.startTimeMin > this.endTimeMin ||
        (this.startTimeMin == this.endTimeMin &&
          this.startTimeSec > this.endTimeSec) ||
        this.startTimeMin > 60 ||
        this.startTimeSec > 60 ||
        this.endTimeMin > 60 ||
        this.endTimeSec > 60
      ) {
        this.startTimeMin = 0;
        this.startTimeSec = 0;
        this.endTimeMin = Math.floor(this.video.duration / 60);
        this.endTimeSec = (
          this.video.duration -
          this.endTimeMin * 60
        ).toFixed();
        this.error = true;
        this.errorMessage =
          "Your input field are wrong, The start time cannot be larger than the end time.";
        return;
      }
      this.videoStartTimeLength = parseInt(
        this.startTimeMin * 60 + this.startTimeSec
      );
      this.videoEndTimeLength = parseInt(
        this.endTimeMin * 60 + this.endTimeSec
      );
      this.error = false;
      this.errorMessage = "";
      return;
    },
    cutVideo() {
      const ffmpeg = require("@ffmpeg-installer/ffmpeg");
      const videoFile = this.$store.state.blogVideoFileURL;
      ffmpeg(videoFile)
        .setStartTime(this.videoStartTimeLength)
        .setDuration(this.videoEndTimeLength - this.videoStartTimeLength)
        .output("video_cutted.mp4")
        .on("end", function (err) {
          if (!err) {
            console.log("conversion Done");
          }
        })
        .on("error", function (err) {
          console.log("error: ", err);
        })
        .run();
      var video = document.createElement("video");
      video.src = `video_cutted.mp4`;
      const fileName = video.name;
      this.$store.commit("blogVideoNameChange", fileName);
      this.$store.commit("createblogVideoURL", URL.createObjectURL(video));
      return video;
    },
    uploadBlog() {
      // var video = this.cutVideo();
      if (this.error === false) {
        if (this.$store.state.blogVideoFileURL) {
          // get the unfinished blog with the same blogCoverPhotoName and blogVideoName and take info and create new blog with that.
        }
        return;
      }
      this.error = true;
      this.errorMessage =
        "Please ensure you filled all the boxes and your start time and end time are well formatted";
      setTimeout(() => {
        this.error = false;
        this.errorMessage = "";
      }, 5000);
      return;
    },
  },
  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
    blogVideo() {
      return this.$store.state.blogVideoFileURL;
    },
    blogTitle() {
      return this.$store.state.blogTitle;
    },
  },
  mounted() {
    this.endTimeMin = Math.floor(this.video.duration / 60);
    this.endTimeSec = (this.video.duration - this.endTimeMin * 60).toFixed();

    this.videoStartTimeLength = parseInt(
      this.startTimeMin * 60 + this.startTimeSec
    );
    this.videoEndTimeLength = parseInt(this.endTimeMin * 60 + this.endTimeSec);
  },
};
</script>
<style lang="scss" scoped>
.login-section input:focus + .login-label .login-content,
.login-section input:valid + .login-label .login-content {
  transform: translateY(-175%);
  font-size: 15px;
}

.login-section input {
  @apply w-full text-lg text-center mb-2 outline-none border-0 bg-transparent font-medium text-secondary;
}

.login-section .twodots {
  @apply w-full text-lg text-center mb-2 outline-none border-0 bg-transparent font-medium text-secondary;
}

.login-section label {
  @apply absolute left-0 top-0 h-full w-full font-bold pointer-events-none border-b border-secondary;
}
</style>