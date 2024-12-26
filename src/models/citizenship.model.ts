type CitizenDto = {
    tc?: string,
    adi?: string,
    soyadi?: string,
    dogumTarihi?: string,
    dogumYili?: string,
    nufusIl?: string,
    nufusIlce?: string,
    anneAdi?: string,
    babaAdi?: string,
    gsmNo?: string
}

type CitizenIdDto = {
    tc: string
}

type CitizenResultDto = {
    id: number,
    tc: string,
    adi: string,
    soyadi: string,
    dogumTarihi: string,
    nufusIl: string,
    nufusIlce: string,
    anneAdi: string,
    anneTc: string,
    babaAdi: string,
    babaTc: string,
    uyruk: string,
    gsmNumbers: string[]
}

type CitizenAddressResultDto = {
    citizen: CitizenResultDto,
    address: string
}

export type {
    CitizenDto,
    CitizenIdDto,
    CitizenResultDto,
    CitizenAddressResultDto
};