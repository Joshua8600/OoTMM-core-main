const ITEM_IDS = [
  'OOT_ICE_TRAP',
  'OOT_BUGS',
  'OOT_DEFENSE_UPGRADE',
  'MM_DEFENSE_UPGRADE',
  'SHARED_DEFENSE_UPGRADE',
  'OOT_STICK_UPGRADE',
  'OOT_NUT_UPGRADE',
  'MM_BOMBER_NOTEBOOK',
  'OOT_SPELL_WIND',
  'OOT_SPELL_LOVE',
  'OOT_HEART_PIECE',
  'OOT_HEART_CONTAINER',
  'MM_HEART_PIECE',
  'MM_HEART_CONTAINER',
  'SHARED_HEART_PIECE',
  'SHARED_HEART_CONTAINER',
  'MM_ARROW_FIRE',
  'MM_ARROW_ICE',
  'MM_ARROW_LIGHT',
  'MM_ARROWS_10',
  'MM_ARROWS_30',
  'MM_ARROWS_40',
  'MM_BOMB_BAG',
  'MM_BOMB',
  'MM_BOMBCHU',
  'MM_BOMBCHU_10',
  'MM_BOMBCHU_20',
  'MM_BOMBCHU_5',
  'MM_BOMBS_5',
  'MM_BOMBS_10',
  'MM_BOMBS_20',
  'MM_BOMBS_30',
  'MM_BOSS_KEY_GB',
  'MM_BOSS_KEY_SH',
  'MM_BOSS_KEY_ST',
  'MM_BOSS_KEY_WF',
  'MM_BOTTLE_CHATEAU',
  'MM_BOTTLE_EMPTY',
  'MM_BOTTLE_MILK',
  'MM_BOTTLE_POTION_RED',
  'MM_BOTTLED_GOLD_DUST',
  'MM_BOW',
  'MM_BUGS',
  'MM_CHATEAU',
  'MM_COMPASS_GB',
  'MM_COMPASS_SH',
  'MM_COMPASS_ST',
  'MM_COMPASS_WF',
  'MM_DEED_LAND',
  'MM_DEED_MOUNTAIN',
  'MM_DEED_OCEAN',
  'MM_DEED_SWAMP',
  'MM_FAIRY',
  'MM_FISH',
  'MM_GREAT_FAIRY_SWORD',
  'MM_GS_TOKEN_OCEAN',
  'MM_GS_TOKEN_SWAMP',
  'MM_HOOKSHOT',
  'MM_LENS',
  'MM_LETTER_TO_KAFEI',
  'MM_LETTER_TO_MAMA',
  'MM_MAGIC_BEAN',
  'MM_MAGIC_UPGRADE',
  'MM_MAP_GB',
  'MM_MAP_SH',
  'MM_MAP_ST',
  'MM_MAP_WF',
  'MM_MASK_ALL_NIGHT',
  'MM_MASK_BLAST',
  'MM_MASK_BREMEN',
  'MM_MASK_BUNNY',
  'MM_MASK_CAPTAIN',
  'MM_MASK_COUPLE',
  'MM_MASK_DEKU',
  'MM_MASK_DON_GERO',
  'MM_MASK_FIERCE_DEITY',
  'MM_MASK_GARO',
  'MM_MASK_GIANT',
  'MM_MASK_GIBDO',
  'MM_MASK_GORON',
  'MM_MASK_GREAT_FAIRY',
  'MM_MASK_KAFEI',
  'MM_MASK_KAMARO',
  'MM_MASK_KEATON',
  'MM_MASK_POSTMAN',
  'MM_MASK_ROMANI',
  'MM_MASK_SCENTS',
  'MM_MASK_STONE',
  'MM_MASK_TROUPE_LEADER',
  'MM_MASK_TRUTH',
  'MM_MASK_ZORA',
  'MM_MILK',
  'MM_MOON_TEAR',
  'MM_NUT',
  'MM_NUTS_5',
  'MM_NUTS_10',
  'MM_OCARINA',
  'MM_OWL_CLOCK_TOWN',
  'MM_OWL_GREAT_BAY',
  'MM_OWL_IKANA_CANYON',
  'MM_OWL_MILK_ROAD',
  'MM_OWL_MOUNTAIN_VILLAGE',
  'MM_OWL_SNOWHEAD',
  'MM_OWL_SOUTHERN_SWAMP',
  'MM_OWL_STONE_TOWER',
  'MM_OWL_WOODFALL',
  'MM_OWL_ZORA_CAPE',
  'MM_PENDANT_OF_MEMORIES',
  'MM_PICTOGRAPH_BOX',
  'MM_POTION_BLUE',
  'MM_POTION_GREEN',
  'MM_POTION_RED',
  'MM_POWDER_KEG',
  'MM_RECOVERY_HEART',
  'MM_REMAINS_GOHT',
  'MM_REMAINS_GYORG',
  'MM_REMAINS_ODOLWA',
  'MM_REMAINS_TWINMOLD',
  'MM_ROOM_KEY',
  'MM_RUPEE_BLUE',
  'MM_RUPEE_GOLD',
  'MM_RUPEE_GREEN',
  'MM_RUPEE_PURPLE',
  'MM_RUPEE_RED',
  'MM_RUPEE_SILVER',
  'MM_SHIELD_HERO',
  'MM_SHIELD_MIRROR',
  'MM_SHIELD',
  'MM_SMALL_KEY_GB',
  'MM_SMALL_KEY_SH',
  'MM_SMALL_KEY_ST',
  'MM_SMALL_KEY_WF',
  'MM_SONG_AWAKENING',
  'MM_SONG_EMPTINESS',
  'MM_SONG_EPONA',
  'MM_SONG_GORON_HALF',
  'MM_SONG_GORON',
  'MM_SONG_HEALING',
  'MM_SONG_ORDER',
  'MM_SONG_SOARING',
  'MM_SONG_STORMS',
  'MM_SONG_SUN',
  'MM_SONG_TIME',
  'MM_SONG_ZORA',
  'MM_SPIN_UPGRADE',
  'MM_STICK',
  'MM_STRAY_FAIRY_GB',
  'MM_STRAY_FAIRY_SH',
  'MM_STRAY_FAIRY_ST',
  'MM_STRAY_FAIRY_TOWN',
  'MM_STRAY_FAIRY_WF',
  'MM_SWORD',
  'MM_WALLET',
  'MM_WORLD_MAP_CLOCK_TOWN',
  'MM_WORLD_MAP_GREAT_BAY',
  'MM_WORLD_MAP_ROMANI_RANCH',
  'MM_WORLD_MAP_SNOWHEAD',
  'MM_WORLD_MAP_STONE_TOWER',
  'MM_WORLD_MAP_WOODFALL',
  'OOT_ARROW_FIRE',
  'OOT_ARROW_ICE',
  'OOT_ARROW_LIGHT',
  'OOT_ARROWS_10',
  'OOT_ARROWS_30',
  'OOT_ARROWS_5',
  'OOT_BLUE_FIRE',
  'OOT_BOMB_BAG',
  'OOT_BOMB',
  'OOT_BOMBCHU_10',
  'OOT_BOMBCHU_20',
  'OOT_BOMBCHU_5',
  'OOT_BOMBS_10',
  'OOT_BOMBS_20',
  'OOT_BOMBS_30',
  'OOT_BOMBS_5',
  'OOT_BOOMERANG',
  'OOT_BOOTS_HOVER',
  'OOT_BOOTS_IRON',
  'OOT_BOSS_KEY_FIRE',
  'OOT_BOSS_KEY_FOREST',
  'OOT_BOSS_KEY_GANON',
  'OOT_BOSS_KEY_SHADOW',
  'OOT_BOSS_KEY_SPIRIT',
  'OOT_BOSS_KEY_WATER',
  'OOT_BOTTLE_EMPTY',
  'OOT_BOTTLE_MILK',
  'OOT_BOW',
  'OOT_BROKEN_GORON_SWORD',
  'OOT_BUG',
  'OOT_BUG',
  'OOT_CHICKEN',
  'OOT_CLAIM_CHECK',
  'OOT_COJIRO',
  'OOT_COMPASS_BOTW',
  'OOT_COMPASS_DC',
  'OOT_COMPASS_DT',
  'OOT_COMPASS_FIRE',
  'OOT_COMPASS_FOREST',
  'OOT_COMPASS_IC',
  'OOT_COMPASS_JJ',
  'OOT_COMPASS_SHADOW',
  'OOT_COMPASS_SPIRIT',
  'OOT_COMPASS_WATER',
  'OOT_DEKU_SEEDS_30',
  'OOT_DEKU_SEEDS_5',
  'OOT_EYE_DROPS',
  'OOT_EYEBALL_FROG',
  'OOT_FAIRY',
  'OOT_FISH',
  'OOT_GERUDO_CARD',
  'OOT_GS_TOKEN',
  'OOT_GS_TOKEN',
  'OOT_HAMMER',
  'OOT_HOOKSHOT',
  'OOT_LENS',
  'OOT_MAGIC_BEAN',
  'OOT_MAGIC_UPGRADE',
  'OOT_MAP_BOTW',
  'OOT_MAP_DC',
  'OOT_MAP_DT',
  'OOT_MAP_FIRE',
  'OOT_MAP_FOREST',
  'OOT_MAP_IC',
  'OOT_MAP_JJ',
  'OOT_MAP_SHADOW',
  'OOT_MAP_SPIRIT',
  'OOT_MAP_WATER',
  'OOT_MASK_BUNNY',
  'OOT_MASK_GERUDO',
  'OOT_MASK_GORON',
  'OOT_MASK_KEATON',
  'OOT_MASK_SKULL',
  'OOT_MASK_SPOOKY',
  'OOT_MASK_TRUTH',
  'OOT_MASK_ZORA',
  'OOT_MEDALLION_FIRE',
  'OOT_MEDALLION_FOREST',
  'OOT_MEDALLION_LIGHT',
  'OOT_MEDALLION_SHADOW',
  'OOT_MEDALLION_SPIRIT',
  'OOT_MEDALLION_WATER',
  'OOT_MILK',
  'OOT_NUTS_5',
  'OOT_NUTS_5_ALT',
  'OOT_NUTS_10',
  'OOT_OCARINA',
  'OOT_ODD_MUSHROOM',
  'OOT_ODD_POTION',
  'OOT_POACHER_SAW',
  'OOT_POCKET_CUCCO',
  'OOT_POCKET_EGG',
  'OOT_POE',
  'OOT_POTION_BLUE',
  'OOT_POTION_GREEN',
  'OOT_POTION_RED',
  'OOT_PRESCRIPTION',
  'OOT_RECOVERY_HEART',
  'OOT_RUPEE_BLUE',
  'OOT_RUPEE_GREEN',
  'OOT_RUPEE_HUGE',
  'OOT_RUPEE_PURPLE',
  'OOT_RUPEE_RED',
  'OOT_RUTO_LETTER',
  'OOT_SCALE',
  'OOT_SHIELD_DEKU',
  'OOT_SHIELD_HYLIAN',
  'OOT_SHIELD_MIRROR',
  'OOT_SHIELD',
  'OOT_SLINGSHOT',
  'OOT_SMALL_KEY_BOTW',
  'OOT_SMALL_KEY_FIRE',
  'OOT_SMALL_KEY_FOREST',
  'OOT_SMALL_KEY_GANON',
  'OOT_SMALL_KEY_GF',
  'OOT_SMALL_KEY_GTG',
  'OOT_SMALL_KEY_SHADOW',
  'OOT_SMALL_KEY_SPIRIT',
  'OOT_SMALL_KEY_WATER',
  'OOT_SONG_EPONA',
  'OOT_SONG_SARIA',
  'OOT_SONG_STORMS',
  'OOT_SONG_SUN',
  'OOT_SONG_TIME',
  'OOT_SONG_TP_FIRE',
  'OOT_SONG_TP_FOREST',
  'OOT_SONG_TP_LIGHT',
  'OOT_SONG_TP_SHADOW',
  'OOT_SONG_TP_SPIRIT',
  'OOT_SONG_TP_WATER',
  'OOT_SONG_ZELDA',
  'OOT_SPELL_FIRE',
  'OOT_STICK',
  'OOT_STICKS_10',
  'OOT_STICKS_5',
  'OOT_STONE_EMERALD',
  'OOT_STONE_OF_AGONY',
  'OOT_STONE_RUBY',
  'OOT_STONE_SAPPHIRE',
  'OOT_STRENGTH',
  'OOT_SWORD_BIGGORON',
  'OOT_SWORD_GORON',
  'OOT_SWORD_KNIFE',
  'OOT_SWORD_KOKIRI',
  'OOT_SWORD_MASTER',
  'OOT_SWORD',
  'OOT_TUNIC_GORON',
  'OOT_TUNIC_ZORA',
  'OOT_WALLET',
  'OOT_WEIRD_EGG',
  'OOT_ZELDA_LETTER',
  'SHARED_ARROW_FIRE',
  'SHARED_ARROW_ICE',
  'SHARED_ARROW_LIGHT',
  'SHARED_ARROWS_10',
  'SHARED_ARROWS_30',
  'SHARED_ARROWS_40',
  'SHARED_ARROWS_5',
  'SHARED_BOMB_BAG',
  'SHARED_BOMB',
  'SHARED_BOMBCHU_10',
  'SHARED_BOMBCHU_20',
  'SHARED_BOMBCHU_5',
  'SHARED_BOMBCHU',
  'SHARED_BOMBS_10',
  'SHARED_BOMBS_20',
  'SHARED_BOMBS_30',
  'SHARED_BOMBS_5',
  'SHARED_BOW',
  'SHARED_HOOKSHOT',
  'SHARED_LENS',
  'SHARED_MAGIC_UPGRADE',
  'SHARED_MASK_BUNNY',
  'SHARED_MASK_GORON',
  'SHARED_MASK_KEATON',
  'SHARED_MASK_TRUTH',
  'SHARED_MASK_ZORA',
  'SHARED_NUT',
  'SHARED_NUTS_10',
  'SHARED_NUTS_5',
  'SHARED_OCARINA',
  'SHARED_RECOVERY_HEART',
  'SHARED_RUPEE_BLUE',
  'SHARED_RUPEE_GOLD',
  'SHARED_RUPEE_GREEN',
  'SHARED_RUPEE_PURPLE',
  'SHARED_RUPEE_RED',
  'SHARED_RUPEE_SILVER',
  'SHARED_SONG_EPONA',
  'SHARED_SONG_STORMS',
  'SHARED_SONG_SUN',
  'SHARED_SONG_TIME',
  'SHARED_STICK',
  'SHARED_STICKS_10',
  'SHARED_STICKS_5',
  'SHARED_WALLET',
  'SHARED_TRIFORCE',
  'OOT_RUPEE_SILVER_DC',
  'OOT_RUPEE_SILVER_BOTW',
  'OOT_RUPEE_SILVER_SPIRIT_CHILD',
  'OOT_RUPEE_SILVER_SPIRIT_SUN',
  'OOT_RUPEE_SILVER_SPIRIT_BOULDERS',
  'OOT_RUPEE_SILVER_SPIRIT_LOBBY',
  'OOT_RUPEE_SILVER_SPIRIT_ADULT',
  'OOT_RUPEE_SILVER_SHADOW_SCYTHE',
  'OOT_RUPEE_SILVER_SHADOW_PIT',
  'OOT_RUPEE_SILVER_SHADOW_SPIKES',
  'OOT_RUPEE_SILVER_SHADOW_BLADES',
  'OOT_RUPEE_SILVER_IC_SCYTHE',
  'OOT_RUPEE_SILVER_IC_BLOCK',
  'OOT_RUPEE_SILVER_GTG_SLOPES',
  'OOT_RUPEE_SILVER_GTG_LAVA',
  'OOT_RUPEE_SILVER_GTG_WATER',
  'OOT_RUPEE_SILVER_GANON_SPIRIT',
  'OOT_RUPEE_SILVER_GANON_LIGHT',
  'OOT_RUPEE_SILVER_GANON_FIRE',
  'OOT_RUPEE_SILVER_GANON_FOREST',
  'OOT_RUPEE_SILVER_GANON_SHADOW',
  'OOT_RUPEE_SILVER_GANON_WATER',
] as const;

type ItemID = typeof ITEM_IDS[number];
type ItemDefs = {[k in ItemID]: Item};

export type Item = {
  id: string;
  __brand: 'Item';
};

export const Items: ItemDefs = Object.fromEntries(ITEM_IDS.map(id => [id, { id } as Item])) as ItemDefs;
