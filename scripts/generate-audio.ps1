$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$audioWorkPath = Join-Path $projectRoot '.audio-work'
New-Item -ItemType Directory -Path $audioWorkPath -Force | Out-Null
node (Join-Path $PSScriptRoot 'prepare-audio.cjs') export
if ($LASTEXITCODE -ne 0) { throw 'Unable to prepare audio scripts.' }
$tracks = Get-Content -LiteralPath (Join-Path $audioWorkPath 'scripts.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$voice = New-Object -ComObject SAPI.SpVoice
$englishVoice = @($voice.GetVoices() | Where-Object { $_.GetDescription() -like '*Zira*English*' })
if ($englishVoice.Count -eq 0) { throw 'Microsoft Zira English desktop voice is not installed.' }
$voice.Voice = $englishVoice[0]
$voice.Rate = -1
foreach ($track in $tracks) {
    for ($index = 0; $index -lt $track.segments.Count; $index++) {
        $outputPath = Join-Path $audioWorkPath ($track.slug + '-' + $index + '.wav')
        $stream = New-Object -ComObject SAPI.SpFileStream
        $stream.Format.Type = 22
        $stream.Open($outputPath, 3, $false)
        $voice.AudioOutputStream = $stream
        $voice.Speak([string]$track.segments[$index][0]) | Out-Null
        $stream.Close()
    }
    Write-Output ('Synthesised W' + $track.id + ': ' + $track.segments.Count + ' segments')
}
node (Join-Path $PSScriptRoot 'prepare-audio.cjs') combine
if ($LASTEXITCODE -ne 0) { throw 'Unable to assemble audio files.' }
