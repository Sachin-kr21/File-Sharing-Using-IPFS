import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
  { code: "fr", lang: "French" },
  { code: "zh", lang: "Chinese" },
  { code: "es", lang: "Spanish"},
  { code: "te", lang: "Telugu"},

];

const LanguageSelector = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false);
const  {i18n} = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    console.log(lng);
    i18n.changeLanguage(lng);
    setIsOpen(false); 
  };
  return (
    <>
      <div className="relative p-5 inline-block text-left ">
        <div>
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              id="options-menu"
              onClick={toggleMenu}
            >
              {t("Languages")}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z"
                />
              </svg>
            </button>
          </span>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => changeLanguage(lng.code)}
                >
                  {lng.lang}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguageSelector;
