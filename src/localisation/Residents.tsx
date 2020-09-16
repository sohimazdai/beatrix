const LOCALES_FOR_RUSSIAN_FATSECRET = [
  'ru',
  'uk',
  'be',
  'kk',
  'ky',
];

const REGIONS_FOR_RU_FATSECRET = [
  'RU',
  'UA',
  'BY',
  'KZ',
  'KG',
];

export function checkForItIsInRuGroup(locale: string, region: string) {
  return LOCALES_FOR_RUSSIAN_FATSECRET.find(l => locale === l) ||
    REGIONS_FOR_RU_FATSECRET.find(r => region === r);
};
