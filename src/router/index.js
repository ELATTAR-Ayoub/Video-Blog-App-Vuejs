import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Blogs from "../views/Blogs.vue";
import MyBlogs from "../views/MyBlogs.vue";
import CreateBlog from "../views/CreateBlog.vue";
import UpdateBlog from "../views/UpdateBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import ViewBlog from "../views/ViewBlog.vue";
import History from "../views/History.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false,
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false,
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false,
    }
  },
  {
    path: "/create-blog",
    name: "NewBlog",
    component: CreateBlog,
    meta: {
      title: 'Create Blog',
      requiresAuth: true,
    }
  },
  {
    path: "/edit-blog",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'Edit Blog',
      requiresAuth: true,
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true,
    }
  },
  {
    path: "/blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'View Blog',
      requiresAuth: false,
    }
  },
  {
    path: "/my-blogs",
    name: "MyBlogs",
    component: MyBlogs,
    meta: {
      title: 'My Blogs',
      requiresAuth: true,
    }
  },
  {
    path: "/update-blog/:blogid",
    name: "UpdateBlog",
    component: UpdateBlog,
    meta: {
      title: 'Update Blog',
      requiresAuth: true,
    }
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      title: 'History',
      requiresAuth: true,
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | VBlog`;
  next();
});

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next({ name: 'Home' });
  }
  return next();
})

export default router;
