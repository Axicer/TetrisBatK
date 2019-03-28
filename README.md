
# Tetris® School

![Image of Tetris® School](https://github.com/Axicer/TetrisBatK/raw/master/res/icons/logo.png)
__Tetris® School__ is a student project for the computer science department of the __UIT of Montpellier/Sète__ !

## Controls

Controls are the same as what __The Tetris Company__ recommanded in the latest online guideline:

- Up arrow and X are to rotate 90° clockwise.
- Space to hard drop.
- Shift and C are to hold.
- Ctrl and Z are to rotate 90° counterclockwise.
- Esc and F1 are to pause.
- Left, right, and down arrows are left shift, right shift, and non-locking soft drop respectively.
- Number pad controls:
    - 0 is to hold.
    - 8, 4, 6, and 2 are hard drop, left shift, right shift, and non-locking soft drop respectively.
    - 1, 5, and 9 are to rotate 90° clockwise.
    - 3 and 7 are to rotate 90° counterclockwise.

For more informations, have a look at <https://tetris.fandom.com/wiki/Tetris_Guideline>.

## Tetris® guideline

__Tetris® School__ is following the official Tetris® guideline.  
This means that __Tetris® School__ uses:

- The Super Rotation System (SRS) <https://tetris.fandom.com/wiki/SRS>
- Tetrominos colors and shapes
- Standard mappings for computer keyboards
- 7-bag Random Generator <https://tetris.fandom.com/wiki/Random_Generator>
- Hold piece <https://tetris.fandom.com/wiki/Hold_piece>
- Default sound effects
- Ghost piece function <https://tetris.fandom.com/wiki/Ghost_piece>
- A variant of Roger Dean's Tetris logo
- Half second lock delay <https://tetris.fandom.com/wiki/Lock_delay>
- Scoring system <https://tetris.fandom.com/wiki/Scoring>
- DAS system <https://tetris.fandom.com/wiki/DAS>
- etc..

 For more details, please look at the official guideline <https://tetris.fandom.com/wiki/Tetris_Guideline>

## How it works
The game is composed of __2__  canvas align one on top of the other and a game script:
- __tetrominos canvas__ which contains the falling tetrominos
- __voxel canvas__ which contain all the voxels already fallen

The tetrominos scripts where all operations on the tetrominos canvas is done (__rotation__, __wall kicks__, __DAS__).
It also contains manage __death detection__, __scoring script__, __tetrominos randomizer__ and __hold and ghost piece__.

The voxel canvas manage __line clear__, __voxel display__ and background.

game script manage all the canvases and make the link between each parts of the game. 

Math folder contains __rotation kick algorithm__ and __matrix rotation system__.

Util folder contains __keyboard handler__ for __DAS__, and __Loader script__ for the __"before game" loading screen__.

And finally the controller is __starting all the business__ and manage the __legal notice screen__.

## Legal copyrights
Tetris ® & © 1985~2019 Tetris Holding, LLC.  
Tetris logo, Tetris theme song and Tetriminos are trademarks of Tetris Holding, LLC.  
Licensed to The Tetris Company.  
Game Design by Alexey Pajitnov.  
Logo Design by Roger Dean.  
All Rights Reserved.  

"Bulky Pixels" font designed by Smoking Drum (www.smokingdrum.com).  
"Kernel Panic NBP" font designed by Nate Halley.  

## Usefull links

__The Tetris Company__ website: <https://tetris.com>  
__Tetris®__ official Wikipedia: <https://tetris.fandom.com/wiki/Tetris_Wiki>  
__UIT of Montpellier/Sète__ website: <https://iut-montpellier-sete.edu.umontpellier.fr/>