import {useState} from 'react';
// import Image from './Image';
import QRCode from 'qrcode.react';


const Upload= () => {
  const [selectedFile, setSelectedFile] = useState();
  const [cid, setCid] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYjU5NmNhMS01YmY4LTQ1ZjUtYTA5Zi1lYTkyZjBlYWZiMTAiLCJlbWFpbCI6InNhY2hpbjIxMDMwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGZiZTFkNmU3ZGZiNjQyZjEwZDEiLCJzY29wZWRLZXlTZWNyZXQiOiJjYzIzZmQ0NjUwMTNhOTk0MWJmYjI1YjUxYTYyZDdmNDQ0MjU3ZDJhMjA2MzViYjBiYWIyYTZjNjYwZDU2YjU3IiwiaWF0IjoxNzEzMjcxNjQzfQ.BsjZ5jJwmZTS4XFn4D3rgK4bJMVSnOklncXVHIEnBms`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="max-w-full mx-auto p-6  shadow-md rounded-lg">
    <label className="block text-lg font-medium mb-2">Choose File</label>
    <input type="file" onChange={changeHandler} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
    <button onClick={handleSubmission} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </div>
    <div>
        {cid && (
            <div className="mt-4">
            <h1 className='text-l mb-2 font-bold'>CID:</h1>
            <div className="flex items-center bg-gray-100 rounded p-2 mb-2">
                <span className="flex-grow" onClick={() => navigator.clipboard.writeText(cid)}>
                    {cid}
                </span>
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => navigator.clipboard.writeText(cid)}>
                    Copy
                </button>
            </div>
            <div className="flex items-center">

                {/* <Image url={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`} /> */}
                <QRCode value={`https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/${cid}`} className="ml-4 p-4" />
            </div>
            <h1 className='text-l mb-2 font-bold'>Scan this to download</h1>
        </div>
        
        )}
</div>

      
    </>
  );
};

export default Upload;
