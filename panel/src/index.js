import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.css";

import App from "./App";

import {QueryClient, QueryClientProvider} from "react-query";

import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();


root.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                <App/>
            </DevSupport>
        </QueryClientProvider>
    </Router>
);

