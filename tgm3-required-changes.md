# TGM3 mode parity: required changes

This document summarizes the gaps between the documented **TGM3** behaviors (in `tgm3modes.md`) and the current implementations in `modes/modes/*.js`, and outlines concrete changes needed to reach closer parity.

## Master (`TGM3Mode`)
Current: timing phases and COOL/REGRET hooks exist, grading/roll/timing systems incomplete (@modes/modes/TGM3Mode.js#1-178).

Tasks:
1) Grade system: mirror TAP/Ti internal grade points, combo table, level multipliers; display grade/points during play shifted down 80px to avoid hold box; follow `tgm3modes.md` for COOL/REGRET and staff-roll modifiers.
2) Section COOL/REGRET: trigger at *70/*99 with time thresholds per doc; apply +100 internal level (separate from displayed level) for COOL, -1 internal grade for REGRET; show indicators.
3) Torikan: enforce level 500 stop if time >7:00 (Classic); award S5 on fail; allow normal progression otherwise; invisible roll unlock per doc (all COOLs + internal grade ≥ requirement).
4) Staff roll: implement disappearing and invisible rolls with grade bonuses per lines/clear; use TGM2/Ti behavior; follow doc unlock criteria.
5) Speed ramp: allow performance-driven early 20G via internal level (COOL bonus) instead of fixed phases only.

## Shirase (`TGM3ShiraseMode`)
Current: fixed 20G timings, torikan times in config, section grades S1–S13, gameplay hooks incomplete (@modes/modes/TGM3ShiraseMode.js#1-90).

Tasks:
1) Garbage quota (500–999): quota +=1 per piece, -=1 per line clear, clamp ≥0, never resets; when quota >0, clone bottom row as gray garbage (ARS/SRS colors unaffected); disable quota at 1000+.
2) Monochrome 1000–1299: use `img/mono.png` for SRS, `img/monoARS.png` for ARS; suppress explosion effects.
3) Big roll: pieces 4× size (2×2 blocks), use level-1300 timings already in mode file.
4) Torikan: enforce stops at 500/1000 (Classic/World thresholds per doc); on fail, halt music/SFX and inputs, play stack fade, show “Excellent... but let’s go better next time” after 1s, show GAME OVER after 5s, return to main menu 10s later; award S5 (500 fail) or S10 (1000 fail) assuming no REGRET deductions.
5) Section REGRET thresholds: use doc thresholds (≤60s early, 50s later); apply grade deduction; no quota reset.
6) Secret grade handling: ensure consistent with base engine (if absent, add).

## Easy (`TGM3EasyMode`)
Current: custom gravity, hanabi approximation, credit roll stream, level cap 200, section stops, combo scoring (@modes/modes/TGM3EasyMode.js#1-269).

Tasks:
1) Scoring: replace with official rules from `Easy's Scoring.md` (main + credit roll) with safety checks; reuse same hanabi calc during credits.
2) Hints: outlines already correct for first 100 levels; keep ghost always on.
3) Level advance: retain current behavior; line-advance bonuses not used.

## Sakura (`TGM3SakuraMode`)
Current: 20 main + 7 EX stages, fixed sequence, timers, effects, skip penalty, hold clobber (@modes/modes/TGM3SakuraMode.js#1-586).

Tasks:
1) EX gating: 3/5/7 EX stages based on main clear speed (≤5:00 for 7); track best stage reached (1–20, EX1–EX7, ALL).
2) Clear %: failed and skipped weigh the same; track time and best stage for menu display.
3) Items/effects:
   - X-ray: stack invisible during sweep and 1s cooldown; reveal 2 frames/column left→right; ghost visible.
   - Mirror: mirror stack during ARE.
   - Strobe: per-mino alpha 25%–100%, 0.5s cycle, offsets per mino; does not affect active piece or ghost.
   - Big block: 2×2 blocks; movement/rotation same as normal; ghost scaled; no timing changes.
4) Skip rule: disallow skip when total timer <30s.

## Cross-cutting
- Classic/World rotations left as-is; torikan thresholds per doc; buffer zone remains current (4-row buffer).
- Apply line-advance bonuses (+1 triple, +2 Tetris) only to Master and Shirase; not to Easy or Sakura.
- Use proper asset paths for monochrome blocks (`img/mono.png`, `img/monoARS.png`).
- Keep changes lint-clean: prefer existing helpers, avoid unused vars/imports, reuse constants where possible.
