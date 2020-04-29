declare var cytoscape: any;

declare var $: any;

export function createDependencyGraph(
  cardDependancies: Record<string, CardDependency>,
  cardsByCardUrl: Record<string, Card>,
) {
  const allCards = Object.values(cardDependancies);
  // photos from flickr with creative commons license
  $('#cy').remove();
  const div = document.createElement('div');
  div.id = 'cy';
  $('body').append(div);

  console.log('calculated', {
    nodes: allCards.map((card) => ({ data: { id: card.cardUrl } })),
    edges: allCards.reduce((final, card) => {
      final.push(
        ...card.children.map((childCardID) => ({
          data: {
            source: card.cardUrl,
            target: cardDependancies[childCardID].cardUrl,
          },
        })),
      );
      return final;
    }, []),
  });

  var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape
      .stylesheet()
      .selector('node')
      .css({
        height: 80,
        width: 80,
        'background-fit': 'cover',
        'border-opacity': 0.5,
        shape: 'rectangle',
        content: 'data(cardName)',
        'background-image':
          'https://cdn.rawgit.com/mafar/svg-test/9d252c09/dropshadow.svg',
      })
      .selector('.eating')
      .css({
        'border-color': 'red',
      })
      .selector('.eater')
      .css({
        'border-width': 9,
      })
      .selector('edge')
      .css({
        'curve-style': 'bezier',
        width: 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa',
      })
      .selector('#bird')
      .css({
        'background-image':
          'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
      })
      .selector('#cat')
      .css({
        'background-image':
          'https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg',
      })
      .selector('#ladybug')
      .css({
        'background-image':
          'https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg',
      })
      .selector('#aphid')
      .css({
        'background-image':
          'https://live.staticflickr.com/8316/8003798443_32d01257c8_b.jpg',
      })
      .selector('#rose')
      .css({
        'background-image':
          'https://live.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg',
      })
      .selector('#grasshopper')
      .css({
        'background-image':
          'https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg',
      })
      .selector('#plant')
      .css({
        'background-image':
          'https://live.staticflickr.com/3866/14420309584_78bf471658_b.jpg',
      })
      .selector('#wheat')
      .css({
        'background-image':
          'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg',
      }),

    elements: {
      nodes: allCards.map((card) => ({
        data: { id: card.cardUrl, ...cardsByCardUrl[card.cardUrl] },
      })),
      edges: allCards.reduce((final, card) => {
        final.push(
          ...card.children.map((childCardID) => ({
            data: {
              source: card.cardUrl,
              target: cardDependancies[childCardID].cardUrl,
            },
          })),
        );
        return final;
      }, []),
    },

    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 10,
    },
  }); // cy init
}
