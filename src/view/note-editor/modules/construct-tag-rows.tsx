import { Dimensions } from 'react-native';

import { ITag, ITagListTags } from '../../../model/ITagList';
import { TagPickerEntities } from '../entities/TagPickerEntities';

export const constructTagRows = (
  tagListTags: ITagListTags,
  width?: number,
  padding?: number
): ITag[][] => {
  let currentRowIndex: number = 0;
  let currentRow: ITag[] = [];
  const tagRows: ITag[][] = [];

  const containerWidth = getWidth(width, padding);
  let currentRowOffsetSum = TagPickerEntities.offset;
  let currentRowLettersSum = 0;
  const currentRestLetters = () => getCurrentRestLetters(
    containerWidth,
    currentRowOffsetSum,
    currentRowLettersSum
  );

  Object.values(tagListTags).forEach((tag: ITag, index: number) => {
    const isFit = checkThatTagIsFit(tag);

    if (isFit) {
      pushAnotherTagToRow(tag);

      const isLast = Object.values(tagListTags).length === (index + 1);
      if (isLast) initNextRow();

      return;
    }

    initNextRow();
    pushAnotherTagToRow(tag);
    return;
  });

  if (currentRow.length > 0) initNextRow();

  return tagRows;

  function pushAnotherTagToRow(tag: ITag) {
    currentRow.push(tag);
    currentRowLettersSum += tag.name.length;
    currentRowOffsetSum += TagPickerEntities.offset;
  }

  function initNextRow() {
    tagRows.push(currentRow);
    currentRowIndex++;
    currentRow = [];
    currentRowLettersSum = 0;
    currentRowOffsetSum = TagPickerEntities.offset;
  }

  function checkThatTagIsFit(tag: ITag) {
    const isFitInline = currentRestLetters() >= tag.name.length;

    if (isFitInline) return true;

    const isArrayItemEmpty = currentRow.length === 0;

    if (isArrayItemEmpty) return true;

    return false;
  }
}


const getWidth = (width?: number, padding?: number) => {
  const doubledPadding = padding * 2;

  if (width) return width - doubledPadding;

  return Dimensions.get('screen').width - doubledPadding;
}

function getCurrentRestLetters(width: number, currentOffset: number, currentLetters: number) {
  const currentLettersWidth = currentLetters * TagPickerEntities.letterWidth;

  return Math.floor((width - currentOffset - currentLettersWidth) / TagPickerEntities.letterWidth);
}
