export const DEFAULT_SECTIONS = [
  {
    id: 'speisen', title: 'Speisen',
    items: [
      { id: 1,  name: 'Crispy Chicken-Burger',       desc: 'Mit Tomate, Gurke, Zwiebeln & Pommes',                                  descFr: 'Chicken Burger avec des frites',                              price: '15,90', tag: ''   },
      { id: 2,  name: 'Beef-Burger',                  desc: 'Mit Tomate, Gurke, Käse, Zwiebeln & Pommes',                             descFr: 'Beef-Burger avec des frites',                                 price: '15,90', tag: ''   },
      { id: 3,  name: 'Bacon-Beef Burger',            desc: 'Mit Bacon, Tomate, Gurke, Käse, Zwiebeln, BBQ-Sauce & Pommes',          descFr: 'Beef-Burger avec bacon & frites',                             price: '16,90', tag: ''   },
      { id: 4,  name: 'Green-Oat Burger',             desc: 'Mit Tomate, Gurke, Zwiebeln, Mango Relish & Pommes',                    descFr: 'Green Oat Burger avec des frites',                            price: '14,90', tag: 'V'  },
      { id: 5,  name: 'Cordon Bleu',                  desc: 'Mit Pommes & Salatbouquet',                                             descFr: 'Cordon Bleu avec frites et bouquet de salade',                price: '17,90', tag: ''   },
      { id: 6,  name: 'Putenschnitzel',               desc: 'Paniert mit Pommes',                                                    descFr: "L'escalope de dinde panée & frites",                          price: '14,90', tag: ''   },
      { id: 7,  name: 'Baguette',                     desc: 'Mit Schinken oder Salami, überbacken mit Käse',                         descFr: 'Baguette chaud avec jambon ou salami, gratiné avec fromage',  price: '7,50',  tag: ''   },
      { id: 8,  name: 'Pommes Frites',                desc: 'Mit Ketchup oder Mayo',                                                 descFr: 'Frites avec Ketchup / Mayo',                                  price: '4,00',  tag: 'VG' },
      { id: 9,  name: 'Extra Mayo / Ketchup',         desc: '',                                                                      descFr: '',                                                            price: '0,50',  tag: ''   },
      { id: 10, name: 'Currywurst mit Brötchen',      desc: '',                                                                      descFr: 'Saucisse au curry avec petit pain',                            price: '5,00',  tag: ''   },
      { id: 11, name: 'Currywurst mit Pommes',        desc: '',                                                                      descFr: 'Saucisse au curry avec des frites',                            price: '8,90',  tag: ''   },
      { id: 12, name: 'Bratwurst mit Pommes',         desc: '',                                                                      descFr: 'Saucisse knack grillée & frites',                              price: '8,50',  tag: ''   },
      { id: 13, name: '6 Chicken-Nuggets',            desc: '',                                                                      descFr: '',                                                            price: '5,50',  tag: ''   },
      { id: 14, name: '6 Chicken-Nuggets mit Pommes', desc: '',                                                                      descFr: '6-Chicken-Nuggets avec des frites',                           price: '9,50',  tag: ''   },
    ]
  },
  {
    id: 'flammkuchen', title: 'Flammkuchen',
    items: [
      { id: 15, name: 'Flammkuchen Klassisch', desc: 'Mit Zwiebeln, Speck, Käse',           descFr: 'Tarte flambée, oignon, bacon, fromage',          price: '10,50', tag: ''  },
      { id: 16, name: 'Flammkuchen Gemüse',    desc: 'Mit Gemüse, Käse',                    descFr: 'Tarte flambée, des légumes, fromage',             price: '10,50', tag: 'V' },
      { id: 17, name: 'Flammkuchen Lachs',     desc: 'Mit Lachs, Scampi und Lauch',         descFr: 'Tarte flambée, saumon, scampi, poireau',          price: '11,50', tag: ''  },
    ]
  },
  {
    id: 'salate', title: 'Salate',
    items: [
      { id: 18, name: 'Blattsalate',              desc: 'Mit Tomaten, Karotte, Gurke',                                 descFr: 'Salade mixte avec tomates, carotte, concombre',                                    price: '12,50', tag: 'VG' },
      { id: 19, name: '+ Thunfisch und Zwiebeln', desc: '',                                                            descFr: '+ thon & oignons',                                                                 price: '13,90', tag: ''   },
      { id: 20, name: '+ Hirtenkäse',             desc: '',                                                            descFr: '+ Fromage du berger',                                                              price: '13,90', tag: 'V'  },
      { id: 21, name: '+ Äpfel und Walnüsse',     desc: '',                                                            descFr: '+ pommes & noix',                                                                  price: '13,90', tag: 'VG' },
      { id: 22, name: '+ Hähnchenstreifen',       desc: '',                                                            descFr: '+ poulet',                                                                         price: '15,50', tag: ''   },
      { id: 23, name: 'Toskana Salat',            desc: 'Blattsalate, Karotte, Gurke, verschiedene Antipasti',         descFr: 'Salade Toskana avec tomates, carotte, concombre, Antipasti',                       price: '14,90', tag: ''   },
      { id: 24, name: 'Strassburger Wurstsalat',  desc: 'Mit Brötchen',                                               descFr: 'Salade de servelas et fromage, avec petit pain',                                    price: '10,50', tag: ''   },
    ]
  },
  {
    id: 'bowls', title: 'Bowls',
    items: [
      { id: 25, name: 'Buddha Bowl',               desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate',                    descFr: 'Buddha Bowl avec quinoa, edamame, betteraves',              price: '14,90', tag: 'VG' },
      { id: 26, name: 'Buddha Bowl Spicy Chicken', desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate, knusprige Hähnchenstreifen', descFr: 'Buddha Bowl avec poulet croustillant et épicé',       price: '16,90', tag: ''   },
      { id: 27, name: 'Bali Bowl',                 desc: 'Mit Avocado, Mango, Paprika, rote Zwiebeln, Tomate, Gurke, Mais, Blattsalate, Avocado-Kräuter Dressing', descFr: 'Bali Bowl avec avocat, mangue, poivron, oignons rouges, tomate, concombre, maïs, laitue', price: '14,90', tag: 'VG' },
    ]
  },
  {
    id: 'loadedfries', title: 'Loaded Fries',
    items: [
      { id: 28, name: 'Pulled Turkey & BBQ-Sauce',  desc: '',                                              descFr: 'avec pulled turkey et sauce BBQ',                   price: '10,50', tag: ''  },
      { id: 29, name: '„Tijuana Style"',             desc: 'Mit Guacamole, Sour Cream und Tomatensalsa',   descFr: 'avec guacamole, sour cream et salsa de tomates',    price: '8,50',  tag: 'V' },
      { id: 30, name: 'Parmesan & Schnittlauch',     desc: 'Mit frisch geriebenem Parmesan',               descFr: 'avec parmesan fraîchement râpé et ciboulette',      price: '7,50',  tag: 'V' },
      { id: 31, name: 'Chili Cheese & Jalapeños',   desc: '',                                              descFr: 'avec sauce chili cheese et jalapeños',              price: '7,50',  tag: 'V' },
      { id: 32, name: 'Tomatensalsa',               desc: '',                                              descFr: 'avec salsa de tomates',                             price: '7,50',  tag: 'VG'},
      { id: 33, name: 'Guacamole',                  desc: '',                                              descFr: 'avec guacamole',                                    price: '7,50',  tag: 'VG'},
      { id: 34, name: 'Sour Cream & Schnittlauch',  desc: '',                                              descFr: 'avec sour cream et ciboulette',                     price: '7,50',  tag: 'V' },
    ]
  },
  {
    id: 'getraenke', title: 'Getränke',
    items: [
      { id: 35, name: 'Mineralwasser / Stilles Wasser 0,5l',              desc: '',                      descFr: 'Eau minérale / naturelle',               price: '3,30', tag: 'VG' },
      { id: 36, name: 'Apfel- / Johannisbeerschorle 0,5l',                desc: '',                      descFr: "Jus de pommes ou groseille eau minérale", price: '3,50', tag: 'VG' },
      { id: 37, name: 'Top Fit 0,5l',                                     desc: 'Limonade isotonique',   descFr: '',                                      price: '3,50', tag: 'VG' },
      { id: 38, name: 'Coca-Cola / Coca-Cola Zero 0,5l',                  desc: '',                      descFr: '',                                      price: '4,00', tag: ''   },
      { id: 39, name: 'Sprite / Fanta / Cola-Mix 0,5l',                   desc: '',                      descFr: '',                                      price: '4,00', tag: ''   },
      { id: 40, name: 'Fuze Eistee 0,4l',                                 desc: '',                      descFr: 'Fuze thé glacé',                        price: '4,00', tag: ''   },
      { id: 41, name: 'Red Bull 0,25l',                                   desc: 'Verschiedene Sorten',   descFr: '',                                      price: '3,50', tag: ''   },
      { id: 42, name: 'Fine Spritz – Wild Virgins 0,3l',                  desc: 'Alkoholfrei',           descFr: 'Apéritif orange sans alcool',            price: '6,00', tag: ''   },
      { id: 43, name: 'Erdinger Hefeweizen Alkoholfrei 0,5l',             desc: '',                      descFr: "Bière de blé sans alcool",               price: '4,50', tag: ''   },
      { id: 44, name: 'Erdinger Helles / Weizenradler Alkoholfrei 0,33l', desc: '',                      descFr: 'Panaché de blé sans alcool',             price: '3,50', tag: ''   },
      { id: 45, name: 'Pils 0,3l',                                        desc: '',                      descFr: 'Bière',                                 price: '3,90', tag: ''   },
      { id: 46, name: 'Hefeweizen 0,5l',                                  desc: '',                      descFr: 'Bière blanche',                         price: '4,90', tag: ''   },
      { id: 47, name: 'Lager Bier 0,5l',                                  desc: '',                      descFr: 'Bière blonde',                          price: '4,90', tag: ''   },
      { id: 48, name: 'Radler 0,3l',                                      desc: '',                      descFr: 'Bière panachée',                        price: '3,90', tag: ''   },
      { id: 49, name: 'Desperados 0,33l',                                 desc: '',                      descFr: '',                                      price: '4,00', tag: ''   },
      { id: 50, name: 'Rieslingschorle 0,25l',                            desc: '',                      descFr: 'Vin blanc avec eau minérale',            price: '4,50', tag: ''   },
      { id: 51, name: 'Prosecco – Scavy & Ray 0,2l',                      desc: '',                      descFr: '',                                      price: '5,50', tag: ''   },
      { id: 52, name: 'Maracuja Sprizz 0,3l',                             desc: '',                      descFr: '',                                      price: '6,90', tag: ''   },
      { id: 53, name: 'Aperol Sprizz 0,3l',                               desc: '',                      descFr: '',                                      price: '7,50', tag: ''   },
      { id: 54, name: 'Rosé Sommerschorle 0,3l',                          desc: '',                      descFr: 'Vin rosé avec eau minérale & menthe',    price: '6,90', tag: ''   },
      { id: 55, name: 'Lillet Wild Berry 0,3l',                           desc: '',                      descFr: '',                                      price: '8,50', tag: ''   },
      { id: 56, name: 'Caipirinha / Mojito / Cuba Libre 0,3l',            desc: '',                      descFr: '',                                      price: '8,90', tag: ''   },
    ]
  },
  {
    id: 'kaffee', title: 'Kaffee & Heißgetränke',
    items: [
      { id: 57, name: 'Espresso',                   desc: '', descFr: 'Expresso',                      price: '2,50', tag: 'V' },
      { id: 58, name: 'Espresso Macchiato',         desc: '', descFr: '',                              price: '3,00', tag: 'V' },
      { id: 59, name: 'Kaffee',                     desc: '', descFr: 'Tasse de Café',                 price: '3,00', tag: 'V' },
      { id: 60, name: 'Milchkaffee / Cappuccino',   desc: '', descFr: 'Café au lait / Cappuccino',     price: '3,90', tag: 'V' },
      { id: 61, name: 'Latte Macchiato',            desc: '', descFr: '',                              price: '4,10', tag: 'V' },
      { id: 62, name: 'Heiße Schokolade mit Sahne', desc: '', descFr: 'Chocolat chaud crémeux',        price: '3,90', tag: 'V' },
      { id: 63, name: 'Tee',                        desc: 'Verschiedene Sorten', descFr: 'Différentes sortes de thé', price: '3,00', tag: 'VG' },
      { id: 64, name: 'Eiskaffee 0,3l',            desc: 'Mit Vanilleeis und Sahne', descFr: 'Café glacé',   price: '6,50', tag: 'V' },
      { id: 65, name: 'Eisschokolade 0,3l',        desc: 'Mit Vanilleeis und Sahne', descFr: 'Chocolat glacé', price: '6,50', tag: 'V' },
    ]
  },
  {
    id: 'suesses', title: 'Süßes & Desserts',
    items: [
      { id: 66, name: 'Kuchen',                         desc: 'Wechselnde Auswahl',           descFr: 'Changer la sélection de gâteaux',    price: '3,50', tag: 'V' },
      { id: 67, name: 'Muffins (Milka® / Oreo®)',       desc: 'Mit kakaohaltiger Fettglasur', descFr: 'avec glaçage à base de cacao',       price: '3,00', tag: 'V' },
      { id: 68, name: 'Donuts (Milka® / Oreo® / Pink)', desc: 'Mit kakaohaltiger Fettglasur', descFr: 'avec glaçage à base de cacao',       price: '3,00', tag: 'V' },
      { id: 69, name: 'Joghurtbecher',                  desc: 'Mit saisonalen Früchten',      descFr: 'Coupes de yaourt aux fruits de saison', price: '4,50', tag: 'V' },
    ]
  },
];
