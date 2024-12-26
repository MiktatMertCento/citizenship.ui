import pages from "./utils/pages";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Spinner, useColorModeValue} from "@chakra-ui/react";
import {Suspense, useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {catchError} from "./utils/serviceUtils/genericServiceUtils.ts";
import {ToastContainer} from "react-toastify";
import authUserApi from "./controllers/authUser.controller.ts";
import {authUser} from "./recoil/authUser/authUser.atom.ts";
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./views/components/navbar.tsx";
import NotFoundPage from "./views/pages/404/404.tsx";

function App() {
    const navigate = useNavigate();
    const theme = useColorModeValue("light", "dark");
    const [isLoading, setIsLoading] = useState(true);
    const [activeUser, setActiveUser] = useRecoilState(authUser);

    useEffect(() => {
        //document.body.className = "bg-gray-700 w-full h-full";
        const pageLoad = async () => {
            try {
                setIsLoading(true);

                if (localStorage.getItem("accessToken")) {
                    const activeUser_ = (await authUserApi.getActiveUser()).data;
                    if (activeUser_) {
                        setActiveUser(activeUser_);
                    }
                } else {
                    console.log("logine gitik abi")
                    navigate("/login");
                }

                setIsLoading(false);
            } catch (e) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate("/login");
                setIsLoading(false);
            }
        }

        pageLoad().catch(catchError);
    }, [navigate, setActiveUser]);

    return (
        <>
            {activeUser && <Nav/>}
            <ToastContainer theme={theme}/>
            {
                isLoading ? <div className="w-[98vw] h-[91vh] flex justify-center items-center"><Spinner/></div>
                    : <Routes>
                        <Route path="*" element={<NotFoundPage />}/>
                        {
                            pages.map(page => {
                                return <Route key={page.path} path={page.path} element={<Suspense fallback={<div className="h-screen w-screen flex items-center justify-center overflow-clip"><Spinner/></div>}>
                                    <page.component/>
                                </Suspense>}/>
                            })
                        }
                    </Routes>
            }
        </>
    )
}

export default App
