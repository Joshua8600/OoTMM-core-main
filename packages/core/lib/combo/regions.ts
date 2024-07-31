const REGION_NAMES: {[k: string]: string} = {
  OOT_KOKIRI_FOREST: 'Kokiri Forest',
  OOT_HYRULE_FIELD: 'Hyrule Field',
  OOT_MARKET: 'Market',
  OOT_LON_LON_RANCH: 'Lon Lon Ranch',
  OOT_HYRULE_CASTLE: 'Hyrule Castle',
  OOT_GANON_CASTLE_EXTERIOR: 'Outside Ganon\'s Castle',
  OOT_LOST_WOODS: 'Lost Woods',
  OOT_SACRED_MEADOW: 'Sacred Forest Meadow',
  OOT_KAKARIKO: 'Kakariko',
  OOT_GRAVEYARD: 'Graveyard',
  OOT_DEATH_MOUNTAIN_TRAIL: 'Death Mountain Trail',
  OOT_GORON_CITY: 'Goron City',
  OOT_ZORA_RIVER: 'Zora\'s River',
  OOT_ZORA_DOMAIN: 'Zora\'s Domain',
  OOT_LAKE_HYLIA: 'Lake Hylia',
  OOT_ZORA_FOUNTAIN: 'Zora\'s Fountain',
  OOT_TEMPLE_OF_TIME: 'Temple of Time',
  OOT_SACRED_REALM: 'Sacred Realm',
  OOT_DEATH_MOUNTAIN_CRATER: 'Death Mountain Crater',
  OOT_GERUDO_VALLEY: 'Gerudo Valley',
  OOT_GERUDO_FORTRESS: 'Gerudo\'s Fortress',
  OOT_HAUNTED_WASTELAND: 'Haunted Wasteland',
  OOT_DESERT_COLOSSUS: 'Desert Colossus',
  OOT_DEKU_TREE: 'Deku Tree',
  OOT_DODONGO_CAVERN: 'Dodongo\'s Cavern',
  OOT_JABU_JABU: 'Jabu-Jabu\'s Belly',
  OOT_TEMPLE_FOREST: 'Forest Temple',
  OOT_TEMPLE_FIRE: 'Fire Temple',
  OOT_TEMPLE_WATER: 'Water Temple',
  OOT_TEMPLE_SPIRIT: 'Spirit Temple',
  OOT_TEMPLE_SHADOW: 'Shadow Temple',
  OOT_BOTTOM_OF_THE_WELL: 'Bottom of the Well',
  OOT_ICE_CAVERN: 'Ice Cavern',
  OOT_THIEVES_HIDEOUT: 'Thieves\' Hideout',
  OOT_GERUDO_TRAINING_GROUNDS: 'Gerudo\'s Training Ground',
  OOT_GANON_CASTLE: 'Ganon\'s Castle',
  OOT_EGGS: 'Inside Eggs',
  OOT_GANON_CASTLE_TOWER: 'Ganon\'s Castle Tower',
  MM_CLOCK_TOWN_SOUTH: 'South Clock Town',
  MM_GIANT_DREAM: 'Giant\'s Dream',
  MM_CLOCK_TOWN_NORTH: 'North Clock Town',
  MM_CLOCK_TOWN_WEST: 'West Clock Town',
  MM_CLOCK_TOWN_EAST: 'East Clock Town',
  MM_LAUNDRY_POOL: 'Laundry Pool',
  MM_CLOCK_TOWER_ROOFTOP: 'Clock Tower Roof',
  MM_STOCK_POT_INN: 'Stock Pot Inn',
  MM_TERMINA_FIELD: 'Termina Field',
  MM_ROAD_TO_SWAMP: 'Road to Southern Swamp',
  MM_SOUTHERN_SWAMP: 'Southern Swamp',
  MM_DEKU_PALACE: 'Deku Palace',
  MM_WOODFALL: 'Woodfall',
  MM_MOUNTAIN_VILLAGE: 'Mountain Village',
  MM_TWIN_ISLANDS: 'Twin Islands',
  MM_GORON_VILLAGE: 'Goron Village',
  MM_PATH_TO_SNOWHEAD: 'Road to Snowhead',
  MM_SNOWHEAD: 'Snowhead',
  MM_ROMANI_RANCH: 'Romani Ranch',
  MM_GREAT_BAY_COAST: 'Great Bay Coast',
  MM_PINNACLE_ROCK: 'Pinnacle Rock',
  MM_ZORA_CAPE: 'Zora Cape',
  MM_ZORA_HALL: 'Zora Hall',
  MM_MILK_ROAD: 'Milk Road',
  MM_ROAD_TO_IKANA: 'Road to Ikana',
  MM_IKANA_GRAVEYARD: 'Ikana Graveyard',
  MM_IKANA_CANYON: 'Ikana Canyon',
  MM_STONE_TOWER: 'Stone Tower',
  MM_TEMPLE_WOODFALL: 'Woodfall Temple',
  MM_TEMPLE_SNOWHEAD: 'Snowhead Temple',
  MM_TEMPLE_GREAT_BAY: 'Great Bay Temple',
  MM_TEMPLE_STONE_TOWER: 'Stone Tower Temple',
  MM_PIRATE_FORTRESS_EXTERIOR: 'Pirates\' Fortress Exterior',
  MM_PIRATE_FORTRESS_SEWERS: 'Pirates\' Fortress Sewers',
  MM_PIRATE_FORTRESS_INTERIOR: 'Pirates\' Fortress Interior',
  MM_IKANA_CASTLE: 'Ikana Castle',
  MM_BENEATH_THE_WELL: 'Beneath The Well',
  MM_SECRET_SHRINE: 'Secret Shrine',
  MM_MOON: 'The Moon',
  MM_SPIDER_HOUSE_SWAMP: 'Swamp Spider House',
  MM_SPIDER_HOUSE_OCEAN: 'Ocean Spider House',
  MM_TINGLE: 'Tingle',
  MM_TEMPLE_STONE_TOWER_INVERTED: 'Inverted Stone Tower Temple',
  MM_GORON_RACETRACK: 'Goron Racetrack',
  MM_BUTLER_RACE: 'Butler Race',
  MM_PATH_TO_MOUNTAIN_VILLAGE: 'Path to Mountain Village',
  NAMELESS: 'A Nameless Place',
}

export const regionName = (region: string) => REGION_NAMES[region] ?? region;
