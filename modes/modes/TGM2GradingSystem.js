// TGM2GradingSystem - Implements TGM2's complex internal grade point system
// This system is completely separate from TGM1's score-based grading

class TGM2GradingSystem {
    constructor() {
        // Internal grade tracking (0-31+, maps to displayed grades)
        this.internalGrade = 0;
        this.gradePoints = 0; // 0-99, resets and increments internal grade when reaching 100
        
        // Decay system - points drain continuously during gameplay
        this.decayRate = 125; // Frames per 1 point decay, will be updated based on internal grade
        this.decayTimer = 0;
        this.decayActive = true;
        
        // Grade mapping - internal grade to displayed grade
        this.gradeMapping = [
            { internal: 0, display: '9', decayRate: 125 },
            { internal: 1, display: '8', decayRate: 80 },
            { internal: 2, display: '7', decayRate: 80 },
            { internal: 3, display: '6', decayRate: 50 },
            { internal: 4, display: '5', decayRate: 45 },
            { internal: 5, display: '4', decayRate: 45 },
            { internal: 6, display: '4', decayRate: 45 },
            { internal: 7, display: '3', decayRate: 40 },
            { internal: 8, display: '3', decayRate: 40 },
            { internal: 9, display: '2', decayRate: 40 },
            { internal: 10, display: '2', decayRate: 40 },
            { internal: 11, display: '2', decayRate: 40 },
            { internal: 12, display: '1', decayRate: 30 },
            { internal: 13, display: '1', decayRate: 30 },
            { internal: 14, display: '1', decayRate: 30 },
            { internal: 15, display: 'S1', decayRate: 20 },
            { internal: 16, display: 'S1', decayRate: 20 },
            { internal: 17, display: 'S1', decayRate: 20 },
            { internal: 18, display: 'S2', decayRate: 20 },
            { internal: 19, display: 'S3', decayRate: 20 },
            { internal: 20, display: 'S4', decayRate: 15 },
            { internal: 21, display: 'S4', decayRate: 15 },
            { internal: 22, display: 'S4', decayRate: 15 },
            { internal: 23, display: 'S5', decayRate: 15 },
            { internal: 24, display: 'S5', decayRate: 15 },
            { internal: 25, display: 'S6', decayRate: 15 },
            { internal: 26, display: 'S6', decayRate: 15 },
            { internal: 27, display: 'S7', decayRate: 15 },
            { internal: 28, display: 'S7', decayRate: 15 },
            { internal: 29, display: 'S8', decayRate: 15 },
            { internal: 30, display: 'S8', decayRate: 10 },
            { internal: 31, display: 'S9', decayRate: 10 }
        ];
        
        // Base values for line clears (varies by internal grade)
        this.baseValues = [
            // Internal Grade 0
            { single: 10, double: 20, triple: 40, tetris: 50 },

            // Internal Grade 1
            { single: 10, double: 20, triple: 30, tetris: 40 },

            // Internal Grade 2
            { single: 10, double: 20, triple: 30, tetris: 40 },
            // Internal Grade 3
            { single: 10, double: 15, triple: 30, tetris: 40 },

            // Internal Grade 4
            { single: 10, double: 15, triple: 20, tetris: 40 },

            // Internal Grade 5
            { single: 5, double: 15, triple: 20, tetris: 30 },

            // Internal Grade 6
            { single: 5, double: 10, triple: 20, tetris: 30 },

            // Internal Grade 7
            { single: 5, double: 10, triple: 15, tetris: 30 },

            // Internal Grade 8
            { single: 5, double: 10, triple: 15, tetris: 30 },
            // Internal Grade 9
            { single: 5, double: 10, triple: 15, tetris: 30 },
            // Internal Grade 10
            { single: 2, double: 12, triple: 13, tetris: 30 },

            // Internal Grade 11
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 12
            { single: 2, double: 12, triple: 13, tetris: 30 },

            // Internal Grade 13
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 14
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 15-17 (S1)
            { single: 2, double: 12, triple: 13, tetris: 30 },

            // Internal Grade 18 (S2)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 19 (S3)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 20-22 (S4)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 23-24 (S5)
            { single: 2, double: 12, triple: 13, tetris: 30 },

            // Internal Grade 25-26 (S6)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 27-28 (S7)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 29 (S8)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 30 (S8)
            { single: 2, double: 12, triple: 13, tetris: 30 },
            // Internal Grade 31+ (S9)
            { single: 2, double: 12, triple: 13, tetris: 30 }
        ];
        
        // Combo multipliers (applies to Base Value before level multiplier)
        this.comboMultipliers = {
            // Combo Size: { single: multiplier, double: multiplier, triple: multiplier, tetris: multiplier }
            1: { single: 1.0, double: 1.0, triple: 1.0, tetris: 1.0 },
            2: { single: 1.2, double: 1.4, triple: 1.5, tetris: 1.0 },
            3: { single: 1.2, double: 1.5, triple: 1.8, tetris: 1.0 },
            4: { single: 1.4, double: 1.6, triple: 2.0, tetris: 1.0 },
            5: { single: 1.4, double: 1.7, triple: 2.2, tetris: 1.0 },
            6: { single: 1.4, double: 1.8, triple: 2.3, tetris: 1.0 },
            7: { single: 1.4, double: 1.9, triple: 2.4, tetris: 1.0 },
            8: { single: 1.5, double: 2.0, triple: 2.5, tetris: 1.0 },
            9: { single: 1.5, double: 2.1, triple: 2.6, tetris: 1.0 },
            10: { single: 2.0, double: 2.5, triple: 3.0, tetris: 1.0 }
        };
        
        // Current combo tracking (separate from TGM1 combo system)
        this.currentCombo = 0; // 0 = no combo, 1+ = combo active
        this.lastClearWasSingle = false; // Track if last clear was single (doesn't advance combo)
        
        // Game state tracking
        this.level = 0;
        this.hasControl = true; // Player has control of tetromino
        this.activeComboMultiplier = false; // Combo multiplier is active
        
        // Grade change tracking for animations
        this.previousDisplayedGrade = '9';
        this.gradeUpAnimationTimer = 0;
        
        // Statistics
        this.totalGradePoints = 0; // Lifetime grade points earned
        this.gradeUpsAchieved = 0;
    }
    
    // Update decay system (called every frame during gameplay)
    update(deltaTime) {
        if (!this.decayActive || this.gradePoints <= 0) return;
        
        this.decayTimer += deltaTime;
        
        // Convert decay rate from frames to seconds (assuming 60fps)
        const decayInterval = this.decayRate / 60;
        
        while (this.decayTimer >= decayInterval && this.gradePoints > 0) {
            this.decayTimer -= decayInterval;
            this.gradePoints -= 1;
            
            // Ensure grade points never go below 0
            if (this.gradePoints < 0) {
                this.gradePoints = 0;
            }
        }
    }
    
    // Award grade points for line clear
    awardPoints(linesCleared, comboSize, level, isTetris = false) {
        if (linesCleared === 0) {
            // No lines cleared - reset combo
            this.currentCombo = 0;
            this.lastClearWasSingle = false;
            return 0;
        }
        
        // Update combo tracking
        if (linesCleared === 1) {
            // Singles maintain current combo position but don't advance
            this.lastClearWasSingle = true;
        } else {
            // Non-singles advance combo
            this.currentCombo = Math.max(1, this.currentCombo + 1);
            this.lastClearWasSingle = false;
        }
        
        // Get current base values for internal grade
        const baseValues = this.getBaseValues();
        
        // Determine base value based on lines cleared
        let baseValue;
        if (isTetris) {
            // Tetrises use base value regardless of combo
            baseValue = baseValues.tetris;
        } else {
            // Non-tetrises use regular base values
            switch (linesCleared) {
                case 1: baseValue = baseValues.single; break;
                case 2: baseValue = baseValues.double; break;
                case 3: baseValue = baseValues.triple; break;
                default: baseValue = 0; break;
            }
        }
        
        if (baseValue === 0) return 0;
        
        // Apply combo multiplier
        const comboMultiplier = this.getComboMultiplier(comboSize, linesCleared, isTetris);
        const comboAdjustedValue = Math.ceil(baseValue * comboMultiplier);
        
        // Apply level multiplier
        const levelMultiplier = 1 + Math.floor(level / 250);
        const finalPoints = comboAdjustedValue * levelMultiplier;
        
        // Award points
        this.gradePoints += finalPoints;
        this.totalGradePoints += finalPoints;
        
        // Check for internal grade advancement
        while (this.gradePoints >= 100) {
            this.gradePoints -= 100;
            this.internalGrade++;
            this.gradeUpsAchieved++;
            this.updateDecayRate();
            
            // Reset decay timer when grade increases
            this.decayTimer = 0;
            
            // Clear grade points when a promotion occurs
            this.gradePoints = 0;
            break;
        }
        
        // Check for grade display change
        const newDisplayedGrade = this.getDisplayedGrade();
        if (newDisplayedGrade !== this.previousDisplayedGrade) {
            this.previousDisplayedGrade = newDisplayedGrade;
            this.gradeUpAnimationTimer = 0; // Trigger grade up animation
        }
        
        return finalPoints;
    }
    
    // Get base values for current internal grade
    getBaseValues() {
        const gradeIndex = Math.min(this.internalGrade, this.baseValues.length - 1);
        return this.baseValues[gradeIndex];
    }
    
    // Get combo multiplier for current combo
    getComboMultiplier(comboSize, linesCleared, isTetris) {
        // Tetrises always have 1.0 combo multiplier regardless of combo size
        if (isTetris) {
            return 1.0;
        }
        
        // Use combo size capped at 10 (maximum defined combo multiplier)
        const effectiveComboSize = Math.min(comboSize, 10);
        const comboData = this.comboMultipliers[effectiveComboSize];
        
        if (!comboData) return 1.0;
        
        // Return multiplier based on lines cleared
        switch (linesCleared) {
            case 1: return comboData.single;
            case 2: return comboData.double;
            case 3: return comboData.triple;
            default: return 1.0;
        }
    }
    
    // Get displayed grade based on internal grade
    getDisplayedGrade() {
        for (let i = this.gradeMapping.length - 1; i >= 0; i--) {
            if (this.internalGrade >= this.gradeMapping[i].internal) {
                return this.gradeMapping[i].display;
            }
        }
        return '9'; // Default to grade 9
    }
    
    // Get current decay rate based on internal grade
    updateDecayRate() {
        for (let i = this.gradeMapping.length - 1; i >= 0; i--) {
            if (this.internalGrade >= this.gradeMapping[i].internal) {
                this.decayRate = this.gradeMapping[i].decayRate;
                return;
            }
        }
        this.decayRate = 125; // Default decay rate
    }
    
    // Get current combo size for TGM2 grading (1+ when combo active)
    getCurrentComboSize() {
        return this.currentCombo > 0 ? this.currentCombo : 1;
    }
    
    // Set game state for decay control
    setGameState(hasControl, hasActiveCombo) {
        this.hasControl = hasControl;
        this.activeComboMultiplier = hasActiveCombo;
        
        // Decay is active when player has control AND doesn't have active combo multiplier
        this.decayActive = hasControl && !hasActiveCombo;
    }
    
    // Get grade up animation state
    getGradeUpAnimationState() {
        if (this.gradeUpAnimationTimer < 1.0) {
            this.gradeUpAnimationTimer += 1/60; // 1 second animation
            return true; // Animation active
        }
        return false; // Animation complete
    }
    
    // Get current grade progress for UI display
    getGradeProgress() {
        return {
            internalGrade: this.internalGrade,
            displayedGrade: this.getDisplayedGrade(),
            gradePoints: this.gradePoints,
            pointsToNext: 100 - this.gradePoints,
            totalPoints: this.totalGradePoints,
            gradeUps: this.gradeUpsAchieved,
            decayRate: this.decayRate,
            comboSize: this.getCurrentComboSize()
        };
    }
    
    // Reset grading system for new game
    reset() {
        this.internalGrade = 0;
        this.gradePoints = 0;
        this.decayRate = 125;
        this.decayTimer = 0;
        this.decayActive = true;
        this.currentCombo = 0;
        this.lastClearWasSingle = false;
        this.level = 0;
        this.previousDisplayedGrade = '9';
        this.gradeUpAnimationTimer = 0;
        this.totalGradePoints = 0;
        this.gradeUpsAchieved = 0;
    }
    
    // Set level for level multiplier calculations
    setLevel(level) {
        this.level = level;
    }
    
    // Get grade value for comparison (higher = better)
    getGradeValue(grade) {
        const gradeValues = {
            '9': 0, '8': 1, '7': 2, '6': 3, '5': 4, '4': 5, '3': 6, '2': 7, '1': 8,
            'S1': 9, 'S2': 10, 'S3': 11, 'S4': 12, 'S5': 13, 'S6': 14, 'S7': 15, 'S8': 16, 'S9': 17,
            'M': 18, 'GM': 19
        };
        return gradeValues[grade] || 0;
    }
    
    // Debug method to force grade advancement (for testing)
    debugAdvanceGrade() {
        this.gradePoints += 100;
        while (this.gradePoints >= 100) {
            this.gradePoints -= 100;
            this.internalGrade++;
            this.gradeUpsAchieved++;
            this.updateDecayRate();
            this.decayTimer = 0;
        }
        this.previousDisplayedGrade = this.getDisplayedGrade();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TGM2GradingSystem };
}

// Make available globally for browser usage
if (typeof window !== 'undefined') {
    window.TGM2GradingSystem = TGM2GradingSystem;
}