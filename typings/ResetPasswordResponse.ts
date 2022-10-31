import {BaseResponse} from "./BaseResponse";

export interface ResetPasswordResponse extends BaseResponse {
    token?: string;
}
