import React, {useEffect, useState} from "react";
import Dropdown from "../dropdown";
import axios from "../../api/axios";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import Modal from "../modal";
import UpdateModal from "../../views/admin/default/components/UpdateModal";
import CompareModal from "../../views/admin/default/components/CompareModal";


function CardMenu(props) {
    const {transparent, selectedVersion, setSelectedVersion} = props;
    const [open, setOpen] = React.useState(false);
    const [updateModal, setUpdateModal] = useState(false)
    const [compareModal, setCompareModal] = useState(false)

    const queryClient = useQueryClient();


    const [versionInfo, setVersionInfo] = useState({
        version: '',
        release_date: '',
        variants: []
    });

    useEffect(() => {
        if (selectedVersion) {
            setVersionInfo(selectedVersion);
        }
    }, [selectedVersion]);

    const removeMutation = useMutation(newFeature => axios.delete('/instagram/' + selectedVersion?.version), {
        onSuccess: () => {
            toast.success("versiyon silindi");
            queryClient.invalidateQueries('apps');
            setSelectedVersion(null);
        }, onError: (err) => {
            toast.error("silinirken hata olustu", err);
        }
    });





    return (<>
        <UpdateModal selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion} versionInfo={versionInfo}
                     setVersionInfo={setVersionInfo} setModal={setUpdateModal} modal={updateModal}/>
        <CompareModal selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion} versionInfo={versionInfo}
                     setVersionInfo={setVersionInfo} setModal={setCompareModal} modal={compareModal}/>


        <Dropdown
            button={<button
                onClick={() => setOpen(!open)}
                open={open}
                className={`flex items-center text-xl hover:cursor-pointer ${transparent ? "bg-none text-white hover:bg-none active:bg-none" : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"} linear justify-center rounded-lg font-bold transition duration-200`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>

            </button>}
            animation={"origin-top-right transition-all duration-300 ease-in-out"}
            classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
        >
            <div
                className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">

                {selectedVersion && <>
                    <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
                       onClick={() => removeMutation.mutate()}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
              </svg>
            </span>
                        Sil
                    </p>
                    <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
                       onClick={() => setUpdateModal(true)}>
                        <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                   stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                </svg>

            </span>
                        Guncelle
                    </p>
                </>
                }
                <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
                   onClick={() => setCompareModal(true)}>
                        <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                   stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
</svg>


            </span>
                    Arama Yap
                </p>
            </div>

        </Dropdown>
    </>)
        ;
}

export default CardMenu;
