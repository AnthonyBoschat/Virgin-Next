import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  ID: number | null,
  name: string | null
}

const initialState: UserState = {
  ID: null,
  name: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState:initialState,
  reducers: {
    setUserName:(state, action: PayloadAction<string>) => {
        state.name = action.payload
    }
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;