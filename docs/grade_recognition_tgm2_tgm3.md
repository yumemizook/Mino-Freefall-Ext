# Grade Recognition in TGM2 and TGM3

This document summarizes how grades are awarded, advanced, and finalized in TGM2 (TAP) and TGM3 (Ti) within Mino Freefall, based on the arcade behaviors the implementation approximates.

## TGM2 (TAP)

### Modes
- **Normal** (grade stops at S9; clear results shown, no GM).
- **Master** (TAP): full internal grade ladder to GM.
- **T.A. Death**: fast mode with its own grade table to GM.

### Internal Grade System
- Grades progress through numeric ranks (9→1), then S1→S9, then M/MK/… up to GM (exact label set differs by mode).
- Grade points accrue per piece/line clear; a decay timer periodically removes points. When enough points surpass the current grade threshold, the visible grade steps up.
- Combos and Tetrises yield larger point bonuses; singles are minimal.
- In T.A. Death the thresholds and decay are more stringent.

### Section/Performance Effects
- **Master**: No COOL/REGRET system; sections are timed for informational splits only. Grade is primarily from internal points + line clears.
- **Normal**: Caps at S9; performance determines clear vs. “Failed” ending, but not higher than S9.

### Torikan / Cuts
- **T.A. Death**: 500 torikan (3:25). Failing stops the run and freezes grade.
- **Master**: No torikan in TAP; run continues to 999.

### Staff Roll Impact
- Surviving the roll (disappearing blocks) finalizes the grade; topping out early can lock in a lower grade depending on implementation.

## TGM3 (Ti)

### Modes with Grades
- **Master (Ti)**: full Ti grading with COOL/REGRET and staff-roll grading to GM/M.
- **Shirase (Ti)**: section grades S1–S13 (no TAP-style internal ladder); REGRET per section; roll completion noted via line color.
- Other modes (e.g., Sakura/Time Attack) generally do not use the Ti grade ladder.

### Master: COOL/REGRET & Internal Grade
- **Internal grade**: Similar to TAP’s point-and-decay ladder but reordered thresholds; 18 internal grades accumulated during play.
- **COOL**: Earned if section (0–99, 100–199, …) hits time targets (e.g., 0–70 under ~52s). Awards +1 grade boost and +100 internal level (affects speed phase).
- **REGRET**: If a section exceeds its time threshold (e.g., >1:30 early; stricter later), removes one boost. Can cap progression to GM if too many REGRETs.
- **Displayed grade**: Combines internal grade + boosts and is shown at the end (hidden during play in Ti).

### Shirase: Section Grades
- Each 100-level section awards S1…S13 upon completion.
- **REGRET**: Section time slower than threshold (first two sections >60s, remaining >50s) downgrades that section’s grade.
- No TAP-style internal ladder; the run’s success is shown via section grades and roll completion indication.

### Torikan (Time Cuts)
- **Master (Ti)**: Torikan at level 500 (7:00). Failing stops the run and freezes grade.
- **Shirase (Ti)**: Torikan at 500 and 1000 (Classic: 2:28/4:56; World: 3:03/6:06). Failing assigns S5/S10 respectively and ends run.

### Staff Roll & Final Grade (Master)
- Roll type depends on performance: **fading** (disappearing) or **m-roll** (invisible). Survival and lines cleared contribute a roll bonus to the final grade.
- Final grade = internal grade + COOL boosts − REGRET penalties + roll bonus. GM requires sufficient grade plus survival criteria.

### Monochrome/Big-Roll Notes (Shirase)
- At 1000+: pieces/queue use monochrome blocks; garbage disabled.
- At 1300: big-block roll; completion indicated via grade line color (orange on clear, green on reach).

## Reference Files in Repo
- `docs/tgm3_modes.md`: Timing tables, torikan values, section rules, monochrome/big roll notes.
- `docs/credits_rolls.md`: Roll behaviors per mode.
- `modes/modes/TGM3Mode.js`: Ti Master logic (COOL/REGRET, internal grade handling).
- `modes/modes/TGM3ShiraseMode.js`: Shirase timings, section grading, torikan, monochrome flags.
- `game.js`: Runtime hooks for torikan enforcement, roll start, monochrome activation, and grade/roll visuals.
