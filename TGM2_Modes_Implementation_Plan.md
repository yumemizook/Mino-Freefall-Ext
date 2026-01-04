# TGM2 Modes Implementation Plan

Based on the tgm2modes.md analysis, here are the four distinct TGM2 game modes that need to be implemented:

## Mode Overview

### 1. **Normal Mode** (300 levels)
- **Goal**: Complete 300 levels
- **Special Items**: 
  - Level 100: "Free Fall" (eliminates all holes)
  - Level 200: "Del Even" (clears every other row)
- **Gravity**: Standard progression ending at 20G at level 300
- **Timings**: Fixed throughout (ARE: 27f, DAS: 16f, Lock: 30f, Line Clear: 40f)
- **Credit Roll**: Slow 20G (completion not required for clear)

### 2. **Master Mode** (999 levels)
- **Goal**: Complete 999 levels
- **Progressive Speed**: Shrinking delays after level 500
- **Credit Roll**: Fading Roll + M-Roll challenges
- **Gravity**: Standard progression to 20G at level 500
- **Dynamic Timings**: 6 different timing phases

### 3. **TGM+ Mode** (999 levels)
- **Goal**: Complete 999 levels while managing rising garbage
- **Mechanic**: Rising garbage blocks from bottom
- **Pattern**: Fixed 24-row garbage sequence loop
- **No Grading**: Simple completion-based mode
- **Gravity/Speed**: Master gravity, Normal timings

### 4. **T.A. Death Mode** (999 levels)
- **Goal**: Complete 999 levels in 20G
- **Extreme Difficulty**: Fixed 20G gravity throughout
- **Minimal Grading**: Only M and GM grades possible
- **Torikan**: 3:25:00 time limit at level 500
- **Progressive Speed**: 6 different timing phases

## Implementation Architecture

### **Shared Infrastructure** (reuse existing)
- `TGM2GradingSystem.js` - Already implemented
- `PowerupMino.js` - Already implemented
- `BaseMode.js` - Already implemented
- `ModeManager.js` - Already implemented

### **New Mode Classes Required**

#### 1. **TGM2NormalMode.js**
```javascript
class TGM2NormalMode extends BaseMode {
    // Gravity curve: 0→300 (ends at 20G)
    // Fixed timings: ARE:27f, DAS:16f, Lock:30f, LineClear:40f
    // Special item system at levels 100, 200
    // Credit roll: slow 20G
}
```

#### 2. **TGM2MasterMode.js** 
```javascript
class TGM2MasterMode extends BaseMode {
    // Gravity curve: 0→500→999 (ends at 20G at 500)
    // Dynamic timing system (6 phases)
    // Credit roll: Fading Roll + M-Roll
    // TGM2 grading system integration
}
```

#### 3. **TGMPlusMode.js**
```javascript
class TGMPlusMode extends BaseMode {
    // Rising garbage system
    // 24-row garbage pattern loop
    // Garbage counter: 13 - floor(level/100)
    // No grading system
    // Master gravity + Normal timings
}
```

#### 4. **TADeathMode.js**
```javascript
class TADeathMode extends BaseMode {
    // Fixed 20G gravity throughout
    // Dynamic timing system (6 phases)
    // Torikan system (3:25:00 at level 500)
    // Minimal grading (M/GM only)
}
```

## Technical Implementation Details

### **Gravity Curves**

#### Normal Mode Gravity (0-300):
```
Level 0: 4/256G  → Level 300: 5120/256G (20G)
```

#### Master Mode Gravity (0-999):
```
Level 0: 4/256G  → Level 500: 5120/256G (20G) → Level 999: 5120/256G (20G)
```

#### TGM+ Gravity:
```
Same as Master Mode
```

#### T.A. Death Gravity:
```
Fixed: 5120/256G (20G) throughout all levels
```

### **Timing Systems**

#### Normal Mode (Fixed):
```
ARE: 27f, Line ARE: 27f, DAS: 16f, Lock: 30f, Line Clear: 40f
```

#### Master Mode (Progressive):
```
Phase 1 (000-499): ARE:27f, Line ARE:27f, DAS:16f, Lock:30f, Line Clear:40f
Phase 2 (500-600): ARE:27f, Line ARE:27f, DAS:10f, Lock:30f, Line Clear:25f
Phase 3 (601-700): ARE:27f, Line ARE:18f, DAS:10f, Lock:30f, Line Clear:16f
Phase 4 (701-800): ARE:18f, Line ARE:14f, DAS:10f, Lock:30f, Line Clear:12f
Phase 5 (801-900): ARE:14f, Line ARE:8f,  DAS:10f, Lock:30f, Line Clear:6f
Phase 6 (901-999): ARE:14f, Line ARE:8f,  DAS:8f,  Lock:17f, Line Clear:6f
```

#### T.A. Death Mode (Progressive):
```
Phase 1 (000-099): ARE:18f, Line ARE:14f, DAS:12f, Lock:30f, Line Clear:12f
Phase 2 (100-199): ARE:14f, Line ARE:8f,  DAS:12f, Lock:26f, Line Clear:6f
Phase 3 (200-299): ARE:14f, Line ARE:8f,  DAS:11f, Lock:22f, Line Clear:6f
Phase 4 (300-399): ARE:8f,  Line ARE:8f,  DAS:10f, Lock:18f, Line Clear:6f
Phase 5 (400-499): ARE:7f,  Line ARE:7f,  DAS:8f,  Lock:15f, Line Clear:5f
Phase 6 (500-999): ARE:6f,  Line ARE:6f,  DAS:8f,  Lock:15f, Line Clear:4f
```

#### TGM+ Mode:
```
Same as Normal Mode timings
```

### **Special Systems**

#### **Item Block System (Normal Mode)**
```javascript
// At level 100: Spawn "Free Fall" item
// At level 200: Spawn "Del Even" item
// Items appear as special pieces that activate when cleared
```

#### **Rising Garbage System (TGM+)**
```javascript
// Garbage counter increments on piece lock without line clear
// When counter ≥ (13 - floor(level/100)), raise one garbage row
// 24-row garbage pattern loops
```

#### **Torikan System (T.A. Death)**
```javascript
// At level 500: Check completion time
// If time > 3:25:00, trigger automatic game over
// Otherwise continue to level 999
```

#### **Credit Roll Systems**
```javascript
// Normal: Slow 20G (optional completion)
// Master: Fading Roll + M-Roll challenges
// TGM+: Simple credit roll completion
// T.A. Death: Standard credit roll
```

## Implementation Priority

### **Phase 1: Core Modes** (High Priority)
1. **TGM2NormalMode** - Simpler implementation, good for testing
2. **TGM2MasterMode** - Most complex, builds on existing TGM2 infrastructure

### **Phase 2: Specialized Modes** (Medium Priority)  
3. **TADeathMode** - Extreme 20G mode, unique timing progression
4. **TGMPlusMode** - Rising garbage system, completely new mechanic

### **Phase 3: Integration** (Final)
- Update ModeManager with all 4 new modes
- Update MenuScene with new mode categories
- Comprehensive testing across all modes
- Performance optimization

## File Structure

```
modes/modes/
├── BaseMode.js                     (existing)
├── ModeManager.js                  (existing) 
├── TGM2GradingSystem.js            (existing)
├── PowerupMino.js                  (existing)
├── TGM2Mode.js                     (existing)
├── TGM2NormalMode.js               (new)
├── TGM2MasterMode.js               (new)
├── TGMPlusMode.js                  (new)
└── TADeathMode.js                  (new)
```

## Success Criteria

1. **Functional Accuracy**: Each mode matches TGM2 specifications
2. **Performance**: 60fps maintained across all modes
3. **Integration**: Seamless mode switching via menu system
4. **Code Quality**: Reusable components, minimal duplication
5. **User Experience**: Clear visual/audio feedback for all special mechanics

## Notes

- **Existing Infrastructure**: Leverage already-built TGM2 grading and powerup systems
- **Incremental Development**: Implement modes one at a time, testing thoroughly
- **Documentation**: Each mode should have clear documentation of unique features
- **Backward Compatibility**: Ensure existing TGM1 modes remain unaffected