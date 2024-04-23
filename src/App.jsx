import Retrieve from "./components/Retrieve.jsx";
import Upload from "./components/Upload.jsx";
import Appbar from "./components/Appbar.jsx";
import "./i18n"

function App() {
  return (
    <>
    
    <div className="h-screen flex flex-col">
    <div className="flex-none">
        <Appbar />
    </div>
    <div className="flex flex-grow p-4 ">
    <div className="w-1/2 flex justify-center bg-red-200 rounded-lg shadow-md">
        <div className="max-w-md mx-auto ">
            <Upload />
        </div>
    </div>
    <div className="w-1/2 flex justify-center bg-blue-200 rounded-lg shadow-md">
        <div className="max-w-md mx-auto">
            <Retrieve />
        </div>
    </div>
</div>
{/* <button onClick={() => methodDoesNotExist()}>Break the world</button>; */}

</div>
</>
  );
}

export default App;
