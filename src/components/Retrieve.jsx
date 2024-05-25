import { Fragment, useState, useEffect } from "react";
import Image from "./Image";
import QRCode from 'qrcode.react';
import { useTranslation } from "react-i18next";
import { saveAs } from 'file-saver';
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Retrieve = () => {
  const [cid, setCid] = useState();
  const [word, setWord] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const gateway = "scarlet-adverse-emu-312.mypinata.cloud";
  const [error,setError] = useState(false);
  const [retrieveSuccess,setRetrieveSuccess] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const changeHandler = (event) => {
    setCid(event.target.value);
  };

  const changeHandlerWord = (event) => {
    setWord(event.target.value);
  };

  useEffect(() => {
    setRetrieveSuccess(false);
    if (isSubmitting) {
      retrieve();
      setIsSubmitting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, isSubmitting]);

  const retrieve = async () => {
    try {
      const dbFile = await fetch("https://file-sharing-backend-wvvu.onrender.com/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: word,
          password: password ? password : "",
        }),
      });
      const fileData = await dbFile.json();
      if (fileData.cid) {
        setCid(fileData.cid);
        setRetrieveSuccess(true);
      } else {
        setMessage(fileData);
        openModal();
      }
    } catch (error) {
      console.error("Error retrieving file:", error);
      setError(true);
    }
  };

  const downloadFile = async () => {
    try {
      const url = `https://${gateway}/ipfs/${cid}`;
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, 'file');
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  return (
    <>
    <div className="w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-black mb-4">{t("Retrieve")}</h1>
    {error && <h1 className="text-red-500 mb-4">{t("Retrieve Failed")}</h1>}

          <input
            type="text"
            id="wordInput"
            value={word}
            onChange={changeHandlerWord}
            placeholder={t("Enter") + " word..."}
            className="w-full bg-gray-200 border rounded-lg focus:ring-2 focus:ring-red-400 p-3 mb-4"
            />
          <p className="block text-lg font-medium mb-2">or</p>
          <input
            type="text"
            id="cidInput"
            value={cid}
            onChange={changeHandler}
            placeholder={t("Enter") + " CID..."}
            className="w-full bg-gray-200 border rounded-lg focus:ring-2 focus:ring-red-400 p-3 mb-4"
          />
        <div className="mb-4">
          <br />
        </div>

                    <button         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-300"
            onClick={retrieve}>
              {t("Retrieve")}
            </button>
          {isOpen && (
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          {t(message)}
                        </Dialog.Title>
                        <div className="mt-2 flex flex-col space-y-4">
                          <input id="pwd" type="password" className="border border-black rounded p-2 pl-3 pr-3" />
                          <button
                            onClick={() => {
                              const pwd = document.getElementById('pwd').value;
                              setPassword(pwd);
                              setIsSubmitting(true);
                              closeModal();
                            }}
                            className="bg-blue-400 border border-white rounded p-2 pl-3 pr-3 text-white"
                          >
                            {t("Submit")}
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          )}
          <Transition appear show={retrieveSuccess} as={Fragment}>
  <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto bg-opacity-90 bg-gray-900" onClose={() => setRetrieveSuccess(false)}>
    <div className="min-h-screen flex items-center justify-center">
      <Dialog.Panel className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 w-full max-w-md">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 pb-5 text-gray-900">
          <span className="text-green-500 mr-2">&#10003;</span>
          {t("File Retrieved Successfully")}
        </Dialog.Title>
        <div>
              <div className="flex items-center mb-2 mt-10">
                <a href={`https://${gateway}/ipfs/${cid}`}>
                  <Image url={`https://${gateway}/ipfs/${cid}`} className="mr-2" />
                </a>
              </div>
              <div className="flex items-center mb-2 mt-2 p-2">
              <button onClick={downloadFile} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
  <FontAwesomeIcon icon={faDownload} />
</button>

              </div>
              <div className="flex items-center justify-between p-2">
                <h1 className='text-l mb-2 font-bold'>{t("Scan this to download")} →</h1>
                <QRCode value={`https://${gateway}/ipfs/${cid}`} className="mr-2" />
              </div>
            </div>
      </Dialog.Panel>
    </div>
  </Dialog>
</Transition>
      </div>
    </>
  );
};

export default Retrieve;
