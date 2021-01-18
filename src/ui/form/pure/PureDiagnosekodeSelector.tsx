import Autocomplete from '@navikt/nap-autocomplete';
import axios from 'axios';
import { Label } from 'nav-frontend-skjema';
import * as React from 'react';
import Error from '../../components/error/Error';
import styles from './diagnosekodeSelector.less';

interface DiagnosekodeSelectorProps {
    label: string;
    onChange: (value) => void;
    name: string;
    errorMessage?: string;
    initialDiagnosekodeValue: string;
}

const fetchDiagnosekoderByQuery = (queryString: string) => {
    return axios.get(`/k9/diagnosekoder?query=${queryString}&max=8`);
};

const getUpdatedSuggestions = async (queryString: string) => {
    if (queryString.length >= 3) {
        const diagnosekoder = await fetchDiagnosekoderByQuery(queryString);
        return diagnosekoder.data.map(({ kode, beskrivelse }) => ({
            key: kode,
            value: `${kode} - ${beskrivelse}`,
        }));
    }
    return [];
};

const PureDiagnosekodeSelector = ({
    label,
    onChange,
    name,
    errorMessage,
    initialDiagnosekodeValue,
}: DiagnosekodeSelectorProps): JSX.Element => {
    const [suggestions, setSuggestions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        const getInitialDiagnosekode = async () => {
            const diagnosekode:
                | {
                      value: string;
                  }[]
                | [] = await getUpdatedSuggestions(initialDiagnosekodeValue);
            if (diagnosekode.length > 0 && diagnosekode[0].value) {
                setInputValue(diagnosekode[0].value);
            }
        };
        getInitialDiagnosekode();
    }, [initialDiagnosekodeValue]);

    const onInputValueChange = async (v) => {
        setInputValue(v);
        const newSuggestionList = await getUpdatedSuggestions(v);
        setSuggestions(newSuggestionList);
    };
    return (
        <div className={styles.diagnosekodeContainer}>
            <Label htmlFor={name}>{label}</Label>
            <Autocomplete
                id={name}
                suggestions={suggestions}
                value={inputValue}
                onChange={onInputValueChange}
                onSelect={(e) => {
                    onInputValueChange(e.value);
                    onChange(e.value);
                }}
                ariaLabel="Søk etter diagnose"
                placeholder="Søk etter diagnose"
            />
            {errorMessage && <Error message={errorMessage} />}
        </div>
    );
};

export default PureDiagnosekodeSelector;
