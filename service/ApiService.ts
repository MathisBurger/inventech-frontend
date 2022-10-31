import {BaseWebFetcher} from "./BaseWebFetcher";
import {LoginResponse} from "../typings/LoginResponse";

export class ApiService extends BaseWebFetcher {

    public async login(username: string, password: string): Promise<LoginResponse>
    {
        return await this.post<LoginResponse>("/login", {
            username,
            password
        });
    }
}
