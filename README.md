<h3 align="center">
	<img src="https://github.com/raysin1/Appletify/blob/main/screenshots/icon.png?raw" width="80" alt="Logo"/><br/>
</h3>
<div align="center">
  <h1>Appletify</h1>
</div> <!-- close center div -->

<div align="center">
  <img src="https://raw.githubusercontent.com/raysin1/Appletify/refs/heads/main/screenshots/preview.png" width="800">
</div>

<div style="display: flex; flex-direction: row; gap: 10px;" align="center">
  <img src="https://raw.githubusercontent.com/raysin1/Appletify/main/screenshots/album.png" alt="Image 1" width="400">
  <img src="https://raw.githubusercontent.com/raysin1/Appletify/main/screenshots/lyrics.png" alt="Image 2" width="400">
</div>

<br>
<br>

**Make sure to also install the following extensions on Marketplace:**

<img src="https://github.com/user-attachments/assets/82cd3960-9401-4cc5-9cab-e68590e3ef75" width="320"/>

*Credits to [ohitstom](https://github.com/ohitstom) and [Cali](https://github.com/surfbryce)*

<br>

## Transparency (optional)
***You can follow the steps below if you want the theme to have translucent sidebars***

1. Download [Windhawk](https://windhawk.net/)
2. Install the `Spotify Tweaks` mod
3. Under settings, disable `native frames and title bars` and **enable** `Transparent Rendering`
4. Download [MicaForEveryone](https://github.com/MicaForEveryone/MicaForEveryone)
5. Create a new **process rule** for Spotify and set `Backdrop type` to **Acrylic**
6. Turn on `Blur from behind` and `Extend frame into client area` if necessary
7. Close and reopen Spotify

*Credit to [Ingan121](https://github.com/Ingan121/)*

> The theme works without these mods too — you just get a solid dark
> sidebar instead of a translucent one. macOS and Linux users don't need
> (and can't use) Windhawk/MicaForEveryone.

<br>

## Installation

**Marketplace (recommended)**
1. Install [Spicetify](https://spicetify.app/docs/getting-started) and the [Marketplace](https://github.com/spicetify/marketplace/wiki/Installation)
2. Open Spotify → Marketplace → **Themes**, search for `Appletify`, click **Install**
3. Also install the extensions listed above (Marketplace → **Extensions**)

**Manual**
1. Download this repository (`Code` → `Download ZIP`) and unzip it
2. Copy the inner `appletify` folder into your Spicetify `Themes` folder:
   - Windows: `Win+R` → `%appdata%\spicetify\Themes`
   - macOS/Linux: `~/.config/spicetify/Themes`
3. Run:
   ```
   spicetify config current_theme appletify
   spicetify apply
   ```

## Uninstall

Appletify is a **theme**, not an extension — remove it from Marketplace → **Installed**,
or if you installed manually:

```
spicetify config current_theme marketplace
spicetify apply
```

(You can also delete the `appletify` folder from `%appdata%\spicetify\Themes` /
`~/.config/spicetify/Themes` afterwards.)

## Troubleshooting

- **Theme doesn't show up in Marketplace** — make sure Marketplace itself is
  installed and up to date, then restart Spotify. If it still doesn't appear,
  use the manual installation above.
- **UI looks broken after a Spotify update** — run `spicetify update` (or
  `spicetify upgrade`), then `spicetify restore backup apply`.
- **Wrong / serif-looking font** — the SF Pro font downloads from the internet
  on first load; if it can't be reached the theme now falls back to your
  system font. Installing SF Pro locally also fixes it permanently.
- **Windows: window turns into a Vista-style frame behind the sidebar** — a
  known Windhawk `Spotify Tweaks` issue; enabling `native frames and title
  bars` in the mod settings works around it.
- **MicaForEveryone has no "Backdrop Style" option** — newer MicaForEveryone
  versions call it `Backdrop type` in the process rule.
- **Some shelf titles/sections look unstyled in a non-English Spotify** — the
  player controls and layout are language-independent now; a few cosmetic
  tweaks (renamed shelf headers etc.) still only apply in English.
