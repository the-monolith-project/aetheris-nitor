"""Genera la imagen Open Graph y los iconos PNG de EPI-Aetheris.

Uso puntual: se corre a mano cuando cambia la marca, no en el build.
La tipografía es la Inter real que la Fonts API de Astro ya descargó en
.astro/fonts (woff2 variable); se convierte a TTF con fontTools para que PIL
pueda usarla -- Inter no está instalada en el sistema y, sin esto, el
monograma saldría en DejaVu.
"""
import io
import subprocess
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
TMP = Path('/tmp')
DEEP = (1, 30, 30)          # --color-deep  #011e1e
ACCENT = (24, 62, 57)       # --color-accent #183e39
LAVANDA = (221, 219, 255)   # --color-deep-ink #dddbff
CORAL = (255, 90, 69)       # --color-live #ff5a45
BLANCO = (255, 255, 255)

# woff2 variable de Inter -> ttf utilizable por PIL
origen = REPO / '.astro/fonts/font-inter-700-normal-latin-e868cdf4720e9ea5.woff2'
ttf = TMP / 'inter.ttf'
if not ttf.exists():
    f = TTFont(str(origen))
    f.flavor = None
    f.save(str(ttf))


def inter(tam, peso=700):
    fuente = ImageFont.truetype(str(ttf), tam)
    try:
        fuente.set_variation_by_axes([peso])
    except Exception:
        pass
    return fuente


def monograma(lado, radio_ratio=7 / 32, relleno=1.0):
    """Reproduce public/favicon.svg: rect redondeado + 'E' blanca y 'A' coral."""
    img = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    caja = lado * relleno
    off = (lado - caja) / 2
    d.rounded_rectangle(
        [off, off, off + caja - 1, off + caja - 1],
        radius=caja * radio_ratio,
        fill=ACCENT,
    )
    fuente = inter(int(caja * 0.42))
    ancho_e = d.textlength('E', font=fuente)
    ancho_a = d.textlength('A', font=fuente)
    total = ancho_e + ancho_a
    x = off + (caja - total) / 2
    y = off + caja / 2
    d.text((x, y), 'E', font=fuente, fill=BLANCO, anchor='lm')
    d.text((x + ancho_e, y), 'A', font=fuente, fill=CORAL, anchor='lm')
    return img


# --- iconos -----------------------------------------------------------------
salidas = {
    'public/favicon-32.png': monograma(32),
    'public/apple-touch-icon.png': monograma(180),
    'public/icon-192.png': monograma(192),
    'public/icon-512.png': monograma(512),
    # maskable: la plataforma recorta a círculo/squircle, así que el arte vive
    # en el 60% central y el fondo va a sangre.
    'public/icon-512-maskable.png': None,
}
mask = Image.new('RGBA', (512, 512), ACCENT + (255,))
glifo = monograma(512, relleno=0.62)
mask.alpha_composite(glifo)
salidas['public/icon-512-maskable.png'] = mask

# --- imagen Open Graph ------------------------------------------------------
og = Image.new('RGB', (1200, 630), DEEP)
d = ImageDraw.Draw(og)

# El wordmark ya es SVG de trazados blancos: se rasteriza, no se tipografía.
logo_png = subprocess.run(
    ['rsvg-convert', '-w', '520', str(REPO / 'public/logo/logo-dark-bg.svg')],
    capture_output=True, check=True,
).stdout
logo = Image.open(io.BytesIO(logo_png)).convert('RGBA')
og.paste(logo, (90, 150), logo)


fuente_txt = inter(40, 500)
lineas = [
    'Vigilancia epidemiológica de dengue y',
    'enfermedad respiratoria en El Salvador',
]
y = 392
for linea in lineas:
    d.text((90, y), linea, font=fuente_txt, fill=LAVANDA)
    y += 54

d.text((90, 540), 'epi-aetheris.dev · datos públicos · GPL-3.0',
       font=inter(26, 400), fill=(160, 158, 200))

(REPO / 'public/og').mkdir(exist_ok=True)
salidas['public/og/og-default.png'] = og

for ruta, img in salidas.items():
    destino = REPO / ruta
    img.save(destino, optimize=True)
    print(f'{ruta}: {img.size[0]}x{img.size[1]}  {destino.stat().st_size // 1024} KB')
