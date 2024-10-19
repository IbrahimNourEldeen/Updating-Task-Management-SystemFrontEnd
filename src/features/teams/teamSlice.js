import { createSlice } from "@reduxjs/toolkit";

const initialState={
    teams:[],
}

const teamSlice=createSlice({
    name:'teams',
    initialState,
    reducers:{
        AddTeams:(state,action)=>{
            state.teams=action.payload
        },
        pushTeam:(state,action)=>{
            state.teams.push(action.payload)
        },
        
    }
})
export default teamSlice.reducer
export const { AddTeams,pushTeam } = teamSlice.actions
