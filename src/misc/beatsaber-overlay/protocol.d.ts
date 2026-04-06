export {};

declare global {
  interface EventObject {
    event: string,
    time: number,
    status: StatusObject, 
  }

  interface StatusObject {
    game: Game;
    beatmap: Beatmap | null;
    performance: Performance | null;
    mod: Mod;
    playerSettings: PlayerSettings;
  }

  interface Game {
    pluginVersion: string;
    gameVersion: string;
    scene: "Menu" | "Song" | "Spectator";
    mode: "Solo<beatmap.characteristic>" | "Party<beatmap.characteristic>" | "Multiplayer<beatmap.characteristic>" | null; 
  }

  interface Beatmap {
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
    levelAuthorNamesArray: string[];
    lighterNamesArray: string[];
    songCover: string | null;
    songHash: string;
    levelId: string;
    songBPM: number;
    noteJumpSpeed: number;
    noteJumpStartBeatOffset: number;
    songTimeOffset: number;
    start: number | null;
    paused: number | null;
    length: number;
    difficulty: string;
    difficultyEnum: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus";
    characteristic: "Standard" | "NoArrows" | "OneSaber" | "360Degree" | "90Degree" | "Lightshow" | "Lawless" | string;
    notesCount: number;
    bombsCount: number;
    obstaclesCount: number;
    maxScore: number;
    maxRank: "SSS" | "SS" | "S" | "A" | "B" | "C" | "D" | "E";
    environmentName: string;
    color: BeatmapColorOverrides;
  }

  interface BeatmapColorOverrides {
    saberA: [number, number, number];
    saberB: [number, number, number];
    environment0: [number, number, number];
    environment1: [number, number, number];
    environment0Boost: [number, number, number] | null;
    environment1Boost: [number, number, number] | null;
    obstacle: [number, number, number];
  }

  interface Performance {
    rawScore: number;
    score: number;
    currentMaxScore: number;
    rank: "SSS" | "SS" | "S" | "A" | "B" | "C" | "D" | "E";
    relativeScore: number;
    passedNotes: number;
    hitNotes: number;
    missedNotes: number;
    passedBombs: number;
    hitBombs: number;
    combo: number;
    maxCombo: number;
    multiplier: number;
    multiplierProgress: number;
    batteryEnergy: number | null;
    currentSongTime: number;
    softFailed: boolean;
  }

  interface Mod {
    multiplier: number;
    obstacles: false | "FullHeightOnly" | "All";
    instaFail: boolean;
    noFail: boolean;
    batteryEnergy: boolean;
    batteryLives: number | null;
    disappearingArrows: boolean;
    noBombs: boolean;
    songSpeed: "Normal" | "Slower" | "Faster" | "SuperFast";
    songSpeedMultiplier: number;
    noArrows: boolean;
    ghostNotes: boolean;
    failOnSaberClash: boolean;
    strictAngles: boolean;
    fastNotes: boolean;
    smallNotes: boolean;
    proMode: boolean;
    zenMode: boolean;
  }

  interface PlayerSettings {
    staticLights: boolean;
    leftHanded: boolean;
    playerHeight: number;
    sfxVolume: number;
    reduceDebris: boolean;
    noHUD: boolean;
    advancedHUD: boolean;
    autoRestart: boolean;
    saberTrailIntensity: number;
    environmentEffects: "AllEffects" | "StrobeFilter" | "NoEffects";
    hideNoteSpawningEffect: boolean;
  }
}

