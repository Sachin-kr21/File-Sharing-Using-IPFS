import {Fragment ,useState , useRef} from 'react';
// import Image from './Image';
import QRCode from 'qrcode.react';
import { useTranslation } from "react-i18next";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt ,faCopy ,faDownload ,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from "@headlessui/react";

// require('dotenv').config();



const Upload= () => {
  
  const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid] = useState();
  const [error, setError] = useState(false);
  const {t} = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility

  const gateway = "scarlet-adverse-emu-312.mypinata.cloud"
  const pinata = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYjU5NmNhMS01YmY4LTQ1ZjUtYTA5Zi1lYTkyZjBlYWZiMTAiLCJlbWFpbCI6InNhY2hpbjIxMDMwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGZiZTFkNmU3ZGZiNjQyZjEwZDEiLCJzY29wZWRLZXlTZWNyZXQiOiJjYzIzZmQ0NjUwMTNhOTk0MWJmYjI1YjUxYTYyZDdmNDQ0MjU3ZDJhMjA2MzViYjBiYWIyYTZjNjYwZDU2YjU3IiwiaWF0IjoxNzEzMjcxNjQzfQ.BsjZ5jJwmZTS4XFn4D3rgK4bJMVSnOklncXVHIEnBms"
  const cloudApi = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [progress, setProgress] = useState(0);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [word,setWord] =  useState();
  const [pwd , setPwd] = useState(false);
  const [password , setPassword] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const closeModal = () => {
    setUploadSuccess(false);
    setWord("");
    setPassword("");
    fileInputRef.current.value = null; 
  }

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setSelectedFile(e.dataTransfer.files[0]);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };
  
  const downloadQRCode = () => {
    const qrCodeElement = document.getElementById('qr-code');
    html2canvas(qrCodeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = imgData;
      link.click();
    });
  };

  const shareQRCode = async () => {
    try {
      const url = `https://${gateway}/ipfs/${cid}`;
      if (navigator.share) {
        await navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code!',
          url: url,
        });
      } else {
        alert('Web Share API not supported in this browser');
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  
  const handleSubmission = async () => {
    setIsLoading(true); 
    setProgress(0);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);  
      const metadata = JSON.stringify({
        name: "File name",
      });
      setProgress(30);
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      const res = await fetch(
        `${cloudApi}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${pinata}`,
          },
          body: formData,
        }
      );
      setProgress(60);
      // console.log("authtoken"+pinata);
      const resData = await res.json();
      // setCid(resData.IpfsHash);
      // localStorage.setItem(word , resData.IpfsHash)
      // console.log(word,resData.IpfsHash,password);
      setProgress(90);
      const dbFile = await fetch(
        `https://file-sharing-backend-wvvu.onrender.com/`,
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name:word,
            cid:resData.IpfsHash,
            password: password
          })
        }
      );
      const fileData = await dbFile.json();
      setCid(fileData.cid)
      setUploadSuccess(true);

      
    } catch (error) {
      console.log(error);
      setError(true);
      // throw error;
    }
    finally {
      setIsLoading(false); 
      setProgress(100); // Complete the progress

    }
  };

return (
    <div className="w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-black mb-4">{t("Upload")}</h1>
      {error && <h1 className="text-red-500 mb-4">{t("Upload Failed")}</h1>}
      <input
        type="text"
        id="cidInput"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder={`${t("Enter")} word...`}
        className="w-full bg-gray-200 border rounded-lg focus:ring-2 focus:ring-blue-400 p-3 mb-4"
      />
      {/* <label htmlFor="fileInput" className="block text-lg font-medium mb-2">{t("Choose File")}</label> */}
<input
  id="fileInput"
  type="file"
  ref={fileInputRef}
  onChange={changeHandler}
  className="hidden"
/>
<button
  onClick={() => fileInputRef.current.click()}
  className="w-full bg-blue-100 border rounded-lg px-4 py-3 mb-4"
>{t("Choose File")}</button>
      {!pwd ? (
        <button onClick={() => setPwd(true)} className="text-blue-500 hover:underline mb-4">{t("Add password?")}</button>
      ) : (
        <div className="relative w-full">
          <input
            type={passwordVisible ? "text" : "password"}
            id="pwdInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={`${t("Enter")} password...`}
            className="w-full bg-gray-200 border rounded-lg focus:ring-2 focus:ring-blue-400 p-3 mb-4"
          />
          <button
            type="button"
            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-600"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
        </div>
      )}
      <button
        onClick={handleSubmission}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="mt-2">{t("Submitting...")}</span>
          </div>
        ) : (
          t("Submit")
        )}
      </button>

      <Transition appear show={uploadSuccess} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto bg-opacity-90 bg-gray-900" onClose={() => closeModal()}>
          <div className="min-h-screen flex items-center justify-center">
            <Dialog.Panel className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 w-full max-w-md">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 pb-5 text-gray-900">
                <span className="text-green-500 mr-2">&#10003;</span>
                {t("File Uploaded Successfully")}
              </Dialog.Title>
              <div className="flex flex-col items-center rounded">
                <div className="flex flex-col mb-4 w-full">
                  <div className="flex items-center mb-2">
                    <strong className="mr-2">Word:</strong>
                    <span className="bg-gray-200 rounded-lg px-4 py-2 border flex-grow overflow-hidden" onClick={() => navigator.clipboard.writeText(word)} title="Click to copy the word">
                      {word}
                    </span>
                    <button className="ml-2 text-black hover:text-white font-bold py-1 px-2 rounded-lg bg-gray-300 transition duration-300" onClick={() => navigator.clipboard.writeText(word)} title="Copy word">
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>
                  {/* <div className="flex items-center">
                    <strong className="mr-2">CID:</strong>
                    <span className="bg-gray-200 rounded-lg px-4 py-2 border flex-grow overflow-hidden" onClick={() => navigator.clipboard.writeText(cid)} title="Click to copy the CID">
                      {cid}
                    </span>
                    <button className="ml-2 text-black hover:text-white font-bold py-1 px-2 rounded-lg bg-gray-300 transition duration-300" onClick={() => navigator.clipboard.writeText(cid)} title="Copy CID">
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div> */}
                </div>
                <div className="flex items-center justify-center">
                  <QRCode value={`https://${gateway}/ipfs/${cid}`} className="mr-4 p-4 border border-gray-300 rounded-lg" />
                  <button onClick={shareQRCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 mr-2">
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                  <button onClick={downloadQRCode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
                <h1 className="text-lg font-bold mt-4">{t("Scan this to download")}</h1>
              </div>
              <button
                onClick={() => closeModal()}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Upload;