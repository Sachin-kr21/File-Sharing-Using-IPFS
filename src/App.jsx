import Retrieve from "./components/Retrieve.jsx";
import Upload from "./components/Upload.jsx";
import Appbar from "./components/Appbar.jsx";
import "./i18n";

function App() {
  return (
    <>
      <div className="flex-none">
        <Appbar />
      </div>
      <div className="flex h-screen flex-col bg-cover bg-center" style={{ backgroundImage: "url('../public/wallpaperflare.com_wallpaper.jpg')" }}>
        <div className="flex flex-col md:flex-row p-8 h-screen gap-8">
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex bg-white bg-opacity-80 shadow-lg rounded-lg justify-center p-8 transform transition-transform hover:scale-105">
            <Upload className="upload-component" />
          </div>
          <div className="w-full md:w-1/2 h-1/2 md:h-full flex bg-white bg-opacity-80 shadow-lg rounded-lg justify-center p-8 transform transition-transform hover:scale-105">
            <Retrieve className="retrieve-component" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
