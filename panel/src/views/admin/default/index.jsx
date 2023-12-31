import {columnsDataCheck, columnsDataComplex} from "./variables/columnsData";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";

import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import {useState} from "react";

const Dashboard = () => {
    const [selectedVersion, setSelectedVersion] = useState()
    return (
        <div className={"min-h-screen flex flex-col justify-center items-center "}>


            <div className={`mt - 5 grid grid-cols-1 gap-5  ${selectedVersion ? "grid-cols-2" :"grid-cols-1"}`}>

                <CheckTable
                    columnsData={columnsDataCheck}
                    tableData={tableDataCheck}
                />


              {/*  <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                />*/}

            </div>
        </div>
    );
};

export default Dashboard;
