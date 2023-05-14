import { ItemPlacement } from './solve';
import { World } from './world';
import { Analysis } from './analysis';
import { Random, sample, shuffle } from '../random';
import { DUNGEON_REWARDS_ORDERED, isDungeonReward, isGoldToken, itemsArray, isKey, isHouseToken, isGanonBossKey, isRegularBossKey, isStrayFairy, isToken, isTownStrayFairy, isSong, isSmallKeyRegular, isSmallKeyHideout, isMapCompass, ITEMS_MASKS_REGULAR, isSmallKeyRegularOot, isSmallKeyRegularMm, isRegularBossKeyOot, isRegularBossKeyMm } from './items';
import { Settings } from '../settings';
import { Game } from '../config';
import { Monitor } from '../monitor';
import { Pathfinder } from './pathfind';

const FIXED_HINTS_LOCATIONS = [
  'OOT Skulltula House 10 Tokens',
  'OOT Skulltula House 20 Tokens',
  'OOT Skulltula House 30 Tokens',
  'OOT Skulltula House 40 Tokens',
  'OOT Skulltula House 50 Tokens',
  'OOT Hyrule Field Ocarina of Time',
  'OOT Hyrule Field Song of Time',
  'MM Laboratory Zora Song',
  'MM Moon Fierce Deity Mask',
  'MM Woodfall Great Fairy',
  'MM Snowhead Great Fairy',
  'MM Great Bay Great Fairy',
  'MM Ikana Great Fairy',
  'MM Goron Powder Keg',
  'MM Waterfall Rapids Beaver Race 1',
  'MM Waterfall Rapids Beaver Race 2',
  'MM Swamp Spider House Mask of Truth',
  'MM Ocean Spider House Wallet',
  'MM Clock Town Great Fairy',
  'MM Clock Town Great Fairy Alt',
]

const HINTS_ITEMS_ALWAYS = [
  'OOT_FROGS_FINAL',
  'OOT_FISHING',
  'MM_RANCH_DEFENSE',
  'MM_BUTLER_RACE',
  'MM_COUPLE_MASK',
  'MM_DON_GERO_CHOIR',
  'MM_GORON_RACE',
  'MM_GRAVEYARD_NIGHT3',
];

const HINTS_ITEMS_SOMETIMES = [
  'OOT_RAVAGED_VILLAGE',
  'OOT_ZORA_KING',
  'OOT_GANON_FAIRY',
  'OOT_TEMPLE_FIRE_HAMMER',
  'OOT_TEMPLE_FIRE_SCARECROW',
  'OOT_GTG_WATER',
  'OOT_HAUNTED_WASTELAND',
  'OOT_GERUDO_ARCHERY',
  'MM_BANK_3',
  'MM_SOUND_CHECK',
  'MM_BOAT_ARCHERY',
  'MM_OSH_CHEST',
  'MM_PINNACLE_ROCK_HP',
  'MM_FISHERMAN_GAME',
  'MM_SONG_ELEGY',
  'MM_SECRET_SHRINE_WART_HP',
];

export type HintGossipHero = {
  type: 'hero',
  region: string,
  location: string;
};

export type HintGossipFoolish = {
  type: 'foolish',
  region: string,
};

export type HintGossipItemExact = {
  type: 'item-exact',
  check: string,
  items: string[],
};

export type HintGossipItemRegion = {
  type: 'item-region',
  region: string,
  item: string;
};

export type HintGossip = { game: Game } & (HintGossipHero | HintGossipFoolish | HintGossipItemExact | HintGossipItemRegion);

export type Hints = {
  dungeonRewards: string[];
  lightArrow: string;
  oathToOrder: string;
  ganonBossKey: string;
  foolish: {[k: string]: number};
  gossip: {[k: string]: HintGossip};
};

export class LogicPassHints {
  private hintedLocations = new Set<string>();
  private gossip: {[k: string]: HintGossip} = {};
  private foolish: {[k: string]: number} = {};
  private woth: Set<string>;
  private pathfinder: Pathfinder;
  private hintsAlways: string[];
  private hintsSometimes: string[];

  constructor(
    private readonly state: {
      monitor: Monitor,
      random: Random,
      settings: Settings,
      world: World,
      items: ItemPlacement,
      analysis: Analysis,
      fixedLocations: Set<string>,
    },
  ){
    this.hintsAlways = this.alwaysHints();
    this.hintsSometimes = this.sometimesHints();
    this.pathfinder = new Pathfinder(state.world, state.settings);
    this.woth = new Set(Array.from(this.state.analysis.required).filter(loc => this.isLocationHintableHero(loc)));
  }

  private alwaysHints() {
    const { settings } = this.state;
    const alwaysHints = [...HINTS_ITEMS_ALWAYS];

    if (settings.cowShuffleOot) {
      alwaysHints.push('OOT_COW_LINK');
    }

    return alwaysHints;
  }

  private sometimesHints() {
    const { settings } = this.state;
    const sometimesHints = [...HINTS_ITEMS_SOMETIMES];

    if (settings.cowShuffleMm) {
      sometimesHints.push('MM_COW_WELL');
    }

    return sometimesHints;
  }

  private findItem(item: string) {
    for (const sphere of this.state.analysis.spheres) {
      for (const loc of sphere) {
        if (this.state.items[loc] === item) {
          return loc;
        }
      }
    }

    for (const loc in this.state.items) {
      if (this.state.items[loc] === item) {
        return loc;
      }
    }

    return null;
  }

  private isLocationIgnored(loc: string) {
    /* Get the item and region  */
    const item = this.state.items[loc];
    const region = this.state.world.regions[loc];

    /* These specific locations are always ignored */
    if (['OOT Temple of Time Medallion', 'MM Oath to Order', 'OOT Hatch Chicken', 'OOT Hatch Pocket Cucco'].includes(loc)) {
      return true;
    }

    /* Non-shuffled items are ignored */
    if (this.state.fixedLocations.has(loc)) {
      return true;
    }

    /* CHecks with no region are ignored (skip zelda) */
    if (!region || region === 'NONE') {
      return true;
    }

    /* Non-shuffled hideout keys */
    if (isSmallKeyHideout(item) && this.state.settings.smallKeyShuffleHideout !== 'anywhere') {
      return true;
    }

    /* Non-shuffled regular keys */
    if (isSmallKeyRegularOot(item) && this.state.settings.smallKeyShuffleOot !== 'anywhere') {
      return true;
    }
    if (isSmallKeyRegularMm(item) && this.state.settings.smallKeyShuffleMm !== 'anywhere') {
      return true;
    }

    /* Non-shuffled Ganon BK (doesn't really matter) */
    if (isGanonBossKey(item) && this.state.settings.ganonBossKey !== 'anywhere') {
      return true;
    }

    /* Non shuffled boss keys */
    if (isRegularBossKeyOot(item) && this.state.settings.bossKeyShuffleOot !== 'anywhere') {
      return true;
    }

    if (isRegularBossKeyMm(item) && this.state.settings.bossKeyShuffleMm !== 'anywhere') {
      return true;
    }

    /* Non shuffled town fairy */
    if (isTownStrayFairy(item) && this.state.settings.townFairyShuffle === 'vanilla') {
      return true;
    }

    /* Non shuffled stray fairy */
    if (isStrayFairy(item) && this.state.settings.strayFairyShuffle !== 'anywhere') {
      return true;
    }

    /* Non-shuffled map/compass (doesn't really matter) */
    if (isMapCompass(item) && this.state.settings.mapCompassShuffle !== 'anywhere') {
      return true;
    }

    /* Non-shuffled dungeon reward */
    if (isDungeonReward(item) && this.state.settings.dungeonRewardShuffle === 'dungeonBlueWarps') {
      return true;
    }

    /* Non shuffled GS token */
    /* TODO: Handle dungeon/overworld better */
    if (isGoldToken(item) && this.state.settings.goldSkulltulaTokens === 'none') {
      return true;
    }

    /* Non shuffled House tokens */
    if (isHouseToken(item) && this.state.settings.housesSkulltulaTokens === 'none') {
      return true;
    }

    return false;
  }

  private isLocationHintableHero(loc: string) {
    const item = this.state.items[loc];
    if (this.isLocationIgnored(loc)) {
      return false;
    }
    if (isKey(item) || isStrayFairy(item) || isToken(item) || isDungeonReward(item)) {
      return false;
    }
    if (isSong(item) && this.state.settings.songs !== 'anywhere') {
      return false;
    }
    return true;
  }

  private findValidGossip(locs: Set<string> | string) {
    if (typeof locs === 'string') {
      locs = new Set([locs]);
    }
    const pathfinderState = this.pathfinder.run(null, { recursive: true, items: this.state.items, forbiddenLocations: locs });
    const gossips = Array.from(pathfinderState.gossip).filter(x => ['gossip', 'gossip-grotto'].includes(this.state.world.gossip[x].type)).filter(x => !this.gossip[x]);
    if (gossips.length === 0) {
      return null;
    }
    return sample(this.state.random, gossips);
  }

  private playthroughLocations() {
    const locations = this.state.analysis.spheres.flat().filter(loc => !this.isLocationIgnored(loc));
    return shuffle(this.state.random, locations);
  }

  private locationFoolish(loc: string) {
    if (this.isLocationIgnored(loc) || this.state.analysis.unreachable.has(loc)) {
      return 0;
    }
    if (!this.state.analysis.useless.has(loc)) {
      return -1;
    }
    if (this.hintedLocations.has(loc) || this.state.settings.junkLocations.includes(loc)) {
      return 0;
    }
    return 1;
  }

  private foolishRegions() {
    let regions: {[k:string]: number} = {};

    for (const location in this.state.world.checks) {
      const region = this.state.world.regions[location];
      regions[region] ||= 0;
      if (regions[region] === -1) {
        continue;
      }
      const value = this.locationFoolish(location);
      if (value === -1) {
        regions[region] = -1;
      } else {
        regions[region] += value;
      }
    }

    for (const r in regions) {
      if (regions[r] <= 0) {
        delete regions[r];
      }
    }

    return regions;
  }

  private placeGossipItemExact(checkHint: string) {
    if (checkHint === 'NONE') {
      return false;
    }
    const locations = this.state.world.checkHints[checkHint];
    if (locations.every(l => this.hintedLocations.has(l))) {
      return false;
    }
    for (const l of locations) {
      if (this.hintedLocations.has(l)) {
        return false;
      }
    }
    const items = locations.map(l => this.state.items[l]);
    const gossip = this.findValidGossip(new Set(locations));
    if (!gossip) {
      return false;
    }
    this.gossip[gossip] = { game: this.state.world.gossip[gossip].game, type: 'item-exact', items, check: checkHint };
    for (const l of locations) {
      this.hintedLocations.add(l);
    }
    return true;
  }

  private placeGossipItemExactPool(pool: string[], count?: number) {
    if (count === undefined) {
      count = pool.length;
    }
    let placed = 0;
    pool = shuffle(this.state.random, pool);
    for (const checkHint of pool) {
      if (placed >= count) {
        break;
      }
      const locations = this.state.world.checkHints[checkHint];
      if (!locations) {
        continue;
      }
      if (locations.every(l => this.state.settings.junkLocations.includes(l))) {
        continue;
      }
      if (this.placeGossipItemExact(checkHint)) {
        placed++;
      }
    }
    return placed;
  }

  private placeGossipFoolish(regions: {[k: string]: number}, count: number) {
    let placed = 0;
    regions = { ...regions };
    while (placed < count) {
      const regionsArray = itemsArray(regions); /* Ugly */
      if (regionsArray.length === 0) {
        break;
      }
      const region = sample(this.state.random, regionsArray);
      delete regions[region];
      const gossip = sample(this.state.random, Object.keys(this.state.world.gossip)
        .filter(x => !this.gossip[x])
        .filter(x => ['gossip', 'gossip-grotto'].includes(this.state.world.gossip[x].type)));
      this.gossip[gossip] = { game: this.state.world.gossip[gossip].game, type: 'foolish', region: region };

      /* Mark everythibng in the region as hinted */
      for (const loc in this.state.world.checks) {
        if (this.state.world.regions[loc] === region) {
          this.hintedLocations.add(loc);
        }
      }

      placed++;
    }
    return placed;
  }

  private placeGossipHero(count: number) {
    let placed = 0;
    const locs = shuffle(this.state.random, Array.from(this.woth).filter(loc => !this.hintedLocations.has(loc)));

    for (;;) {
      if (placed >= count || locs.length === 0) {
        break;
      }
      const loc = locs.pop()!;
      const gossip = this.findValidGossip(loc);
      if (gossip !== null) {
        this.gossip[gossip] = { game: this.state.world.gossip[gossip].game, type: 'hero', region: this.state.world.regions[loc], location: loc };
        this.hintedLocations.add(loc);
        placed++;
      }
    }
    return placed;
  }

  private placeGossipItemRegion(location: string | null, isMoon: boolean) {
    if (location === null) {
      return false;
    }
    if (this.hintedLocations.has(location) && !isMoon) {
      return false;
    }
    const item = this.state.items[location];
    const hint = this.state.world.checks[location].hint;
    if (this.placeGossipItemExact(hint)) {
      return true;
    }
    let gossip;
    if (isMoon) {
      const candidates = Object.keys(this.state.world.gossip)
        .filter(x => this.state.world.gossip[x].type === 'gossip-moon')
        .filter(x => !this.gossip[x]);
      if (candidates.length === 0)
        return false;
      gossip = sample(this.state.random, candidates);
    } else {
      gossip = this.findValidGossip(location);
    }
    if (gossip === null) {
      return false;
    }
    this.gossip[gossip] = { game: this.state.world.gossip[gossip].game, type: 'item-region', item, region: this.state.world.regions[location] };
    this.hintedLocations.add(location);
    return true;
  }

  private placeGossipItemRegionSpheres(count: number) {
    const locations = this.playthroughLocations();
    let placed = 0;
    for (const loc of locations) {
      if (placed >= count) {
        break;
      }
      if (this.placeGossipItemRegion(loc, false)) {
        placed++;
      }
    }
    return placed;
  }

  private duplicateHints() {
    const hints = shuffle(this.state.random, Object.values(this.gossip).map(x => ({ ...x })));
    const locs = new Set<string>(Object.keys(this.state.world.gossip));
    for (const k in this.state.world.gossip) {
      const data = this.state.world.gossip[k];
      if (data.type !== 'gossip' && data.type !== 'gossip-grotto') {
        locs.delete(k);
      }
      if (this.gossip[k]) {
        locs.delete(k);
      }
    }
    const unplacedLocs = shuffle(this.state.random, Array.from(locs));
    for (let i = 0; i < hints.length; ++i) {
      this.gossip[unplacedLocs[i]] = { ...hints[i], game: this.state.world.gossip[unplacedLocs[i]].game };
    }
  }

  private placeMoonGossip() {
    for (const mask of ITEMS_MASKS_REGULAR) {
      const location = this.findItem(mask);
      this.placeGossipItemRegion(location, true);
    }
  }

  private placeGossips() {
    /* Set the always hinted locations */
    FIXED_HINTS_LOCATIONS.forEach(x => this.hintedLocations.add(x));

    this.foolish = this.foolishRegions();
    let hints = 0;

    /* Place always hints */
    hints += this.placeGossipItemExactPool(this.hintsAlways);

    /* Place 3 sometimes hints */
    hints += this.placeGossipItemExactPool(this.hintsSometimes, 3);

    /* Place 5 foolish hints */
    const foolishHints = this.placeGossipFoolish(this.foolish, 0);
    hints += foolishHints;

    const missingFoolish = 5 - foolishHints;
    if (missingFoolish > 0) {
      hints += this.placeGossipItemExactPool(this.hintsSometimes, missingFoolish);
    }

    /* Place Soaring spoiler */
    if (this.placeGossipItemRegion(this.findItem('MM_SONG_SOARING'), false)) {
      hints++;
    }

    /* Place sphere spoilers */
    hints += this.placeGossipItemRegionSpheres(4);

    /* Place way of the hero hints */
    hints += this.placeGossipHero(14);

    /* Place remaining hints */
    const missingHints = 34 - hints;
    if (missingHints > 0) {
      hints += this.placeGossipItemExactPool(this.hintsSometimes, missingHints);
    }

    /* Duplicate every hint */
    this.duplicateHints();

    /* Place moon hints */
    this.placeMoonGossip();
  }

  private locRegion(loc: string | null) {
    if (loc === null) {
      return 'NONE';
    }
    return this.state.world.regions[loc];
  }

  markLocation(location: string | null) {
    if (location === null) {
      return;
    }
    this.hintedLocations.add(location);
  }

  run() {
    this.state.monitor.log('Logic: Hints');

    const dungeonRewardLocations = DUNGEON_REWARDS_ORDERED.map(item => this.findItem(item));
    const lightArrowLocation = this.findItem('OOT_ARROW_LIGHT') || this.findItem('SHARED_ARROW_LIGHT');
    const oathToOrderLocation = this.findItem('MM_SONG_ORDER');
    const ganonBossKeyLocation = this.findItem('OOT_BOSS_KEY_GANON');

    dungeonRewardLocations.forEach(x => this.markLocation(x));
    this.markLocation(lightArrowLocation);
    this.markLocation(oathToOrderLocation);
    this.markLocation(ganonBossKeyLocation);

    const dungeonRewards = dungeonRewardLocations.map(x => this.locRegion(x));
    const lightArrow = this.locRegion(lightArrowLocation);
    const oathToOrder = this.locRegion(oathToOrderLocation);
    const ganonBossKey = this.state.settings.ganonBossKey === 'anywhere' ? this.locRegion(ganonBossKeyLocation) : 'NONE';

    this.placeGossips();
    const hints: Hints = { dungeonRewards, lightArrow, oathToOrder, ganonBossKey, foolish: this.foolish, gossip: this.gossip };
    return { hints };
  }
}
