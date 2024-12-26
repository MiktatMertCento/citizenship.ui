import {useState} from "react";
import citizenshipApi from "../../../controllers/citizenship.controller.ts";
import {toast} from "react-toastify";
import {ErrorDto, Response} from "../../../models/response.model.ts";
import {AxiosError} from "axios";
import {Button, Grid, GridItem} from "@chakra-ui/react";
const CitizenAddressSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [citizenId, setCitizenId] = useState("");
    const [foundAddress, setFoundAddress] = useState("");

    const searchCitizenAddress = async () => {
        try {
            setIsLoading(true);

            if (citizenId === "") {
                toast.warning("En az bir alanı doldurmalısınız");
                setIsLoading(false);
                return;
            }
            const foundCitizen_ = await citizenshipApi.searchCitizenAddress({tc: citizenId});
            if (foundCitizen_.data) {
                setFoundAddress(foundCitizen_.data.address);
            }

            setIsLoading(false);
        } catch (e) {
            const err = e as AxiosError<Response<ErrorDto>>
            if (err?.response?.data.error.isShow && err?.response?.data.error.errors[0]) {
                toast.warning(err.response.data.error.errors[0])
                setFoundAddress("");
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
                            <span>T.C. Kimlik:</span>
                            <input value={citizenId} onChange={e => setCitizenId(e.target.value)} type="text"/>
                        </div>
                    </div>
                    <Button onClick={searchCitizenAddress} isLoading={isLoading} loadingText="Sorgulanıyor..." className="ml-3 mt-8 w-11/12" colorScheme="blue">Sorgula</Button>
                </GridItem>
                <GridItem colSpan={{base: 12, lg: 9}}>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Bulunan Adres:</span>
                            <textarea value={foundAddress} disabled={true} className="pl-2"/>
                        </div>
                    </div>
                </GridItem>
            </Grid>
        </div>
    )
}

export default CitizenAddressSearch;
