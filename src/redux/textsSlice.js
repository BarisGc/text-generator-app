import { createSlice } from "@reduxjs/toolkit";
import cities from '../data/cities_turkey.json'
var shuffle = require('shuffle-array')

let parapgraphsArray = [];
let _1000wordsControlArray = []
for (let i = 1; i < cities.length + 1; i++) {
    _1000wordsControlArray.push(cities[i - 1].name);
    if ((i + 100) % 100 === 0) {
        parapgraphsArray.push(shuffle(_1000wordsControlArray, { 'copy': true }))
        console.log("parapgraphsArray", parapgraphsArray)
        _1000wordsControlArray = []
    }
}

let shuffledParapgraphsArray = shuffle(parapgraphsArray, { 'copy': true })

export const textsSlice = createSlice({
    name: 'texts',
    initialState: {
        items: shuffledParapgraphsArray,
        requestedParagraphNum: 1,
        isHtmlIncluded: false,
        isCopied: false,
    },
    reducers: {
        // toggleCards: (state, action) => {
        //     // Card Flipper
        //     const { id } = action.payload;
        //     const card = state.items.find((element) => element.id === id);
        //     card.isOpen = !card.isOpen;
        // },
        copyAllParagraphs: (state, action) => {
            const isCopied = action.payload;
            state.isCopied = isCopied;
            console.log("isCopied", isCopied)
        },
        addHtmlIntoParagraphs: (state, action) => {
            const isHtmlIncluded = action.payload;

            if (isHtmlIncluded) {
                state.items = state.items.map((element) => {
                    element[0] = `</p>${element[0]}`
                    element[element.length - 1] = `${element[element.length - 1]}</p>`
                    return element
                })
            } else {
                state.items = state.items.map((element) => {
                    element = element[0].substring(3, element.length - 1);
                    element = element[element.length - 1].substring(1, element.length - 5);
                    // element.shift('<p>')
                    return element
                })
            }
            state.isHtmlIncluded = isHtmlIncluded;
        },
        defineNumberOfParagraps: (state, action) => {
            const numberOfParagraphs = action.payload;
            state.requestedParagraphNum = numberOfParagraphs;
        },
    },
    extraReducers: {
    }
});

export const { copyAllParagraphs, addHtmlIntoParagraphs, defineNumberOfParagraps } = textsSlice.actions;
export default textsSlice.reducer;