import React from 'react';
import { Dokument } from '../../../types/Dokument';

interface UstrukturertDokumentElementProps {
    dokument: Dokument;
}

const UstrukturertDokumentElement = ({ dokument }: UstrukturertDokumentElementProps) => {
    return <div>{dokument.name}</div>;
};

export default UstrukturertDokumentElement;
