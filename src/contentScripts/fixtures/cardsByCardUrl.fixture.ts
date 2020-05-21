interface FixtureCard
  extends Omit<
    ICard,
    'cardName' | 'children' | 'dependencies' | 'labels' | 'button' | 'cardElement'
  > {
  cardUrl: string;
  href: string;
  cardNumber: string;
  cardName: string;
  labels: any;
  listName: string;
  children: Set<string> | Object;
  dependencies: Set<string> | Object;
  cardElement: any;
}

export const cardsByCardUrlFixture: Record<string, FixtureCard> = {
  JX04ICcg: {
    id: 'JX04ICcg',
    href: '/c/JX04ICcg/37-test2',
    cardUrl: 'JX04ICcg',
    cardNumber: '37',
    cardName: 'test2',
    labels: [],
    listName:
      'Améliorations #1 (Suite) de Carcam--&gt; Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  ThF4X65L: {
    id: 'ThF4X65L',
    href:
      '/c/ThF4X65L/19-1-ajouter-le-menu-de-recherche-filtrage-ou-tri-de-voiture',
    cardUrl: 'ThF4X65L',
    cardNumber: '19',
    cardName: '1 ajouter le menu de recherche filtrage ou tri de voiture',
    labels: [
      {
        classes: 'card-label card-label-green mod-card-front',
        text: '&nbsp;',
      },
      {
        classes: 'card-label card-label-yellow mod-card-front',
        text: 'lion',
      },
    ],
    listName:
      'Améliorations #1 (Suite) de Carcam--&gt; Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  ua7dNWIF: {
    id: 'ua7dNWIF',
    href: '/c/ua7dNWIF/33-test',
    cardUrl: 'ua7dNWIF',
    cardNumber: '33',
    cardName: 'test',
    labels: [],
    listName:
      'Améliorations #1 (Suite) de Carcam--&gt; Management du compte administrateur et des profils client',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  '0rRWsAD7': {
    id: '0rRWsAD7',
    href: '/c/0rRWsAD7/34-test2',
    cardUrl: '0rRWsAD7',
    cardNumber: '34',
    cardName: 'test2',
    labels: [],
    listName:
      'Améliorations #2--&gt; Facilitations de reservation pour le client et nouveau mode de reservation.',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  VQvxQsbr: {
    id: 'VQvxQsbr',
    href: '/c/VQvxQsbr/21-3-ajout-dimage',
    cardUrl: 'VQvxQsbr',
    cardNumber: '21',
    cardName: '3 ajout d image avec du texte supplémentaire pour tester affichage de mes données et du TEXTE EN PLUS',
    labels: [
      {
        classes: 'card-label card-label-orange mod-card-front',
        text: '&nbsp;',
      },
    ],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  TYFjIPhS: {
    id: 'TYFjIPhS',
    href: '/c/TYFjIPhS/31-2-ajouter-sections-pour-lajout-dimage',
    cardUrl: 'TYFjIPhS',
    cardNumber: '31',
    cardName: '2 ajouter sections pour lajout dimage',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  AnadU5OE: {
    id: 'AnadU5OE',
    href: '/c/AnadU5OE/42-sqdad',
    cardUrl: 'AnadU5OE',
    cardNumber: '42',
    cardName: 'sqdad',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  V2RSbke5: {
    id: 'V2RSbke5',
    href: '/c/V2RSbke5/30-etablir-un-plan-de-communication-avant-le-18-11-2019',
    cardUrl: 'V2RSbke5',
    cardNumber: '30',
    cardName: 'etablir un plan de communication avant le 18 11 2019',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  oVHT9cuh: {
    id: 'oVHT9cuh',
    href: '/c/oVHT9cuh/27-9-filtrage-des-voitures-doit-%C3%AAtre-marqu%C3%A9',
    cardUrl: 'oVHT9cuh',
    cardNumber: '27',
    cardName: '9 filtrage des voitures doit %C3%AAtre marqu%C3%A9',
    labels: [
      {
        classes: 'card-label card-label-yellow mod-card-front',
        text: 'ninja',
      },
      {
        classes: 'card-label card-label-orange mod-card-front',
        text: '&nbsp;',
      },
      {
        classes: 'card-label card-label-red mod-card-front',
        text: '&nbsp;',
      },
    ],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  fL84qWIK: {
    id: 'fL84qWIK',
    href:
      '/c/fL84qWIK/32-quand-on-duplique-on-ne-peut-pas-modifier-les-photos-am%C3%A9liorer',
    cardUrl: 'fL84qWIK',
    cardNumber: '32',
    cardName:
      'quand on duplique on ne peut pas modifier les photos am%C3%A9liorer et texte en plus pour voir affichage avec une ligne en plus',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  WLA5CFEw: {
    id: 'WLA5CFEw',
    href: '/c/WLA5CFEw/18-analytics-sur-le-site',
    cardUrl: 'WLA5CFEw',
    cardNumber: '18',
    cardName: 'analytics sur le site',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  '9G0l1PVN': {
    id: '9G0l1PVN',
    href:
      '/c/9G0l1PVN/22-4-mettre-une-possibilit%C3%A9-daligner-les-voitures-sur-la-page-du-site-comme-on-veut',
    cardUrl: '9G0l1PVN',
    cardNumber: '22',
    cardName:
      '4 mettre une possibilit%C3%A9 daligner les voitures sur la page du site comme on veut',
    labels: [
      {
        classes: 'card-label card-label-red mod-card-front',
        text: '&nbsp;',
      },
    ],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  d689qPjT: {
    id: 'd689qPjT',
    href: '/c/d689qPjT/24-6-lindexation-avec-de-bons-noms-des-url',
    cardUrl: 'd689qPjT',
    cardNumber: '24',
    cardName: '6 lindexation avec de bons noms des url',
    labels: [
      {
        classes: 'card-label card-label-blue mod-card-front',
        text: '&nbsp;',
      },
    ],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
  EgMg2qGP: {
    id: 'EgMg2qGP',
    href:
      '/c/EgMg2qGP/29-cr%C3%A9er-des-comptes-twitter-r%C3%A9diger-des-articles-chaque-jour-sur-le-compte-facebook-questions-%C3%A0-lire',
    cardUrl: 'EgMg2qGP',
    cardNumber: '29',
    cardName:
      'cr%C3%A9er des comptes twitter r%C3%A9diger des articles chaque jour sur le compte facebook questions %C3%A0 lire',
    labels: [],
    listName: 'ToValidate',
    children: {},
    dependencies: {},
    cardElement: {},
  },
};
