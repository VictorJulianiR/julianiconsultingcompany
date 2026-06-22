"""Generate the looping JCC 3D ident consumed by the ASCII player."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


SIZE = 960
FPS = 30
SECONDS = 6
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "jcc-ident.mp4"


def curve(points: list[tuple[float, float]], steps: int = 9) -> list[tuple[float, float]]:
    """Interpolate a polyline so curved glyph strokes remain smooth when rotating."""
    output: list[tuple[float, float]] = []
    for start, end in zip(points, points[1:]):
        for index in range(steps):
            amount = index / steps
            output.append((start[0] + (end[0] - start[0]) * amount, start[1] + (end[1] - start[1]) * amount))
    output.append(points[-1])
    return output


JCC_STROKES = [
    curve([(-2.85, -2.05), (-2.85, 0.8), (-2.65, 1.45), (-2.05, 1.72), (-1.42, 1.58), (-1.16, 1.1)]),
    curve([(-0.2, -1.7), (0.35, -2.05), (1.1, -2.04), (1.64, -1.62), (1.79, -1.0), (1.66, -0.32), (1.09, 0.0), (0.32, 0.06), (-0.18, 0.55), (-0.18, 1.22), (0.22, 1.72), (1.12, 1.85), (1.7, 1.53)]),
    curve([(2.04, -1.7), (2.6, -2.05), (3.35, -2.04), (3.89, -1.62), (4.04, -1.0), (3.91, -0.32), (3.34, 0.0), (2.56, 0.06), (2.07, 0.55), (2.07, 1.22), (2.47, 1.72), (3.36, 1.85), (3.94, 1.53)]),
]


def project(point: tuple[float, float, float], angle: float) -> tuple[float, float, float]:
    x, y, z = point
    rotated_x = x * math.cos(angle) + z * math.sin(angle)
    depth = -x * math.sin(angle) + z * math.cos(angle)
    factor = 9.0 / (9.0 + depth)
    return SIZE * 0.5 + rotated_x * factor * 84, SIZE * 0.5 + y * factor * 120, depth


def color_for(depth: float, stroke_index: int, frame: int) -> tuple[int, int, int]:
    shine = max(0.2, min(1.0, (depth + 1.4) / 2.8))
    pulse = (math.sin(frame * 0.12 + stroke_index * 1.8) + 1) * 0.5
    bases = [(201, 215, 229), (222, 230, 238), (184, 202, 218)]
    red, green, blue = bases[stroke_index]
    return tuple(int(channel * (0.48 + shine * 0.52) + pulse * 11) for channel in (red, green, blue))


def render_frame(frame: int) -> Image.Image:
    time = frame / FPS
    angle = time / SECONDS * math.tau
    image = Image.new("RGB", (SIZE, SIZE), (17, 26, 43))
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    draw = ImageDraw.Draw(image)

    for stroke_index, stroke in enumerate(JCC_STROKES):
        for layer in range(7):
            z = -0.25 + layer * 0.083
            projected = [project((x, y, z), angle) for x, y in stroke]
            points = [(x, y) for x, y, _ in projected]
            average_depth = sum(depth for _, _, depth in projected) / len(projected)
            width = int(37 + max(-8, min(15, average_depth * 7)))
            color = color_for(average_depth, stroke_index, frame)
            glow_draw.line(points, fill=(*color, 46), width=width + 26, joint="curve")

    image = Image.alpha_composite(image.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(18))).convert("RGB")
    draw = ImageDraw.Draw(image)
    for stroke_index, stroke in enumerate(JCC_STROKES):
        for layer in range(7):
            z = -0.25 + layer * 0.083
            projected = [project((x, y, z), angle) for x, y in stroke]
            points = [(x, y) for x, y, _ in projected]
            average_depth = sum(depth for _, _, depth in projected) / len(projected)
            width = int(33 + max(-8, min(15, average_depth * 7)))
            draw.line(points, fill=color_for(average_depth, stroke_index, frame), width=width, joint="curve")

    sweep_x = int((math.sin(time * 1.3) * 0.5 + 0.5) * SIZE)
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    ImageDraw.Draw(overlay).rectangle((sweep_x - 3, 0, sweep_x + 3, SIZE), fill=(215, 245, 255, 26))
    return Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    command = [
        "ffmpeg", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{SIZE}x{SIZE}", "-r", str(FPS), "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(OUTPUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    try:
        for frame in range(FPS * SECONDS):
            process.stdin.write(render_frame(frame).tobytes())
    finally:
        process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed to write JCC ident")


if __name__ == "__main__":
    main()
