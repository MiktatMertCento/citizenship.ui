import {Button, Grid, GridItem} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";

function SmsBomber() {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const sendSms = async () => {
        try {
            setIsLoading(true);

            await axios.get(`${import.meta.env.VITE_SMS_API_URL}/?phoneNumber=${phoneNumber}&howMany=500`)

            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{base: 12, lg: 3}}>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Telefon numarası:</span>
                            <input value={phoneNumber} placeholder="5428922827" onChange={e => setPhoneNumber(e.target.value)} type="text"/>
                        </div>
                    </div>

                    <Button onClick={sendSms} isLoading={isLoading} loadingText="Gönderiliyor..." className="ml-3 mt-8 w-11/12" colorScheme="blue">Gönder</Button>
                </GridItem>
            </Grid>
        </div>
    )
}

export default SmsBomber;
