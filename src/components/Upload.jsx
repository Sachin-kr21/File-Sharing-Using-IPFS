import {useState} from 'react';
// import Image from './Image';
import QRCode from 'qrcode.react';
import { useTranslation } from "react-i18next";
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt ,faCopy ,faDownload } from '@fortawesome/free-solid-svg-icons';

// require('dotenv').config();



const Upload= () => {
  
  const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid] = useState();
  const [error, setError] = useState(false);
  const {t} = useTranslation();
  const gateway = "scarlet-adverse-emu-312.mypinata.cloud"
  const pinata = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYjU5NmNhMS01YmY4LTQ1ZjUtYTA5Zi1lYTkyZjBlYWZiMTAiLCJlbWFpbCI6InNhY2hpbjIxMDMwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGZiZTFkNmU3ZGZiNjQyZjEwZDEiLCJzY29wZWRLZXlTZWNyZXQiOiJjYzIzZmQ0NjUwMTNhOTk0MWJmYjI1YjUxYTYyZDdmNDQ0MjU3ZDJhMjA2MzViYjBiYWIyYTZjNjYwZDU2YjU3IiwiaWF0IjoxNzEzMjcxNjQzfQ.BsjZ5jJwmZTS4XFn4D3rgK4bJMVSnOklncXVHIEnBms"
  const cloudApi = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
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
      // console.log("authtoken"+pinata);
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData);
    } catch (error) {
      console.log(error);
      setError(true);
      // throw error;
    }
  };

  return (
    <>
    <h1 className='flex items-center justify-between text-black py-4 px-6 text-4xl font-bold'>Upload</h1>
    <div className="max-w-full mx-auto p-6  shadow-md rounded-lg">
      {error && <h1>{t("Upload Failed")}</h1>
      }
    <label htmlFor="fileInput" className="block text-lg font-medium mb-2">{t("Choose File")}</label>
    <input id="fileInput" type="file" onChange={changeHandler} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
    <button onClick={handleSubmission} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t("Submit")}</button>
      </div>
    <div>
        {cid && (
            <div className="mt-4">
            <h1 className='text-l mb-2 font-bold'>CID:</h1>
            <div className="flex items-center bg-gray-100 rounded p-2 mb-2">
                <span className="flex-grow pr-7" onClick={() => navigator.clipboard.writeText(cid)}>
                    {cid}
                </span>
                <button className="ml-2  text-black hover:text-white font-bold py-1 px-2 rounded" onClick={() => navigator.clipboard.writeText(cid)}>
                <FontAwesomeIcon icon={faCopy} />
                </button>
            </div>
            <div className="flex items-center">

                {/* <Image url={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`} /> */}
                <QRCode value={`https://${gateway}/ipfs/${cid}`} id="qr-code" className="ml-4 p-4" />
                <button onClick={shareQRCode} className="ml-2 p-2 hover:text-white text-black rounded-full"><FontAwesomeIcon icon={faShareAlt} /></button>
                <button onClick={downloadQRCode} className="ml-2 p-2 hover:text-white text-black rounded-full"><FontAwesomeIcon icon={faDownload} /></button>

            </div>
            <h1 className='text-l mb-2 font-bold'>{t("Scan this to download")}</h1>
        </div>
        
        )}
</div>

      
    </>
  );
};

export default Upload;
