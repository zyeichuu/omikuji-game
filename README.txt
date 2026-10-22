HOKTO MUSHROOM NEW YEAR OMIKUJI — INSTAGRAM SHARE UPDATE

FILES
- index.html: game markup and share popup
- style.css: responsive styling; page background remains transparent
- script.js: box frame sequence, fortune selection, and share actions
- assets/: copy your existing PNG files into this folder

IMPORTANT: The PNG assets themselves were not included because they were not available in this workspace. Copy the exact existing files into the assets folder, preserving their names:

Omikuji-box-no-stick.png
Omikuji-box-stick-1.png
Omikuji-box-stick-2.png
Omikuji-box-stick-3.png
Excellent Fortune 1.png
Excellent Fortune 2.png
Good Fortune 1.png
Good Fortune 2.png
Future Fortune 1.png
Future Fortune 2.png
Fortune 1.png
Fortune 2.png
Small Fortune 1.png

The code uses a general share message and never includes the fortune asset filename in the message. The share popup includes Instagram, WhatsApp, Facebook, X, Telegram, and Copy Link. There is no More button.

Instagram note: Instagram does not offer a universal web URL that can directly post a website link to a user's Instagram account. On supported mobile browsers, the Instagram option opens the native share sheet; otherwise it gives instructions to screenshot the fortune and upload it to Instagram.

GITHUB UPDATE
1. Unzip this folder.
2. Copy index.html, style.css, script.js, and the assets folder into your existing Omikuji GitHub repository, replacing the old code files.
3. Keep the PNG filenames exactly as listed above.
4. Commit and push to the same main branch and wait for GitHub Pages to deploy.
5. Refresh the WordPress page. If needed, add or change a version query string on the iframe URL to refresh the embedded page cache.

WORDPRESS IFRAME EXAMPLE
<iframe src="https://zyeichuu.github.io/omikuji-game/?v=3" title="HOKTO Mushroom New Year Omikuji" style="display:block;width:100%;height:1100px;border:0;background:transparent" scrolling="no" allow="clipboard-write; web-share"></iframe>

If the game's layout needs more or less height in WordPress, adjust the iframe height in the WordPress Raw HTML element.
