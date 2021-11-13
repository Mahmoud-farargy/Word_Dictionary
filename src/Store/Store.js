import Vue from "vue"; //pay attention to the store formula
import Vuex from "vuex";
import englishWords from "./englishWordList.json";
import axios from "axios";
import { playSound, updateData, deepCopy } from "../Utilities/utilities";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        suggestions: englishWords,
        history: [],
        favorites: [],
        resultsArr: {},
        currLang: "English US",
        word: "",
        wordResults: {},
        openBackdrop: false,
        loadingWord: false,
        openSideDrawer: false,
        firebaseDataObj: { favorites: [], history: [] }
    },
    getters: {
        history: state => {
            return state.history;
        },
        favorites: state => {
            return state.favorites;
        },
        word: state => {
            return state.word;
        },
        activeNavBtn: state => {
            return state.activeNavBtn;
        },
        firebaseDataObj: state => {
            return state.firebaseDataObj;
        },
        getCurrentLang: state => {
            return state.currLang;
        },
        getResultsArr: state => {
            return state.resultsArr;
        },
        getLoadingWord: state => state.loadingWord,
        getWordResults: state => state.wordResults,
    },
    mutations: {
        addToList: (state, payload) => {
            const { location, word } = payload;
            const dataCopy = deepCopy({ favorites: state.favorites, history: state.history });
            dataCopy[location].unshift(word);

            dataCopy[location] = [...new Set(dataCopy[location])];
            updateData(dataCopy);
        },
        searchThisWord: (state, payload) => {
            return new Promise((resolve, reject) => {
                if (payload?.res && payload?.word) {
                    const results = payload.res;

                    state.word = payload.word;

                    const definitions = [];
                    for (let i = 0; i < results.length; i++) {
                        for (let j = 0; j < results[i].meanings.length; j++) {
                            for (let k = 0; k < results[i].meanings[j].definitions.length; k++) {
                                definitions.push({
                                    pos: results[i].meanings?.[j].partOfSpeech,
                                    def: results[i].meanings?.[j].definitions?.[k].definition,
                                    eg: results[i].meanings?.[j].definitions?.[k].example,
                                    syn: results[i].meanings?.[j].definitions?.[k].synonyms,
                                    ant: results[i].meanings?.[j].definitions?.[k].antonyms,
                                });
                            }
                        }
                    }
                    const phonetics = {
                        word: results[0]?.word || "",
                        audio: results[0]?.phonetics?.[0]?.audio || "",
                        txt: results[0]?.phonetics?.[0]?.text || "",
                        id: (Math.random() * 1000) + 1,
                        origin: results[0]?.origin || null
                    }
                    playSound(state.currLang, phonetics?.audio || null);
                    window.document.title = `iDictionary | ${payload.word}`;
                    if (definitions && phonetics) {
                        const newObj = { definitions, phonetics };
                        if (payload.isWOD) {
                            state.wordResults = newObj || {};
                        } else {
                            state.resultsArr = newObj;
                        }

                        resolve(newObj);
                    } else {
                        state.resultsArr = {}
                        reject({});
                    }

                } else {
                    reject({});
                }
            })
        },
        deleteItem: (state, payload) => {
            const { location, word } = payload;
            const dataCopy = deepCopy({ favorites: state.favorites, history: state.history });
            if (Object.prototype.hasOwnProperty.call(state, location)) {
                const itemIdx = dataCopy[location].map(el => el).indexOf(word);
                if (confirm(`Delete ${word} from ${location}?`) && itemIdx !== -1) {
                    dataCopy[location].splice(itemIdx, 1);
                    updateData(dataCopy);
                }
            }

        },
        handleSideDrawer: (state, boolean) => {
            state.openBackdrop = boolean;
            state.openSideDrawer = boolean;
        },
        updateDataFromFirebase: (state, payload) => {
            if (typeof payload === "object") {
                Object.keys(payload).map((key) => {
                    if (key && Object.prototype.hasOwnProperty.call(state, key)) {
                        state[key] = payload[key] || [];
                    }
                });
            }
        },
        changeCurrentLang: (state, lang) => {
            state.currLang = lang;
        },
        clearWordResults: state => {
            state.wordResults = {};
        }
    },
    actions: {
        addToList: ({ commit }, payload) => {
            commit("addToList", payload);
        },
        changeCurrentLang: ({ commit }, lang) => {
            commit("changeCurrentLang", lang);
        },
        searchThisWord: ({ commit, state }, { word, isWOD }) => {
            let currentLang;
            state.loadingWord = true;
            if (word) {
                commit("addToList", { location: "history", word: word });
                switch (state.currLang) {
                    case "English US":
                        currentLang = "en";
                        break;
                    case "Spanish":
                        currentLang = "es";
                        break;
                    case "French":
                        currentLang = "fr";
                        break;
                    case "Brazilian Portuguese":
                        currentLang = "pt-BR";
                        break;
                    case "Italian":
                        currentLang = "it";
                        break;
                    case "German":
                        currentLang = "de";
                        break;
                    case "Hindi":
                        currentLang = "hi";
                        break;
                    case "Turkish":
                        currentLang = "tr";
                        break;
                    case "Chinese (Simplified)":
                        currentLang = "zh-CN";
                        break;
                    default:
                        currentLang = "en";
                        break;
                }
                let refineWord = word.trim();

                word.match(/\s/) ? refineWord = word.toString().replace(/\s/g, "%20") : refineWord = word;
                word.match(/[-]/) ? refineWord = word.toString().replace(/[-]/g, "%2D") : refineWord = word;
                word.match(/[']/) ? refineWord = word.toString().replace(/[']/g, "%27") : refineWord = word;

                axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${currentLang}/${refineWord.toLowerCase()}`)
                    .then(res => {
                        return res.data;

                    }).then((data) => {
                        if (data) {
                            window.scrollTo(0, 30);
                            commit("searchThisWord", { word, res: data, isWOD });
                            state.loadingWord = false;
                        }
                    }).catch(err => {
                        state.loadingWord = false;
                        if (navigator.onLine && err) {
                            alert("Word is not found.");
                        } else {
                            alert("You are offline. Please reconnect and try again!");
                        }
                    })

            } else {
                alert("The search field should not be empty");
                state.loadingWord = false;
            }
        },
        deleteItem: ({ commit }, payload) => {
            commit("deleteItem", payload);
        },
        handleSideDrawer: ({ commit }, payload) => {
            commit("handleSideDrawer", payload);
        },
        updateDataFromFirebase: ({ commit }, payload) => {
            commit("updateDataFromFirebase", payload);
        },
        clearWordResults: ({ commit }) => {
            commit("clearWordResults");
        }
    }
})