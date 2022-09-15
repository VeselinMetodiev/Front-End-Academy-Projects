import { User } from "./user.model";

export interface LoggedUserData {
    auth: boolean;
    user: User;
    token: string;
}