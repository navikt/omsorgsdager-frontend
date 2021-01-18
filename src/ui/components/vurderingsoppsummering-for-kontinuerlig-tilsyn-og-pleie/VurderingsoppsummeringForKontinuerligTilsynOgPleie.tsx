import React from 'react';
import { prettifyPeriod } from '../../../util/formats';
import DetailView from '../detail-view/DetailView';
import LabelledContent from '../labelled-content/LabelledContent';
import Vurderingsresultat from '../../../types/Vurderingsresultat';
import Box, { Margin } from '../box/Box';
import BasicList from '../basic-list/BasicList';
import DokumentLink from '../dokument-link/DokumentLink';
import Vurdering from '../../../types/Vurdering';
import Dokument from '../../../types/Dokument';

interface VurderingsoppsummeringForKontinuerligTilsynOgPleieProps {
    vurdering: Vurdering;
    alleDokumenter: Dokument[];
}

const VurderingsoppsummeringForKontinuerligTilsynOgPleie = ({
    vurdering,
    alleDokumenter,
}: VurderingsoppsummeringForKontinuerligTilsynOgPleieProps) => {
    const gjeldendeVurdering = vurdering.versjoner[0];
    const { perioder, tekst, resultat } = gjeldendeVurdering;
    return (
        <DetailView title="Vurdering av behov for kontinuerlig tilsyn og pleie">
            <Box marginTop={Margin.medium}>
                <LabelledContent
                    label="Hvilke dokumenter er brukt i vurderingen av tilsyn og pleie?"
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
                    label="Gjør en vurdering av om det er behov for kontinuerlig tilsyn og pleie som følge
                                        av sykdommen etter § 9-10, første ledd."
                    content={<span>{tekst}</span>}
                />
            </Box>
            <Box marginTop={Margin.large}>
                <LabelledContent
                    label="Er det behov for tilsyn og pleie?"
                    content={<span>{resultat === Vurderingsresultat.INNVILGET ? 'Ja' : 'Nei'}</span>}
                />
            </Box>
            <Box marginTop={Margin.large}>
                <LabelledContent
                    label={resultat === Vurderingsresultat.INNVILGET ? 'Perioder innvilget' : 'Perioder avslått'}
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

export default VurderingsoppsummeringForKontinuerligTilsynOgPleie;
