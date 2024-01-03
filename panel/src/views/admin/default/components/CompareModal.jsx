import React, {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import Modal from "../../../../components/modal";
import axios from "../../../../api/axios";



function CompareModal({selectedVersion, setVersionInfo, versionInfo,setModal,modal}) {
    const [field, setField] = useState();
    const queryClient = useQueryClient();


    const compareMutation = useMutation(
        (newData) => axios.post('/instagram/compare', null, {params: {agent:newData}}),
        {
            onSuccess: () => {
                toast.success("karsilastirma basarili");
                queryClient.invalidateQueries('apps');
                setModal(false);
            },
            onError: (err) => {
                toast.error("arama yapilirken hata olustu");
            }
        }
    );



    return (<>
        <Modal isOpen={modal} onClose={() => setModal(!modal)} size={"extraLarge"}
               title={"Uygulama Versiyonu Guncelle"}>
            <div className="flex flex-col justify-center items-center px-6">
                <div className=" ">
                    <div className="min-w-[426px]">
                        <input
                            type="text"
                            className="border-2 border-gray-300 rounded-lg shadow-md w-full mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Instagram 263.2.0.19.104 Android (21/5; 280dpi; 720x1382; samsung; SM-A105F; a10; exynos7884B; en_IN; 366308842)"
                            onChange={(e) => setField(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full p-3 mt-2 border-2 border-indigo-500 text-white bg-indigo-500 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:bg-indigo-600"
                        onClick={() => compareMutation.mutate(field)}>
                        Ara
                    </button>


                </div>
            </div>
        </Modal>

    </>);
}

export default CompareModal;
