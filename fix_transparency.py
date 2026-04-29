from rembg import remove
from PIL import Image
from pathlib import Path
import io

source_dir = Path("C:/Users/hafez/OneDrive/Desktop/Matcha Flavors")
output_dir = Path("public/product-cups")
output_dir.mkdir(parents=True, exist_ok=True)

# Map original filenames to output names
cup_map = {
    "Classic matcha.jpg": "classic-matcha.png",
    "Cream Top matcha.jpg": "cream-top.png",
    "Dirty Matcha.jpg": "dirty-matcha.png",
    "Iced matcha.jpg": "iced-matcha.png",
    "Strawberry Matcha.jpg": "strawberry-matcha.png",
    "Vanilla matcha.jpg": "vanilla-matcha.png",
}

for src_name, out_name in cup_map.items():
    src_path = source_dir / src_name
    out_path = output_dir / out_name

    if not src_path.exists():
        print(f"[SKIP] {src_name} not found")
        continue

    try:
        # Read original image
        with open(src_path, "rb") as f:
            input_data = f.read()

        # Use AI to remove background
        output_data = remove(input_data)

        # Save as PNG with transparency
        img = Image.open(io.BytesIO(output_data))
        img.save(str(out_path), "PNG", optimize=True)

        print(f"[OK] {src_name} -> {out_name}")
    except Exception as e:
        print(f"[ERROR] {src_name}: {str(e)}")

# Clean up old files
for old in output_dir.glob("cup-*.png"):
    old.unlink()
    print(f"[CLEANED] {old.name}")
for old in output_dir.glob("cup-*.jpg"):
    old.unlink()
    print(f"[CLEANED] {old.name}")

print("\n[DONE] All cup images processed with AI background removal!")
