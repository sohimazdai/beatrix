export const MGDLtoMMOLrelation = 18.015;
export const MMOL_LToHBA1C = 1.12;

export function convertMGDLtoMMOLL(mgdl) {
  return mgdl / MGDLtoMMOLrelation;
}

export function convertMMOLtoMGDL(mmol) {
  return mmol * MGDLtoMMOLrelation;
}
