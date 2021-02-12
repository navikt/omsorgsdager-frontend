import {AlertStripeFeil, AlertStripeSuksess} from 'nav-frontend-alertstriper';
import ApiErrorMessage from "../api-error-message/ApiErrorMessage";
import React from 'react';

interface ApiResponseMessageProps {
  response: Response;
}

const ApiResponseMessage: React.FunctionComponent<ApiResponseMessageProps> = ({response}) => {

  const hentResponsBasertPåStatus = () => {
    if (response !== null) {
      switch (response.status) {
        case 200:
          return <AlertStripeSuksess>Vedtaket er løst.</AlertStripeSuksess>;
        case 409:
          return <AlertStripeFeil>Vedtaket har en annen status enn <i>foreslått</i>.</AlertStripeFeil>;
        default:
          return <ApiErrorMessage response={response}/>;
      }
    }
  };

  return (
    <>
      {hentResponsBasertPåStatus()}
    </>
  );
};

export default ApiResponseMessage;
