#!/bin/bash
# Crop into 4 vertical sections: top, upper-mid, lower-mid, bottom
convert comunidade.png -crop 100%x25% +repage /tmp/crop_%d.png

for i in 0 1 2 3; do
  echo "=== CROP $i ==="
  convert /tmp/crop_$i.png -colorspace Gray -contrast-stretch 5%x5% /tmp/proc_$i.png
  tesseract /tmp/proc_$i.png stdout -l por+eng --psm 6 2>/dev/null
done
