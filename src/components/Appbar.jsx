import { useTranslation } from "react-i18next";
import LanguageSelector from "../i18n-l10n/language-selector.jsx";

const Appbar = () => {
    const { t } = useTranslation();

    return (
        <nav className="flex items-center justify-between text-white py-4 px-6 shadow-lg"
             style={{ 
                 background: 'linear-gradient(to right, #e82281, #2771b6), linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))', 
                 backgroundBlendMode: 'multiply' 
             }}>
            <span className="text-2xl font-semibold">{t("File Share")}</span>
            <div className="flex items-center space-x-4">
                <LanguageSelector />
            </div>
        </nav>
    );
};

export default Appbar;
