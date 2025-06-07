# install.ps1 for Apple Music Spicetify Theme and Extensions

# Ensure Spicetify is installed
if (-not (Get-Command spicetify -ErrorAction SilentlyContinue)) {
    Write-Error "Spicetify not found. Please install Spicetify first by running: iwr -useb https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1 | iex"
    exit 1
}

# Define paths for Windows
$themeDir = "$env:APPDATA\spicetify\Themes\apple-music"
$extDir = "$env:APPDATA\spicetify\Extensions"
$themeUrl = "https://raw.githubusercontent.com/thrway237/apple-music-spicetify/main/apple-music"
$extUrl = "https://raw.githubusercontent.com/thrway237/apple-music-spicetify/main/extensions"

# Create theme directory if it doesn't exist
if (-not (Test-Path $themeDir)) {
    New-Item -Path $themeDir -ItemType Directory -Force | Out-Null
}

# Download theme files
Write-Host "Downloading theme files..."
Invoke-WebRequest -Uri "$themeUrl/color.ini" -OutFile "$themeDir\color.ini"
Invoke-WebRequest -Uri "$themeUrl/user.css" -OutFile "$themeDir\user.css"

# Create extensions directory if it doesn't exist
if (-not (Test-Path $extDir)) {
    New-Item -Path $extDir -ItemType Directory -Force | Out-Null
}

# Download extension files
Write-Host "Downloading extension files..."
$extensions = @("left-sidebar.js", "top-playbar.js", "search-input.js")
foreach ($ext in $extensions) {
    Invoke-WebRequest -Uri "$extUrl/$ext" -OutFile "$extDir\$ext"
}

# Configure Spicetify with the theme and extensions
Write-Host "Configuring Spicetify..."
spicetify config current_theme apple-music
spicetify config extensions left-sidebar.js top-playbar.js search-input.js

# Apply the configuration
Write-Host "Applying changes..."
spicetify apply

Write-Output "Apple Music Spicetify theme and extensions installed successfully!"