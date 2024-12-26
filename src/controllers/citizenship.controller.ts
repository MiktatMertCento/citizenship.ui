import privateAxios from "../utils/serviceUtils/privateAxios.ts";
import {CitizenAddressResultDto, CitizenDto, CitizenIdDto, CitizenResultDto} from "../models/citizenship.model.ts";
import {Response} from "../models/response.model.ts";

const citizenshipApi = {
    searchCitizen: async (citizenDto: CitizenDto) => (await privateAxios.post<Response<CitizenResultDto[]>>("/Citizenship/SearchCitizen", citizenDto)).data,
    searchNuclearFamily: async (citizenDto: CitizenIdDto) => (await privateAxios.post<Response<CitizenResultDto[]>>("/Citizenship/SearchNuclearFamily", citizenDto)).data,
    searchCitizenAddress: async (citizenDto: CitizenIdDto) => (await privateAxios.post<Response<CitizenAddressResultDto>>("/Citizenship/SearchCitizenAddress", citizenDto)).data,
}

export default citizenshipApi;