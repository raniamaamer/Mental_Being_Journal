$files = Get-ChildItem -Path "components\ui" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove version numbers from imports using simpler regex
    $content = $content -replace '@\d+\.\d+\.\d+"', '"'
    $content = $content -replace "@\d+\.\d+\.\d+'", "'"
    $content = $content -replace '@\d+\.\d+"', '"'
    $content = $content -replace "@\d+\.\d+'", "'"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "`nAll files processed!"
