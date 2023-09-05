import {
  ReturnTranslationTransform,
  TranslationBasicListData,
} from 'shared/types/translation';

export const transformTranslation = (data: TranslationBasicListData) =>
  data.reduce<ReturnTranslationTransform>((acc, item) => {
    const { key, value } = item;

    acc[key] = value;

    return acc;
  }, {});
