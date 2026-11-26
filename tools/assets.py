#!/usr/bin/env python3
"""Rasterise the AVERLYNT brand assets.

Reads the SVGs produced by tools/logo.py and writes the PNG/ICO files the site
needs (favicons, PWA icons, Open Graph cards). Uses rsvg-convert + Pillow, both
already present in the sandbox. Run: python3 tools/assets.py
"""
import pathlib
import subprocess

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
STATIC = ROOT / "src" / "static"
SRC = ROOT / "assets-src"

CARBON = "#070B0E"
CLOUD = "#F1F4F2"
TEAL = "#58D6C1"
BRASS = "#D8B47A"


def icon_svg(size, pad_ratio=0.30, stroke=9.5, bg=CARBON):
    """Square app icon: carbon ground, framed A, teal route, brass node."""
    inner = size * (1 - pad_ratio * 2)
    scale = inner / 64
    tx = size * pad_ratio
    ty = size * pad_ratio
    t = lambda x, y: (tx + x * scale, ty + y * scale)
    frame = [t(10, 55), t(32, 8), t(54, 55)]
    route = [t(20, 43), t(35, 43)]
    node = t(39.5, 43)
    d_frame = "M" + " L".join(f"{p[0]:.2f} {p[1]:.2f}" for p in frame) + "Z"
    d_route = "M" + " L".join(f"{p[0]:.2f} {p[1]:.2f}" for p in route)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
<rect width="{size}" height="{size}" fill="{bg}"/>
<path d="{d_frame}" fill="none" stroke="{CLOUD}" stroke-width="{stroke * scale:.2f}" stroke-linecap="square"/>
<path d="{d_route}" fill="none" stroke="{TEAL}" stroke-width="{stroke * 0.72 * scale:.2f}" stroke-linecap="square"/>
<circle cx="{node[0]:.2f}" cy="{node[1]:.2f}" r="{3.6 * scale:.2f}" fill="{BRASS}"/>
</svg>
'''


def png_from_svg(svg_text, out, width, height):
    tmp = SRC / f".tmp-{out.name}.svg"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    tmp.write_text(svg_text, encoding="utf8")
    subprocess.run(["rsvg-convert", "-w", str(width), "-h", str(height), "-o", str(out), str(tmp)], check=True)
    tmp.unlink()
    return out


def build():
    made = []

    # App icons (opaque: iOS/maskable icons must not be transparent).
    for size in (192, 512, 180):
        name = {180: "apple-touch-icon.png"}.get(size, f"icon-{size}.png")
        made.append(png_from_svg(icon_svg(size), STATIC / name, size, size))

    # favicon.ico with 16/32/48 frames.
    frames = []
    for size in (16, 32, 48):
        f = SRC / f".favicon-{size}.png"
        png_from_svg(icon_svg(size, pad_ratio=0.24, stroke=11), f, size, size)
        frames.append(Image.open(f).convert("RGBA"))
    ico = STATIC / "favicon.ico"
    frames[-1].save(ico, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    for f in SRC.glob(".favicon-*.png"):
        f.unlink()
    made.append(ico)

    # Open Graph cards.
    for locale in ("id", "en"):
        svg = (SRC / f"og-{locale}.svg").read_text(encoding="utf8")
        made.append(png_from_svg(svg, STATIC / "og" / f"averlynt-og-{locale}.png", 1200, 630))

    return made


if __name__ == "__main__":
    for path in build():
        print(path.relative_to(ROOT), f"{path.stat().st_size / 1024:.1f} KB")
