import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean,
  user: null,
  otp: {
    phone: string,
    hash: string
  }
}
export interface otpInterface { phone: string, hash: string }

const initialState: AuthState = {
  isAuth: false,
  user: null,
  otp: {
    phone: '',
    hash: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
      if(user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action: PayloadAction<otpInterface>) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    }
  },
});

export const { setAuth, setOtp } = authSlice.actions

export default authSlice.reducer