import PageNotFound from "../components/404.vue";
export default {
  routes: [
    { 
      path:'/',
      name:'home',
      redirect:'/hello'
    },
    {
      path: "/test",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "test" */ "../components/test.vue"),
    },
    {
      path: "/hello",
      name: "hello",
      component: () =>
        import(/* webpackChunkName: "hello" */ "../components/HelloWorld.vue"),
    },
    {
      path: "/404",
      name: "404",
      component: PageNotFound,
    },
  ],
};
