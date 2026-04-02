export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji: string;
  category: string;
  categoryIcon: string;
  image: string;
  clueText: string;
  clueHint: string;
  description: string;
  history: string;
  svgColors: { sky: string; ground: string; accent: string };
}

export const STOPS: Stop[] = [
  {
    id: "grande-maison",
    name: "La Grande Maison",
    lat: 49.43773201238283,
    lng: 3.129569414586877,
    emoji: "\u{1F3E1}",
    category: "Patrimoine",
    categoryIcon: "\u{1F3DB}",
    image: "/images/stops/grande-maison.jpg",
    clueText:
      "Votre premier indice se trouve devant la grande maison, amusez-vous bien et soyez vigilant, l'Histoire est pleine de rebondissements.Pour trouver vos indices repérez-vous sur la carte et cliquez si vous pensez avoir trouvé le prochain indice. Amusez-vous bien ;-) ",
    clueHint:
      "Continuez vers le nord-est depuis les ateliers. C'est le plus grand batiment du domaine.",
    description:
      "La Grande Maison est le batiment principal de l'Hermitage. Cette imposante demeure à colombages de trois etages temoigne de l'architecture néo-normande de la reconstruction des territoires du nord de la France détruits par les combats de la première guerre mondiale . Aujourd’hui lieu de sommeil et de salle à manger pour les groupes. Elle sera votre maison le temps de votre séjour inspirant à l’Hermitage :-) ",
    history: "",
    svgColors: { sky: "#87CEEB", ground: "#5dbd3a", accent: "#e83030" },
  },
  {
    id: "chalets",
    name: "Les Chalets",
    lat: 49.43833239424977,
    lng: 3.1277042008872646,
    emoji: "🏘️",
    category: "Insolite",
    categoryIcon: "\u{1F3D5}",
    image: "/images/stops/chalets.jpg",
    clueText:
      "A l'origine, c'est une construction montagnarde. Mais ici, on en trouve sur un plateau.",
    clueHint: "Je suis caché près du totem.",
    description:
      "Dans ma bannette et devinette. Présent sur tous les continents, j'ai plus d'un million d'années. ",
    history: "",
    svgColors: { sky: "#F0E68C", ground: "#6B8E23", accent: "#DEB887" },
  },
  {
    id: "mere-mitage",
    name: "La Mere Mitage",
    lat: 49.43798999070889,
    lng: 3.129692923021836,
    emoji: "☕",
    category: "Patrimoine",
    categoryIcon: "\u{1F3DB}",
    image: "/images/stops/mere-mitage.jpg",
    clueText:
      "Félicitations vous êtes arrivés au bout de ce voyage à travers le temps, et comme tout voyage c’est là où tout a commencé que tout se termine !  ",
    clueHint:
      "Aujourd’hui c’est un café-cantine associatif, lieu de lien, de rencontre et de convivialité.",
    description:
      "Vous venez de faire un tour d’horizon de l’Hermitage d’hier à aujourd’hui.",
    history: "Merci pour votre participation et bravo à vous ! ",
    svgColors: { sky: "#DDA0DD", ground: "#6B8E23", accent: "#8B4513" },
  },
  {
    id: "maison-foret",
    name: "La Maison de Blanche-Neige",
    lat: 49.4369202289649,
    lng: 3.1272672079635377,
    emoji: "🏠",
    category: "Mystere",
    categoryIcon: "\u{1F3DA}",
    image: "/images/stops/maison-bn.jpg",
    clueText:
      "Au bout du chemin, cachee sous la canopee, une maison semble tout droit sortie d'un conte.",
    clueHint: "Descendez vers le sud-ouest depuis le plateau.",
    description:
      "La Maison de Blanche-Neige est une habitation isolee nichee au coeur de bois de la Justice du \"bois de l'Hermitage\" avec leur famille, loin de l'agitation du monde.",
    history:
      "Cette maison etait autrefois un petit atelier d'apiculture, puis ce fut transformé en petit logement pour accueillir de jeunes coopérants internationaux avant leur départ en mission internationale.",
    svgColors: { sky: "#708090", ground: "#2E8B57", accent: "#8B4513" },
  },
  {
    id: "guinguette",
    name: "La Guinguette",
    lat: 49.43742626042436,
    lng: 3.1267747596039275,
    emoji: "\u{1F37A}",
    category: "Loisir",
    categoryIcon: "\u{1F3D6}",
    image: "/images/stops/guinguette.jpg",
    clueText:
      "C'est une place de village au cœur du bois: on y chante au coin du feu sous les guirlandes.",
    clueHint: "",
    description:
      "La guinguette c'est notre petit coin de paradis, de lien, et de convivialité. Concert, spectacle, Marché de Noël, soirée autour du feu. C'est la place à l'orée du bois qui met de la chaleur dans nos coeur. Le bar a été rénové lors d'un chantier participatif avec Concordia. Un commun joyeux sur le tiers-lieu.",
    history: "",
    svgColors: { sky: "#FFD700", ground: "#FF6347", accent: "#20B2AA" },
  },
  {
    id: "guérite",
    name: "La Guérite",
    lat: 49.43734746489387,
    lng: 3.1266349460333265,
    emoji: "🔭",
    category: "Histoire",
    categoryIcon: "\u{1F3DE}",
    image: "/images/stops/guerite.png",
    clueText:
      "Mon 1er est un endroit d'une rivière que l'on peut traverser à pied. Mon 2nd est synonyme de cérémonie. Mon tout était un lieu de surveillance pendant la première guerre mondiale. ",
    clueHint: "Depuis la guinguette, dirigez-vous vers l'est.",
    description:
      "Ici la Première Guerre mondiale a fait rage. Presque tous les chemins du bois adoptent le tracé de tranchées.",
    history: "",
    svgColors: { sky: "#A9A9A9", ground: "#556B2F", accent: "#8B0000" },
  },
  {
    id: "fablab",
    name: "Le Fablab",
    lat: 49.43703372350579,
    lng: 3.128807341561153,
    emoji: "🐰",
    category: "Innovation",
    categoryIcon: "\u{1F3A8}",
    image: "/images/stops/fablab.jpg",
    clueText:
      "C'était autrefois une ferme, on y trouvait des poulets, puis des chèvres et des lapins.",
    clueHint: "Très belle vue sur l'Hermitage.",
    description:
      "Ici on fabrique, on fait autrement, on répare on imagine. Le fablab avec ses imprimantes 3D, découpeuse, graveuse laser; sérigraphie. Ici notre seule limite c'est notre imagination. ",
    history: "",
    svgColors: { sky: "#ADD8E6", ground: "#90EE90", accent: "#FF69B4" },
  },
  {
    id: "aquaponie",
    name: "L'Aquaponie",
    lat: 49.43725984543412,
    lng: 3.1291750551190756,
    emoji: "\u{1F41F}",
    category: "Innovation",
    categoryIcon: "\u{1F3A8}",
    image: "/images/stops/aquaponie.jpg",
    clueText:
      "Quel est le rapport entre un fraisier et un poisson ? Trouvez ce système d'agriculture inovante. ",
    clueHint: "",
    description:
      "L’entreprise d’aquaponie Végéto est présente depuis la reprise de l’Hermitage en 2017.",
    history: "",
    svgColors: { sky: "#00CED1", ground: "#3CB371", accent: "#FF6347" },
  },
  {
    id: "accident",
    name: "L'Accident",
    lat: 49.43691870740558,
    lng: 3.1270526415895494,
    emoji: "\u{1F4A5}",
    category: "Histoire",
    categoryIcon: "\u{1F3DE}",
    image: "/images/stops/accident.jpg",
    clueText:
      "Je suis dans les bois et je n'aurais pas aimé être à la place du conducteur.",
    clueHint: "Je suis près de la maison de Blanche-Neige.",
    description:
      "Abandonnée en amont de la forêt depuis les années 70, ce véhicule meuble les souvenirs des promeneurs.",
    history: "",
    svgColors: { sky: "#FF4500", ground: "#2E8B57", accent: "#8B0000" },
  },
  {
    id: "steles",
    name: "Les Stèles",
    lat: 49.4372977330287,
    lng: 3.12274799926072,
    emoji: "🪨",
    category: "Histoire",
    categoryIcon: "\u{1F3DE}",
    image: "/images/stops/steles.jpg",
    clueText:
      "Je suis une partie de la mémoire de ce bois, vous foulez en ce moment même un lieu d'histoire.",
    clueHint: "Depuis l'accident, dirigez-vous vers le nord-est.",
    description:
      "EMPREINTE : Ces stèles blanches érigées vers le ciel, rappellent les cimetières des soldats inconnus.",
    history: "",
    svgColors: { sky: "#A9A9A9", ground: "#556B2F", accent: "#8B0000" },
  },
  {
    id: "clairiere",
    name: "La Clairière",
    lat: 49.43757610701056,
    lng: 3.1224635640120457,
    emoji: "\u{1F333}",
    category: "Nature",
    categoryIcon: "\u{1F33F}",
    image: "/images/stops/clairiere.jpg",
    clueText: "Il va falloir marcher au milieu des arbres pour me trouver.",
    clueHint: "Vous me trouverez près de cet hêtre aux branches dansantes.",
    description: "On trouve des pommes de pin dans cette zone.",
    history: "",
    svgColors: { sky: "#87CEEB", ground: "#228B22", accent: "#FFD700" },
  },
  {
    id: "arbre-remarquable",
    name: "L'Arbre Remarquable",
    lat: 49.43640778087382,
    lng: 3.126826152336797,
    emoji: "\u{1F333}",
    category: "Nature",
    categoryIcon: "\u{1F33F}",
    image: "/images/stops/arbre-remarquable.jpg",
    clueText:
      "Ouvrez l'œil, soyez attentif à votre environnement ! Nous sommes un peu les gardiens de ce lieu.",
    clueHint: "Cherchez ce gardien pour trouver votre prochain indice !",
    description:
      "Bravo vous m'avez trouvé ! Je suis un vieux Pin corse planté par le premier propriétaire dans les années 1930.",
    history: "",
    svgColors: { sky: "#87CEEB", ground: "#228B22", accent: "#FFD700" },
  },
  {
    id: "planteurs",
    name: "Planteurs",
    lat: 49.43900395270464,
    lng: 3.1261298729702736,
    emoji: "\u{1F331}",
    category: "Nature",
    categoryIcon: "\u{1F33F}",
    image: "/images/stops/planteur.jpg",
    clueText:
      "Je ne suis pas une girole mais j'ai poussé comme un champignon au plateau. J'accueille des espèces endémiques et sauvages pour remettre de la vie dans les grands champs de Picardie. ",
    clueHint: "",
    description:
      "Planteurs c\'est qui, c’est quoi ? C\'est Marius et Palmyre. C\'est une pépinière de plants locaux, issu de graines récoltées en milieu sauvage, pour alimenter des chantiers de plantations sur le territoire. Pourquoi faire ? Pour remettre des haies vivantes dans nos campagnes pour la richesse de notre biodiversité 🌱 C\'est de la découverte et du partage pour prendre le temps de découvrir ( ou re-découvrir) la flore sauvage qui nous entoure !",
    history: "",
    svgColors: { sky: "#87CEEB", ground: "#228B22", accent: "#FFD700" },
  },
  {
    id: "tipis",
    name: "Les Tipis",
    lat: 49.43838637930323,
    lng: 3.12730746972806,
    emoji: "\u{26FA}",
    category: "Insolite",
    categoryIcon: "\u{1F3D5}",
    image: "/images/stops/tipis.jpg",
    clueText:
      "Pointue et tourné vers le ciel nous poussons l'été en forme de demi-lune.",
    clueHint: "Nous accueillons des coeurs hardis pour une nuit insolite ;-) ",
    description:
      "Les tipis sont nos logements insolites que l'on monte à la belle saison pour nous permettre d'augmenter notre capicité d'accueil :-) C'est notre petit village d'indien à l'orée du bois, pour des nuits pas comme les autres que l'on peut raconter quand on revient de notre beau séjour à l'Hermitage :-) ",
    history: "",
    svgColors: { sky: "#F0E68C", ground: "#6B8E23", accent: "#DEB887" },
  },
];
