import React, {lazy} from "react";

interface Page {
    path: string;
    component: React.LazyExoticComponent<React.ComponentType>;
    isHidden: boolean;
    name: string;
}

export default [
    {
        path: "/login",
        component: lazy(() => import("../../views/pages/login")),
        isHidden: true,
        name: "Giriş Yap"
    },
    {
        path: "/",
        component: lazy(() => import("../../views/pages/homepage")),
        isHidden: true,
        name: "Anasayfa"
    },
    {
        path: "/citizenSearch",
        component: lazy(() => import("../../views/pages/citizenSearch")),
        isHidden: false,
        name: "Vatandaş Sorgu"
    },
    {
        path: "/nuclearFamilySearch",
        component: lazy(() => import("../../views/pages/nuclearFamilySearch")),
        isHidden: false,
        name: "Çekirdek Aile Sorgu"
    },
    {
        path: "/citizenAddressSearch",
        component: lazy(() => import("../../views/pages/citizenAddressSearch")),
        isHidden: true,
        name: "Adres Sorgu"
    },
    {
        path: "/profile/updateUserPassword",
        component: lazy(() => import("../../views/pages/profile/updateUserPassword")),
        isHidden: true,
        name: "Şifre Güncelle"
    },
    {
        path: "/smsBomber",
        component: lazy(() => import("../../views/pages/smsBomber")),
        isHidden: true,
        name: "SMS Bombardımanı"
    }
] as Page[];
