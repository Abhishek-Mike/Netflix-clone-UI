import { createSlice } from '@reduxjs/toolkit';

//Reducer is like global store where it has independent stores, like slices of onion/store 
//where each slice perform independen info like userstore,basketstore
//to avoid prop drilling, passing of props from one component to other component
  export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    //we have to dispatch action to global store
    reducers: {
      //login and logout are actions
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      }
  },
});

export const { login, logout } = userSlice.actions;

//once you have pushed dispatch action like(useraction information) in to userstore, 
//To get value out from that store to be used into your component, we use SELECTOR
// state me gya fir userslise fir user 
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
