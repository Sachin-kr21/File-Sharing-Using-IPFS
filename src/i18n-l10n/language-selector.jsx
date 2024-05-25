import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
  { code: "fr", lang: "French" },
  { code: "zh", lang: "Chinese" },
  { code: "es", lang: "Spanish" },
  { code: "te", lang: "Telugu" },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative p-5 inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id="options-menu"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lng) => (
              <button
                key={lng.code}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
  );
};

export default LanguageSelector;
