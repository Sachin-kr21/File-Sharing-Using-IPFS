import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

function Image(props) {
  const {t} = useTranslation();

  return (
    <div className="relative group">
      <img className="w-full" src={props.url} alt="Full View" />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-center">{t("View Full Image")}</p>
      </div>
    </div>
  );
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Image;
