# Tetris Game Modes System

This directory contains the JavaScript-based mode system for the Tetris game, implementing different game modes with unique mechanics, timing, and gravity configurations.

## Architecture

### Base Class: `BaseMode.js`
- Provides common functionality for all game modes
- Defines configuration structure and default values
- Handles gravity calculation, timing, and basic game mechanics

### Mode Manager: `ModeManager.js`
- Dynamically loads and manages game modes
- Maps mode IDs to their corresponding JavaScript classes
- Provides caching and memory management for mode instances

### Specific Mode Implementations

#### `TGM1Mode.js`
- Classic Tetris: The Grand Master experience
- Official TGM1 gravity curve and mechanics
- Full grading system with GM requirements
- Section stops and progression

#### `Mode20G.js`
- Maximum gravity (20 rows per frame) from level 0
- Fast DAS/ARR for rapid gameplay
- Auto-hard drop on spawn
- Enhanced scoring for technical play

#### `OtherModes.js`
- **MarathonMode**: Progressive difficulty with increasing gravity
- **Sprint40Mode**: Speed-focused 40-line clear challenge
- **ZenMode**: Relaxed endless play with gentle mechanics

## Configuration Structure

Each mode defines its configuration through the `getModeConfig()` method:

```javascript
getModeConfig() {
    return {
        gravity: {
            type: 'tgm1',        // 'tgm1', 'static', 'linear', 'custom'
            value: 5120,         // For static gravity
            curve: (level) => {} // Custom function for advanced curves
        },
        das: 16/60,           // Delayed Auto Shift timing
        arr: 1/60,            // Auto Repeat Rate
        are: 30/60,           // Appearance Delay
        lockDelay: 0.5,       // Lock delay timing
        nextPieces: 1,        // Number of next pieces to show
        holdEnabled: false,   // Hold mechanics availability
        ghostEnabled: true,   // Ghost piece visibility
        rotationSystem: 'SRS', // 'SRS' or 'ARS'
        levelUpType: 'piece', // 'piece' or 'lines'
        lineClearBonus: 1,    // Score multiplier
        specialMechanics: {}  // Mode-specific features
    };
}
```

## Mode Categories

### EASY
- **Normal**: TGM1 with relaxed settings
- **Easy**: Zen-like experience

### STANDARD
- **Sprint 40L/100L**: Speed challenges
- **Ultra**: 2-minute score attack
- **Marathon**: 150-line progressive challenge
- **Zen**: Endless relaxed play

### MASTER
- **TGM1/TGM2/TGM3/TGM4**: Classic TGM series experiences

### 20G
- **20G**: Maximum gravity from start
- **T.A.Death**: Difficult 20G challenge
- **Shirase**: Lightning-fast speeds
- **Master**: Unique 20G mechanics

### RACE
- **Asuka Easy/Normal/Hard**: 20G stacking challenges

### PUZZLE
- **Konoha Easy/Hard**: All-clear challenges
- **TGM3-Sakura**: Puzzle mode
- **Flashpoint**: Special puzzle mechanics

## Gravity Types

### TGM1
Uses the official TGM1 internal gravity curve with level-based progression.

### Static
Constant gravity value regardless of level (e.g., 20G mode always uses 5120).

### Linear
Simple linear progression: `base + (level * multiplier)`

### Custom
Arbitrary function that takes level and returns gravity value.

## Integration

Modes are loaded dynamically through the `ModeManager`:

```javascript
const modeManager = getModeManager();
const gameMode = modeManager.loadMode('tgm1');
const gravitySpeed = gameMode.getGravitySpeed(currentLevel);
```

## Benefits

1. **Self-Contained**: Each mode contains all its logic and configuration
2. **Memory Efficient**: Modes are loaded on-demand and cached
3. **Extensible**: Easy to add new modes by extending BaseMode
4. **Type Safe**: JavaScript classes provide better error handling
5. **Maintainable**: Clear separation between mode logic and game engine

## Adding New Modes

1. Create a new JavaScript file extending `BaseMode`
2. Implement `getModeConfig()` with desired settings
3. Override methods as needed for special mechanics
4. Register the mode in `ModeManager.js`
5. Add script include to `index.html`

## Performance

- Modes are cached after first load
- Memory usage is monitored and can be cleared
- Preloading available for commonly used modes