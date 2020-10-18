import { v1 as uuidv1 } from 'uuid';
import { i18nGet } from '../../localisation/Translate';
import { randomizeBGandFontColor } from '../../utils/RandomizeColor';

const tagKeys = [
  'before_meal',
  'after_meal',
  'fasting',
  'before_bedtime'
];

export function createTags() {
  return tagKeys.reduce((tags, nameKey) => {
    const id = uuidv1();
    tags[id] = {
      id,
      name: i18nGet(nameKey),
      ...randomizeBGandFontColor(),
    };

    return tags;
  }, {})
}
