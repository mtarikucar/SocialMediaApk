import React from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import routes from "../../routes.js";
import ScrollToTop from "../../hooks/ScrollToTop";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Admin(props) {

    const location = useLocation();
    const [_, setCurrentRoute] = React.useState("");


    React.useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes) => {
        let activeRoute = "Main Dashboard";
        for (let i = 0; i < routes.length; i++) {
            if (window.location.href.indexOf(routes[i].layout + "/" + routes[i].path) !== -1) {
                setCurrentRoute(routes[i].name);
            }
        }
        return activeRoute;
    };

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (<Route path={`/${prop.path}`} element={prop.component} key={key}/>);
            } else {
                return null;
            }
        });
    };



    document.documentElement.dir = "ltr";
    return (<div className="flex h-full w-full">
        <ScrollToTop/>
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900 ">
            <main className={`mx-[12px] h-full flex justify-center items-center transition-all md:pr-2  `}>
                <div className="h-full">
                    <div className="pt-5s mx-auto mb-auto h-full min-h-screen p-2 md:pr-2">
                        <Routes>
                            {getRoutes(routes)}
                            <Route
                                path="/"
                                element={<Navigate to="/admin/default" replace/>}
                            />
                        </Routes>
                    </div>
                </div>
                <ToastContainer/>
            </main>
        </div>
    </div>);
}
