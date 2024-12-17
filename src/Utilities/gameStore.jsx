import { configureStore } from "@reduxjs/toolkit";
import dayDataReducer from "./dayDataSlice"
import gamesReducer from "./gamesDataSlice"
import user from "./userSlice"



const gameStore = configureStore(
    {
        reducer:{
            dayData:dayDataReducer,
            games:gamesReducer,
            user:user
            
        }
    }
)


export default gameStore