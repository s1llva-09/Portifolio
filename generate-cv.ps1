$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if (-not (Test-Path $edgePath)) {
    Write-Error "Microsoft Edge não encontrado em: $edgePath"
    exit 1
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlPath = (Join-Path $root "cv-pablo-junior.html").Replace("\", "/")
$pdfPath = Join-Path $root "cv-pablo-junior.pdf"

& $edgePath `
    --headless `
    --disable-gpu `
    --print-to-pdf-no-header `
    --print-to-pdf="$pdfPath" `
    "file:///$htmlPath"

if (Test-Path $pdfPath) {
    Write-Output "PDF gerado em: $pdfPath"
}
