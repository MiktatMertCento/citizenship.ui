import { atom } from 'recoil';
import {UserReturnDto} from "../../models/authUser.model.ts";

export const authUser = atom<UserReturnDto | null | undefined>({
    key: 'authUser',
    default: null
});