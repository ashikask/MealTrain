import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import axios from '../lib/axios';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';
import Error from 'next/error';

export enum AuthStates {
  IDLE = 'idle',
  LOADING = 'loading',
}

interface User{
  username?:string,
  id?:string,
  role?:string,
  email?:string
}
export const fetchUser = createAsyncThunk('auth/me', async (user:User, thunkAPI) => {
  try {
    const response = await axios.get<{ username?: string; email?: string; type?: string }>(`auth/me/${user.id}`)

    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email?: string; password: string,username?:string }, thunkAPI) => {
    // credentials={password: "hello",username:"gurmukh" } ;
    try {
      const customAxiosRequestConfig: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };
      const response = await axios.post<{ accessToken: string, user:User }>('auth/signin', credentials,customAxiosRequestConfig)
      // const refetch = await axios.get<{ username: string }>('auth/me/638050f13e67ef423d6125e0', {
      //   headers: { Authorization: `Bearer ${response.data.accessToken}` },
      // })
      return { accessToken: response.data.accessToken, user: response.data.user } 
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; username: string,role:string }, thunkAPI) => {
    try {
      const customAxiosRequestConfig: AxiosAuthRefreshRequestConfig = { skipAuthRefresh: true };
      const response = await axios.post<{ user:User }>('auth/signup', credentials,customAxiosRequestConfig)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data )
    }
  }
)
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.delete<{ accessToken: string }>('auth/signout')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export interface AuthSliceState {
  accessToken: string
  loading: AuthStates
  user?: {
    username?: string
    email?: string,
    role?:string,
    userId?:string
  }
  error?: SerializedError,
  isLoggedIn?:boolean
}

const internalInitialState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  // me: null,
  error: null,
  user:{
    
  },
  isLoggedIn:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state: AuthSliceState, action: PayloadAction<{ token: string }>) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user= action.payload.user;
      state.loading = AuthStates.IDLE
    })
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      throw new Error(action.error.message)
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = AuthStates.LOADING
      state.isLoggedIn=false;
    })
    builder.addCase(logout.fulfilled, (_state) => internalInitialState)
    builder.addCase(login.pending, (state) => {
      state.loading = AuthStates.LOADING
    })
    builder.addCase(register.fulfilled, (state, action) => {
  
      //state.user=action.payload.user;
      state.loading = AuthStates.IDLE
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error }
      // throw new Error(action.error.message)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // state.me = action.payload;
      state.user= action.payload;
    })
  },
})

export const { updateAccessToken, reset,userDetailsId } = authSlice.actions