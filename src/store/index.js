import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from '../firebase/firebaseInit';
import "firebase/storage";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    userHistory: [],
    historyLoaded: null,
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    blogVideoName: '',
    blogVideoFileURL: null,
    blogVideoPreview: null,
    deleteWarning: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileUserName: null,
    profilePictureName: null,
    profilePictureFileURL: null,
    profilePhone: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogTopPosts(state) {
      return state.blogPosts.slice(0, 2);
      // loop between all the posts and take the ones with high likes values <--
    },
    blogRecentPosts(state) {
      return state.blogPosts.slice(0, 20);
    },
    myPosts(state) {
      return state.blogPosts.filter((post) => post.profileID === firebase.auth().currentUser.uid);
    },
    myHistory(state) {
      return state.userHistory.filter((post) => post.profileID === firebase.auth().currentUser.uid);
    }
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    blogPhotoNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createblogPhotoURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openBlogPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    // 
    blogVideoNameChange(state, payload) {
      state.blogVideoName = payload;
    },
    createblogVideoURL(state, payload) {
      state.blogVideoFileURL = payload;
    },
    openBlogVideoPreview(state) {
      state.blogVideoPreview = !state.blogVideoPreview;
    },
    openDeleteWarning(state) {
      state.deleteWarning = !state.deleteWarning;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileUserName = doc.data().username;
      state.ProfilePicture = doc.data().profilePicture;
      state.profilePhone = doc.data().phone;
      state.profilePictureFileURL = doc.data().profilePicture;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileUserName.slice(0, 2)
    },
    profilePictureNameChange(state, payload) {
      state.profilePictureName = payload;
      console.log(state.profilePictureName);
    },
    createprofilePictureURL(state, payload) {
      state.profilePictureFileURL = payload;
    },
    changeUserName(state, payload) {
      state.profileUserName = payload;
    },
    changePhone(state, payload) {
      state.profilePhone = payload;
    },
    filterBlogPost(state, payload) {
      state.blogPosts.filter((post) => post.blogID !== payload);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogPhotoName = payload.blogCoverPhotoName;
      state.blogPhotoFileURL = payload.blogPhotoFileURL;
      state.blogVideoName = payload.blogVideoName;
      state.blogVideoFileURL = payload.blogVideoFileURL;
    },
    filterBlogPosts(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload)
    },
  },
  actions: {
    // we dont make changes inside an action, butif we will we'll make an commit
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbRes = await dataBase.get();
      commit("setProfileInfo", dbRes);
      commit("setProfileInitials");
    },
    async updateUserProfile({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        username: state.profileUserName,
        phone: state.profilePhone,
        profilePicture: state.profilePictureFileURL,
        profilePictureName: state.profilePictureName,
      });
      commit("setProfileInitials");
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy('date', 'desc');
      const dbRes = await dataBase.get();
      dbRes.forEach(async (doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            profileID: doc.data().profileID,
            blogTitle: doc.data().blogTitle,
            blogVideo: doc.data().blogVideo,
            blogVideoName: doc.data().blogVideoName,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogLikes: doc.data().blogLikes,
            date: doc.data().date,
          };

          const dataBase2 = await db.collection('users').doc(data.profileID);
          const dbRes2 = await dataBase2.get();

          data.profileUsername = dbRes2.data().username;
          data.profilePicture = dbRes2.data().profilePicture;

          state.blogPosts.push(data);
        }

      });
      state.postLoaded = true;
    },
    async getHistory({ state }) {
      // doc(firebase.auth().currentUser.uid)
      const dataBase = await db.collection("blogHistory").orderBy('date', 'desc');
      const dbRes = await dataBase.get();
      dbRes.forEach(async (doc) => {
        if (!state.userHistory.some((post) => post.historyID === doc.id)) {
          const data = {
            historyID: doc.data().historyID,
            profileID: doc.data().profileID,
            blogID: doc.data().blogID,
            historyType: doc.data().historyType,
            date: doc.data().date,
          };

          const dataBase2 = await db.collection('blogPosts').doc(data.blogID);
          const dbRes2 = await dataBase2.get();

          data.blogTitle = dbRes2.data().blogTitle;
          data.blogCoverPhoto = dbRes2.data().blogCoverPhoto;

          state.userHistory.push(data);
        }

      });
      state.historyLoaded = true;
      console.log("state.userHistories");
      console.log(state.userHistory);
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection('blogPosts').doc(payload);
      await getPost.delete();
      commit("filterBlogPosts", payload);
    }
  },


  modules: {
  }
})
