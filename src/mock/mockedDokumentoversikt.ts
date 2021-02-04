import dayjs from 'dayjs';
import { Dokumenttype, Dokumentoversikt } from '../types/Dokument';

const mockedDokumentoversikt: Dokumentoversikt = {
    dokumenterMedMedisinskeOpplysninger: [
        {
            id: '2',
            name: 'Dokument 2',
            type: Dokumenttype.LEGEERKLÆRING,
            mottatt: dayjs().toDate().toISOString(),
            location: '#blahblah',
            innleggelsesperioder: [],
            harGyldigSignatur: true,
            datert: dayjs().toDate().toISOString(),
        },
        {
            id: '3',
            name: 'Dokument 2',
            type: Dokumenttype.LEGEERKLÆRING,
            mottatt: dayjs().toDate().toISOString(),
            location: '#blahblah',
            innleggelsesperioder: [],
            harGyldigSignatur: true,
            datert: dayjs().toDate().toISOString(),
        },
    ],
    dokumenterUtenMedisinskeOpplysninger: [
        {
            id: '3',
            name: 'Dokument 2',
            type: Dokumenttype.MANGLER_MEDISINSKE_OPPLYSNINGER,
            mottatt: dayjs().toDate().toISOString(),
            location: '#blahblah',
        },
    ],
    ustrukturerteDokumenter: [
        { id: '1', name: 'Dokument 1', mottatt: dayjs().toDate().toISOString(), location: '#blahblah' },
    ],
};
export default mockedDokumentoversikt;
