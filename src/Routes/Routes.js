import MainInterface from "../components/MainInterface/MainInterface.vue";
import About from "../Pages/About.vue";
import Home from "../Pages/Home/Home.vue";
import History from "../Pages/History/History.vue";
import Favorites  from "../Pages/Favorites/Favorites.vue";
import WOD from "../Pages/WordOfTheDay/WordOfTheDay.vue";
export const routes =[
    {path:"/", component: Home},
    {path:"/dictionary", component: MainInterface},
    {path:"/dictionary/history", component: History},
    {path:"/dictionary/favorites", component:Favorites},
    {path:"/dictionary/wod", component:WOD},
    {path:"/about", component: About}
    
];
