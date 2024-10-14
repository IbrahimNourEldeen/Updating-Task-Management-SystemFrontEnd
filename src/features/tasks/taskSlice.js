import { createSlice } from "@reduxjs/toolkit";

const initialState={
    tasks:[],
    teamTasks:[]
}

const taskSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        AddTasks:(state,action)=>{
            state.tasks=action.payload
        },
        pushTask:(state,action)=>{
            state.tasks.push(action.payload)
        },

        AddTeamTasks:(state,action)=>{
            state.teamTasks=action.payload
        },
        pushTaskToTeam:(state,action)=>{
            state.teamTasks.push(action.payload)
        },
    }
})
export default taskSlice.reducer
export const { AddTasks,pushTask, AddTeamTasks, pushTaskToTeam } = taskSlice.actions
