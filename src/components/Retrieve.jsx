import { useState } from "react";
import Image from "./Image";
import QRCode from 'qrcode.react';

const Retrieve = () => {
  // const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid]= useState();
  const changeHandler = (event) => {
    setCid(event.target.value);
  };
  async function downloadImage() {
    // Replace `${cid}` with the actual CID of the image
    // const cid = 'your_cid_here';
    const url = `https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`;
    // Replace `${cid}` with the actual CID of the image
    // const cid = 'your_cid_here';
    // const url = `https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`;

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            // Create a temporary anchor element
            const a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);

            // Create object URL from the blob
            const objectUrl = URL.createObjectURL(blob);

            // Set the anchor's href to the object URL
            a.href = objectUrl;

            // Set the anchor's download attribute to force download
            a.download = 'image.jpg';

            // Simulate a click on the anchor element
            a.click();

            // Cleanup
            URL.revokeObjectURL(objectUrl);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
        });
}


  return (
    <>
    <div className="mt-8 px-4">
        <label htmlFor="cidInput" className="block text-gray-700 font-semibold mb-2">CID:</label>
            <input
                type="text"
                id="cidInput"
                value={cid}
                onChange={changeHandler}
                placeholder='Enter CID...'
                className="w-full bg-transparent border-none focus:outline-none px-2"
            />
        {cid && (
            <div>
            <div className="flex items-center mb-2">
                <button onClick={downloadImage}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Download Image
                </button>
            </div>
            <div className="flex items-center mb-2">
              
            <a href={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`}>
                        <Image url={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`} className="mr-2" />
                    </a>          
                      </div>
            <div className="flex items-center justify-between p-2 ">
            <h1 className='text-l mb-2 font-bold'>Scan this to download →</h1>

                <QRCode value={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`} className="mr-2" />
            </div>
        </div>
        )}
    </div>
</>

  );
}

export default Retrieve;