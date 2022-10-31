import {BaseWebFetcher} from "./BaseWebFetcher";
import {LoginResponse} from "../typings/LoginResponse";
import {ResetPasswordResponse} from "../typings/ResetPasswordResponse";

export class ApiService extends BaseWebFetcher {

    public async login(username: string, password: string): Promise<LoginResponse>
    {
        return await this.post<LoginResponse>("/login", {
            username,
            password
        });
    }

    public async changePassword(token: string, oldpassword: string, newpassword: string): Promise<ResetPasswordResponse>
    {
        return await this.post<ResetPasswordResponse>("/changePW", {
            token,
            oldpassword,
            newpassword
        });
    }
}
