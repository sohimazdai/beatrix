export const MGDLtoMMOLrelation = 18.15;

export function convertMGDLtoMMOLL(mgdl) {
  return mgdl / MGDLtoMMOLrelation;
}

export function convertMMOLtoMGDL(mmol) {
  return mmol * MGDLtoMMOLrelation;
}
