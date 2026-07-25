import io
import os
from PIL import Image, ImageOps

def compress_and_optimize_image(image_bytes: bytes, max_width: int = 1920, quality: int = 85) -> tuple[bytes, str, str]:
    """
    Server-side high-efficiency image compression module.
    
    1. Opens raw image bytes (JPEG, PNG, WebP, GIF, etc.) via Pillow.
    2. Auto-rotates using EXIF orientation tags.
    3. Resizes huge images (width > 1920px) to max_width preserving exact aspect ratio using Lanczos anti-aliasing.
    4. Encodes to WebP at quality=85 with method=6 (maximum perceptual quality with highest compression).
    
    Returns:
        (compressed_bytes: bytes, mime_type: str, extension: str)
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        
        # Apply EXIF transpose (auto-orient mobile photos)
        try:
            img = ImageOps.exif_transpose(img)
        except Exception:
            pass
            
        # Convert paletted or RGBA images cleanly
        if img.mode in ("P", "PA"):
            img = img.convert("RGBA")
            
        # Calculate aspect ratio scaling if width exceeds max_width (e.g. 1920px)
        width, height = img.size
        if width > max_width:
            new_height = int((max_width / float(width)) * float(height))
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        # Compress into WebP format with highest compression algorithm (method=6)
        output_buffer = io.BytesIO()
        
        # If image has alpha channel (transparency), preserve RGBA WebP
        if img.mode == "RGBA":
            img.save(output_buffer, format="WEBP", quality=quality, method=6, lossless=False)
        else:
            img_rgb = img.convert("RGB")
            img_rgb.save(output_buffer, format="WEBP", quality=quality, method=6)
            
        compressed_bytes = output_buffer.getvalue()
        
        # Log compression metrics
        orig_size = len(image_bytes)
        new_size = len(compressed_bytes)
        savings = (1 - (new_size / orig_size)) * 100 if orig_size > 0 else 0
        print(f"[ImageOptimizer] Original: {orig_size/1024:.1f} KB -> WebP Compressed: {new_size/1024:.1f} KB (Saved {savings:.1f}%)")
        
        return compressed_bytes, "image/webp", "webp"
    except Exception as e:
        print(f"[ImageOptimizer] Warning: Optimization fallback to original due to error: {e}")
        return image_bytes, "image/jpeg", "jpg"
