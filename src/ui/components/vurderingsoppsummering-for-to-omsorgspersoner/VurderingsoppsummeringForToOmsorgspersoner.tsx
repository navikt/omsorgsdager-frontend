import React from 'react';
import Dokument from '../../../types/Dokument';
import Vurdering from '../../../types/Vurdering';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import { prettifyPeriod } from '../../../util/formats';
import BasicList from '../basic-list/BasicList';
import Box, { Margin } from '../box/Box';
import DetailView from '../detail-view/DetailView';
import DokumentLink from '../dokument-link/DokumentLink';
import LabelledContent from '../labelled-content/LabelledContent';

interface VurderingsoppsummeringForToOmsorgspersonerProps {
    vurdering: Vurdering;
    alleDokumenter: Dokument[];
}

const VurderingsoppsummeringForToOmsorgspersoner = ({
    vurdering,
    alleDokumenter,
}: VurderingsoppsummeringForToOmsorgspersonerProps) => {
    const gjeldendeVurdering = vurdering.versjoner[0];
    const { perioder, tekst, resultat } = gjeldendeVurdering;
    return (
        <DetailView title="Vurdering av to omsorgspersoner">
            <Box marginTop={Margin.medium}>
                <LabelledContent
                    label="Hvilke dokumenter er brukt i vurderingen av behov for to omsorgspersoner?"
                    content={
                        <BasicList
                            elements={alleDokumenter
                                .filter((dokument) => gjeldendeVurdering.dokumenter.includes(dokument))
                                .map((dokument) => (
                                    <DokumentLink dokument={dokument} />
                                ))}
                        />
                    }
                />
            </Box>
            <Box marginTop={Margin.large}>
                <LabelledContent
                    label="Gjør en vurdering av om det er behov for to omsorgspersoner etter § 9-10, andre ledd."
                    content={<span>{tekst}</span>}
                />
            </Box>
            <Box marginTop={Margin.large}>
                <LabelledContent
                    label="Er det behov for to omsorgspersoner?"
                    content={<span>{resultat === Vurderingsresultat.INNVILGET ? 'Ja' : 'Nei'}</span>}
                />
            </Box>
            <Box marginTop={Margin.large}>
                <LabelledContent
                    label="Perioder vurdert"
                    content={
                        <ul style={{ margin: 0, listStyleType: 'none', padding: 0 }}>
                            {perioder.map((periode, i) => (
                                <li key={`${i}`}>{prettifyPeriod(periode)}</li>
                            ))}
                        </ul>
                    }
                />
            </Box>
        </DetailView>
    );
};

export default VurderingsoppsummeringForToOmsorgspersoner;
