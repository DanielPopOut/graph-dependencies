// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be

import { COMMUNICATION_CONSTANTS } from '../shared/constants';

// found in the LICENSE file.
const SAVED_DEP_VAR = 'dependencies';

const {
  REFRESH_CARD_ID,
  SAVE_DEPENDENCIES_ID,
  RENDER_DEPENDENCIES_ID,
  RELOAD_EXTENSION_ID,
} = COMMUNICATION_CONSTANTS;

const CONTEXT_MENU_BUTTONS = [
  { title: 'Refresh card actions', id: REFRESH_CARD_ID },
  { title: 'Save dependencies', id: SAVE_DEPENDENCIES_ID },
  { title: 'Render dependencies', id: RENDER_DEPENDENCIES_ID },
  { title: 'Reload extension', id: RELOAD_EXTENSION_ID },
];

let savedDependencies = {};

function saveDependencies(dependencies) {
  // Saving
  chrome.storage.sync.set({ [SAVED_DEP_VAR]: dependencies });
}

function getDependencies(callback) {
  // Saving
  chrome.storage.sync.get(SAVED_DEP_VAR, function (result) {
    // Showing the requested variable value
    callback(result);
  });
}

chrome.tabs.onUpdated.addListener(function (request, sender, sendResponse) {
  console.log('tabUpdated', request, sender, sendResponse);
});

// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == 'radio1' || info.menuItemId == 'radio2') {
    console.log(
      'radio item ' +
        info.menuItemId +
        ' was clicked (previous checked state was ' +
        info.wasChecked +
        ')',
    );
  } else if (info.menuItemId == 'checkbox1' || info.menuItemId == 'checkbox2') {
    console.log(JSON.stringify(info));
    console.log(
      'checkbox item ' +
        info.menuItemId +
        ' was clicked, state is now: ' +
        info.checked +
        ' (previous state was ' +
        info.wasChecked +
        ')',
    );
  } else {
    console.log('item ' + info.menuItemId + ' was clicked');
    console.log('info: ' + JSON.stringify(info));
    console.log('tab: ' + JSON.stringify(tab));
  }

  switch (info.menuItemId) {
    case REFRESH_CARD_ID:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: REFRESH_CARD_ID },
          (response) => console.log('reponse', response.farewell),
        );
      });
      break;
    case SAVE_DEPENDENCIES_ID:
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log('lion lion ', info, info.menuItemId);
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: SAVE_DEPENDENCIES_ID },
          function (response) {
            saveDependencies(response);
          },
        );
      });
      break;
    case RENDER_DEPENDENCIES_ID:
      getDependencies((savedDependencies) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
          tabs,
        ) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: RENDER_DEPENDENCIES_ID,
            data: savedDependencies,
          });
        });
      });
      break;

    case RELOAD_EXTENSION_ID:
      reloadExtension();
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
      });
      break;
    default:
      break;
  }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function () {
  // Créé les context menu buttons
  CONTEXT_MENU_BUTTONS.map((contextMenu) => {
    chrome.contextMenus.create(contextMenu);
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'trello.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

function reloadExtension() {
  console.log('we relaod');
  chrome.runtime.reload();
}
