export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji: string;
  category: string;
  categoryIcon: string;
  clueText: string;
  clueHint: string;
  description: string;
  history: string;
  svgColors: { sky: string; ground: string; accent: string };
}

export const STOPS: Stop[] = [
  {
    id: 'jardins',
    name: "Les Jardins de l'Hermitage",
    lat: 49.435474936916904,
    lng: 3.1283726759185826,
    emoji: '\u{1F33A}',
    category: 'Nature',
    categoryIcon: '\u{1F33F}',
    clueText: "Au coeur du domaine, un espace ou la nature a ete apprivoisee depuis des siecles. Fleurs, legumes et herbes aromatiques y poussent dans un ecrin de pierre. Cherchez les murs qui protegent du vent...",
    clueHint: "Regardez du cote sud du domaine, la ou les rangs de plantations forment des lignes regulieres.",
    description: "Les jardins de l'Hermitage sont un ensemble de jardins potagers et d'agrement qui s'etendent au sud du domaine principal. Entoures de murs de pierre, ils forment un microclimat ideal pour la culture de varietes anciennes de legumes et de plantes medicinales.",
    history: "Ces jardins existent depuis le XVIIIe siecle. Ils fournissaient autrefois toute la nourriture necessaire aux habitants du domaine. Aujourd'hui restaures, ils conservent des varietes de plantes patrimoniales et temoignent du savoir-faire horticole de l'epoque.",
    svgColors: { sky: '#87CEEB', ground: '#7cba5a', accent: '#e05080' }
  },
  {
    id: 'ateliers',
    name: 'Les Ateliers',
    lat: 49.437065074302836,
    lng: 3.1288569554447894,
    emoji: '\u{1F528}',
    category: 'Artisanat',
    categoryIcon: '\u{1F3ED}',
    clueText: "Dans ce lieu, le bois et le metal prenaient forme sous les mains habiles des artisans. Les grandes portes s'ouvrent sur un espace ou resonnaient jadis les coups de marteau...",
    clueHint: "Remontez vers le nord depuis les jardins. Le batiment a un toit en forme de grange arrondie.",
    description: "Les ateliers du domaine accueillaient forgerons, menuisiers et charpentiers. Ces batiments a l'architecture fonctionnelle, avec leurs grandes ouvertures et leur toiture caracteristique, etaient le coeur de l'activite artisanale de l'Hermitage.",
    history: "Au XIXe siecle, ces ateliers employaient jusqu'a une quinzaine d'artisans. Ils produisaient tout le necessaire a l'entretien du domaine : outils agricoles, mobilier, reparation des charpentes et des clotures. Une forge y etait encore active jusque dans les annees 1920.",
    svgColors: { sky: '#B0C4DE', ground: '#8B7355', accent: '#CD853F' }
  },
  {
    id: 'grande-maison',
    name: 'La Grande Maison',
    lat: 49.43767351636242,
    lng: 3.1296145775339532,
    emoji: '\u{1F3E0}',
    category: 'Patrimoine',
    categoryIcon: '\u{1F3DB}',
    clueText: "La demeure principale du domaine se dresse fierement avec ses trois niveaux et ses colombages. Son pignon regarde vers la foret comme un visage bienveillant...",
    clueHint: "Continuez vers le nord-est depuis les ateliers. C'est le plus grand batiment du domaine.",
    description: "La Grande Maison est le batiment principal de l'Hermitage. Cette imposante demeure a colombages de trois etages temoigne de l'architecture traditionnelle picarde. Son pignon orne de colombages en croix de Saint-Andre est un element remarquable du patrimoine local.",
    history: "Construite au XVIIe siecle, la Grande Maison a ete le centre nevralgique du domaine pendant plus de trois cents ans. Elle a accueilli des generations de familles et a survecu a la Revolution ainsi qu'aux deux guerres mondiales. Les colombages d'origine sont encore visibles sur la facade nord.",
    svgColors: { sky: '#87CEEB', ground: '#5dbd3a', accent: '#e83030' }
  },
  {
    id: 'tipis',
    name: 'Les Tipis et Cabanons',
    lat: 49.43836816567958,
    lng: 3.127584150334995,
    emoji: '\u{26FA}',
    category: 'Insolite',
    categoryIcon: '\u{1F3D5}',
    clueText: "Au nord du domaine, des structures etonnantes se dressent entre les arbres. Ni tout a fait maisons, ni tout a fait tentes, elles offrent un abri original en pleine nature...",
    clueHint: "Dirigez-vous vers le nord-ouest, sur la petite elevation. Vous les verrez depasser au-dessus des buissons.",
    description: "Les tipis et cabanons occupent une clairiere au nord du domaine. Ces structures en bois et toile s'integrent harmonieusement dans le paysage forestier et offrent une experience d'hebergement unique, entre confort et communion avec la nature.",
    history: "Cet espace a ete amenage dans les annees 2000 pour accueillir des ateliers de plein air et des sejours nature. L'emplacement n'a pas ete choisi au hasard : c'etait autrefois un lieu de campement saisonnier pour les bucherons qui travaillaient dans la foret de Laigue toute proche.",
    svgColors: { sky: '#F0E68C', ground: '#6B8E23', accent: '#DEB887' }
  },
  {
    id: 'mere-mitage',
    name: 'La Mere Mitage',
    lat: 49.4380282321367,
    lng: 3.129701704074207,
    emoji: '\u{1F3E1}',
    category: 'Patrimoine',
    categoryIcon: '\u{1F3DB}',
    clueText: "Ce lieu porte un nom mysterieux, jeu de mots entre l'ermitage et le mitage. Un batiment complexe, fait d'ajouts successifs, qui raconte a lui seul l'histoire du domaine...",
    clueHint: "Revenez vers l'est, entre la Grande Maison et les tipis. Le batiment semble fait de plusieurs constructions imbriquees.",
    description: "La Mere Mitage est un ensemble de batiments anciens dont le nom evoque a la fois l'Hermitage et le \"mitage\" architecturale au fil du temps. Chaque epoque a laisse sa marque : un mur medieval ici, une fenetre Renaissance la, un toit du XIXe siecle plus loin.",
    history: "Le nom \"Mere Mitage\" apparait dans les archives du domaine des le XVIIIe siecle. Il designe ce batiment composite qui a ete construit, reconstruit et agrandi au fil des siecles. Certains de ses murs les plus anciens remonteraient au XIVe siecle, epoque ou un petit ermitage existait deja a cet emplacement.",
    svgColors: { sky: '#DDA0DD', ground: '#6B8E23', accent: '#8B4513' }
  },
  {
    id: 'plateau',
    name: 'Le Plateau',
    lat: 49.43760454355285,
    lng: 3.1267507660369147,
    emoji: '\u{26F0}',
    category: 'Paysage',
    categoryIcon: '\u{1F304}',
    clueText: "Prenez de la hauteur ! Ce point culminant du domaine offre une vue degagee sur la vallee et la foret environnante. Un lieu de contemplation ou le vent souffle librement...",
    clueHint: "Dirigez-vous a l'ouest, vers le point le plus haut du terrain. L'horizon s'ouvre devant vous.",
    description: "Le Plateau est le point culminant du domaine de l'Hermitage. Cette elevation naturelle offre un panorama exceptionnel sur la foret de Laigue au nord, la vallee a l'est et les champs a l'ouest. C'est un lieu de promenade et de contemplation privilegie.",
    history: "Pendant la Premiere Guerre mondiale, ce plateau a servi de point d'observation strategique en raison de sa vue degagee sur les environs. On peut encore y voir les traces d'anciennes tranchees a demi-comblees. Avant cela, c'etait un lieu de rassemblement pour les fetes du domaine.",
    svgColors: { sky: '#87CEEB', ground: '#9ACD32', accent: '#4682B4' }
  },
  {
    id: 'maison-foret',
    name: 'La Maison dans la Foret',
    lat: 49.43692220017425,
    lng: 3.127281101499329,
    emoji: '\u{1F332}',
    category: 'Mystere',
    categoryIcon: '\u{1F3DA}',
    clueText: "Au bout du chemin, cachee sous la canopee, une maison semble tout droit sortie d'un conte. Les arbres l'enveloppent comme pour la proteger du monde exterieur...",
    clueHint: "Descendez vers le sud-ouest depuis le plateau. Enfoncez-vous dans la foret, la maison se cache entre les grands arbres.",
    description: "La Maison dans la Foret est une habitation isolee nichee au coeur de la foret de Laigue. Son architecture discrete, avec ses murs couverts de lierre et son toit de tuiles moussu, se fond dans le paysage forestier comme si elle avait pousse avec les arbres.",
    history: "Cette maison etait autrefois la demeure du garde forestier du domaine. Construite au milieu du XIXe siecle, elle servait de poste avance pour surveiller les coupes de bois et lutter contre le braconnage dans la foret de Laigue. Des generations de gardes y ont vecu avec leur famille, loin de l'agitation du monde.",
    svgColors: { sky: '#708090', ground: '#2E8B57', accent: '#8B4513' }
  }
];
