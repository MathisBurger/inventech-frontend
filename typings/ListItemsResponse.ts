import {BaseResponse} from "./BaseResponse";

export interface ListItemsResponse extends BaseResponse {
    token?: string;
    items: object;
}
