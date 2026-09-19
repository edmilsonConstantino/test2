#!/bin/bash
echo "=== comunidade.png OCR ==="
convert comunidade.png -colorspace Gray -negate -threshold 60% /tmp/comunidade_thresh.png
tesseract /tmp/comunidade_thresh.png stdout -l por+eng --psm 6 2>/dev/null

echo "=== PrincipalCard.png OCR ==="
convert public/imagens-paginas/05-comunidade-global/educacao/PrincipalCard.png -colorspace Gray -negate -threshold 60% /tmp/card_thresh.png
tesseract /tmp/card_thresh.png stdout -l por+eng --psm 6 2>/dev/null
