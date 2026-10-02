#!/bin/sh
# Re-encodes the home hero footage from its 4K master.
#
#   sh scripts/encode-hero-video.sh path/to/master.mp4
#
# Writes four files to public/assets: a 1080p cut for landscape screens and a
# 720x1280 centre crop for upright phones, each as AV1 and as H.264. No audio
# (the hero plays muted), a keyframe every two seconds so the loop restarts
# cleanly, and `faststart` so playback can begin before the file finishes.
# src/app/page.tsx lists them in the order the browser should try them.
set -eu
SRC=${1:?usage: encode-hero-video.sh master.mp4}
OUT=public/assets
LAND="scale=1920:1080:flags=lanczos"
# The middle 9:16 of a 16:9 frame: what `object-cover` shows on a phone.
PORT="crop=ih*9/16:ih,scale=720:1280:flags=lanczos"
COMMON="-an -pix_fmt yuv420p -g 60 -movflags +faststart"

ffmpeg -y -i "$SRC" -vf "$LAND" -c:v libx264 -preset slow -crf 25 -profile:v high $COMMON "$OUT/hero-1080.mp4"
ffmpeg -y -i "$SRC" -vf "$PORT" -c:v libx264 -preset slow -crf 25 -profile:v high $COMMON "$OUT/hero-portrait-720.mp4"
ffmpeg -y -i "$SRC" -vf "$LAND" -c:v libsvtav1 -preset 5 -crf 36 $COMMON "$OUT/hero-1080-av1.mp4"
ffmpeg -y -i "$SRC" -vf "$PORT" -c:v libsvtav1 -preset 5 -crf 36 $COMMON "$OUT/hero-portrait-720-av1.mp4"
