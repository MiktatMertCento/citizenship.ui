import {useState} from "react";
import citizenshipApi from "../../../controllers/citizenship.controller.ts";
import {toast} from "react-toastify";
import {CitizenResultDto} from "../../../models/citizenship.model.ts";
import {ErrorDto, Response} from "../../../models/response.model.ts";
import {AxiosError} from "axios";
import {Button, Grid, GridItem} from "@chakra-ui/react";
import {AgGridReact} from 'ag-grid-react';
import {ValueGetterParams} from "../../../utils/interfaces/aggridInterfaces.ts";

const NuclearFamilySearch = () => {
    const columnDefinition = [
        {headerName: "TC", field: "tc", width: 150, minWidth: 150},
        {headerName: "Adı Soyadı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data.adi} ${params.data.soyadi}`},
        {headerName: "Doğum Tarihi", field: "dogumTarihi", width: 150, minWidth: 150},
        {headerName: "Nüfus", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data.nufusIl} / ${params.data.nufusIlce}`},
        {headerName: "Anne Adı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.anneAdi} / ${params.data?.anneTc}`},
        {headerName: "Baba Adı", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.babaAdi} / ${params.data?.babaTc}`},
        {headerName: "Sahip Olduğu Telefon Numaraları", valueGetter: (params: ValueGetterParams<CitizenResultDto>) => `${params.data?.gsmNumbers.join(", ")}`, autoWidth: true},
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [citizenId, setCitizenId] = useState("");
    const [foundCitizen, setFoundCitizen] = useState<CitizenResultDto[] | null | undefined>([]);

    const searchCitizen = async () => {
        try {
            setIsLoading(true);

            if (citizenId === "") {
                toast.warning("En az bir alanı doldurmalısınız");
                setIsLoading(false);
                return;
            }
            const foundCitizen_ = await citizenshipApi.searchNuclearFamily({tc: citizenId});
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
                    <Button onClick={searchCitizen} isLoading={isLoading} loadingText="Sorgulanıyor..." className="ml-3 mt-8 w-11/12" colorScheme="blue">Sorgula</Button>

                </GridItem>

            </Grid>


            {/*overflow-x clip*/}
            <div className="ag-theme-alpine px-3 w-full mt-4 h-[calc(100vh-250px)]">
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

export default NuclearFamilySearch;
