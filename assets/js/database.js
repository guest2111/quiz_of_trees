
let template = {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: [],
    german: [],
    latin: [],
};
// bark: [],
// leaf: [],
// flower: [],
// bud: [],
// fruit: [],
// whole: [],
// wood: [],

let characteristic = [
    'bark', 'leaf', 'flower', 'bud', 'fruit', 'whole', 'wood'
];

let species = [
  {
    geoLoc: 'Middle_Europe',
    location: ['settlement'],
    difficulty: 2, // 0/1/2/3
    english: ['Korean Fir'],
    german: ['Koreanische Tanne'],
    latin: ['Abies Koreana'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Maple','Sycamore'],
    german: ["Ahorn"],
    latin: ['Acer'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['nature'],
    difficulty: 1, // 0/1/2/3
    english: ['Black Alder'],
    german: ['Schwarzerle'],
    latin: ['Alnus Glitinosa'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Birch'],
    german: ['Birke'],
    latin: ['Betula'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Hornbeam'],
    german: ["Hainbuche","Weißbuche","Hagebuche"],
    latin: ['Carpinus Betulus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Hazelnut'],
    german: ['Haselnuss'],
    latin: ['Corylus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Beech'],
    german: ["Buche"],
    latin: ['Fagus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Ash'],
    german: ['Esche'],
    latin: ['Fraxinus Excelsior'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Walnut'],
    german: ["Walnuss"],
    latin: ['Juglans Regia'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 1, // 0/1/2/3
    english: ['Apple'],
    german: ['Apfel'],
    latin: ['Malus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Cherry'],
    german: ['Süßkirsche'],
    latin: ['Prunus Avium'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement'],
    difficulty: 1, // 0/1/2/3
    english: ['Plum'],
    german: ['Pflaume'],
    latin: ['Prunus Domestica'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 1, // 0/1/2/3
    english: ['Bird Cherry'],
    german: ['Traubenkirsche'],
    latin: ['Prunus Padus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Pear'],
    german: ['Birne'],
    latin: ['Pyrus'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Oak'],
    german: ['Eiche'],
    latin: ['Quercus'],
  },

   {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Elder'],
    german: ['Holunder'],
    latin: ['Sambucus Nigra'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement','nature'],
    difficulty: 0, // 0/1/2/3
    english: ['Lime'],
    german: ['Linde'],
    latin: ['Tilia'],
  },

  {
    geoLoc: 'Middle_Europe',
    location: ['settlement'],
    difficulty: 2, // 0/1/2/3
    english: ['Hemlock'],
    german: ['Hemlocktanne','Schierlingstanne'],
    latin: ['Tsuga'],
  }
];

let images = [
    '../..//assets/images/juglans_regia/bark/IMG_20230514_145310.jpg',
    '../../assets/images/juglans_regia/whole/IMG_20230514_145334.jpg',
    '../../assets/images/juglans_regia/IMG_20230514_145306.jpg',
    '../../assets/images/prunus_avium/leaf/IMG_20230514_132808.jpg',
    '../../assets/images/prunus_avium/leaf/IMG_20230514_132816.jpg',
    '../../assets/images/prunus_avium/bark/IMG_20230514_132826.jpg',
    '../../assets/images/prunus_avium/whole/IMG_20230514_132842.jpg',
    '../../assets/images/prunus_avium/whole/IMG_20230514_132843.jpg',
    '../../assets/images/tsuga/leaf/IMG_20230514_144015.jpg',
    '../../assets/images/tsuga/bark/IMG_20230514_144021.jpg',
    '../../assets/images/tsuga/whole/IMG_20230514_144031.jpg',
    '../../assets/images/tilia/leaf/IMG_20230514_133324.jpg',
    '../../assets/images/tilia/leaf/IMG_20230514_134842.jpg',
    '../../assets/images/tilia/leaf/IMG_20230514_133326.jpg',
    '../../assets/images/tilia/bark/IMG_20230514_133335.jpg',
    '../../assets/images/tilia/bark/IMG_20230514_134848.jpg',
    '../../assets/images/tilia/bark/IMG_20230514_134957.jpg',
    '../../assets/images/tilia/bark/IMG_20230514_133333.jpg',
    '../../assets/images/tilia/whole/IMG_20230514_133345.jpg',
    '../../assets/images/tilia/whole/IMG_20230514_134954.jpg',
    '../../assets/images/betula/leaf/IMG_20230514_142219.jpg',
    '../../assets/images/betula/flower/IMG_20230514_142246-crop.jpg',
    '../../assets/images/betula/bark/IMG_20230514_142259b-crop.jpg',
    '../../assets/images/betula/bark/IMG_20230514_142259-crop.jpg',
    '../../assets/images/betula/whole/IMG_20230514_142307.jpg',
    '../../assets/images/sambucus_nigra/leaf/IMG_20230514_150745.jpg',
    '../../assets/images/sambucus_nigra/bark/IMG_20230514_150749.jpg',
    '../../assets/images/sambucus_nigra/whole/IMG_20230514_150828.jpg',
    '../../assets/images/malus/leaf/IMG_20230514_134359.jpg',
    '../../assets/images/malus/flower/IMG_20230514_134121-crop.jpg',
    '../../assets/images/malus/flower/IMG_20230514_134127-crop.jpg',
    '../../assets/images/malus/bark/IMG_20230514_134105.jpg',
    '../../assets/images/malus/bark/IMG_20230514_134403.jpg',
    '../../assets/images/malus/whole/IMG_20230514_134249-crop.jpg',
    '../../assets/images/malus/whole/IMG_20230514_134427.jpg',
    '../../assets/images/acer/leaf/IMG_20230514_132850.jpg',
    '../../assets/images/acer/leaf/IMG_20230514_140048.jpg',
    '../../assets/images/acer/bark/IMG_20230514_140054.jpg',
    '../../assets/images/acer/bark/IMG_20230514_132857-crop.jpg',
    '../../assets/images/acer/bark/IMG_20230514_133852.jpg',
    '../../assets/images/acer/whole/IMG_20230514_133843.jpg',
    '../../assets/images/acer/whole/IMG_20230514_133857.jpg',
    '../../assets/images/acer/whole/IMG_20230514_133840.jpg',
    '../../assets/images/quercus/bark/IMG_20230513_154153.jpg',
    '../../assets/images/quercus/bark/IMG_20230513_154247.jpg',
    '../../assets/images/quercus/bark/IMG_20230514_135828-crop.jpg',
    '../../assets/images/quercus/bark/IMG_20230513_154301.jpg',
    '../../assets/images/quercus/bark/IMG_20230513_154157.jpg',
    '../../assets/images/quercus/bark/IMG_20230514_135825-crop.jpg',
    '../../assets/images/quercus/bark/IMG_20230513_154258.jpg',
    '../../assets/images/quercus/bark/IMG_20230514_135832-crop.jpg',
    '../../assets/images/quercus/bark/IMG_20230514_135940-crop.jpg',
    '../../assets/images/quercus/bark/IMG_20230514_135855.jpg',
    '../../assets/images/quercus/whole/IMG_20230514_145135.jpg',
    '../../assets/images/quercus/whole/IMG_20230514_135929-crop.jpg',
    '../../assets/images/pyrus/leaf/IMG_20230514_133942.jpg',
    '../../assets/images/pyrus/leaf/IMG_20230514_133955.jpg',
    '../../assets/images/pyrus/leaf/IMG_20230514_133952.jpg',
    '../../assets/images/pyrus/bark/IMG_20230514_133959.jpg',
    '../../assets/images/pyrus/whole/IMG_20230514_134036.jpg',
    '../../assets/images/nice_unspecific/IMG_20230410_135317.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_142255.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_142327-crop.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_140548.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_140835.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_142246.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_135825.jpg',
    '../../assets/images/nice_unspecific/IMG_20230410_143928.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_145253.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_135832.jpg',
    '../../assets/images/nice_unspecific/IMG_20230513_155326.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_135123.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_135929.jpg',
    '../../assets/images/nice_unspecific/IMG_20230410_135322.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_140840.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_142259.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_151818.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_141940-crop.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_145251.jpg',
    '../../assets/images/nice_unspecific/IMG_20230514_135940.jpg',
    '../../assets/images/abies_koreana/leaf/IMG_20230514_141907.jpg',
    '../../assets/images/abies_koreana/fruit/IMG_20230514_141940-crop.jpg',
    '../../assets/images/abies_koreana/flower/IMG_20230514_141910.jpg',
    '../../assets/images/abies_koreana/bark/IMG_20230514_141915-crop.jpg',
    '../../assets/images/abies_koreana/bark/IMG_20230514_141920.jpg',
    '../../assets/images/abies_koreana/whole/IMG_20230514_141946-crop.jpg',
    '../../assets/images/prunus_domestica/leaf/IMG_20230514_151756.jpg',
    '../../assets/images/prunus_domestica/leaf/IMG_20230514_151803.jpg',
    '../../assets/images/alnus_glitinosa/leaf/IMG_20230514_151405.jpg',
    '../../assets/images/alnus_glitinosa/bark/IMG_20230514_151409.jpg',
    '../../assets/images/alnus_glitinosa/whole/IMG_20230514_151420.jpg',
    '../../assets/images/carpinus_betulus/leaf/IMG_20230514_133725.jpg',
    '../../assets/images/carpinus_betulus/leaf/IMG_20230514_140519.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_140551.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_140458.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_140532.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_133743.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_140548-crop.jpg',
    '../../assets/images/carpinus_betulus/bark/IMG_20230514_133752.jpg',
    '../../assets/images/carpinus_betulus/whole/IMG_20230514_133814.jpg',
    '../../assets/images/fraxinus_excelsior/leaf/IMG_20230514_151818-crop.jpg',
    '../../assets/images/fagus/leaf/IMG_20230514_140824.jpg',
    '../../assets/images/fagus/bark/IMG_20230514_140835-crop.jpg',
    '../../assets/images/fagus/bark/IMG_20230514_140849-crop.jpg',
    '../../assets/images/fagus/bark/IMG_20230514_140840-crop.jpg',
    '../../assets/images/fagus/whole/IMG_20230514_140859.jpg',
    '../../assets/images/fagus/whole/IMG_20230514_140849.jpg',
    '../../assets/images/prunus_padus/leaf/IMG_20230515_134612.jpg',
    '../../assets/images/prunus_padus/flower/IMG_20230515_134620.jpg',
    '../../assets/images/prunus_padus/flower/IMG_20230515_134617.jpg',
    '../../assets/images/prunus_padus/bark/IMG_20230515_134627.jpg',
    '../../assets/images/prunus_padus/whole/IMG_20230515_134635.jpg',
    '../../assets/images/corylus/leaf/IMG_20230514_145018.jpg',
    '../../assets/images/corylus/IMG_20230514_145022.jpg',
    '../../assets/images/corylus/whole/IMG_20230514_145050.jpg',
    '../../assets/images/corylus/IMG_20230514_145032.jpg'
];

