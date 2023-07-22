export interface ProductInterface {
    name: string;
    description: string;
    price: number;
    quantity: number;
    rootPacking: string;
    packageType?: string;
    packageCount?: number;
    seedlingHight: number;
    seedlingWidth: number;
    seedTrunkHeight: number;
    seedTrunkGirth: number;
    plantType: string[];
    leafType: string;
    frostResistance: number;
    lightLevel: string;
    crownShape: string[];
    floweringPeriod: string[];
    careFeature: string[];
    soil: string[];
    deseaseResistance: string;
    permanentLeafColor: string[];
    autumnLeafColor: string[];
    flowerColor: string[];
    trunkColor: string[];
    plantHeight: string;
    plantWidth: string;
    plantTrunkHeight: string;
    plantTrunkGirth: string;
    seller?: string;
    _id?: string;
    images: any[];
}

export type ProductType = ProductInterface | null

export enum ProductOwnerTypeEnum {
    Owner = 'OWNER',
    General = 'GENERAL'
}

// export enum PlantType {
//     Annual = "однолетние",
//     Perennial = "многолетние",
//     Tree = "деревья",
//     Shrub = "кустарники",
//     Liana = "лианы",
//     Cactus = "кактусы",
//     Epiphyte = "эпифиты",
//     Aquatic = "водные",
//     Indoor = "комнатные",
//     Cereal = "злаки",
//     Spicy = "пряные",
//   }
  
// export enum FrostResistance {
//     VeryHigh = -45,
//     High = -40,
//     Medium = -35,
//     Low = -30,
//     VeryLow = -25,
//     LittleLow = - 20,
// }

// export enum LightLevel {
//     VeryHigh = "cолнце",
//     High = "cолнце - полутень",
//     Medium = "gолутень",
//     Low = "gолутень - тень",
//     VeryLow = "nень",
// }

// export enum CrownShape {
//     FunnelShaped = "воронковидная",
//     Weeping = "плакучая",
//     Spherical = "шаровидная",
//     UmbrellaShaped = "зонтичная",
//     FlatSpherical = "плоскошаровидная",
//     Standard = "штамбовая",
//     Columnar = "колоновидная",
//     FreeGrowing = "свободнорастущая",
//     Ovoid = "яйцевидная",
//     Pyramidal = "пирамидальная",
//     Creeping = "стелющаяся",
//     ObverseConical = "обратноконическая",
//     Spreading = "раскидистая",
// }

// export enum LeafType {
//     Coniferous = "хвоя",
//     Deciduous = "листья",
// }

// export enum Month {
//     January = "январь",
//     February = "февраль",
//     March = "март",
//     April = "апрель",
//     May = "май",
//     June = "июнь",
//     July = "июль",
//     August = "август",
//     September = "сентябрь",
//     October = "октябрь",
//     November = "ноябрь",
//     December = "декабрь",
// }

// export enum CareFeature {
//     Unpretentious = "неприхотливое",
//     Soil = "требовательное к почве",
//     Light = "требовательное к свету",
//     Watering = "требовательное к поливу",
//     DroughtTolerant = "засухоустойчивость",
// }

// export enum Soil {
//     Clay = "глинистая",
//     Loamy = "суглинистая",
//     Calcareous = "известковая",
//     Sandy = "песчаная",
//     SandyLoam = "супесчаная",
//     Marshy = "болотистая",
// }

// export enum DiseaseResistance {
//     VeryHigh = "очень высокая",
//     High = "высокая",
//     Medium = "средняя",
//     Low = "низкая",
//     VeryLow = "очень низкая",
// }

// export enum Color {
//     Green = "зелёный",
//     Red = "красный",
//     Yellow = "жёлтый",
//     Orange = "оранжевый",
//     Brown = "коричневый",
//     Purple = "фиолетовый",
//     Blue = "синий",
//     Silver = "серебряный",
//     Variegated = "смешанный",
//     Black = "чёрный",
// }

// export enum RootPackage {
//     Open = "открытая",
//     Closed = "закрытая",
// }

// export enum PackageType {
//     Container = "контейнер",
//     Rootball = "ком",
//     Cassettes = "кассеты",
// }