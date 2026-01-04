**Line Clear Hanabi**

**Bravos:**  
Each bravo from 0-200 is worth exactly 6 hanabi. This is a simple \+6. There is no bravo multiplier bonus. The size of the combo or quality of the line clear does not change the reward. During the credits, bravos are not rewarded at all.

**Scoring:**  
Scoring is really simple\!\!\! Just multiply these 9 things together. ;) The product of this multiplication is truncated to produce the final hanabi awarded.

\-Base Line Clear Value  
\-Combo Bonus  
\-Fixed Speed Combo Bonus  
\-Split Bonus  
\-Lucky Level Bonus  
\-30 Second Bonus  
\-Variable Speed Combo Bonus  
\-Variable Finesse Bonus  
\-Spin Bonus

**Base Line Clear Bonus:**  
Throughout the whole game you receive the same base amount depending on your line clear. It shouldn't be possible, but if you somehow clear more than 4 lines simultaneously the game will treat that as a tetris.

Single \= 3F800000 \= 1.0  
Double \= 4039999A \= 2.9 (2.9000000953674316)  
Triple \= 40733333 \= 3.8 (3.799999952316284)  
Tetris \= 40966666 \= 4.7 (4.699999809265137)

It's worth noting that doubles give you the most points per line, by far.

**Combo Bonus:**  
This bonus behaves differently during the main game and the credits, so we will discuss both cases separately.

During the main game, the combo size increases according to the following rules. The baseline combo size is 0\. Singles maintain the existing combo size. Doubles or greater will increase it by 1 (before the scoring function is called). A piece that does not clear a line will reset the combo to the base size of 0\. Singles do not benefit from the combo bonus, even though they maintain the combo size. 9 is the practical limit for combos. If by some miracle you get a larger combo, the game will treat it as a 9 combo. The combo size determines the multiplier according to the following conversion.

0 \= n/a (no multiplication is done)  
1 \= 3F800000 \= 1.0  
2 \= 3FC00000 \= 1.5  
3 \= 3FF33333 \= 1.9 (1.899999976158142)  
4 \= 400CCCCD \= 2.2 (2.200000047683716)  
5 \= 4039999A \= 2.9 (2.9000000953674316)  
6 \= 40600000 \= 3.5  
7 \= 4079999A \= 3.9 (3.9000000953674316)  
8 \= 40866666 \= 4.2 (4.199999809265137)  
9 \= 40900000 \= 4.5

During the credits, the combo size does not change at all. Whatever combo size you're at when you hit level 200 is maintained throughout the entire credits regardless of how you clear lines. Also, singles *do* benefit from the combo multiplier during the credits, unlike 0-200. The multiplier is chosen differently than before. Firstly, the final combo size is converted to a number between 0 and 4 using the table below. If by some miracle you finish with a combo larger than 9, the game will treat it as a 9 combo.

0 \-\> 1  
1 \-\> 1  
2 \-\> 2  
3 \-\> 3  
4 \-\> 4  
5 \-\> 4  
6 \-\> 4  
7 \-\> 4  
8 \-\> 4  
9 \-\> 0

And secondly this new number determines the multiplier according to the following conversion.

0 \= 3F800000 \= 1.0  
1 \= 3FC00000 \= 1.5  
2 \= 3FF33333 \= 1.9 (1.899999976158142)  
3 \= 400CCCCD \= 2.2 (2.200000047683716)  
4 \= 4039999A \= 2.9 (2.9000000953674316)

If you are alert you will notice that reaching level 200 with a 9 combo gives you a multiplier of 1.0, while you get 2.9 for a combo between 4 and 8\. This is due to a programming error, and tests have confirmed that this is true and you should avoid a 9 combo at all costs for your final combo.

**Fixed Speed Combo Bonus:**  
This applies during the main game, even to singles, as well as the credits. Every time a Hanabi goes off in the combo stream (more on streams later), the game sets a frame counter to 100\. This counter is decremented every frame including the frame the counter is set to 100\. If the value is non-zero when you clear a line, you get the bonus. Basically, even if you break combo, as long as the Hanabi are still going or have only recently stopped, you will get this bonus.

 0 \= n/a (no multiplication is done)  
\>0 \= 3FA66666 \= 1.3 (1.2999999523162842)

**Split Bonus:**  
A split is when a piece clears lines in a non-contiguous way. Which is to say one or more rows are cleared, followed by one or more rows not cleared, followed by one or more rows cleared. All splits receive the same bonus.

No Split \= n/a (no multiplication is done)  
Split \= 3FB33333 \= 1.4 (1.399999976158142)

**Lucky Level Bonus:**  
If the level is 25, 50, 75, 125, 150, 175, or 199 before the line clear, then you receive this bonus.

Other \= n/a (no multiplication is done)  
Lucky \= 3FA66666 \= 1.3 (1.2999999523162842)

This bonus is awarded during the credits due to a programming error. The actual code for this takes the level after the line clear, and subtracts the line clear size. Because of this, singles during the credits will earn this bonus (200 \- 1 \= 199). A tetris at 199 will still get this bonus because the game has not fixed the level at 200 yet (203 \- 4 \= 199). This is a programming error because there is code that specifically checks to see if the level is 200, and to skip the bonus if that's the case. But because the game is always taking (200 \- lines), that branch is never ever executed.

**30 Second Bonus:**  
Every 30 seconds, the game checks to see if you've progressed at least 30 levels during that time. So you can earn this bonus at 0:30, 1:00, 1:30, etc. When this bonus is earned, then it will be applied to your next line clear whenever that happens. If you earn this bonus, and without clearing any lines earn this bonus again 30 seconds later, then you *won't* earn it doubly. You'll still just get it once on your next line clear. If you earn this bonus after the final line clear, which is possible because the timer only stops after the line clear animation, then it will give a bonus to the first (and only the first) line clear during the credits.

Normal \= n/a (no multiplication is done)  
Earned \= 3FB33333 \= 1.4 (1.399999976158142)

**Variable Speed Combo Bonus:**  
This is similar to the fixed speed combo bonus, except the bonus varies between 1.0 and 2.0. The multiplier is determined using the following formula.

(level \- frames) x 1/100  
Where 3C23D70A \= 1/100 (0.009999999776482582)  
   
Level is the level after the current line clear. Like the Lucky Level Bonus, the "level" for a tetris at 199 is 203\. However for the credits the level is fixed at 200\.

Frames is the number of frames since the previous line clear. So you more or less lose this bonus when you break combo. It sets the value to 0 at the end of ARE following a line clear. It starts counting with the spawn frame of the piece immediately following a line clear. It continues counting during ARE and continues until a line is cleared. The minimum value is 2 frames: 1 to spawn and 1 to lock.

If (level \- frames) \<= 100, no multiplication is done. So this bonus fades in from level 100 to 200, becoming most relevant for the final 0-200 combo and the credits.

It's worth noting that (level \- frames) is treated as a signed integer. If you know how signed integers work, you'll know that if you keep incrementing "frames" then it'll eventually go from a very large positive number to a very large negative number. If "frames" were a 16 bit signed integer it would take a little more than 9 minutes to do this, after which point (level \- large negative number) would give you a HUGE multiplier instead of being a negative number. Testing has confirmed that this exploit exists. However, since "frames" is actually a 32 bit number you would have to play for 400+ days straight in order for it to become negative. Because the game enters a kill mode after 15 minutes, this is impossible to exploit. But it very nearly was exploitable\! If only it had been 16 bits...

**Variable Finesse Bonus:**  
Similar to the previous bonus, except this bonus varies between 1.0 and 1.6666... The multiplier is determined using the following formula.

(level \- frames) x 1/120  
Where 3C088889 \= 1/120 (0.008333333767950535)  
   
Level is still the level after the line clear. Like the Lucky Level Bonus, the "level" for a tetris at 199 is 203\. However for the credits the level is fixed at 200\.

Frames is the number of frames the piece was active. So you always get this bonus, even when you break combo. The variable is set to 0 on the spawn frame, and incremented every frame thereafter until the piece locks. The minimum value is 1: simply 1 frame to lock (spawn frame is not included). Assuming you haven’t broken combo, the variable finesse bonus frame counter is always 1 less than the variable combo bonus frame counter.

If (level \- frames) \<= 120, no multiplication is done. So this bonus fades in from level 120 to 200, again becoming most relevant for the final 0-200 combo and the credits.

Unlike the previous bonus this one is not theoretically exploitable, because "frames" is 16 bits while (level \- frames) is still 32\. That means the frame counter rolls over from a mid sized positive number to 0\. With amazing timing you could in theory abuse this to clear lines with "frames" equal to 0 so that you get the maximum bonus, but in practice the gains are minimal and this is just trivia.

**Spin Bonus:**  
If the last movement of the piece was rotation, as opposed to gravity or left or right movement, then you can get this bonus. The O piece does not receive a spin bonus under any circumstances.

       Normal \= n/a (no multiplication done)  
         Spin \= 2 (actually adds the score to itself)  
       T-Spin \= 3.0  
T-Spin Triple \= 4.0

**Free Hanabi**  
 

**Completion Hanabi:**  
Completing the mode will earn you 24 additional Hanabi as the game congratulates you. This is always 24 regardless of the rest of the performance.

**Credit Roll Hanabi:**  
The credit roll lasts for 3265 frames, during which time fireworks will go off even while you don't clear lines. The rate at which they go off is determined by the performance from 0-200. A Hanabi will go off every x frames according to the following formula.

(3265 / Hanabi)

Where Hanabi is the amount of fireworks that you got playing 0-200, and the remainder is discarded. This calculation is done at the start of the credit roll and only includes Hanabi that have actually gone off. If you earned Hanabi that haven't been fully awarded yet, eg. a large combo as you hit 200, then the pending Hanabi are *not* added to your score prior to this calculation. They will, however, continue to go off during the credits, though by that point the Credit Roll Hanabi interval has already been calculated and will not change.

Below is a table that can be consulted to show how this reward works out in practice. "Hanabi" in this case refers to the minimum score required to reach that frame interval. Note that Hanabi of 0 or greater than 3265 will crash the game before the credits roll (not that this is possible without cheating). For low values of Hanabi the reward is quite smoothly double what you earned 0-200. However for high values of Hanabi there are distinct "tiers" of Credit Roll Hanabi, as it takes a lot to change the interval from, say, 6 to 5 frames. With these distinct tiers, if you just slightly meet the threshold the reward is significantly more than double. As you approach the next tier's threshold, the reward approaches double.

For reference, the best Easy records (as of WR 1770\) have just barely achieved frame interval of 6\.

| 0-200 Hanabi | Frame Interval | Free Hanabi |
| :---: | :---: | :---: |
| 1633 | 1 | 3265 |
| 1089 | 2 | 1632 |
| 817 | 3 | 1088 |
| 654 | 4 | 816 |
| 545 | 5 | 653 |
| 467 | 6 | 544 |
| 409 | 7 | 466 |
| 363 | 8 | 408 |
| 327 | 9 | 362 |
| 297 | 10 | 326 |
| 273 | 11 | 296 |
| 252 | 12 | 272 |
| 234 | 13 | 251 |
| 218 | 14 | 233 |
| 205 | 15 | 217 |
| 193 | 16 | 204 |
| 182 | 17 | 192 |
| 172 | 18 | 181 |
| 164 | 19 | 171 |
| 156 | 20 | 163 |
| 149 | 21 | 155 |
| 142 | 22 | 148 |
| 137 | 23 | 141 |
| 131 | 24 | 136 |
| 126 | 25 | 130 |
| 121 | 26 | 125 |
| 117 | 27 | 120 |
| 113 | 28 | 116 |
| 109 | 29 | 112 |
| 106 | 30 | 108 |
| 103 | 31 | 105 |
| 99 | 32 | 102 |
| 97 | 33 | 98 |
| 94 | 34 | 96 |
| 91 | 35 | 93 |
| 89 | 36 | 90 |
| 86 | 37 | 88 |
| 84 | 38 | 85 |
| 82 | 39 | 83 |
| 80 | 40 | 81 |
| 78 | 41 | 79 |
| 76 | 42 | 77 |
| 75 | 43 | 75 |
| 73 | 44 | 74 |
| 71 | 45 | 72 |
| 70 | 46 | 69 |
| 67 | 48 | 68 |
| 66 | 49 | 66 |
| 65 | 50 | 65 |
| 63 | 51 | 64 |
| 62 | 52 | 62 |
| ... | ... | ... |
| x | 3265/x | x |
| ... | ... | ... |
| 1 | 3265 | 1 |

The awarded Hanabi above is equal to the quotient of 3265 divided by the Hanabi interval. However, sometimes the amount received is actually 1 Hanabi greater than this quotient. This is because, for reasons further elaborated in the following section, the first Credit Roll Hanabi is not necessarily timed on the first frame of the credit roll. It ranges between the 1st frame and the (n \= interval size) nth frame. This \+1 effect is more commonly experienced when there is a remainder close to the frame interval. For example, 141 Hanabi gives an interval of 23 frames. 3265/23 gives a quotient of 141 with a remainder of 22\. So 22 times out of 23 there will be enough room to fit 142 Hanabi. Notably, for an interval of size 5 or 653 there is never any variation because the remainder is 0\.

**Hanabi Streams**

**Description:**  
Instead of points being awarded immediately in the way points typically are in scored games, Easy mode's Hanabi score truly represents the number of fireworks that have gone off. Because they aren't all set off at once, it takes a decent chunk of time to receive all the Hanabi you earn from large combos. Also, instead of there being a single queue of pending Hanabi, there are multiple streams that can award Hanabi in parallel. The streams and their respective Hanabi firing rates are as follows:  
   
Combo Stream (every 10 frames)  
Bravo Stream (every 10 frames)  
Free Hanabi Stream (every x frames as noted above)  
Completion Stream (always 24 Hanabi and the rate isn't significant as noted below)  
   
During the 0-200 you could have the Combo and Bravo streams going simultaneously, and during the credits you could have the Combo and Free Hanabi streams going simultaneously. Bravos aren't recognised during the credits, and the Completion stream comes after the credits.  
    
The timing of these streams is a little unusual. Rather than starting a fixed interval after the line clear, they go off a variable amount frames after a line clear. There is a certain logic to it, however. There appears to be a variable that increases every frame, not just for the particular game played (like the chronometer) but rather any frame while powered on. Then streams will fire hanabi on frames that are that frame counter mod(x), where x is the stream interval. This means, for example, that if the Free Hanabi interval is 20 and there are also Combo Hanabi going off, that they will go off in sync, with every second Combo Hanabi going off in time with a Free Hanabi.  
   
**Significance:**  
If you die, the game will continue to award Hanabi from the streams even as the Hanabi are being counted up to show your final score. Especially when dying during the credits you can have quite a few Hanabi backed up in the Combo stream. Knowing how the Hanabi flow will make a small but noticeable difference when you are predicting the final score. However, many deaths won't have any backlogged Hanabi streams and in those cases this information is useless. And if you complete the credits all pending Hanabi are added to the final score (the only time the score can increase without Hanabi actually being set off) which again makes this information useless.  
   
But\! There is a way in which the streaming significantly affects the score of an ideal performance and even shapes the ideal strategy. As noted previously, the Free Hanabi interval is determined by the amount of Hanabi that were awarded before the credits. That calculation ignores any pending Hanabi, so ideal play must manage the streams in a way that obtains the best Free Hanabi interval possible while also ending with at least a 4 combo. For this reason, World players might have an advantage because they can abuse infinity before the final line clear. 

**To-Do**  
   
This document is very detailed and well researched. It has been proven extremely accurate after real world testing, estimating the scores accurately. Nevertheless, here are some minor details in need of clarification, should I ever get bored some time:

\-(Hanabi Streams) exactly how many frames are there for streaming between reaching 200 and the interval calculation?  
\-(Hanabi Streams) for how many frames does streaming continue after death?  
\-(Hanabi Streams) how soon after a line clear can a combo/bravo stream Hanabi appear?  
\-(Hanabi Streams) do completion/bravo stream Hanabi also go off with modulus timing?  
\-(Line Clear Hanabi) if you earn a 30 second bonus on the frame you clear a line, what happens?  
                     order of operations matter:  
                     clear line \-\> calculate hanabi \-\> erase 30s bonus flag \= only get one bonus