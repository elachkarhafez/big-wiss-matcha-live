from PIL import Image
import os
from pathlib import Path

# Get the product-cups directory
cups_dir = Path("public/product-cups")
cups_dir.mkdir(parents=True, exist_ok=True)

files = [
    ("cup-1.jpg", "cup-1.png"),
    ("cup-2.jpg", "cup-2.png"),
    ("cup-3.jpg", "cup-3.png"),
    ("cup-4.jpg", "cup-4.png"),
    ("cup-5.jpg", "cup-5.png"),
]

for input_file, output_file in files:
    input_path = cups_dir / input_file
    output_path = cups_dir / output_file

    if not input_path.exists():
        print("[SKIP] " + input_file + " not found")
        continue

    try:
        # Open image
        img = Image.open(input_path)

        # Convert to RGBA for transparency support
        img = img.convert("RGBA")

        # Get image data as list
        width, height = img.size
        data = list(img.getdata())

        # Create new list with transparent background
        new_data = []
        for item in data:
            # Get RGBA values
            r, g, b = item[0], item[1], item[2]
            a = item[3] if len(item) > 3 else 255

            # If pixel is very light (likely white background), make transparent
            if r > 240 and g > 240 and b > 240:
                new_data.append((r, g, b, 0))  # Transparent
            else:
                new_data.append((r, g, b, a))  # Keep original with alpha

        img.putdata(new_data)

        # Save as PNG
        img.save(str(output_path), "PNG", optimize=True)
        print("[OK] " + input_file + " -> " + output_file)

        # Delete original JPG
        if input_path.exists():
            input_path.unlink()

    except Exception as e:
        print("[ERROR] " + input_file + ": " + str(e))

print("\n[DONE] All images cleaned!")
