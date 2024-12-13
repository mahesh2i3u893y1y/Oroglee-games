import { configureStore } from "@reduxjs/toolkit";
import dayDataReducer from "./dayDataSlice"
import gamesReducer from "./gamesDataSlice"



const gameStore = configureStore(
    {
        reducer:{
            dayData:dayDataReducer,
            games:gamesReducer
            
        }
    }
)


export default gameStore