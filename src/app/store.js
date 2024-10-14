import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import taskReducer from "../features/tasks/taskSlice"
import teamReducer from "../features/teams/teamSlice"


import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig={
    key:"auth",
    storage
}
const persistedReducer = persistReducer(persistConfig, authReducer);




const store=configureStore({
    reducer:{
        auth:persistedReducer,
        tasks:taskReducer,
        teams:teamReducer
    }
})

const persistor = persistStore(store);

export default store;
export {persistor}