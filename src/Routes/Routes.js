export const routes =[
    {path:"/", component: () => import("../components/MainInterface/MainInterface.vue")},
    {path:"/about", component: () => import("../Pages/About.vue")},
    {path:"/category/:list", component: () => import("../Pages/Category/Category.vue")},
    {path:"/word/:wordName", component: () => import("../Pages/WordResult/WordResult.vue")}
];
