import {
  ReturnTranslationTransform,
  TranslationBasicListData,
} from '../types/translation';

export const transformTranslation = (data: TranslationBasicListData) =>
  data.reduce<ReturnTranslationTransform>((acc, item) => {
    const { langCode, namespace, key, value } = item;

    if (!acc[langCode]) {
      acc[langCode] = {};
    }

    if (!acc[langCode][namespace]) {
      acc[langCode][namespace] = {};
    }

    acc[langCode][namespace][key] = value;

    return acc;
  }, {});
