type TokenReturnDto = {
    accessToken: string,
    accessTokenExpiration: string,
    refreshToken: string,
    refreshTokenExpiration: string
}

type UserDto = {
    userName: string,
    password: string
}

type UserReturnDto = {
    id: number,
    userName: string,
    password: string,
    isActive: boolean,
    refreshToken?: string
    nameSurname: string,
    gsmNo: string
}

type UpdateUserPasswordDto = {
    oldPassword: string,
    newPassword: string
}

export type {
    UserDto,
    UserReturnDto,
    TokenReturnDto,
    UpdateUserPasswordDto
};
