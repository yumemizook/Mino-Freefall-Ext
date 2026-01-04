== Game modes ==

=== Normal ===
Normal mode plays similarly to Master mode in gravity and speed timings, but ends at level 300. At levels 100 and 200, an item block is given to the player. "Free Fall," which eliminates all holes, is given at 100. "Del Even," which clears every other row throughout the field is given at 200. The credit roll challenge is a slow 20G, but playing through it is not required for a "clear". See [[#Scoring|scoring]] below for how score is calculated in this mode.

==== Speed timings ====
The unit for [[gravity]] is [[Glossary#G|G]] (rows per frame), as a [http://en.wikipedia.org/wiki/Fixed-point_arithmetic fraction with a constant denominator] of 256. This means '''G = Internal Gravity/256'''. For example, at levels 90 through 99, the gravity is 64/256G, or 1/4G.
{| border="2" cellpadding="2" cellspacing="0" style="margin-top:1em; margin-bottom:1em; background:#f9f9f9; border:3px #999999 solid; border-collapse:collapse;"
|+'''Internal Gravity'''
!bgcolor="#80A3F8"|Level||bgcolor="#BBBBBB"|Internal Gravity<br>(1/256 G)||bgcolor="#80A3F8"|Level||bgcolor="#BBBBBB"|Internal Gravity<br>(1/256 G)
|-align = center
|bgcolor="#C4E8E8"|0||4||bgcolor="#C4E8E8"|149||48
|-align = center
|bgcolor="#C4E8E8"|8||5||bgcolor="#C4E8E8"|156||80
|-align = center
|bgcolor="#C4E8E8"|19||6||bgcolor="#C4E8E8"|164||112
|-align = center
|bgcolor="#C4E8E8"|35||8||bgcolor="#C4E8E8"|174||128
|-align = center
|bgcolor="#C4E8E8"|40||10||bgcolor="#C4E8E8"|180||144
|-align = center
|bgcolor="#C4E8E8"|50||12||bgcolor="#C4E8E8"|200||16
|-align = center
|bgcolor="#C4E8E8"|60||16||bgcolor="#C4E8E8"|212||48
|-align = center
|bgcolor="#C4E8E8"|70||32||bgcolor="#C4E8E8"|221||80
|-align = center
|bgcolor="#C4E8E8"|80||48||bgcolor="#C4E8E8"|232||112
|-align = center
|bgcolor="#C4E8E8"|90||64||bgcolor="#C4E8E8"|244||144
|-align = center
|bgcolor="#C4E8E8"|100||4||bgcolor="#C4E8E8"|256||176
|-align = center
|bgcolor="#C4E8E8"|108||5||bgcolor="#C4E8E8"|267||192
|-align = center
|bgcolor="#C4E8E8"|119||6||bgcolor="#C4E8E8"|277||208
|-align = center
|bgcolor="#C4E8E8"|125||8||bgcolor="#C4E8E8"|287||224
|-align = center
|bgcolor="#C4E8E8"|131||12||bgcolor="#C4E8E8"|295||240
|-align = center
|bgcolor="#C4E8E8"|139||32||bgcolor="#C4E8E8"|300||5120 (20G)
|}

{| border="2" cellpadding="2" cellspacing="0" style="margin-top:1em; margin-bottom:1em; background:#f9f9f9; border:3px #999999 solid; border-collapse:collapse;"
|+'''Delays'''{{efn|
RAM Locations:
*06064BF1: Current internal speed value (16-bit)
*06064BE0: Current Lock Delay value
*06064BE1: DAS counter}}{{efn|name=das|
The following timing values are adjusted to what a player would observe, including inclusive DAS counting (internally DAS delay is counted exclusively and ARE excludes lock flash and the last frame).}}
! bgcolor="#80A3F8"|Level
! bgcolor="#FFA069"|[[ARE]]<br>(frames)
! bgcolor="#FFFF55"|[[DAS]]<br>(frames)
! bgcolor="#CC88FF"|[[Lock delay|Lock]]<br>(frames)
! bgcolor="#66BB55"|[[Line clear]]<br>(frames)
|- align = center
| bgcolor="#C4E8E8"|000 - 300 || bgcolor="#FFD3AC"|27 || bgcolor="#FFFF88"|16 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|40
|}

=== Master ===
Master mode is [[Arika]]'s evolution of the original ''[[Tetris The Grand Master]]'' gameplay. In ''TGM'' the speed timings remain the same for the entire length of the game. New to ''The Absolute'' are shrinking delays that speed up the game after level 500. The length of the game remains the same, with players trying to complete 999 levels.

==== Speed timings ====
{| border="2" cellpadding="2" cellspacing="0" style="margin-top:1em; margin-bottom:1em; background:#f9f9f9; border:3px #999999 solid; border-collapse:collapse;"
|+'''Internal Gravity'''<ref>http://www.tetrisconcept.com/forum/viewtopic.php?p=11130#11130</ref>
!bgcolor="#80A3F8"|Level||bgcolor="#BBBBBB"|Internal Gravity<br>(1/256 G)||bgcolor="#80A3F8"|Level||bgcolor="#BBBBBB"|Internal Gravity<br>(1/256 G)
|-align = center
|bgcolor="#C4E8E8"|0||4||bgcolor="#C4E8E8"|220||32
|-align = center
|bgcolor="#C4E8E8"|30||6||bgcolor="#C4E8E8"|230||64
|-align = center
|bgcolor="#C4E8E8"|35||8||bgcolor="#C4E8E8"|233||96
|-align = center
|bgcolor="#C4E8E8"|40||10||bgcolor="#C4E8E8"|236||128
|-align = center
|bgcolor="#C4E8E8"|50||12||bgcolor="#C4E8E8"|239||160
|-align = center
|bgcolor="#C4E8E8"|60||16||bgcolor="#C4E8E8"|243||192
|-align = center
|bgcolor="#C4E8E8"|70||32||bgcolor="#C4E8E8"|247||224
|-align = center
|bgcolor="#C4E8E8"|80||48||bgcolor="#C4E8E8"|251||256 (1G)
|-align = center
|bgcolor="#C4E8E8"|90||64||bgcolor="#C4E8E8"|300||512 (2G)
|-align = center
|bgcolor="#C4E8E8"|100||80||bgcolor="#C4E8E8"|330||768 (3G)
|-align = center
|bgcolor="#C4E8E8"|120||96||bgcolor="#C4E8E8"|360||1024 (4G)
|-align = center
|bgcolor="#C4E8E8"|140||112||bgcolor="#C4E8E8"|400||1280 (5G)
|-align = center
|bgcolor="#C4E8E8"|160||128||bgcolor="#C4E8E8"|420||1024 (4G)
|-align = center
|bgcolor="#C4E8E8"|170||144||bgcolor="#C4E8E8"|450||768 (3G)
|-align = center
|bgcolor="#C4E8E8"|200||4||bgcolor="#C4E8E8"|500||5120 (20G)
|}

{| border="2" cellpadding="2" cellspacing="0" style="margin-top:1em; margin-bottom:1em; background:#f9f9f9; border:3px #999999 solid; border-collapse:collapse;"
|+'''Delays'''{{efn|name=das}}
! bgcolor="#80A3F8"|Level
! bgcolor="#FFA069"|[[ARE]]<br>(frames)
! bgcolor="#FFB069"|Line [[ARE]]<br>(frames)
! bgcolor="#FFFF55"|[[DAS]]<br>(frames)
! bgcolor="#CC88FF"|[[Lock delay|Lock]]<br>(frames)
! bgcolor="#66BB55"|[[Line clear]]<br>(frames)
|- align = center
| bgcolor="#C4E8E8"|000 - 499 || bgcolor="#FFD3AC"| 27 || bgcolor="#FFE3AC"| 27 || bgcolor="#FFFF88"|16 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|40
|- align = center
| bgcolor="#C4E8E8"|500 - 600 || bgcolor="#FFD3AC"| 27 || bgcolor="#FFE3AC"| 27 || bgcolor="#FFFF88"|10 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|25
|- align = center
| bgcolor="#C4E8E8"|601 - 700 || bgcolor="#FFD3AC"| 27 || bgcolor="#FFE3AC"| 18 || bgcolor="#FFFF88"|10 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|16
|- align = center
| bgcolor="#C4E8E8"|701 - 800 || bgcolor="#FFD3AC"| 18 || bgcolor="#FFE3AC"| 14 || bgcolor="#FFFF88"|10 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|12
|- align = center
| bgcolor="#C4E8E8"|801 - 900 || bgcolor="#FFD3AC"| 14 || bgcolor="#FFE3AC"| 8 || bgcolor="#FFFF88"|10 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|6
|- align = center
| bgcolor="#C4E8E8"|901 - 999 || bgcolor="#FFD3AC"| 14 || bgcolor="#FFE3AC"| 8 || bgcolor="#FFFF88"|8 || bgcolor="#CCBBFF"|17 || bgcolor="#D7ECC6"|6
|}

Line ARE defines the number of frames of ARE to use after a line clear. The player's DAS charge is unmodified during line clear delay, the first frame of "lock flash" that occurs during the beginning of ARE without a line clear, and one frame of level-increment delay a little before the next piece spawns, and the frame a piece spawns.


==== Credit roll ====
{{See also|Grade Recognition System#Credit roll}}
If a player completes 999 levels, the playfield is cleared, and a new challenge starts, with the credits rolling behind the stack. There are two credit rolls in ''The Absolute PLUS'', the Fading Roll, and the M-Roll. The Fading Roll is a 1 minute challenge, where pieces in the stack will fade out four seconds after locking. If a player clears the Fading Roll, their rank will be underlined with an orange line, which ranks above green lines, or players who did not clear the Fading Roll with the same grade, regardless of completion time.

If the player unlocks the M-Roll, they are met with an invisible challenge. Pieces turn invisible as soon as they lock down. If the player fails to clear, they are awarded the M grade. If the player clears the M-Roll with less than 32 line clears, they are awarded a Green line GM grade. Surviving the M-Roll with 32 or more line clears will award the player an Orange line GM, the highest possible grade.

=== TGM+ ===
<div style="float: right; margin-left: 1em; margin-bottom: 1em;">
<playfield>
(G denotes gray garbage blocks, . denotes holes)
.GGGGGGGGG
.GGGGGGGGG
.GGGGGGGGG
.GGGGGGGGG
GGGGGGGGG.
GGGGGGGGG.
GGGGGGGGG.
GGGGGGGGG.
..GGGGGGGG
.GGGGGGGGG
.GGGGGGGGG
GGGGGGGG..
GGGGGGGGG.
GGGGGGGGG.
GG.GGGGGGG
G..GGGGGGG
G.GGGGGGGG
GGGGGGG.GG
GGGGGGG..G
GGGGGGGG.G
GGGG..GGGG
GGGG..GGGG
GGGG.GGGGG
GGG...GGGG
</playfield></div>TGM+ is a rising garbage mode, similar to Sega's ''[[Bloxeed]]''. Players must dig through to survive as they progress through the 999 levels. This mode has speed timings similar to ''TGM''. An internal counter is incremented every time a tetromino is locked down without clearing lines; once this counter reaches <math>13 - \left \lfloor \text {level} / 100 \right \rfloor</math>, a row of garbage rises from the floor of the playfield, and the counter resets.{{efn|RAM Locations:
*06064C30: Number of tetrominoes played without line clears
*06064C31: Position in garbage sequence}} The garbage follows the fixed pattern shown here, looping every 24 rows.

Unlike other modes, TGM+ has no grades, medals, or ranking. A credit roll is played upon reaching level 999, but similarly to ''TGM'', it is not neccessary to survive the credit roll. After the credit roll, an "Excellent!" message is displayed.

Gravity is the same as Master mode, while speed timings are the same as Normal mode.

=== T.A. Death ===
In T.A. Death, gravity is fixed at 20G for the entirety of the game. Combined with increased speed timings, it is one of the most difficult modes to complete in the series.

==== Ranking ====
Only two grades are achievable: M and Gm. The conditions are: 
* The player must reach level 500 under (or equal to) 3:25:00, the M grade is given and the game will continue to 999.
* Gm is awarded at 999 regardless of time or score. The game continues through the credits, with no effect when playing on or blocking out.

Because of a [[torikan]], if the player reaches level 500 with a time greater than 3:25:00, the timer will stop and the credits will roll. The player is given an "Excellent!" but no grade.

==== Speed timings ====
Though Death mode has a fixed gravity of 20G, there are 4 other timings that shape the flow and speed of play.

{| border="2" cellpadding="2" cellspacing="0" style="margin-top:1em; margin-bottom:1em; background:#f9f9f9; border:3px #999999 solid; border-collapse:collapse;"
|+'''Delays'''{{efn|name=das}}
! bgcolor="#80A3F8"|Level
! bgcolor="#FFA069"|[[ARE]]<br>(frames)
! bgcolor="#FFB069"|Line [[ARE]]<br>(frames)
! bgcolor="#FFFF55"|[[DAS]]<br>(frames)
! bgcolor="#CC88FF"|[[Lock delay|Lock]]<br>(frames)
! bgcolor="#66BB55"|[[Line clear]]<br>(frames)
|- align = center
| bgcolor="#C4E8E8"|000 - 099 || bgcolor="#FFD3AC"|18 || bgcolor="#FFE3AC"| 14 || bgcolor="#FFFF88"|12 || bgcolor="#CCBBFF"|30 || bgcolor="#D7ECC6"|12
|- align = center
| bgcolor="#C4E8E8"|100 - 199 || bgcolor="#FFD3AC"|14 || bgcolor="#FFE3AC"| 8 || bgcolor="#FFFF88"|12 || bgcolor="#CCBBFF"|26 || bgcolor="#D7ECC6"|6
|- align = center
| bgcolor="#C4E8E8"|200 - 299 || bgcolor="#FFD3AC"|14 || bgcolor="#FFE3AC"| 8 || bgcolor="#FFFF88"|11 || bgcolor="#CCBBFF"|22 || bgcolor="#D7ECC6"|6
|- align = center
| bgcolor="#C4E8E8"|300 - 399 || bgcolor="#FFD3AC"| 8 || bgcolor="#FFE3AC"| 8 || bgcolor="#FFFF88"|10 || bgcolor="#CCBBFF"|18 || bgcolor="#D7ECC6"|6
|- align = center
| bgcolor="#C4E8E8"|400 - 499 || bgcolor="#FFD3AC"| 7 || bgcolor="#FFE3AC"| 7 || bgcolor="#FFFF88"|8 || bgcolor="#CCBBFF"|15 || bgcolor="#D7ECC6"|5
|- align = center
| bgcolor="#C4E8E8"|500 - 999 || bgcolor="#FFD3AC"| 6 || bgcolor="#FFE3AC"| 6 || bgcolor="#FFFF88"|8 || bgcolor="#CCBBFF"|15 || bgcolor="#D7ECC6"|4
|}

As a result of these timings, there is no time penalty for clearing singles instead of Tetrises from level 100&ndash;299 8+6=14). As these values decrease, the options for piece placement gradually reduce, becoming a subset of what was once possible in regular 20G.