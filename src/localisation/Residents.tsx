const LOCALES_FOR_RU = [
  'ru',
  'uk',
  'be',
  'kk',
  'ky',
];

const REGIONS_FOR_RU = [
  'RU',
  'UA',
  'BY',
  'KZ',
  'KG',
];

export function getRegionGroup(locale: string, region: string): string {
  return (!!LOCALES_FOR_RU.find(l => locale === l) && 'RU') ||
    (!!REGIONS_FOR_RU.find(r => region === r) && 'RU') ||
    region;
};
