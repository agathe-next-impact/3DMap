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
    id: 'grande-maison',
    name: 'La Grande Maison',
    lat: 49.43773201238283,
    lng: 3.129569414586877,
    emoji: '\u{1F3E0}',
    category: 'Patrimoine',
    categoryIcon: '\u{1F3DB}',
    image: '/images/stops/grande-maison.jpg',
    clueText: "Votre premier indice se trouve devant la grande maison, amusez-vous bien et soyez vigilant, l’Histoire est pleine de rebondissements.Pour trouver vos indices, cherchez les QR-codes, scannez-les, entrez le numéro de votre équipe et mettez en route vos jambes et vos méninges. Échangez les rôles dans l’équipe, tout le monde peut scanner et réfléchir ! ",
    clueHint: "Continuez vers le nord-est depuis les ateliers. C'est le plus grand batiment du domaine.",
    description: "La Grande Maison est le batiment principal de l'Hermitage. Cette imposante demeure a colombages de trois etages temoigne de l'architecture traditionnelle picarde. Son pignon orne de colombages en croix de Saint-Andre est un element remarquable du patrimoine local.",
    history: "",
    svgColors: { sky: '#87CEEB', ground: '#5dbd3a', accent: '#e83030' }
  },
  {
    id: 'tipis',
    name: 'Les Chalets',
    lat: 49.43833239424977,
    lng: 3.1277042008872646,
    emoji: '\u{26FA}',
    category: 'Insolite',
    categoryIcon: '\u{1F3D5}',
    image: '/images/stops/chalets.jpg',
    clueText: "A l'origine, c'est une construction montagnarde. Mais ici, on en trouve sur un plateau.",
    clueHint: "Je suis caché près du totem.",
    description: "Dans ma bannette et devinette. Présent sur tous les continents, j'ai plus d'un million d'années. Je vous nourris, soigne vos piqûres et démangeaisons et pourtant vous continuez à me piétiner et à m'ignorer. Je suis même à l'origine des bonbons contre les toux des humains. Mes longues feuilles nervurées de 3 à 5 côtes rappellent vos fers de lances. Qui suis-je ? ",
    history: "Rapportez une de mes feuilles dans votre bannette.",
    svgColors: { sky: '#F0E68C', ground: '#6B8E23', accent: '#DEB887' }
  },
  {
    id: 'mere-mitage',
    name: 'La Mere Mitage',
    lat: 49.43815306017622,
    lng: 3.129793240230776,
    emoji: '\u{1F3E1}',
    category: 'Patrimoine',
    categoryIcon: '\u{1F3DB}',
    image: '/images/stops/mere-mitage.jpg',
    clueText: "Félicitations vous êtes arrivés au bout de ce voyage à travers le temps, et comme tout voyage c’est là où tout a commencé que tout se termine !  ",
    clueHint: "",
    description: "Vous venez de faire un tour d’horizon de l’Hermitage d’hier à aujourd’hui. Ce lieu regorge d’histoire(s) ! Aujourd’hui, un tiers lieu d’innovation rurale s’y déploie, regroupant une un collectif autour de convictions communes : le développement durable, la transition écologique, la consommation responsable et le vivre ensemble. Ce tiers-lieu regroupe une association avec un café cantine associatif, un fablab et un travail autour du commun forestier. On trouve aussi la société d’accueil de séminaire séjours inspirants, l’entreprise d’aquaponie, la micro ferme bio, une recyclerie, une société de conseils. Nous essayons à notre échelle de continuer à animer ce lieu autour de nouveaux paradigmes sociétaux, en espérant un demain joyeux et solidaire 😊. Pour en savoir plus : hermitagelelab.com ",
    history: "Merci pour votre participation et bravo à vous ! ",
    svgColors: { sky: '#DDA0DD', ground: '#6B8E23', accent: '#8B4513' }
  },
  {
    id: 'maison-foret',
    name: 'La Maison de Blanche-Neige',
    lat: 49.4369202289649,
    lng: 3.1272672079635377,
    emoji: '\u{1F332}',
    category: 'Mystere',
    categoryIcon: '\u{1F3DA}',
    image: '/images/stops/maison-bn.jpg',
    clueText: "Au bout du chemin, cachee sous la canopee, une maison semble tout droit sortie d'un conte. Les arbres l'enveloppent comme pour la proteger du monde exterieur...",
    clueHint: "Descendez vers le sud-ouest depuis le plateau. Enfoncez-vous dans la foret, la maison se cache entre les grands arbres.",
    description: "La Maison de Blanche-Neige est une habitation isolee nichee au coeur de la foret de Laigue. Son architecture discrete, avec ses murs couverts de lierre et son toit de tuiles moussu, se fond dans le paysage forestier comme si elle avait pousse avec les arbres.",
    history: "Cette maison etait autrefois la demeure du garde forestier du domaine. Construite au milieu du XIXe siecle, elle servait de poste avance pour surveiller les coupes de bois et lutter contre le braconnage dans la foret de Laigue. Des generations de gardes y ont vecu avec leur famille, loin de l'agitation du monde.",
    svgColors: { sky: '#708090', ground: '#2E8B57', accent: '#8B4513' }
  },
  {
    id: 'guinguette',
    name: 'La Guinguette',
    lat: 49.43751022443727,
    lng: 3.1266650103976446,  
    emoji: '\u{1F37A}',
    category: 'Loisir',
    categoryIcon: '\u{1F3D6}',
    image: '/images/stops/guinguette.jpg',
    clueText: "C'est une place de village au cœur de la forêt : on y chante au coin du feu sous les guirlandes. Parfois, le café s'y installe en mode guinguette. C'est là que vous me trouverez.",
    clueHint: "",
    description: "J'adore les jeunes pousses. Quand je m'en gave au printemps, cela me rend ivre. Je suis tellement gourmand que cela peut nuire à la pousse de jeunes arbres. Je suis un cervidé à l’arrière-train blanc. Qui suis-je ?",
    history: "",
    svgColors: { sky: '#FFD700', ground: '#FF6347', accent: '#20B2AA' }
  },
  {
    id: 'guérite',
    name: 'La Guérite',
    lat: 49.43766357011599,
    lng: 3.1263932221156843,
    emoji: '\u{1F6A7}',
    category: 'Histoire',
    categoryIcon: '\u{1F3DE}',
    image: '/images/stops/guerite.jpg',
    clueText: "Mon 1er est un endroit d'une rivière que l'on peut traverser à pied. Mon 2nd est synonyme de cérémonie. Mon tout est un poste d\'observation datant de la 1ère Guerre mondiale, que l\'on retrouve à quelques pas du grand hêtre. ",
    clueHint: "Depuis la guinguette, dirigez-vous vers l'est. La guérite se trouve a l'angle du domaine, pres de l'entree principale.",
    description: "Ici la Première Guerre mondiale a fait rage. Presque tous les chemins du bois adoptent le tracé de tranchées de première ligne. A l’automne 1914, le front s’est fixé dans cette zone stratégique pendant trois, jusqu’au retrait des allemands vers St Quentin en 1917. Le bois est resté français pendant toute cette période, mais les premières tranchées allemandes étaient situées par endroits à seulement 30 ou 60 mètres. Le village d’Autrêches était coupé en deux : le hameau comprenant l’église et le centre équestre Saint Victor, en bordure du no man’s land étaient côté allemand. Les deux autres hameaux, côté français. Le bois de l’Hermitage est à la frontière entre ces deux zones. On trouve encore des vestiges de tranchées, trous d’obus et cagnas, endroits permettant aux soldats de se cacher pour se reposer, dans tout le bois. L’association Soissonnais 14-18, active dans la préservation de ce patrimoine et la mémoire de la Grande Guerre, a même récemment trouvé les traces d’un ancien cimetière temporaire dans le bois de l’Hermitage.",
    history: "Dans ma bannette : Rapportez une feuille de hêtre. Indice : Le charme d'Adam c'est d'être à poil",
    svgColors: { sky: '#A9A9A9', ground: '#556B2F', accent: '#8B0000' }
  },
  {
    id: 'fablab',
    name: 'Le Fablab',
    lat: 49.43703372350579,
    lng: 3.128807341561153,
    emoji: '\u{1F4BB}',
    category: 'Innovation',
    categoryIcon: '\u{1F3A8}',
    image: '/images/stops/fablab.jpg',
    clueText: 'C\'était autrefois une ferme, on y trouvait des poulets, puis des chèvres et des lapins. Aujourd\'hui, on y élève des entrepreneurs.',
    clueHint: 'Indice : très belle vue sur les Jardins de l\'Hermitage. Trouvez la salle qui abrite des imprimantes 3D.',
    description: 'Il s’appelle Tristan. Il fabrique des trésors avec des imprimantes 3D ou bien une découpeuse laser. Si tu lui dis : “As-tu un objet IRL pour moi ? “ Il te donnera peut-être quelque chose… Attention, il faudra choisir entre discuter avec lui et gagner le jeu de piste 😅 ! ',
    history: 'Devinette : Pourquoi les fichiers zip sont de moins en moins courants ?',
    svgColors: { sky: '#ADD8E6', ground: '#90EE90', accent: '#FF69B4' }
  },
  {
    id: "aquaponie",
    name: "L'Aquaponie",
    lat: 49.43725984543412,
    lng: 3.1291750551190756,
    emoji: '\u{1F41F}',
    category: 'Innovation',
    categoryIcon: '\u{1F3A8}',
    image: '/images/stops/aquaponie.jpg',
    clueText: "Quel est le rapport entre un fraisier et un poisson ? Trouvez l’endroit qui réunit les deux et vous trouverez votre prochain indice !",
    clueHint: "",
    description: "L’entreprise d’aquaponie Végéto est présente depuis la reprise de l’Hermitage en 2017. L’aquaponie est un système de production alimentaire durable qui unit la culture des plantes et l’élevage de poissons. Il permet de cultiver des plantes maraîchères hors sol sans intrants. Les plantes apportent l’oxygène aux poissons et les poissons par leur déjections les nutriments aux plantes. Ce système fonctionne en circuit fermé, ce qui permet de réduire considérablement la consommation en eau par rapport au maraîchage en pleine terre. Un modèle de production complémentaire et prometteur.",
    history: "L'aquaponie est la contraction de deux mots différents, lesquels ?",
    svgColors: { sky: '#00CED1', ground: '#3CB371', accent: '#FF6347' }
  },
  {
    id: "accident",
    name: "L'Accident",
    lat: 49.43682059613619,
    lng: 3.1275656421554165,
    emoji: '\u{1F4A5}',
    category: 'Histoire',
    categoryIcon: '\u{1F3DE}',
    image: '/images/stops/accident.jpg',
    clueText: "Je suis dans les bois et je n'aurais pas aimé être à la place du conducteur.",
    clueHint: "Je suis près de la maison de Blanche-Neige.",
    description: "“Un peu d’histoire : \"Véhicule en mouvement\" Abandonnée en amont de la forêt depuis les années 70, ce véhicule meuble les souvenirs des promeneurs fréquentant l’Hermitage. En 2017, une résidence artistique a été l’occasion de donner un second souffle à cette présence fantomatique.",
    history: "",
    svgColors: { sky: '#FF4500', ground: '#2E8B57', accent: '#8B0000' }
  },
  {
    id: "steles",
    name: "Les Stèles",
    lat: 49.4372977330287,
    lng: 3.12274799926072,
    emoji: '\u{1F3DB}',
    category: 'Histoire',
    categoryIcon: '\u{1F3DE}',
    image: '/images/stops/steles.jpg',
    clueText: "Je suis une partie de la mémoire de ce bois, vous foulez en ce moment même un lieu d’histoire, un lieu où des hommes se sont battus. Des artistes ont voulu rendre hommage à ce pan de l’histoire. Venez découvrir cette œuvre in situ et trouvez votre prochain indice.",
    clueHint: "Depuis l'accident, dirigez-vous vers le nord-est. Les stèles se trouvent dans une clairière, identifiable par les sculptures commémoratives.",
    description: "EMPREINTE :Ces stèles blanches érigées vers le ciel, rappellent les cimetières des soldats inconnus que l’on retrouve autour d’Autrêches et de cette zone de front. Réalisée par Julien Bouley, François Compagnon, Galane Crosaz-Blanc, Jean-Baptiste, Fabien Guillermont, Clément Pelabon, Mischa Sanders, Thomas Vinck, Elsa Welfelé",
    history: "Combien de stèles composent cette installation ?",
    svgColors: { sky: '#A9A9A9', ground: '#556B2F', accent: '#8B0000' }
  },
  {
    id: "clairiere",
    name: "La Clairière",
    lat: 49.43757610701056,
    lng: 3.1224635640120457,
    emoji: '\u{1F333}',
    category: 'Nature',
    categoryIcon: '\u{1F33F}',
    image: '/images/stops/clairiere.jpg',
    clueText: "Il va falloir marcher au milieu des arbres pour me trouver. Les scouts adorent y laisser des œuvres d'art et y sont souvent actifs.",
    clueHint: "Vous me trouverez près de cet hêtre aux branches dansantes, je suis un des plus vieux arbres de ce bois !",
    description: "Dans ma bannette : On trouve des pommes de pin dans cette zone : mettez-en une dans votre bannette. Saviez-vous que le stress hydrique et les épisodes caniculaires favorisent la prolifération d’insectes et de maladies ? Ainsi les pins et les épicéas sont actuellement attaqués par des insectes appelés scolytes qui, dans certains endroits, font des ravages.",
    history: "Quoi de mieux qu’une photo dans un cadre idyllique ? Aujourd’hui nous vous proposons un petit défi : un selfie de votre équipe ici même à envoyer au 06.34.50.29.63. La seule limite à cette photo est votre imagination et votre sécurité, sinon AMUSEZ-VOUS !",
    svgColors: { sky: '#87CEEB', ground: '#228B22', accent: '#FFD700' }
  },
  {
    id: 'arbre-remarquable',
    name: "L'Arbre Remarquable",
    lat: 49.43640778087382,
    lng: 3.126826152336797,
    emoji: '\u{1F333}',
    category: 'Nature',
    categoryIcon: '\u{1F33F}',
    image: '/images/stops/arbre-remarquable.jpg',
    clueText: "Ouvrez l'œil, soyez attentif à votre environnement ! Nous sommes un peu les gardiens de ce lieu, qui existe depuis le XVIIème siècle. Nous avons vu la guerre mais aussi des enfants et leurs rires joyeux, des promeneurs rêveurs, les malades de la maison médicale, des bûcherons et des chasseurs, des animaux se baladent aussi ici. Depuis quelques années nous avons chaud et soif, alors certains tombent, mais dans la terre sommeillent nos graines qui un jour sortiront de terre ! Nous sommes les arbres de ce bois veillant sur la vallée.",
    clueHint: "Cherchez ce gardien pour trouver votre prochain indice !",
    description: "Bravo vous m’avez trouvé ! Je suis un vieux Pin corse planté par le premier propriétaire dans les années 1930 pour “paysager” cet espace de réception. J’ai depuis trouvé ma place dans ce bois parmi les essences endémiques (essences natives de la région).",
    history: "",
    svgColors: { sky: '#87CEEB', ground: '#228B22', accent: '#FFD700' }
  },
];
