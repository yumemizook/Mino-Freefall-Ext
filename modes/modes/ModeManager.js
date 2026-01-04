// Mode Manager - Handles dynamic loading and management of Tetris game modes
// Replaces JSON configuration system with JavaScript-based mode definitions

class ModeManager {
    constructor() {
        this.modes = new Map();
        this.loadedModes = new Set();
        this.currentMode = null;
        
        // Color mapping for difficulty types
        this.difficultyColors = {
            'easy': '#00ff00',      // green
            'standard': '#0088ff',  // blue
            'master': '#888888',    // grey
            '20g': '#ff0000',       // red
            'race': '#ff8800',      // orange
            'all clear': '#ff69b4', // pink
            'puzzle': '#8800ff'     // purple
        };

        // Specific colors for individual modes (hex numbers for Phaser)
        this.modeColors = {
            'tgm1': 0x888888,      // grey
            'tgm2': 0x888888,      // grey
            'tgm3': 0x888888,      // grey
            'tgm4': 0x888888,      // grey
            '20g': 0xff0000,       // red
            'tadeath': 0xff0000,   // red
            'shirase': 0xff0000,   // red
            'master20g': 0xff0000, // red
            'marathon': 0x0088ff,  // blue
            'ultra': 0x0088ff,     // blue
            'zen': 0x0088ff,       // blue
            'sprint_40': 0x0088ff, // blue
            'sprint_100': 0x0088ff, // blue
            'asuka_easy': 0xff8800, // orange
            'asuka_normal': 0xff8800, // orange
            'asuka_hard': 0xff8800, // orange
            'konoha_easy': 0xff69b4, // pink
            'konoha_hard': 0xff69b4, // pink
            'tgm3_sakura': 0x8800ff, // purple
            'flashpoint': 0x8800ff, // purple
            'easy_normal': 0x00ff00, // green
            'easy_easy': 0x00ff00, // green
            'tgm2_master': 0x888888, // grey
            'tgm2_normal': 0x00ff00, // green
            'tgm_plus': 0x888888   // grey
        };
        
        this.initializeModes();
    }

    // Initialize all available modes
    initializeModes() {
        // Register all available modes with their IDs and class references
        this.modeDefinitions = {
            // EASY modes
            'easy_normal': {
                modeClass: 'EasyMode',
                config: {
                    difficulty: 'easy',
                    description: 'Score as many points as you can within 300 levels!',
                    gravity: { type: 'tgm1', value: 0, curve: null },
                    das: 16/60, arr: 1/60, are: 30/60, lockDelay: 0.5,
                    nextPieces: 1, holdEnabled: false, ghostEnabled: true,
                    levelUpType: 'piece', lineClearBonus: 1, gravityLevelCap: 999
                }
            },
            'easy_easy': {
                modeClass: 'EasyMode',
                config: {
                    difficulty: 'easy',
                    description: 'Clear lines, light fireworks. Have fun!',
                    gravity: { type: 'tgm1', value: 0, curve: null },
                    das: 16/60, arr: 1/60, are: 30/60, lockDelay: 0.5,
                    nextPieces: 1, holdEnabled: false, ghostEnabled: true,
                    levelUpType: 'piece', lineClearBonus: 1, gravityLevelCap: 999
                }
            },

            // STANDARD modes
            'sprint_40': { modeClass: 'Sprint40Mode', config: { difficulty: 'standard', description: 'Clear 40 lines as fast as possible' } },
            'sprint_100': { modeClass: 'Sprint40Mode', config: { difficulty: 'standard', description: 'Clear 100 lines as fast as possible', specialMechanics: { targetLines: 100, timeAttack: true, speedBonus: true } } },
            'ultra': { modeClass: 'MarathonMode', config: { difficulty: 'standard', description: '2-minute score attack' } },
            'marathon': { modeClass: 'MarathonMode', config: { difficulty: 'standard', description: 'Clear 150 lines' } },
            'zen': { modeClass: 'ZenMode', config: { difficulty: 'standard', description: 'Endless relaxed play' } },

            // MASTER modes
            'tgm1': { modeClass: 'TGM1Mode', config: { difficulty: 'master', description: 'The Tetris game you know and love. Scale through the grades and be a Grand Master!' } },
            'tgm2': { modeClass: 'TGM2MasterMode', config: { difficulty: 'master', description: 'Brand new mechanics, brand new challenges! Do you have what it takes?' } },
            'tgm2_normal': { modeClass: 'TGM2NormalMode', config: { difficulty: 'easy', description: 'TGM2 Normal mode with item blocks at levels 100 and 200!' } },
            'tgm_plus': { modeClass: 'TGMPlusMode', config: { difficulty: 'master', description: 'Rising garbage mode with fixed 24-row pattern!' } },
            'tgm3': { modeClass: 'TGM3Mode', config: { difficulty: 'master', description: 'Try to be COOL!!, or you will REGRET!! it' } },
            'tgm3_easy': { modeClass: 'TGM3EasyMode', config: { difficulty: 'easy', description: 'TGM3 Easy with Hanabi scoring and credit roll' } },
            'tgm3_sakura': { modeClass: 'TGM3SakuraMode', config: { difficulty: 'puzzle', description: 'Puzzle-style Sakura jewel-clearing' } },
            'shirase': { modeClass: 'TGM3ShiraseMode', config: { difficulty: '20g', description: 'Shirase 20G speed attack to 1300' } },
            'tgm4': { modeClass: 'TGM4Mode', config: { difficulty: 'master', description: 'Patience is key...' } },

            // 20G modes
            '20g': { modeClass: 'Mode20G', config: { difficulty: '20g', description: 'Maximum gravity from the start! Good luck!' } },
            'tadeath': { modeClass: 'TADeathMode', config: { difficulty: '20g', description: 'Extreme 20G mode with torikan time limit. The ultimate test!' } },
            'master20g': { modeClass: 'MasterTGM4Mode', config: { difficulty: '20g', description: 'Brand new, unique game mechanics. Can you handle them?' } },

            // RACE modes
            'asuka_easy': { modeClass: 'Mode20G', config: { difficulty: 'race', description: '20G Tetris stacking introduction' } },
            'asuka_normal': { modeClass: 'Mode20G', config: { difficulty: 'race', description: 'Race mode. Finish 1300 levels in 7 minutes.' } },
            'asuka_hard': { modeClass: 'Mode20G', config: { difficulty: 'race', description: 'The true test of skill and speed!' } },

            // ALL CLEAR / PUZZLE modes
            'konoha_easy': { modeClass: 'MarathonMode', config: { difficulty: 'puzzle', description: 'Easy all-clear challenge with 5 pieces!' } },
            'konoha_hard': { modeClass: 'MarathonMode', config: { difficulty: 'puzzle', description: 'Hard all-clear challenge with all 7 pieces!' } },
            'flashpoint': { modeClass: 'ZenMode', config: { difficulty: 'puzzle', description: 'From Flashpoint.' } }
        };
    }

    // Load a specific mode by ID
    loadMode(modeId) {
        const modeDef = this.modeDefinitions[modeId];
        if (!modeDef) {
            console.error(`Mode not found: ${modeId}`);
            return null;
        }

        // Return cached mode if already loaded
        if (this.loadedModes.has(modeId)) {
            return this.modes.get(modeId);
        }

        // Create new mode instance
        let modeInstance = null;

        try {
            switch (modeDef.modeClass) {
                case 'TGM1Mode':
                    // Dynamically import or create TGM1Mode
                    if (typeof TGM1Mode !== 'undefined') {
                        modeInstance = new TGM1Mode();
                    } else {
                        console.warn('TGM1Mode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;
                    
                case 'TGM2MasterMode':
                    if (typeof TGM2MasterMode !== 'undefined') {
                        modeInstance = new TGM2MasterMode();
                    } else {
                        console.warn('TGM2MasterMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TGM2NormalMode':
                    if (typeof TGM2NormalMode !== 'undefined') {
                        modeInstance = new TGM2NormalMode();
                    } else {
                        console.warn('TGM2NormalMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TGMPlusMode':
                    if (typeof TGMPlusMode !== 'undefined') {
                        modeInstance = new TGMPlusMode();
                    } else {
                        console.warn('TGMPlusMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TADeathMode':
                    console.log(`Checking TADeathMode: ${typeof TADeathMode}`);
                    if (typeof TADeathMode !== 'undefined') {
                        modeInstance = new TADeathMode();
                        console.log('TADeathMode instantiated successfully');
                    } else {
                        console.warn('TADeathMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'Mode20G':
                    if (typeof Mode20G !== 'undefined') {
                        modeInstance = new Mode20G();
                    } else {
                        console.warn('Mode20G not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'MarathonMode':
                    if (typeof MarathonMode !== 'undefined') {
                        modeInstance = new MarathonMode();
                    } else {
                        console.warn('MarathonMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'Sprint40Mode':
                    if (typeof Sprint40Mode !== 'undefined') {
                        modeInstance = new Sprint40Mode();
                    } else {
                        console.warn('Sprint40Mode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'ZenMode':
                    if (typeof ZenMode !== 'undefined') {
                        modeInstance = new ZenMode();
                    } else {
                        console.warn('ZenMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'UltraMode':
                    if (typeof UltraMode !== 'undefined') {
                        modeInstance = new UltraMode();
                    } else {
                        console.warn('UltraMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;
                    
                case 'TGM3Mode':
                    if (typeof TGM3Mode !== 'undefined') {
                        modeInstance = new TGM3Mode();
                    } else {
                        console.warn('TGM3Mode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TGM3EasyMode':
                    if (typeof TGM3EasyMode !== 'undefined') {
                        modeInstance = new TGM3EasyMode();
                    } else {
                        console.warn('TGM3EasyMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TGM3SakuraMode':
                    if (typeof TGM3SakuraMode !== 'undefined') {
                        modeInstance = new TGM3SakuraMode();
                    } else {
                        console.warn('TGM3SakuraMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                case 'TGM3ShiraseMode':
                    if (typeof TGM3ShiraseMode !== 'undefined') {
                        modeInstance = new TGM3ShiraseMode();
                    } else {
                        console.warn('TGM3ShiraseMode not loaded, using BaseMode fallback');
                        modeInstance = new BaseMode();
                    }
                    break;

                default:
                    console.warn(`Unknown mode class: ${modeDef.modeClass}, using BaseMode fallback`);
                    modeInstance = new BaseMode();
            }
            
            // Set mode metadata and config
            if (modeInstance) {
                modeInstance.modeId = modeId;
                modeInstance.difficulty = modeDef.config.difficulty;
                modeInstance.metadata = modeDef.config;

                // Only override config for modes that don't have their own getModeConfig() with timing values
                // Modes with their own getModeConfig() should use that as the single source of truth
                const modeConfig = modeInstance.getModeConfig();
                const hasTimingConfig = modeConfig && (modeConfig.das || modeConfig.arr || modeConfig.are || modeConfig.lockDelay);
                if (!hasTimingConfig) {
                    modeInstance.config = modeDef.config;
                }
            }
            
        } catch (error) {
            console.error(`Failed to load mode ${modeId}:`, error);
            // Fallback to BaseMode
            modeInstance = new BaseMode();
            modeInstance.modeId = modeId;
            modeInstance.difficulty = 'unknown';
        }

        // Cache the loaded mode
        this.modes.set(modeId, modeInstance);
        this.loadedModes.add(modeId);
        this.currentMode = modeInstance;

        return modeInstance;
    }

    // Get current mode
    getCurrentMode() {
        return this.currentMode;
    }

    // Get mode by ID (loads if necessary)
    getMode(modeId) {
        return this.loadMode(modeId);
    }

    // Check if mode is loaded
    isModeLoaded(modeId) {
        return this.loadedModes.has(modeId);
    }

    // Get all available mode IDs
    getAvailableModeIds() {
        return Object.keys(this.modeDefinitions);
    }

    // Get mode information without loading
    getModeInfo(modeId) {
        return this.modeDefinitions[modeId] || null;
    }

    // Get mode configuration
    getModeConfig(modeId) {
        const modeInfo = this.getModeInfo(modeId);
        return modeInfo ? modeInfo.config : null;
    }

    // Get all modes grouped by difficulty
    getModesByDifficulty() {
        const modesByDifficulty = {};
        
        for (const [modeId, modeDef] of Object.entries(this.modeDefinitions)) {
            const difficulty = modeDef.config.difficulty;
            if (!modesByDifficulty[difficulty]) {
                modesByDifficulty[difficulty] = [];
            }
            modesByDifficulty[difficulty].push({
                id: modeId,
                name: this.getModeDisplayName(modeId),
                description: modeDef.config.description
            });
        }
        
        return modesByDifficulty;
    }

    // Get human-readable mode name
    getModeDisplayName(modeId) {
        const nameMap = {
            'easy_normal': 'Normal',
            'easy_easy': 'Easy',
            'sprint_40': 'Sprint 40L',
            'sprint_100': 'Sprint 100L',
            'ultra': 'Ultra',
            'marathon': 'Marathon',
            'zen': 'Zen',
            'tgm1': 'TGM1',
            'tgm2': 'TGM2',
            'tgm3': 'TGM3',
            'tgm4': 'TGM4',
            '20g': '20G',
            'tadeath': 'T.A.Death',
            'shirase': 'Shirase',
            'master20g': 'Master',
            'asuka_easy': 'Asuka Easy',
            'asuka_normal': 'Asuka',
            'asuka_hard': 'Asuka Hard',
            'konoha_easy': 'Konoha Easy',
            'konoha_hard': 'Konoha Hard',
            'tgm3_sakura': 'TGM3-Sakura',
            'flashpoint': 'Flashpoint'
        };
        
        return nameMap[modeId] || modeId;
    }

    // Preload commonly used modes
    preloadCommonModes() {
        const commonModes = ['tgm1', '20g', 'marathon', 'zen', 'sprint_40'];
        commonModes.forEach(modeId => {
            if (this.modeDefinitions[modeId]) {
                this.loadMode(modeId);
            }
        });
    }

    // Clear mode cache (for memory management)
    clearCache() {
        this.modes.clear();
        this.loadedModes.clear();
        this.currentMode = null;
    }

    // Get memory usage statistics
    getMemoryStats() {
        return {
            loadedModes: this.loadedModes.size,
            cachedInstances: this.modes.size,
            totalDefined: Object.keys(this.modeDefinitions).length
        };
    }
}

// Global mode manager instance
let globalModeManager = null;

// Get or create global mode manager
function getModeManager() {
    if (!globalModeManager) {
        globalModeManager = new ModeManager();
    }
    return globalModeManager;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModeManager, getModeManager };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.ModeManager = ModeManager;
    window.getModeManager = getModeManager;
}