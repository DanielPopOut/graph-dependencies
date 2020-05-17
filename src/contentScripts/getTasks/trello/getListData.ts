export const getListData = (list: Element): IList => {
  const listNameElement = list.querySelector('.list-header-name');
  return {
    name: listNameElement.innerHTML,
    listElement: list,
    actionInsertElement: listNameElement.parentElement,
  };
};
