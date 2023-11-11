import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    name: "HomePage",
    meta: { title: "Home - Portfolio", requiresAuth: true },
    component: () => import("../views/DashboardPage.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: { title: "Home - Portfolio", requiresAuth: true },
    component: () => import("../views/DashboardPage.vue"),
    redirect: to => {
      return { path: '/' }
    }
  },
  {
    path: "/programminglanguage",
    name: "ProgrammingLanguage",
    meta: { title: "Programmings", requiresAuth: true },
    component: () => import("../views/ProgrammingLanguage.vue")
  },
  {
    path: "/programminglanguagetech",
    name: "ProgrammingLanguageTech",
    meta: { title: "ProgrammingsTechs", requiresAuth: true },
    component: () => import("../views/ProgrammingLanguageTech.vue")
  },
  {
    path: "/article",
    name: "Article",
    meta: { title: "Article", requiresAuth: true },
    component: () => import("../views/Article.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  var titleStr = to.meta.title;
  // var stillLoggedIn = isLoggedIn();

  // if (stillLoggedIn) {
  //   next({
  //     path: "/home",
  //     query: { redirect: to.fullPath },
  //   });
  // }
  // else{
  //   next({
  //     path: '/',

  //   })
  // }

  next();
});

export default router
