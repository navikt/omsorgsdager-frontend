import React from 'react';
import ContainerContext from "../../context/ContainerContext";
import KorrigerePerioder from "../korrigere-perioder/KorrigerePerioder";
import Komponenter from "../../../types/Komponenter";

const KomponentToggle = () => {
  const { visKomponent } = React.useContext(ContainerContext);

  return <>
      { visKomponent == Komponenter.KORRIGERE_PERIODER && <KorrigerePerioder /> }
    </>;
};
export default KomponentToggle;