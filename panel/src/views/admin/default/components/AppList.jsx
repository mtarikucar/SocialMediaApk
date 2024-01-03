import React, {useMemo} from "react";
import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";

import {
    useGlobalFilter, useSortBy, useTable,
} from "react-table";



const AppList = (props) => {
    const {columnsData, tableData, setSelectedVersion, selectedVersion} = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable({
        columns, data,
    }, useGlobalFilter, useSortBy);

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = tableInstance;




    return (<Card extra={"w-full h-fit sm:overflow-auto px-6"}>
        <header className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
                Uygulama Versiyonlari
            </div>

            <CardMenu selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion}/>

        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table
                {...getTableProps()}
                className="w-full"
                variant="simple"
                color="gray-500"
                mb="24px"
            >
                <thead>
                {headerGroups.map((headerGroup, index) => (<tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (<th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                        key={index}
                    >
                        <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                            {column.render("Header")}
                        </div>
                    </th>))}
                </tr>))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={index} onClick={() => setSelectedVersion(selectedVersion !== tableData[index] ? tableData[index] : null)}
                            className={`cursor-pointer rounded ${selectedVersion?.version === row.cells[0].value && "bg-gray-200 ml-2"}`}>
                            {row.cells.map((cell, index) => (
                                <td
                                    {...cell.getCellProps()}
                                    key={index}
                                    className='pt-[14px] pb-[16px] sm:text-[14px]'
                                >

                                    <div className="text-sm font-bold text-navy-700 dark:text-white mr-8 ">
                                        {cell.render("Cell")}
                                    </div>
                                </td>))}
                        </tr>);
                })}
                </tbody>
            </table>
        </div>
    </Card>);
};

export default AppList;
