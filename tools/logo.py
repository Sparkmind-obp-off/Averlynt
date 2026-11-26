#!/usr/bin/env python3
"""Generate AVERLYNT vector assets (logo lockups, favicon, OG images) from the
licensed font files so nothing depends on a font being installed at render time.

Usage:  python3 tools/logo.py            # writes into src/static/
Requires: fonttools (pip install fonttools)
"""
import pathlib
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / "src" / "static" / "fonts"
OUT = ROOT / "src" / "static"

CARBON = "#0B1115"
CARBON_DEEP = "#070B0E"
CLOUD = "#F1F4F2"
TEAL = "#58D6C1"
TEAL_DEEP = "#2C9C8B"
BRASS = "#D8B47A"

_cache = {}


def font(name):
    if name not in _cache:
        _cache[name] = TTFont(FONTS / name)
    return _cache[name]


def text_path(text, font_file, size, x, y, tracking=0.0):
    """Return (path_d, width) for `text` with its baseline at y."""
    f = font(font_file)
    glyphs = f.getGlyphSet()
    cmap = f.getBestCmap()
    upm = f["head"].unitsPerEm
    hmtx = f["hmtx"]
    scale = size / upm
    parts = []
    cursor = x
    for ch in text:
        gname = cmap.get(ord(ch))
        if gname is None:
            cursor += size * 0.28 + tracking
            continue
        pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.2f}")
        glyphs[gname].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, cursor, y)))
        d = pen.getCommands()
        if d:
            parts.append(d)
        cursor += hmtx[gname][0] * scale + tracking
    return " ".join(parts), cursor - x


def wordmark(size, x, y, tracking, fill=CLOUD, font_file="SpaceGrotesk-600.ttf"):
    d, width = text_path("AVERLYNT", font_file, size, x, y, tracking)
    return d, width


def symbol_paths(scale=1.0, tx=0.0, ty=0.0):
    t = Transform(scale, 0, 0, scale, tx, ty)
    frame = [(10, 55), (32, 8), (54, 55)]
    route = [(20, 43), (35, 43)]
    node = (39.5, 43, 3.0)
    pts = lambda p: (t.transformPoint(p))
    frame_d = "M" + " L".join(f"{p[0]:.2f} {p[1]:.2f}" for p in map(pts, frame)) + "Z"
    route_d = "M" + " L".join(f"{p[0]:.2f} {p[1]:.2f}" for p in map(pts, route[:2]))
    nx, ny = pts(node[:2])
    return frame_d, route_d, nx, ny, node[2] * scale


def svg(width, height, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:g} {height:g}" '
        f'width="{width:g}" height="{height:g}" role="img" aria-label="{title}">\n'
        f"<title>{title}</title>\n{body}</svg>\n"
    )


def mark(scale, tx, ty, frame_color, route_color, node_color, sw=6.5, rw=4.5):
    frame_d, route_d, nx, ny, nr = symbol_paths(scale, tx, ty)
    return (
        f'<path d="{frame_d}" fill="none" stroke="{frame_color}" stroke-width="{sw * scale:.2f}" '
        f'stroke-linejoin="miter" stroke-linecap="square"/>\n'
        f'<path d="{route_d}" fill="none" stroke="{route_color}" stroke-width="{rw * scale:.2f}" stroke-linecap="square"/>\n'
        f'<circle cx="{nx:.2f}" cy="{ny:.2f}" r="{nr:.2f}" fill="{node_color}"/>\n'
    )


def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf8")
    return path.relative_to(ROOT)


def build_brand():
    produced = []
    # 1. Symbol only, 64x64 grid.
    produced.append(write(OUT / "brand" / "averlynt-symbol.svg", svg(64, 64, mark(1, 0, 0, CLOUD, TEAL, BRASS), "AVERLYNT symbol")))

    # 2. Horizontal lockup: symbol + wordmark, optically aligned to the cap height.
    word_size, tracking = 26.0, 3.6
    d, w = wordmark(word_size, 0, 0, tracking)
    left_pad, gap, right_pad = 4.0, 14.0, 6.0
    total_w = left_pad + 46 + gap + w + right_pad
    height = 54.0
    baseline = 34.5
    body = mark(0.72, left_pad, 2.0, CLOUD, TEAL, BRASS)
    body += f'<g transform="translate({left_pad + 46 + gap:.2f} {baseline:.2f})"><path d="{d}" fill="{CLOUD}"/></g>\n'
    produced.append(write(OUT / "brand" / "averlynt-logo-horizontal.svg", svg(round(total_w, 2), height, body, "AVERLYNT")))

    # 3. Same lockup for light surfaces.
    body_light = mark(0.72, left_pad, 2.0, CARBON, TEAL_DEEP, BRASS)
    body_light += f'<g transform="translate({left_pad + 46 + gap:.2f} {baseline:.2f})"><path d="{d}" fill="{CARBON}"/></g>\n'
    produced.append(write(OUT / "brand" / "averlynt-logo-horizontal-on-light.svg", svg(round(total_w, 2), height, body_light, "AVERLYNT")))

    # 4. Stacked lockup: symbol above a tracked-out wordmark.
    stacked_w = 220
    d2, w2 = wordmark(22.0, 0, 0, 6.0)
    x2 = (stacked_w - w2) / 2
    body2 = mark(1.15, (stacked_w - 64 * 1.15) / 2, 4.0, CLOUD, TEAL, BRASS)
    body2 += f'<g transform="translate({x2:.2f} 122)"><path d="{d2}" fill="{CLOUD}"/></g>\n'
    produced.append(write(OUT / "brand" / "averlynt-logo-stacked.svg", svg(stacked_w, 136, body2, "AVERLYNT")))

    # 5. Favicon: thicker strokes survive at 16px.
    fav = mark(1, 0, 0, CLOUD, TEAL, BRASS, sw=9.5, rw=6.5).replace("stroke-linejoin", "stroke-linejoin")
    produced.append(write(OUT / "favicon.svg", svg(64, 64, fav, "AVERLYNT")))
    return produced


def og_svg(locale):
    W, H = 1200, 630
    headline = {
        "id": ["Ubah ide menjadi", "sistem yang bekerja."],
        "en": ["Turn ideas into", "systems that work."],
    }[locale]
    kicker = {"id": "EKOSISTEM DIGITAL INDEPENDEN", "en": "INDEPENDENT DIGITAL ECOSYSTEM"}[locale]
    label = {"id": "AVERLYNT — AI · AUTOMATION · SAAS · DIGITAL COMMERCE",
             "en": "AVERLYNT — AI · AUTOMATION · SAAS · DIGITAL COMMERCE"}[locale]

    parts = [
        f'<rect width="{W}" height="{H}" fill="{CARBON_DEEP}"/>',
        '<defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">'
        f'<path d="M60 0H0V60" fill="none" stroke="{CLOUD}" stroke-opacity="0.055" stroke-width="1"/></pattern>'
        '<radialGradient id="glow" cx="0.82" cy="0.1" r="0.75">'
        f'<stop offset="0" stop-color="{TEAL}" stop-opacity="0.20"/><stop offset="1" stop-color="{TEAL}" stop-opacity="0"/></radialGradient></defs>',
        f'<rect width="{W}" height="{H}" fill="url(#grid)"/>',
        f'<rect width="{W}" height="{H}" fill="url(#glow)"/>',
        f'<rect x="0.5" y="0.5" width="{W - 1}" height="{H - 1}" fill="none" stroke="{CLOUD}" stroke-opacity="0.10"/>',
    ]

    # Symbol, right side, large.
    parts.append(mark(4.1, 830, 96, CLOUD, TEAL, BRASS))

    # Kicker + headline as vector paths.
    d, w = text_path(kicker, "DMMono-400.ttf", 15, 80, 118, 3.2)
    parts.append(f'<path d="{d}" fill="{TEAL}"/>')
    parts.append(f'<rect x="80" y="132" width="{w:.1f}" height="1" fill="{CLOUD}" fill-opacity="0.12"/>')

    y = 246
    for line in headline:
        d, w = text_path(line, "SpaceGrotesk-600.ttf", 76, 78, y, -1.6)
        parts.append(f'<path d="{d}" fill="{CLOUD}"/>')
        y += 86

    # Route line with four nodes at the bottom.
    parts.append(f'<path d="M80 516H1120" stroke="{CLOUD}" stroke-opacity="0.14" stroke-width="1"/>')
    xs = [80, 320, 560, 800, 1040]
    for i, x in enumerate(xs):
        color = TEAL if i == 0 else CLOUD
        op = "1" if i == 0 else "0.28"
        parts.append(f'<circle cx="{x}" cy="516" r="5" fill="{color}" fill-opacity="{op}"/>')
    parts.append(f'<path d="M80 516H560" stroke="{TEAL}" stroke-width="2"/>')

    labels = ["AI", "AUTOMATION", "SAAS", "DIGITAL COMMERCE"]
    for x, text in zip(xs[1:], labels):
        d, w = text_path(text, "DMMono-400.ttf", 15, x + 14, 524, 2.4)
        parts.append(f'<path d="{d}" fill="{CLOUD}" fill-opacity="0.62"/>')

    d, w = text_path(label, "DMMono-400.ttf", 15, 80, 572, 1.6)
    parts.append(f'<path d="{d}" fill="{CLOUD}" fill-opacity="0.5"/>')
    return svg(W, H, "\n".join(parts) + "\n", "AVERLYNT")


def build_og():
    # OG SVGs are intermediate: the PNG is what ships.
    src = ROOT / "assets-src"
    produced = []
    for locale in ("id", "en"):
        f = write(src / f"og-{locale}.svg", og_svg(locale))
        produced.append(f)
    return produced


if __name__ == "__main__":
    for p in build_brand() + build_og():
        print(p)
    sys.exit(0)
