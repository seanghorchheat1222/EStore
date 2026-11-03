import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: '',
  name: '',
  email: '',
  role: '',
  setting: {}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id,
      state.name = action.payload.name,
      state.email = action.payload.email,
      state.role = action.payload.role,
      state.setting = action.payload.setting
    },
    clearUser: () => initialState
  }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
