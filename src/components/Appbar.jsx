// src/components/AppBar.js
// import {Fragment} from 'react';
// import { Menu, Transition } from '@headlessui/react';
// import { UserCircleIcon } from '@heroicons/react/24/outline'
// // import SettingsIcon from './settingsIcon';
// // import PreferencesIcon from './preferencesIcon';
// import PreferencesModal from '../preferences/preferencesModal';
// import LanguageSelector from '../i18n-l10n/language-selector';
// import { useTranslation } from 'react-i18next';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../i18n-l10n/language-selector.jsx";

const Appbar = () => {
    // const auth = localStorage.getItem("authToken")
    // const { t } = useTranslation()
    // const userNavigation = [
    //     { name:  t('Profile'), href: '/profile' },
    //     { name: t('Sign out'), href: '/logout' },
    //   ]

// const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const {t} = useTranslation();

  return (
    <>
<nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-6">
    <span className="text-xl font-bold">{t("File Share")}</span>
    <LanguageSelector/>
</nav>

</>
  );
};

export default Appbar;