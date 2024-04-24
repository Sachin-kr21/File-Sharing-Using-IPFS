import { useState } from "react";
import Image from "./Image";
import QRCode from 'qrcode.react';
import { useTranslation } from "react-i18next";
import { saveAs } from 'file-saver';

const Retrieve = () => {
  // const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid]= useState();
  const [word,setWord] = useState();
  const changeHandler = (event) => {
    setCid(event.target.value);
    // setWord(event.target.value);
    
};
    const changeHandlerWord = (event) => {
        // setCid(event.target.value);
        setWord(event.target.value);
        
    }; 
const retrieve = ()=>{
    setCid(localStorage.getItem(word));
}
  const {t} = useTranslation();
  const gateway = "scarlet-adverse-emu-312.mypinata.cloud"

async function downloadFile() {
    const url = `https://${gateway}/ipfs/${cid}`;

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            // Use FileSaver.js to save the blob as a file
            saveAs(blob, 'file'); // Specify the filename here
        })
        .catch(error => {
            console.error('Error downloading:', error);
        });
}



  return (
    <>
    <h1 className='flex items-center justify-between text-black py-4 px-6 text-4xl font-bold'>{t("Retrieve")}</h1>

    <div className=" max-w-full mx-auto p-6  shadow-md rounded-lg h-56 ">

        <label htmlFor="cidInput" className="block  text-gray-700 font-bold mb-2">CID:</label>
            <input
                type="text"
                id="cidInput"
                value={word}
                onChange={changeHandlerWord}
                placeholder={t("Enter") + " word..."}
                className="w-full bg-transparent  border  focus:outline-none rounded-lg p-2 mt-2"
            />
            <input
                type="text"
                id="cidInput"
                value={cid}
                onChange={changeHandler}
                placeholder={t("Enter") + " CID..."}
                className="w-full bg-transparent  border  focus:outline-none rounded-lg p-2 mt-2"
            />
            {
                !cid && (<button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={retrieve}>Retrieve</button>)
            }
        {cid && (
            <div>
            <div className="flex items-center mb-2 mt-2 p-2 ">
                <button onClick={downloadFile}  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                   {t( "Download")}
                </button>
            </div>
            <div className="flex items-center mb-2 mt-10">
              
            <a href={`https://${gateway}/ipfs/${cid}`}>
                        <Image url={`https://${gateway}/ipfs/${cid}`} className="mr-2 " />
                    </a>        
                      </div>
            <div className="flex items-center justify-between p-2 ">
            <h1 className='text-l mb-2 font-bold'>{t("Scan this to download")} →</h1>

                <QRCode value={`https://${gateway}/ipfs/${cid}`} className="mr-2" />
            </div>
        </div>
        )}
    </div>
</>

  );
}

export default Retrieve;