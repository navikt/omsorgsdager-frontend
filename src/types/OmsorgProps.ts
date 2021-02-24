export interface OmsorgProps {
  lesemodus?: boolean;
  harOmsorgen?: boolean;
  barn: string[];
  losAksjonspunkt: (harOmsorgen, begrunnelse) => void;
}