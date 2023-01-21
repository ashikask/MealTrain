import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import Error from "next/error";

interface User {
  firstname?: string;
  lastname?: string;
  imagePath?: string;
  id?: string;
  role?: string;
  address?: Address;
  name?: string;
  userAccountId?:string,
  providerId?:string;
  studentId?:string;
  shortDescription?:string;
  description?:string;
}
interface Address {
  city?: string;
  aptNo?: string;
  zipcode?: string;
  name?: string;
  state?:string;
  streetName?:string;
}
export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (user: User, thunkAPI) => {
    try {
      const response = await axios.get<{ user: User }>(`users/${user.id}`, {
        params:{
          userAccountId:user.userAccountId
        }
    });
      return {...response.data,userAccountId:user.userAccountId }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addUserDetails = createAsyncThunk(
  "users/addUserDetails",
  async (userObj: User, thunkAPI) => {
    try {
      const response = await axios.post<{ user: User }>(
        'users',
        userObj
      );
      return {...response.data,userAccountId:userObj.userAccountId };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "users/updateUserDetails",
  async (userObj: User, thunkAPI) => {
    try {
      const response = await axios.put<{ user: User }>(
        `users/${userObj.id}`,
        userObj
      );
      return {...response.data,userAccountId:userObj.userAccountId }
      ;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);



export interface UserSliceState {
  user?: {
    firstname?: string;
    lastname?: string;
    id?: string;
    role?: string;
    address?: Address;
    imagePath?: string;
    name?: string;
    userAccountId?:string;
    providerId?:string;
    shortDescription?:string;
  description?:string;
  studentId?:string;
  };
  error?: SerializedError;
  isLoggedIn?: boolean;
  formStage?: number;
  formUserProfile: User;
  formUserAddress: User;
}

const internalInitialState = {
  error: null,
  user: {},
  isLoggedIn: false,
  formStage: 1,
  formUserProfile: {
    firstname: "",
    lastname: "",
    name: "",
    phoneNumber: "",
    imagePath: "",
    shortDescription:"",
  description:""
  },
  formUserAddress: {
    streetName: "",
    city:   "",
    state: "",
    zipcode: "",
    aptNo:"",
    name:""
  },
};


const getPersonalDetails = (userDetails:any) => {
  let personalDetails : any = {...userDetails};
  delete personalDetails?.address;
  return personalDetails;
}

const getUserAddressDetails = (userDetails:User) :any => {
  let addressDetails :any = {};
  addressDetails = userDetails.address;
  addressDetails.name = userDetails.name;
  return addressDetails; 
}

export const userProfileSlice = createSlice({
  name: "user",
  initialState: internalInitialState,
  reducers: {
    formStageAction: (state, action) => {
      state.formStage = action.payload;
    },
    formUserProfileAction: (state, action) => {
      state.formUserProfile = action.payload;
    },
    formUserAddressAction: (state, action) => {
      state.formUserAddress = action.payload;
    },
  },
  extraReducers: (builder) => {


    builder.addCase(addUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.formUserProfile = getPersonalDetails({...action.payload});
      state.formUserAddress = getUserAddressDetails({...action.payload});
    });
    builder.addCase(addUserDetails.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.formUserProfile = getPersonalDetails({...action.payload});
      state.formUserAddress = getUserAddressDetails({...action.payload});
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
    });

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.formStage = 1;
      state.formUserProfile = getPersonalDetails(action.payload);
      state.formUserAddress = getUserAddressDetails(action.payload);

    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
    });
  },
});

export const { formStageAction, formUserProfileAction, formUserAddressAction } =
  userProfileSlice.actions;
