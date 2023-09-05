export type TranslationBasicData = {
  namespace: string;
  key: string;
  value: string;
  langCode: string;
};

export type TranslationBasicListData = TranslationBasicData[];

export type ReturnTranslationTransform = {
  [key: string]:
    | string
    | { [key: string]: string }
    | {
        [key: string]: {
          [key: string]: string;
        };
      };
};
