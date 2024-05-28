import Retrieve from "./components/Retrieve.jsx";
import Upload from "./components/Upload.jsx";
import Appbar from "./components/Appbar.jsx";
import "./i18n"

function App() {
  return (
    <>
      <div className="flex-none">
        <Appbar />
      </div>
      <div className="flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://scarlet-adverse-emu-312.mypinata.cloud/ipfs/Qme7w4NXKFrFi73vjdcLzqGUZuefcL1FcGvhF5SqAA3HCp')" }}>
        <div className="flex p-8 gap-8">
          <div className="w-full md:w-1/2 flex bg-white bg-opacity-80 shadow-lg rounded-lg justify-center p-8 transform transition-transform hover:scale-105">
            <Upload className="upload-component"/>
          </div>
          <div className="w-full md:w-1/2 flex bg-white bg-opacity-80 shadow-lg rounded-lg justify-center p-8 transform transition-transform hover:scale-105">
            <Retrieve className="retrieve-component"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

