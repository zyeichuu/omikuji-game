OMIKUJI TRANSPARENT GAME
=========================

This version is designed to be embedded into an existing website.

IMPORTANT:
There is NO page/game background colour.

The HTML, body and game containers use transparent backgrounds, so the
background of the website underneath will remain visible.

FILES
-----

index.html
style.css
script.js

ASSETS REQUIRED
---------------

Create an "assets" folder beside index.html and place these files inside:

BOX ANIMATION:
- Omikuji-box-no-stick.png
- Omikuji-box-stick-1.png
- Omikuji-box-stick-2.png
- Omikuji-box-stick-3.png

FORTUNES:
- Excellent Fortune 1.png
- Excellent Fortune 2.png
- Fortune 1.png
- Fortune 2.png
- Future Fortune 1.png
- Future Fortune 2.png
- Good Fortune 1.png
- Good Fortune 2.png
- Small Fortune 1.png

BOX SEQUENCE
------------

The animation uses the actual supplied PNGs:

NO STICK
   ↓
STICK 1
   ↓
STICK 2
   ↓
STICK 3
   ↓
FORTUNE

No CSS-generated stick is used.

IMPORTANT IMAGE REQUIREMENT
----------------------------

The four box images should have the SAME canvas dimensions and the box
should be in the SAME position in every frame.

This prevents the box from jumping when the JavaScript swaps frames.

TIMING
------

The current timing is:

0 - 1500 ms:
    No-stick box + shaking

1500 ms:
    Stick 1

2050 ms:
    Stick 2

2600 ms:
    Stick 3

3250 ms:
    Fortune reveal

To make the stick come out slower, increase the 550/550/650 values in
script.js.

TRANSPARENT BACKGROUND
----------------------

Do not add a background colour to the page.

The game uses:

background: transparent !important;
background-color: transparent !important;
background-image: none !important;

This allows the website's own background to show behind the game.

WORDPRESS / EMBEDDING
---------------------

You can host this as a standalone HTML page or place the HTML/CSS/JS
inside your website's custom code area.

If using WordPress/WPBakery, make sure the WPBakery row/column/container
itself also does not have a background colour.

FORTUNE REPEAT LOGIC
--------------------

The game has 9 fortune images.

A fortune will not repeat until all 9 have been used.

After all 9 have appeared, the pool resets and a new cycle begins.
