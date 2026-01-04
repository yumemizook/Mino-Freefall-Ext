== Scoring ==

Like ''TGM'', points are only awarded when the player completes line clears. A bonus for using sonic drop is new to the scoring formula. ''The Absolute Plus'' also changes the scoring system, adding a reward for fast play among other changes. The formulas are:

: ''TA'': <math>\text{Score} = (\left\lceil ( \text{Level} + \text{Lines} ) / 4 \right\rceil + \text{Soft} + (2 \times \text{Sonic} )) \times \text{Lines} \times \text{Combo} \times \text{Bravo}</math>
: ''TAP'': <math>\text {Score} = (\left\lceil ( \text{Level} + \text{Lines} ) / 4 \right\rceil + \text{Soft} + (2 \times \text{Sonic} )) \times \text{Lines} \times \text{Combo} \times \text{Bravo} + \left\lceil (\text{Level After Clear} ) / 2 \right\rceil + ( \text{Speed} \times 7 )</math>

Where:
* <math>\left\lceil \cdot \right\rceil</math> is the ceiling function (i.e. the contents are rounded up).
* Level is the level just before the line clear.
* Lines is the number of lines you just cleared.
* Level After Clear is is the level just after the line clear. This is different from <math>(\text {Level} + \text {Lines})</math> for edge cases like reaching 300 in Normal mode, 500 when being [[Torikan|torikan-stopped]] in Death mode, and reaching 999 otherwise.
* Soft is the cumulative number of frames during which Down was held during the piece's active time. Note that this means manually locking pieces already on the ground will increase the Soft value by 1.
* Sonic is the number of rows covered by the single greatest sonic drop during the piece's active time. Note that this is non-cumulative.
* If the previous piece cleared no lines, Combo is reset to 1. This calculation is done before the score calculation:
*: <math>\text{Combo} = \text{Previous Combo Value} + (2 \times \text{Lines}) - 2</math>
*: Example: A double-triple-single combo will have combo values 3, 7, and 7 respectively.
* Bravo is equal to 4 if this line clear resulted in a [[perfect clear]], otherwise it is 1.
* Speed can be no less than 0, and is otherwise equal to:
*: <math>\text{Speed} = \text{Lock Delay} - \text{Active Time}</math>
*: where Lock Delay is the number of frames of lock delay given out for that particular level, and Active Time is the number of frames the piece was active (which is a minimum of 1).

Normal mode multiplies line clear scores by 6 and the player is given a time bonus of <math>1253 \times \text{max}\left(0,\left\lceil 300 - \text{Seconds} \right\rceil\right)</math> where Seconds is the clear time in seconds.
