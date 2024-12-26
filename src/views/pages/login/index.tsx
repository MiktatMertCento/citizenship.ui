import React, {useEffect, useState} from "react";
import authUserApi from "../../../controllers/authUser.controller.ts";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {authUser} from "../../../recoil/authUser/authUser.atom.ts";
import {Box, Button} from "@chakra-ui/react";
import {AxiosError} from "axios";
import {ErrorDto, Response} from "../../../models/response.model.ts";
import {toast} from "react-toastify";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
    const [activeUser, setActiveUser] = useRecoilState(authUser); // [state, setState
    const navigate = useNavigate();

    useEffect(() => {
        if (activeUser) navigation("/");
    }, [activeUser, navigation]);
    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            setIsLoading(true);

            const loginUser = await authUserApi.login({userName, password});
            if (loginUser.data) {
                localStorage.setItem("accessToken", loginUser.data.accessToken);
                localStorage.setItem("refreshToken", loginUser.data.refreshToken);
                const activeUser_ = (await authUserApi.getActiveUser()).data;
                if (activeUser_) {
                    setActiveUser(activeUser_);
                }

                navigate("/");
            }

            setIsLoading(false);
        } catch (e) {
            const err = e as AxiosError<Response<ErrorDto>>
            if (err?.response?.data.error.isShow && err?.response?.data.error.errors[0]) {
                toast.warning(err.response.data.error.errors[0]);
            } else {
                toast.warning("Sunucuya bağlanırken bir hata oluştu.");
            }
            setIsLoading(false);
        }
    }

    return <>
        <Box className="h-screen w-full flex items-center justify-center">
            <Box className="w-5/6 md:w-4/6 lg:w-2/6 h-52 rounded-2xl p-2 flex flex-col">
                <form onSubmit={login}>
                    <div className="mt-2 flex flex-col">
                        <span>Kullanıcı adı:</span>
                        <input value={userName} onChange={e => setUserName(e.target.value)}/>
                    </div>

                    <div className="mt-2 flex flex-col">
                        <span>Şifre:</span>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password"/>
                    </div>

                    <div className="flex justify-end">
                        <Button isLoading={isLoading} loadingText="Yükleniyor..." type="submit" className="mt-2">Giriş yap</Button>
                    </div>
                </form>
            </Box>
        </Box>
    </>
}

export default LoginPage;
