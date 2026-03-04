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
    history: "Construite au XVIIe siecle, la Grande Maison a ete le centre nevralgique du domaine pendant plus de trois cents ans. Elle a accueilli des generations de familles et a survecu a la Revolution ainsi qu'aux deux guerres mondiales. Les colombages d'origine sont encore visibles sur la facade nord.",
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
    description: "Présent sur tous les continents, j'ai plus d'un million d'années. Je vous nourris, soigne vos piqûres et démangeaisons et pourtant vous continuez à me piétiner et à m'ignorer. Je suis même à l'origine des bonbons contre les toux des humains. Mes longues feuilles nervurées de 3 à 5 côtes rappellent vos fers de lances. ",
    history: "Rapportez une de mes feuilles dans votre bannette. Qui suis-je ?",
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
    clueText: "Ce lieu porte un nom mysterieux, jeu de mots entre l'ermitage et le mitage. Un batiment complexe, fait d'ajouts successifs, qui raconte a lui seul l'histoire du domaine...",
    clueHint: "Revenez vers l'est, entre la Grande Maison et les tipis. Le batiment semble fait de plusieurs constructions imbriquees.",
    description: "La Mere Mitage est un ensemble de batiments anciens dont le nom evoque a la fois l'Hermitage et le \"mitage\" architecturale au fil du temps. Chaque epoque a laisse sa marque : un mur medieval ici, une fenetre Renaissance la, un toit du XIXe siecle plus loin.",
    history: "Le nom \"Mere Mitage\" apparait dans les archives du domaine des le XVIIIe siecle. Il designe ce batiment composite qui a ete construit, reconstruit et agrandi au fil des siecles. Certains de ses murs les plus anciens remonteraient au XIVe siecle, epoque ou un petit ermitage existait deja a cet emplacement.",
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
    image: '/images/stops/maison-foret.jpg',
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
    clueHint: "Retournez vers le sud depuis la maison dans la foret. La guinguette se trouve pres de l'entree du domaine, a l'est du chemin principal.",
    description: "La Guinguette de l'Hermitage etait un lieu de divertissement populaire au XIXe siecle. On y organisait des bals, des concerts et des fetes champetres qui attiraient les habitants des villages voisins. C'etait un endroit ou la musique et la danse faisaient oublier les soucis du quotidien.",
    history: "La guinguette a ete construite dans les annees 1850 et a connu son apogee dans les annees 1880. Elle a ferme ses portes dans les annees 1920, mais des efforts de restauration ont permis de lui redonner vie pour accueillir des evenements culturels et festifs aujourd'hui.",
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
    clueText: "Un petit batiment de pierre se dresse a l'angle du domaine, comme un vestige d'une epoque ou la securite etait une preoccupation majeure. La guérite, autrefois poste de garde, offre aujourd'hui un point de vue sur l'histoire du lieu...",
    clueHint: "Depuis la guinguette, dirigez-vous vers l'est. La guérite se trouve a l'angle du domaine, pres de l'entree principale.",
    description: "Ici la Première Guerre mondiale a fait rage. Presque tous les chemins du bois adoptent le tracé de tranchées de première ligne. A l’automne 1914, le front s’est fixé dans cette zone stratégique pendant trois, jusqu’au retrait des allemands vers St Quentin en 1917. Le bois est resté français pendant toute cette période, mais les premières tranchées allemandes étaient situées par endroits à seulement 30 ou 60 mètres. Le village d’Autrêches était coupé en deux : le hameau comprenant l’église et le centre équestre Saint Victor, en bordure du no man’s land étaient côté allemand. Les deux autres hameaux, côté français. Le bois de l’Hermitage est à la frontière entre ces deux zones. On trouve encore des vestiges de tranchées, trous d’obus et cagnas, endroits permettant aux soldats de se cacher pour se reposer, dans tout le bois. L’association Soissonnais 14-18, active dans la préservation de ce patrimoine et la mémoire de la Grande Guerre, a même récemment trouvé les traces d’un ancien cimetière temporaire dans le bois de l’Hermitage.",
    history: "Construite au XIVe siecle, la guérite a ete temoin de nombreux evenements historiques, des guerres de religion aux conflits mondiaux. Elle a servi de refuge pour les habitants du domaine en temps de guerre et a ete le point de depart de nombreuses patrouilles de surveillance dans la foret environnante.",
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
    description: 'On y fabrique des trésors avec des imprimantes 3D ou bien une découpeuse laser !',
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
    clueHint: "Depuis les tilleuls, dirigez-vous vers le sud-est. L'installation d'aquaponie se trouve près des jardins, identifiable par ses bassins d'eau et ses plantes en croissance.",
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
    description: "“Abandonnée en amont de la forêt depuis les années 70, ce véhicule meuble les souvenirs des promeneurs fréquentant l’Hermitage. En 2017, une résidence artistique a été l’occasion de donner un second souffle à cette présence fantomatique.",
    history: "Quel était le modèle de la voiture impliquée dans l'accident ?",
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
    description: "On trouve des pommes de pin dans cette zone : mettez-en une dans votre bannette. Saviez-vous que le stress hydrique et les épisodes caniculaires favorisent la prolifération d’insectes et de maladies ? Ainsi les pins et les épicéas sont actuellement attaqués par des insectes appelés scolytes qui, dans certains endroits, font des ravages.",
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
    history: "Comment trouver ce dernier indice ?",
    svgColors: { sky: '#87CEEB', ground: '#228B22', accent: '#FFD700' }
  },
];
