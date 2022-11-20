import React from "react";

const Modal = ({ setShowModal }) => {
    return (
        <div className="min-h-[42rem] w-1/2 flex flex-col fixed z-50 my-6 border-2 rounded-lg shadow-lg bg-white  
                ">
            <div className="w-full justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl text-center">
                    Velg verksted
                </h3>
                <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                >
                    <button className="btn-white hover:bg-slate-200" type="button" >
                        Lukk
                    </button>
                </button>
            </div>
            <div className="w-full p-4 ">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="p-4 w-full">
                <div class="px-4 py-1  overflow-x-hidden overflow-y-auto">
                    <div class="px-4 py-1 bg-slate-200  mt-2">
                        <div class="text-2xl dark:text-white">Akershus Auto Bilverksted AS</div>
                        <div class="text-sm text-black-600 dark:text-gray-200">
                            <span>Myrvangveien 1<br /><span>67905050</span></span>
                        </div>
                    </div>
                    <div class="px-4 py-1 bg-slate-200 mt-2">
                        <div class="text-2xl dark:text-white">Åndalsnes Bilverksted AS</div>
                        <div class="text-sm text-black-600 dark:text-gray-200">
                            <span>Storgata 33<br /><span>71220040</span></span>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Modal;