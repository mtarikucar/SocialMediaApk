import {useState} from "react";
import {motion} from 'framer-motion';
import {useQuery} from "react-query";
import axios from "../../../api/axios";

import {columnsDataVersion, columnsDataDetail} from "./variables/columnsData";
import AppList from "./components/AppList";
import DetailTable from "./components/DetailTable";


const Dashboard = () => {
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [appData, setAppData] = useState([]);


    const variants = {
        hidden: {opacity: 0, x: -100},
        visible: {opacity: 1, x: 0}
    };


    const {
        data: apps,
        isLoading,
        isError,
        error
    } = useQuery(['apps'], async () => {
        const response = await axios.get(`/instagram`);
        return response.data;
    }, {
        onSuccess: (data) => {
            setAppData(data.app)
            console.log(data.app)
        }
    });


    if (isLoading) {
        return "Landing...";
    }

    if (isError) {
        return "Error...";
    }


    return (
        <div className={"min-h-screen flex flex-col justify-center items-center"}>
            <div className={`mt-5 grid grid-cols-1 gap-5 ${selectedVersion ? "grid-cols-2" : "grid-cols-1"}`}>

                <AppList
                    columnsData={columnsDataVersion}
                    tableData={appData}
                    setSelectedVersion={setSelectedVersion}
                    selectedVersion={selectedVersion}
                />

                {selectedVersion && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={variants}
                        transition={{duration: 0.5}}

                    >
                        <DetailTable
                            columnsData={columnsDataDetail}
                            tableData={selectedVersion.variants || []}
                            selectedVersion={selectedVersion}
                            setSelectedVersion={setSelectedVersion}
                        />
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;
