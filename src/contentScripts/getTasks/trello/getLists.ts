import { getListData } from './getListData';

export const getLists = (): List[] => {
  return [...document.querySelectorAll('.js-list')].map((listElement) =>
    getListData(listElement),
  );
};
