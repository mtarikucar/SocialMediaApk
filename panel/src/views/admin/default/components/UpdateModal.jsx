import React, {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import Modal from "../../../../components/modal";
import axios from "../../../../api/axios";



function UpdateModal({selectedVersion, setVersionInfo, versionInfo,setModal,modal}) {
    const [active, setActive] = React.useState(false);
    const queryClient = useQueryClient();





    const updateMutation = useMutation(
        () => axios.put('/instagram/' + selectedVersion?.version, versionInfo),
        {
            onSuccess: () => {
                toast.success("Versiyon güncellendi");
                queryClient.invalidateQueries('apps');
                setModal(false);
            },
            onError: () => {
                toast.error("Güncellenirken hata oluştu");
            }
        }
    );



    const handleChange = (e, field, index) => {
        if (field === 'variants') {
            const newVariants = [...versionInfo.variants];
            newVariants[index][e.target.name] = e.target.value;
            setVersionInfo({...versionInfo, variants: newVariants});
        } else {
            setVersionInfo({...versionInfo, [field]: e.target.value});
        }
    };

    return (<>
        <Modal isOpen={modal} onClose={() => setModal(!modal)} size={"extraLarge"}
               title={"Uygulama Versiyonu Guncelle"}>
            <div className="flex flex-col justify-center items-center px-6">
                <div className="grid grid-cols-4 gap-6 ">
                    <button
                        className="col-span-4 p-3 mt-2 border-2 border-indigo-500 text-white bg-indigo-500 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:bg-indigo-600"
                        onClick={() => updateMutation.mutate(versionInfo)}>
                        Güncelle
                    </button>
                    <div className="col-span-2">
                        <input
                            type="text"
                            className="border-2 border-gray-300 rounded-lg shadow-md w-full mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Versiyon"
                            value={versionInfo.version}
                            onChange={(e) => handleChange(e, 'version')}
                        />
                    </div>
                    <div className="col-span-2">
                        <input
                            type="text"
                            className="border-2 border-gray-300 rounded-lg shadow-md w-full mt-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            value={versionInfo.release_date}
                            onChange={(e) => handleChange(e, 'release_date')}
                        />
                    </div>
                    {versionInfo.variants.map((variant, index) => (
                        <div key={variant._id} className="col-span-4 mt-2">
                            <button
                                className="w-full text-left p-3 border-b-2 border-gray-300"
                                onClick={() => setActive(index == active ? false : index)}
                            >
                                {variant.version}
                            </button>
                            <div
                                className={`transition-max-height duration-700 ease-in-out overflow-hidden ${active == index ? 'max-h-96' : 'max-h-0'}`}
                            >

                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-lg shadow-md w-full mb-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Variant Name"
                                    name="variantName"
                                    value={variant.version}
                                    onChange={(e) => handleChange(e, 'variants', index)}
                                />
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-lg shadow-md w-full mb-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Architecture"
                                    name="architecture"
                                    value={variant.architecture}
                                    onChange={(e) => handleChange(e, 'variants', index)}
                                />
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-lg shadow-md w-full mb-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Android Version"
                                    name="androidVersion"
                                    value={variant.androidVersion}
                                    onChange={(e) => handleChange(e, 'variants', index)}
                                />
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-lg shadow-md w-full mb-2 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Screen DPI"
                                    name="dpi"
                                    value={variant.dpi}
                                    onChange={(e) => handleChange(e, 'variants', index)}
                                />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </Modal>



    </>);
}

export default UpdateModal;
