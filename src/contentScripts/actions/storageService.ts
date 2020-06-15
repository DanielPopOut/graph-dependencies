const STORAGE_KEY = window?.location?.href || 'GRAPH_DEP';

export const StorageService = {
  saveLocalStorageConfiguration: function (
    storageData: IStorageData,
    copy = false,
  ) {
    const dependencyToSave = JSON.stringify(storageData);
    localStorage.setItem(STORAGE_KEY, dependencyToSave);
    if (copy) {
      this.copyDependenciesToClipboard(dependencyToSave);
      alert('Dependencies saved and copied to clipboard');
    }
  },

  getLocalStorageConfiguration: function (): IStorageData {
    const storageDataRetrieved = localStorage.getItem(STORAGE_KEY);
    if (storageDataRetrieved) {
      return JSON.parse(storageDataRetrieved);
    }
    return {
      dependencies: {},
      selectedLists: [],
      listColors: {},
    };
  },

  copyDependenciesToClipboard: function (str: string) {
    // Code from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) {
      // If a selection existed before copying
      document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
      document.getSelection().addRange(selected); // Restore the original selection
    }
  },
};

// WAY TO SAVE AND RERTIEVE CONFIGURATION THE CHROME EXTENSION WAY
//   saveConfiguration: function ({ dependencies, selectedLists }: IStorageData) {
//   This is the way to save it in the chrome.storage... Not useful I guess
// chrome.storage.local.set(
//   { [STORAGE_KEY]: { dependencies, selectedLists } },
//   () => {
//     this.copyDependenciesToClipboard(JSON.stringify(dependencies));
//     alert('Dependencies saved and copied to clipboard');
//   },
// );

//   getConfiguration: function (callbackFn: (params: IStorageData) => void) {
//     chrome.storage.local.get(
//       [STORAGE_KEY],
//       (result: { [k: string]: IStorageData }) => {
//         console.log(result);
//         callbackFn(
//           result[STORAGE_KEY] || { dependencies: {}, selectedLists: [] },
//         );
//       },
//     );
//   },
