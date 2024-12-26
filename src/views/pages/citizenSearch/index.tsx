import {useState} from "react";
import citizenshipApi from "../../../controllers/citizenship.controller.ts";
import {toast} from "react-toastify";
import {CitizenResultDto} from "../../../models/citizenship.model.ts";
import {ErrorDto, Response} from "../../../models/response.model.ts";
import {AxiosError} from "axios";
import {AgGridReact} from 'ag-grid-react';
import {Button, Grid, GridItem} from "@chakra-ui/react";
import moment from 'moment';
import {ValueGetterParams} from "../../../utils/interfaces/aggridInterfaces.ts";

const CitizenSearch = () => {
    const columnDefinition = [
        {headerName: "TC", field: "tc"},
        {headerName: "Adı Soyadı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data.adi} ${params.data.soyadi}`},
        {headerName: "Doğum Tarihi", field: "dogumTarihi"},
        {headerName: "Nüfus", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data.nufusIl} / ${params.data.nufusIlce}`},
        {headerName: "Anne Adı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.anneAdi} / ${params.data?.anneTc}`},
        {headerName: "Baba Adı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.babaAdi} / ${params.data?.babaTc}`},
        {headerName: "Sahip Olduğu Telefon Numaraları", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.gsmNumbers.join(", ")}`},
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [citizenId, setCitizenId] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [birthdayYear, setBirthdayYear] = useState("");
    const [birthdayCity, setBirthdayCity] = useState("");
    const [birthdayCounty, setBirthdayCounty] = useState("");
    const [momName, setMomName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [gsmNo, setGsmNo] = useState("");
    const [foundCitizen, setFoundCitizen] = useState<CitizenResultDto[] | null | undefined>([]);

    const searchCitizen = async () => {
        try {
            setIsLoading(true);

            if (citizenId === "" && name === "" && surname === "" && birthday === "" && birthdayCity === "" && birthdayCounty === "" && momName === "" && fatherName === "" && gsmNo === "" && birthdayYear === "") {
                toast.warning("En az bir alanı doldurmalısınız");
                setIsLoading(false);
                return;
            }
            const foundCitizen_ = await citizenshipApi.searchCitizen({tc: citizenId, adi: name, soyadi: surname, anneAdi: momName, babaAdi: fatherName, dogumTarihi: birtydayForService(), nufusIl: birthdayCity, nufusIlce: birthdayCounty, gsmNo: gsmNo, dogumYili: birthdayYear});
            if (foundCitizen_.data) {
                setFoundCitizen(foundCitizen_.data);
            }

            setIsLoading(false);
        } catch (e) {
            const err = e as AxiosError<Response<ErrorDto>>
            if (err?.response?.data.error.isShow && err?.response?.data.error.errors[0]) {
                toast.warning(err.response.data.error.errors[0])
                setFoundCitizen(null);
            }
            setIsLoading(false);
        }
    }

    const birtydayForService = () => {
        if (birthday === "" || birthday === null || moment(birthday).isValid()) return "";
        return moment(birthday).format("D.M.YYYY");
    }

    return (
        <div>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={{base: 6, lg: 3}}>
                    <div className="w-full px-3 flex flex-col">
                        <div className="mt-2 flex flex-col">
                            <span>TC Kimlik No:</span>
                            <input value={citizenId} onChange={e => setCitizenId(e.target.value)} type="number"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Ad:</span>
                            <input value={name} onChange={e => setName(e.target.value)} type="text"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Soyad:</span>
                            <input value={surname} onChange={e => setSurname(e.target.value)} type="text"/>
                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={{base: 6, lg: 3}}>
                    <div className="w-full px-3 flex flex-col">
                        <div className="mt-2 flex flex-col">
                            <span>Doğum Tarihi:</span>
                            <input value={birthday} onChange={e => setBirthday(e.target.value)} type="date"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Doğum Yeri İl:</span>
                            <input value={birthdayCity} onChange={e => setBirthdayCity(e.target.value)} type="text"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Doğum Yeri İlçe:</span>
                            <input value={birthdayCounty} onChange={e => setBirthdayCounty(e.target.value)} type="text"/>
                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={{base: 6, lg: 3}}>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Anne Adı:</span>
                            <input value={momName} onChange={e => setMomName(e.target.value)} type="text"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Baba Adı:</span>
                            <input value={fatherName} onChange={e => setFatherName(e.target.value)} type="text"/>
                        </div>
                        <div className="mt-2 flex flex-col">
                            <span>Tel. No:</span>
                            <input placeholder="5555555555" value={gsmNo} onChange={e => setGsmNo(e.target.value)} type="phone"/>
                        </div>
                    </div>
                </GridItem>
                <GridItem colSpan={{base: 6, lg: 3}}>
                    <div className="w-full lg:mt-2 px-3 flex flex-col">
                        <div className="flex flex-col">
                            <span>Doğum Yılı:</span>
                            <input value={birthdayYear} onChange={e => setBirthdayYear(e.target.value)} type="number" min="1900" max="2099" step="1"/>
                        </div>
                    </div>
                    <Button onClick={searchCitizen} isLoading={isLoading} loadingText="Sorgulanıyor..." className="ml-3 mt-8 w-5/6" colorScheme="blue">Sorgula</Button>

                </GridItem>

            </Grid>


            <div className="ag-theme-alpine px-3 h-96 w-full mt-4">
                <AgGridReact
                    columnDefs={columnDefinition}
                    rowData={foundCitizen}
                    pagination={true}
                    paginationPageSize={100}
                    suppressMovableColumns
                    enableCellTextSelection
                    rowSelection="multiple"
                    suppressCellSelection={true}
                    localeText={{
                        copy: "Kopyala",
                        copyWithHeaders: "Başlık ile kopyala",
                        paste: "Yapıştır",
                        export: "Dışa Aktar",
                        csvExport: "CSV Dosyası",
                        excelExport: "Excel Dosyası",
                        page: "Sayfa",
                        of: " / ",
                        to: " - ",
                        pinColumn: "Sütunu Sabitle",
                        pinLeft: "Sola Sabitle",
                        pinRight: "Sağa Sabitle",
                        noPin: "Sabitleme",
                        autosizeThiscolumn: "Bu sütunu otomatik boyutlandır",
                        autosizeAllColumns: "Tüm sütunları otomatik boyutlandır",
                        resetColumns: "Sütunları sıfırla",
                        reset: "Sıfırla",
                        apply: "Uygula",
                        searchOoo: "Ara...",
                        selectAll: "Hepsini Seç",
                        resetFilter: "Sıfırla",
                        applyFilter: "Uygula",
                    }}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        editable: false,
                        floatingFilter: true,
                        wrapText: true,
                        autoHeight: true,
                        cellStyle: {whiteSpace: 'normal'},
                        filterParams: {
                            buttons: ['reset', 'apply'],
                            closeOnApply: true,
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default CitizenSearch;
