import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  
  initialState: {
    
    auth : false,
    
    user_info : {
      id : "",
      full_name : ""
    },
    
    menu : 'recieved',
    
    modal_vis : false,
    modal_data : {}

  },
  
  reducers: {
    
    changeAuth: (state) => {
      state.auth = !state.auth;
    },
    
    changeUserInfo : (state,action) =>{
      state.user_info = action.payload;
    },
    
    changeMenu(state,action){
      state.menu = action.payload;
    },
    
    changeModalVis(state){
      state.modal_vis = !state.modal_vis;
    },

    changeModalData(state,action){
      state.modal_data =action.payload; 
    }

  },
});


export const {
  changeAuth,
  changeUserInfo,
  changeMenu,
  changeModalVis,
  changeModalData,
} = commonSlice.actions;

export default commonSlice.reducer;
