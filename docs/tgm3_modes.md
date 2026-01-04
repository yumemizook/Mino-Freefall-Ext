# TGM3 Master & Shirase Modes

This document summarizes how the Ti (TGM3) Master and Shirase modes work in Mino Freefall, including speed curves, grading, and special mechanics implemented or approximated in the codebase.

## Master Mode (TGM3)

### Speed / Gravity
- Uses the Ti Master gravity table (see `tgm3modes.md`, internal gravity in 1/65536 G units).
- Gravity is applied via `gameMode.getGravitySpeed(internalLevel)`, where `internalLevel` can be boosted by COOLs (+100).
- ARE/Line ARE, DAS, lock delay, and line clear delays follow Ti timing tables by speed level (see doc table).

### Leveling
- Level increases by piece (default +1) and adds bonuses on line clears: +1 for triples, +2 for tetrises (applied here across Master/Shirase). Stops at level 999.
- Section COOl/REGRET system advances internal level by +100 on COOL (affects speed phase).

### COOL / REGRET
- Section COOL if *70 reached under time thresholds per section (e.g., 0-70 in 52s, etc.).
- Section REGRET if section exceeds thresholds (e.g., 0-99 >1:30, etc.).
- COOL gives +1 grade (as a boost) and +100 internal level; REGRET removes one boost.

### Grading (TGM3 Master)
- Invisible during play; displayed at game end.
- Components:
  1. Internal grade system (TAP-like, 18 internal grades, combo multipliers reordered from TAP).
  2. Section COOL/REGRET modifiers (+1 or -1 grade boost).
  3. Staff roll grade (disappearing or invisible roll) adds fractional grade; survival adds bonus.
- Grade displayed as TAP-style (9→S9→m→Master) then Master ranks.
- COOL/REGRET and internal grade caps gating to reach GM.

### Torikan
- Time cutoffs: level 500 at 7:00; if failed during exams, game stops at 500. (Code also handles torikan staged fail UI.)

### Staff Roll
- If GM path: fading or invisible roll; grading includes roll lines. Roll bonus contributes to final grade. Credits BGM and roll visuals apply.

## Shirase Mode (TGM3)

### Speed / Gravity
- Fixed 20G gravity.
- Delays (frames at 60fps):
  - 000-099: ARE 12, LineARE 8, DAS 10, Lock 18, Line clear 6
  - 100-199: ARE 12, LineARE 7, DAS 8, Lock 18, Line clear 5
  - 200-299: ARE 12, LineARE 6, DAS 8, Lock 17, Line clear 4
  - 300-499: ARE 6,  LineARE 6, DAS 8, Lock 15, Line clear 4
  - 500-599: ARE 6,  LineARE 5, DAS 6, Lock 13, Line clear 3
  - 600-1099: ARE 6, LineARE 5, DAS 6, Lock 12, Line clear 3
  - 1100-1199: ARE 6, LineARE 5, DAS 6, Lock 10, Line clear 3
  - 1200-1299: ARE 6, LineARE 5, DAS 6, Lock 8,  Line clear 3
  - 1300: ARE 6, LineARE 6, DAS 6, Lock 15, Line clear 6 (big roll)

### Leveling & Torikan
- Level to 1300. Torikan at 500 (2:28 Classic / 3:03 World) and 1000 (4:56 Classic / 6:06 World). Fail awards S5/S10 and ends run.
- Level advance uses +1/+2 bonuses for triple/tetris (like Master).

### Grading (Section-based)
- Grade awarded per section cleared: S1..S13 (one per 100 levels).
- Section REGRET if section time exceeds 60s (first two) or 50s (remaining 11); each REGRET deducts one section grade.

### Rising Garbage (500-999)
- Garbage counter: +1 per piece spawn, -1 per line clear (clamped ≥0), never resets between sections.
- Section quotas: 20 (500-599), 18 (600-699), 10 (700-799), 9 (800-899), 8 (900-999).
- If counter >= quota during ARE, clone bottom row as garbage and reset counter to 0. Disabled at 1000+.

### Monochrome Blocks (1000-1299)
- All pieces and previews generated after level 1000 use monochrome textures: `img/mono.png` (SRS) or `img/monoARS.png` (ARS).
- Queue entries present before 1000 keep their old textures; only newly generated entries get monochrome keys.
- Stack rendering uses mono textures with white tint; ARS/SRS share the same monochrome tint.

### Big Roll (1300)
- 20G continues; pieces rendered at 2x cell size (big blocks).
- Uses 1300 timing row above.

### Monochrome Roll Visuals
- Monochrome stays active through 1299; stack garbage disabled after 1000.

## Shared / Cross-cutting Mechanics
- Line-advance bonuses (+1 triple, +2 tetris) active for Master and Shirase (not Easy/Sakura).
- Ghost/hold/preview counts follow mode configs (Master: 3 previews, hold enabled; Shirase: 3 previews, hold enabled).
- Input system supports IRS/IHS and DAS/ARR per mode timing.

## File Pointers
- Speed/torikan tables: `tgm3modes.md` (docs), `modes/modes/TGM3ShiraseMode.js` for Shirase timings, `modes/modes/TGM3Mode.js` for Master timings and COOL/REGRET logic.
- Game scene hooks: `game.js` (monochrome activation at level 1000, garbage quota, big blocks at 1300, torikan staged fail, queue texture tagging after 1000).

## Notes / Approximations
- Master grading is approximated to TAP + Ti COOL/REGRET and staff roll bonuses; invisible grade display remains end-of-game.
- Shirase uses section grades S1..S13 with REGRET deductions; no internal grade system.
- Monochrome tint unified to white for both SRS/ARS to match provided assets; explosions suppressed by using texture swap.
