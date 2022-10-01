import {BaseWebFetcher} from "./BaseWebFetcher";
import {LoginResponse} from "../typings/LoginResponse";

export class ApiService extends BaseWebFetcher {

    public async login(mail: string, password: string): Promise<LoginResponse>
    {
        return await this.post<LoginResponse>("/v1", {
            type: 'loginpw',
            mail,
            password
        });
    }
}
