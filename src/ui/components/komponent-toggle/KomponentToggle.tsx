import React from 'react';
import ContainerContext from "../../context/ContainerContext";
import Komponenter from "../../../types/Komponenter";
import KorrigerePerioder from "../korrigere-perioder/KorrigerePerioder";

const KomponentToggle = () => {
  const { visKomponent } = React.useContext(ContainerContext);

  return <>
      { visKomponent == Komponenter.KORRIGERE_PERIODER && <KorrigerePerioder /> }
    </>;
};
export default KomponentToggle;