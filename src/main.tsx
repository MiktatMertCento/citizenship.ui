import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RecoilRoot} from "recoil";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {LicenseManager} from "ag-grid-enterprise";
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.css';
import './views/styles/components/input.style.css';

LicenseManager.setLicenseKey("CompanyName=Belsoft Bilisim Sistemleri SAN. TIC. LTD STI,LicensedGroup=Belsoft Bilisim Sistemleri San. Tic. Ltd. Sti,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-022420,ExpiryDate=18_November_2022_[v2]_MTY2ODcyOTYwMDAwMA==48425a930d157fcb3f7ebd568fdaa86c");

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <RecoilRoot>
            <ChakraProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ChakraProvider>
        </RecoilRoot>
    </>,
)
