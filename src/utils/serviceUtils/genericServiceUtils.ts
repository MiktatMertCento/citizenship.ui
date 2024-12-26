import {Response} from "../../models/response.model.ts";

export const catchError = (error: Response<null>) => {
    console.log(error)
}