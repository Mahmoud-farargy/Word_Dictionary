import axios from "axios";
import { store } from "../Store/Store";
export const playSound = (lang, audio) =>{
    if(lang?.toLowerCase() === "english us" && audio){
        var sound = new Audio(audio);
        sound && sound?.play();
    }
}                       
                        // array or object
export const deepCopy = originalData => JSON.parse(JSON.stringify(originalData));

export const updateData = (newData) => {

    if(newData && typeof newData === "object"){
        if(newData && Object.prototype.hasOwnProperty.call(newData,"favorites") && Object.prototype.hasOwnProperty.call(newData,"history") ){
            axios.put("https://mahmoudvue.firebaseio.com/dictionary.json", {favorites: newData.favorites || {}, history: newData.history || {}})
            .then(res =>{
                const dataArr = res?.data;
                dataArr && store.dispatch("updateDataFromFirebase", ({favorites: dataArr.favorites || [], history: dataArr.history || []}));
            }).catch(err =>{
                alert("Something went wrong while saving data. Please make sure you are connected to the internet and try again." + err);
            });   
        }

    }
}