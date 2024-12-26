import publicAxios from "../utils/serviceUtils/publicAxios.ts";
import {Response} from "../models/response.model.ts";
import {TokenReturnDto, UpdateUserPasswordDto, UserDto, UserReturnDto} from "../models/authUser.model.ts";
import privateAxios from "../utils/serviceUtils/privateAxios.ts";

const authUserApi = {
    login: async (userDto: UserDto) => (await publicAxios.post<Response<TokenReturnDto>>("/AuthUser/Login", userDto)).data,
    getActiveUser: async () => (await privateAxios.post<Response<UserReturnDto>>("/User/GetActiveUser")).data,
    updateUserPassword: async (updateUserPasswordDto: UpdateUserPasswordDto) => (await privateAxios.post<Response<UserReturnDto>>("/User/UpdateUserPassword", updateUserPasswordDto)).data,
}

export default authUserApi;
