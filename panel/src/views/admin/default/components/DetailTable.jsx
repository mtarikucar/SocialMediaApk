import React, {useMemo} from "react";
import Card from "../../../../components/card";

import {
    useGlobalFilter, useSortBy, useTable,
} from "react-table";

const DetailTable = (props) => {
    const {columnsData, tableData, setSelectedVersion} = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable({
        columns, data,
    }, useGlobalFilter, useSortBy);

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
    } = tableInstance;

    return (<Card extra={"w-full h-fit sm:overflow-auto px-6"}>
        <div className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
                Detay ve Varyantlar
            </div>
            <div className={"p-1 cursor-pointer bg-indigo-300 rounded hover:p-2 m-1 hover:m-0 ease-in-out duration-100"}
                 onClick={() => setSelectedVersion(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
            </div>
        </div>

        <div className="mt-8 overflow-y-scroll xl:overflow-x-hidden max-h-screen">
            <table
                {...getTableProps()}
                className="w-full"
                variant="simple"
                color="gray-500"
                mb="24px"
            >
                <thead>
                {headerGroups.map((headerGroup, index) => (<tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    <th

                        className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                        key={index}
                    >
                        <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                            INDEX
                        </div>
                    </th>
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
                        <tr {...row.getRowProps()} key={index} >
                            <td

                                key={index}
                                className='pt-[14px] pb-[16px] sm:text-[14px]'
                            >

                                <div className="text-sm font-bold text-navy-700 dark:text-white mr-8">
                                    {index +1}
                                </div>
                            </td>
                            {row.cells.map((cell, index) => (
                                <td
                                    {...cell.getCellProps()}
                                    key={index}
                                    className='pt-[14px] pb-[16px] sm:text-[14px]'
                                >

                                    <div className="text-sm font-bold text-navy-700 dark:text-white mr-8">
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

export default DetailTable;



