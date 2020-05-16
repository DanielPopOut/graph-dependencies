export const getListData = (list: Element): List => {
  const listNameElement = list.querySelector('.list-header-name');
  return {
    name: listNameElement.innerHTML,
    listElement: list,
    actionInsertElement: listNameElement.parentElement,
  };
};
