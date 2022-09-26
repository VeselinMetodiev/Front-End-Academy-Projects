import { LoggedUserData } from "../../model/sign-in";
import { User } from "../../model/user";
import { UserAction } from "../actions/actions";
import { FETCH_USERS_START, FETCH_USERS_SUCCESS, LOGIN_START, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_SUCCESS, SIGN_OUT } from "../actions/actionTypes";

export interface UsersState {
    users: User[];
    loggedUser: LoggedUserData | null;
    isLoading: boolean;
    isSignout: boolean,
    isSignUp: boolean,
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    loggedUser: null,
    isSignout: false,
    isSignUp: false,
};

export default function (state = initialState, action: UserAction) {
    switch (action.type) {
        case LOGIN_START: {
            return {
                ...state,
                isSignout: false,
                isSignUp: false,
                loggedUser: null,
                isLoading: true,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isSignout: false,
                isSignUp: false,
                loggedUser: action.loggedUser,
                isLoading: false,
            };  
        }
        case SIGNUP_START: {
            return {
                ...state,
                isSignUp: true,
                isLoading: false,
            };
        }

        case SIGNUP_SUCCESS: {
            return {
                ...state,
                // loggedUser: action.loggedUser,
                isLoading: false,
            };
        }
        case SIGN_OUT: {
            return {
                ...state,
                isSignout: true,
                loggedUser: null,
                isLoading: false,
            };
        }
        case FETCH_USERS_START: {
            return {
                ...state,
            }
        }
        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                users: action.users
            }
        }
        default:
            return state;
    }
}