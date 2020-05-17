interface FixtureCard
  extends Omit<
    ICard,
    'cardName' | 'children' | 'dependencies' | 'labels' | 'button'
  > {
  cardUrl: string;
  href: string;
  cardNumber: string;
  cardName: string[];
  labels: any;
  button: HTMLButtonElement | {};
  listName: string;
  children: Set<string> | Object;
  dependencies: Set<string> | Object;
}

export const cardsByCardUrlFixture: Record<string, FixtureCard> = {
  JX04ICcg: {
    href: '/c/JX04ICcg/37-test2',
    cardUrl: 'JX04ICcg',
    cardNumber: '37',
    cardName: ['test2'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  ThF4X65L: {
    href:
      '/c/ThF4X65L/19-1-ajouter-le-menu-de-recherche-filtrage-ou-tri-de-voiture',
    cardUrl: 'ThF4X65L',
    cardNumber: '19',
    cardName: [
      '1',
      'ajouter',
      'le',
      'menu',
      'de',
      'recherche',
      'filtrage',
      'ou',
      'tri',
      'de',
      'voiture',
    ],
    labels: {
      '0': {
        classes: 'card-label card-label-green mod-card-front',
        text: ' ',
      },
      '1': {
        classes: 'card-label card-label-yellow mod-card-front',
        text: 'lion',
      },
      length: 2,
      prevObject: {
        '0': {},
        '1': {},
        length: 2,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  ua7dNWIF: {
    href: '/c/ua7dNWIF/33-test',
    cardUrl: 'ua7dNWIF',
    cardNumber: '33',
    cardName: ['test'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  '0rRWsAD7': {
    href: '/c/0rRWsAD7/34-test2',
    cardUrl: '0rRWsAD7',
    cardNumber: '34',
    cardName: ['test2'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  zZogJUaX: {
    href: '/c/zZogJUaX/35-test2',
    cardUrl: 'zZogJUaX',
    cardNumber: '35',
    cardName: ['test2'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  ID3gY05K: {
    href: '/c/ID3gY05K/36-test2',
    cardUrl: 'ID3gY05K',
    cardNumber: '36',
    cardName: ['test2'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #1 (Suite) de Carcam--> Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
  },
  zzVPbhLg: {
    href: '/c/zzVPbhLg/38-b-anana',
    cardUrl: 'zzVPbhLg',
    cardNumber: '38',
    cardName: ['b', 'anana'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #2--> Facilitations de reservation pour le client et nouveau mode de reservation.',
    children: {},
    dependencies: {},
  },
  '73TyUor7': {
    href: '/c/73TyUor7/39-b-anana',
    cardUrl: '73TyUor7',
    cardNumber: '39',
    cardName: ['b', 'anana'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName:
      'Améliorations #2--> Facilitations de reservation pour le client et nouveau mode de reservation.',
    children: {},
    dependencies: {},
  },
  I1VAvo7G: {
    href: '/c/I1VAvo7G/40-b-anana',
    cardUrl: 'I1VAvo7G',
    cardNumber: '40',
    cardName: ['b', 'anana'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Doing',
    children: {},
    dependencies: {},
  },
  PN1bqksE: {
    href: '/c/PN1bqksE/41-b-anana',
    cardUrl: 'PN1bqksE',
    cardNumber: '41',
    cardName: ['b', 'anana'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Doing',
    children: {},
    dependencies: {},
  },
  V2RSbke5: {
    href: '/c/V2RSbke5/30-etablir-un-plan-de-communication-avant-le-18-11-2019',
    cardUrl: 'V2RSbke5',
    cardNumber: '30',
    cardName: [
      'etablir',
      'un',
      'plan',
      'de',
      'communication',
      'avant',
      'le',
      '18',
      '11',
      '2019',
    ],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Doing',
    children: {},
    dependencies: {},
  },
  EgMg2qGP: {
    href:
      '/c/EgMg2qGP/29-cr%C3%A9er-des-comptes-twitter-r%C3%A9diger-des-articles-chaque-jour-sur-le-compte-facebook-questions-%C3%A0-lire',
    cardUrl: 'EgMg2qGP',
    cardNumber: '29',
    cardName: [
      'cr%C3%A9er',
      'des',
      'comptes',
      'twitter',
      'r%C3%A9diger',
      'des',
      'articles',
      'chaque',
      'jour',
      'sur',
      'le',
      'compte',
      'facebook',
      'questions',
      '%C3%A0',
      'lire',
    ],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Doing',
    children: {},
    dependencies: {},
  },
  AnadU5OE: {
    href: '/c/AnadU5OE/42-sqdad',
    cardUrl: 'AnadU5OE',
    cardNumber: '42',
    cardName: ['sqdad'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Doing',
    children: {},
    dependencies: {},
  },
  VQvxQsbr: {
    href: '/c/VQvxQsbr/21-3-ajout-dimage',
    cardUrl: 'VQvxQsbr',
    cardNumber: '21',
    cardName: ['3', 'ajout', 'dimage'],
    labels: {
      '0': {
        classes: 'card-label card-label-orange mod-card-front',
        text: ' ',
      },
      length: 1,
      prevObject: {
        '0': {},
        length: 1,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'ToValidate',
    children: {},
    dependencies: {},
  },
  TYFjIPhS: {
    href: '/c/TYFjIPhS/31-ajouter-sections-pour-lajout-dimage',
    cardUrl: 'TYFjIPhS',
    cardNumber: '31',
    cardName: ['ajouter', 'sections', 'pour', 'lajout', 'dimage'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'ToValidate',
    children: {},
    dependencies: {},
  },
  oVHT9cuh: {
    href: '/c/oVHT9cuh/27-9-filtrage-des-voitures-doit-%C3%AAtre-marqu%C3%A9',
    cardUrl: 'oVHT9cuh',
    cardNumber: '27',
    cardName: [
      '9',
      'filtrage',
      'des',
      'voitures',
      'doit',
      '%C3%AAtre',
      'marqu%C3%A9',
    ],
    labels: {
      '0': {
        classes: 'card-label card-label-yellow mod-card-front',
        text: 'ninja',
      },
      '1': {
        classes: 'card-label card-label-orange mod-card-front',
        text: ' ',
      },
      '2': {
        classes: 'card-label card-label-red mod-card-front',
        text: ' ',
      },
      length: 3,
      prevObject: {
        '0': {},
        '1': {},
        '2': {},
        length: 3,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'ToValidate',
    children: {},
    dependencies: {},
  },
  fL84qWIK: {
    href:
      '/c/fL84qWIK/32-quand-on-duplique-on-ne-peut-pas-modifier-les-photos-am%C3%A9liorer',
    cardUrl: 'fL84qWIK',
    cardNumber: '32',
    cardName: [
      'quand',
      'on',
      'duplique',
      'on',
      'ne',
      'peut',
      'pas',
      'modifier',
      'les',
      'photos',
      'am%C3%A9liorer',
    ],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'ToValidate',
    children: {},
    dependencies: {},
  },
  d689qPjT: {
    href: '/c/d689qPjT/24-6-lindexation-avec-de-bons-noms-des-url',
    cardUrl: 'd689qPjT',
    cardNumber: '24',
    cardName: ['6', 'lindexation', 'avec', 'de', 'bons', 'noms', 'des', 'url'],
    labels: {
      '0': {
        classes: 'card-label card-label-blue mod-card-front',
        text: ' ',
      },
      length: 1,
      prevObject: {
        '0': {},
        length: 1,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Done',
    children: {},
    dependencies: {},
  },
  '9G0l1PVN': {
    href:
      '/c/9G0l1PVN/22-4-mettre-une-possibilit%C3%A9-daligner-les-voitures-sur-la-page-du-site-comme-on-veut',
    cardUrl: '9G0l1PVN',
    cardNumber: '22',
    cardName: [
      '4',
      'mettre',
      'une',
      'possibilit%C3%A9',
      'daligner',
      'les',
      'voitures',
      'sur',
      'la',
      'page',
      'du',
      'site',
      'comme',
      'on',
      'veut',
    ],
    labels: {
      '0': {
        classes: 'card-label card-label-red mod-card-front',
        text: ' ',
      },
      length: 1,
      prevObject: {
        '0': {},
        length: 1,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Done',
    children: {},
    dependencies: {},
  },
  WLA5CFEw: {
    href: '/c/WLA5CFEw/18-analytics-sur-le-site',
    cardUrl: 'WLA5CFEw',
    cardNumber: '18',
    cardName: ['analytics', 'sur', 'le', 'site'],
    labels: {
      length: 0,
      prevObject: {
        length: 0,
        prevObject: {
          '0': {},
          length: 1,
        },
      },
    },
    button: {},
    listName: 'Done',
    children: {},
    dependencies: {},
  },
};
