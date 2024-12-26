import {Button, Grid, GridItem} from "@chakra-ui/react";
import {useState} from "react";
import {AxiosError} from "axios";
import {ErrorDto, Response} from "../../../models/response.model.ts";
import {toast} from "react-toastify";
import authUserApi from "../../../controllers/authUser.controller.ts";

function UpdateUserPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updateUserPassword = async () => {
        try {
            setIsLoading(true);
            await authUserApi.updateUserPassword({oldPassword, newPassword});
            toast.success("Şifre güncellendi!");
            setIsLoading(false);
        } catch (e) {
            const err = e as AxiosError<Response<ErrorDto>>
            if (err?.response?.data.error.isShow && err?.response?.data.error.errors[0]) {
                toast.warning(err.response.data.error.errors[0])
            }
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{base: 12, lg: 3}}>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Eski şifre:</span>
                            <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Yeni şifre:</span>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <Button onClick={updateUserPassword} isLoading={isLoading} loadingText="Güncelleniyor..." className="ml-3 mt-8 w-11/12" colorScheme="blue">Güncelle</Button>
                </GridItem>
            </Grid>
        </div>
    )
}

export default UpdateUserPassword;
