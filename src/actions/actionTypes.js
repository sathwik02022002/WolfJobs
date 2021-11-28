//Login action types

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";


export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

//This is the action which will dispatch when we will find the user using local storage jwt token

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const LOG_OUT = "LOG_OUT";

export const CLEAR_AUTH_STATE = "CLEAR_AUTH_STATE";

export const ADD_JOB = "ADD_JOB";
export const UPDATE_JOB = "UPDATE_JOB";
export const CLOSE_JOB = "CLOSE_JOB";

export const ADD_APPLICATION = "ADD_APPLICATION";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const ACCEPT_APPLICATION = "ACCEPT_APPLICATION";
export const REJECT_APPLICATION = "REJECT_APPLICATION";



export const EDIT_USER_SUCCESSFULL = "EDIT_USER_SUCCESSFULL";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";

export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILURE = "USER_PROFILE_FAILURE";

export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";

export const EDIT_HISTORY_SUCCESSFULL = "EDIT_HISTORY_SUCCESSFULL";
export const EDIT_HISTORY_FAILED = "EDIT_HISTORY_FAILED";


export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";

export const CLEAR_SEARCH_STATE = "CLEAR_SEARCH_STATE";

export const SET_LOADING = "SET_LOADING";

export const GENERATE_OTP_SUCCESS = "GENERATE_OTP_SUCCESS";
export const GENERATE_OTP_FAILED = "GENERATE_OTP_FAILED";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILED = "VERIFY_OTP_FAILED";

export const USER_EMAIL_VERIFIED = "USER_EMAIL_VERIFIED";