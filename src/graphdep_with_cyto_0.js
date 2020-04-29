// const REFRESH_CARD_ID = 'refreshCard';
// const SAVE_DEPENDENCIES_ID = 'saveDependencies';
// const RENDER_DEPENDENCIES_ID = 'renderDependencies';

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? 'from a content script:' + sender.tab.url
//       : 'from the extension'
//   );
//   console.log('new request came', request);
//   switch (request.action) {
//     case REFRESH_CARD_ID:
//       generateCardsByUrl();
//       break;
//     case SAVE_DEPENDENCIES_ID:
//       sendResponse(getDependencies());
//       break;
//     case RENDER_DEPENDENCIES_ID:
//       const { dependencies } = request.data;
//       renderDependencies(dependencies);
//       break;
//     default:
//       break;
//   }
// });

// let cardsByCardUrl = {};
// let TEXT_CONST = {
//   ADD_DEPENDENCY: 'ADD DEPENDENCY',
//   DEPENDANT: 'DEPENDANT',
//   SET_AS_PARENT: 'SET_AS_PARENT',
//   SHOW_DEPENDENCIES: 'SHOW_DEPENDENCIES'
// };
// let dependantCardUrl = '';

// console.log('im in');

// function addDependantCard(cardByCardUrl, parentCardUrl, dependantCardUrl) {
//   updateParentCard(cardByCardUrl[parentCardUrl], dependantCardUrl);
//   updateChildCard(dependantCardUrl, parentCardUrl);
//   resetCardText();
// }

// function updateCardText(cardUrl, value) {
//   cardsByCardUrl[cardUrl].button.innerHTML = value;
// }

// function resetCardText() {
//   Object.values(cardsByCardUrl).forEach(card =>
//     updateCardText(card.cardUrl, TEXT_CONST.ADD_DEPENDENCY)
//   );
// }

// function onDependanceButtonClick(cardUrl) {
//   if (cardUrl && cardUrl === dependantCardUrl) {
//     resetCardText();
//     dependantCardUrl = '';
//     return;
//   }
//   if (dependantCardUrl) {
//     addDependantCard(cardsByCardUrl, cardUrl, dependantCardUrl);
//     dependantCardUrl = '';
//     return;
//   }
//   dependantCardUrl = cardUrl;
//   updateCardText(cardUrl, TEXT_CONST.DEPENDANT);
//   Object.values(cardsByCardUrl).forEach(card => {
//     if (card.cardUrl !== dependantCardUrl) {
//       updateCardText(card.cardUrl, TEXT_CONST.SET_AS_PARENT);
//     }
//   });
// }

// function generateCardsByUrl() {
//   cardsByCardUrl = {};

//   $('.div-graph-dep-action').remove();

//   const lists = $('.js-list').map(function(index) {
//     const list = $(this).find('.list-header-name');
//     const listName = list.text();
//     const listButton = generateShowColumnDependenciesButton(listName);
//     $(listButton).insertAfter(list);
//     // .map(function(index) {
//     //   const listName = $(this).text();
//     // });

//     const cards = $(this)
//       .find('.list-card')
//       .map(function(index) {
//         const href = $(this).attr('href');
//         const [_, prefix, cardSlug, cardNumberAndName] = href
//           ? href.split('/')
//           : ['', '', 'fakeSlug', 'fakeNumber-fakeNaaaaame'];
//         // const cardUrl = prefix + '/' + cardSlug;
//         const cardUrl = cardSlug;
//         const [cardNumber, ...cardName] = cardNumberAndName.split('-');

//         const labels = $(this)
//           .find('.card-label')
//           .map(function(index) {
//             return {
//               classes: $(this).attr('class'),
//               text: $(this)
//                 .find('.label-text')
//                 .text()
//             };
//           });

//         const { button, div } = generateGraphDepActionSection(cardUrl);
//         $(this).append(div);

//         const finalObj = {
//           href,
//           cardUrl,
//           cardNumber,
//           cardName,
//           labels,
//           button,
//           listName,
//           children: new Set(),
//           dependencies: new Set()
//         };
//         cardsByCardUrl[cardUrl] = finalObj;
//         return finalObj;
//       });
//   });

//   return cardsByCardUrl;
// }

// function generateGraphDepActionSection(cardUrl) {
//   const div = document.createElement('div');
//   div.setAttribute('class', `div-graph-dep-action div-${cardUrl}`);
//   const button = document.createElement('button');
//   button.innerHTML = TEXT_CONST.ADD_DEPENDENCY;
//   button.id = cardUrl;
//   button.addEventListener('click', e => {
//     console.log('clické');
//     e.preventDefault();
//     e.stopPropagation();
//     onDependanceButtonClick(cardUrl);
//   });
//   div.append(button);
//   return { button, div };
// }

// function generateShowColumnDependenciesButton(listName) {
//   const button = document.createElement('button');
//   button.setAttribute('class', `div-graph-dep-action button-${listName}`);
//   button.innerHTML = TEXT_CONST.SHOW_DEPENDENCIES;
//   button.id = listName;
//   button.addEventListener('click', e => {
//     e.preventDefault();
//     e.stopPropagation();
//     generateListExtensionTree(listName);
//   });
//   return button;
// }

// // function showColumnDependenciesButton(listName) {
// //   console.log(
// //     Object.values(cardsByCardUrl).filter(card => card.listName === listName)
// //   );
// // }

// function renderDependencies(dependencyObj) {
//   console.log('Dependencies obj', dependencyObj);
//   generateCardsByUrl();
//   Object.entries(dependencyObj).map(([parentId, childrenIds]) => {
//     childrenIds.map(childrenId => {
//       if (cardsByCardUrl[parentId] && cardsByCardUrl[childrenId]) {
//         addDependantCard(cardsByCardUrl, parentId, childrenId);
//       }
//     });
//   });
// }

// function getDependencies() {
//   console.log('array to act on', cardsByCardUrl);
//   return Object.entries(cardsByCardUrl).reduce(
//     (finalDependencies, [cardUrl, cardByCardUrl]) => {
//       if (cardByCardUrl.children.size > 0) {
//         console.log('has children', cardByCardUrl);

//         return {
//           ...finalDependencies,
//           [cardUrl]: Array.from(cardByCardUrl.children)
//         };
//       }
//       return finalDependencies;
//     },
//     {}
//   );
// }

// function updateChildCard(dependantCardUrl, parentCardUrl) {
//   const card = cardsByCardUrl[dependantCardUrl];
//   card.dependencies.add(parentCardUrl);
//   rerenderCardWithDependencies(card);
//   console.log(card);
// }

// function rerenderCardWithDependencies(card) {
//   const { cardUrl, dependencies } = card;
//   const divToUdpate = $(`.div-${cardUrl}`)[0];
//   divToUdpate.innerHTML = '';
//   divToUdpate.append(card.button);
//   dependencies.forEach(parentCardUrl0 => {
//     const dependancyLink = generateDependencyLink(parentCardUrl0);
//     divToUdpate.append(dependancyLink);
//   });
// }

// function generateDependencyLink(cardUrl) {
//   const childLink = document.createElement('a');
//   childLink.innerHTML = cardsByCardUrl[cardUrl].cardNumber;
//   childLink.href = cardsByCardUrl[cardUrl].href;
//   childLink.setAttribute(
//     'style',
//     'margin: 0 3px; padding: 3px; text-decoration: none; background: #f5dd5c; border-radius: 3px;'
//   );
//   return childLink;
// }

// function updateParentCard(card, dependantCardUrl) {
//   console.log('update parent');
//   card.children.add(dependantCardUrl);
// }

// function addToArray(array, item) {
//   return array ? [...array, item] : [item];
// }

// // cardByCardUrl = generateCardsByUrl();

// function setDisplay() {
//   const textCheck = document.createElement('button');
//   textCheck.innerHTML = 'Yeah';
//   textCheck.setAttribute(
//     'style',
//     'position:fixed; top: 0; right: 0; background: blue; z-index: 1;'
//   );
//   $('body').append(textCheck);
// }

// // copy(
// //   JSON.stringify(
// //     $('.team-row div.widget-type-cell')
// //       .map(function(index) {
// //         return {
// //           url: $(this)
// //             .find('img')
// //             .attr('src'),
// //           name: $(this)
// //             .find('h3')
// //             .text(),
// //           position: index
// //         };
// //       })
// //       .toArray()
// //       .filter(item => !!item)
// //       .map((item, index) => ({ ...item, position: index })),
// //     null,
// //     4
// //   )
// // );

// function generateListExtensionTree(listName) {
//   const cards = Object.values(cardsByCardUrl)
//     .filter(card => card.listName === listName)
//     .slice();
//   const cardIdsSet = new Set(cards.map(card => card.cardUrl));

//   //Remove dependencies from cards when parent card is not in the list
//   const cardDependancies = cards.reduce((finalCardDependencies, card) => {
//     const cardDependencies = [...card.dependencies].filter(dependency =>
//       cardIdsSet.has(dependency)
//     );
//     const cardChildren = [...card.children].filter(child =>
//       cardIdsSet.has(child)
//     );
//     finalCardDependencies[card.cardUrl] = {
//       cardUrl: card.cardUrl,
//       dependencies: cardDependencies,
//       children: cardChildren
//     };
//     return finalCardDependencies;
//   }, {});

//   console.log(cardDependancies);
//   createCytoScape();
// }

// // function generateDependenciesTree(dependencyObject) {
// //   // dependencyObject type is {[cardId]: {children: [], dependencies: []}}
// //   // We iterate on the card who do not have any dependencies
// //   const allCards = Object.values(dependencyObject);
// //   const cardsIndependants = allCards.filter(card => card.children.length ===0 && card.dependencies.length ===0);
// //   const cardsWithDependencyAndNoChildren = allCards.filter(card => card.dependencies.length > 0 && card.children.length === 0);
// //   cardsWithDependencyAndNoChildren.reduce((dependencyTree, card) => {
// //     if(card.children) {
// //       dependencyTree[card.cardUrl] = card.children.reduce((final, childCard) => {
// //         final[childCard.cardUrl] =
// //       }, {})
// //       card.children.map(childCard => {
// //         if(childCard.children) {
// //           childCard.children.map()
// //         }
// //       })
// //     }
// //   }, {})

// //   const allCards = Object.entries(dependencyObject).map(([cardUrl, {children, dependencies}]) => {

// //   })

// // }

// // function getChildrenTree(parentCard, cardRef) {
// //  if(parentCard.children.length) {
// //    return parentCard.children.reduce((final, childCardId) => {
// //     final[childCardId]=getChildrenTree(cardRef[childCardId], cardRef);
// //    },{})
// //  }else {
// //    return {};
// //  }
// // }

// // function addCardDependencyToTree(parentCard) {
// //   if (parentCard.children.length === 0) {
// //     return {[parentCard.cardUrl]: }
// //   }else {
// //     parentCard.push(card);
// //   }
// // }

// function createCytoScape(cardDependancies) {
//   const allCards = Object.values(cardDependancies);
//   // photos from flickr with creative commons license
//   $('#cy').remove();
//   const div = document.createElement('div');
//   div.id = 'cy';
//   $('body').append(div);

//   var cy = cytoscape({
//     container: document.getElementById('cy'),

//     boxSelectionEnabled: false,
//     autounselectify: true,

//     style: cytoscape
//       .stylesheet()
//       .selector('node')
//       .css({
//         height: 80,
//         width: 80,
//         'background-fit': 'cover',
//         'border-color': '#000',
//         'border-width': 3,
//         'border-opacity': 0.5
//       })
//       .selector('.eating')
//       .css({
//         'border-color': 'red'
//       })
//       .selector('.eater')
//       .css({
//         'border-width': 9
//       })
//       .selector('edge')
//       .css({
//         'curve-style': 'bezier',
//         width: 6,
//         'target-arrow-shape': 'triangle',
//         'line-color': '#ffaaaa',
//         'target-arrow-color': '#ffaaaa'
//       })
//       .selector('#bird')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
//       })
//       .selector('#cat')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
//       })
//       .selector('#ladybug')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
//       })
//       .selector('#aphid')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
//       })
//       .selector('#rose')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
//       })
//       .selector('#grasshopper')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
//       })
//       .selector('#plant')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/3866/14420309584_78bf471658_b.jpg'
//       })
//       .selector('#wheat')
//       .css({
//         'background-image':
//           'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
//       }),

//     elements: {
//       nodes: [
//         { data: { id: 'cat' } },
//         { data: { id: 'bird' } },
//         { data: { id: 'ladybug' } },
//         { data: { id: 'aphid' } },
//         { data: { id: 'rose' } },
//         { data: { id: 'grasshopper' } },
//         { data: { id: 'plant' } },
//         { data: { id: 'wheat' } }
//       ],
//       edges: [
//         { data: { source: 'cat', target: 'bird' } },
//         { data: { source: 'bird', target: 'ladybug' } },
//         { data: { source: 'bird', target: 'grasshopper' } },
//         { data: { source: 'grasshopper', target: 'plant' } },
//         { data: { source: 'grasshopper', target: 'wheat' } },
//         { data: { source: 'ladybug', target: 'aphid' } },
//         { data: { source: 'aphid', target: 'rose' } }
//       ]
//     },

//     layout: {
//       name: 'breadthfirst',
//       directed: true,
//       padding: 10
//     }
//   }); // cy init

//   console.log('lion');
//   // cy.on('tap', 'node', function() {
//   //   var nodes = this;
//   //   var tapped = nodes;
//   //   var food = [];

//   //   nodes.addClass('eater');

//   //   for (;;) {
//   //     var connectedEdges = nodes.connectedEdges(function(el) {
//   //       return !el.target().anySame(nodes);
//   //     });

//   //     var connectedNodes = connectedEdges.targets();

//   //     Array.prototype.push.apply(food, connectedNodes);

//   //     nodes = connectedNodes;

//   //     if (nodes.empty()) {
//   //       break;
//   //     }
//   //   }

//   //   var delay = 0;
//   //   var duration = 500;
//   //   for (var i = food.length - 1; i >= 0; i--) {
//   //     (function() {
//   //       var thisFood = food[i];
//   //       var eater = thisFood
//   //         .connectedEdges(function(el) {
//   //           return el.target().same(thisFood);
//   //         })
//   //         .source();

//   //       thisFood
//   //         .delay(delay, function() {
//   //           eater.addClass('eating');
//   //         })
//   //         .animate(
//   //           {
//   //             position: eater.position(),
//   //             css: {
//   //               width: 10,
//   //               height: 10,
//   //               'border-width': 0,
//   //               opacity: 0
//   //             }
//   //           },
//   //           {
//   //             duration: duration,
//   //             complete: function() {
//   //               thisFood.remove();
//   //             }
//   //           }
//   //         );

//   //       delay += duration;
//   //     })();
//   //   } // for
//   // }); // on tap
// }
