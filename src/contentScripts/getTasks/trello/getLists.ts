import { getListData } from './getListData';

export const getLists = (): IList[] => {
  return [...document.querySelectorAll('.js-list')].map((listElement) =>
    getListData(listElement),
  );
};
