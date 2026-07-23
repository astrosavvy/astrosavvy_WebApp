# Python Source Code Package (`src`)

Core application packages divided into logical components.

## Subdirectories

* **`config/`**: Environment variable mappings and configurations.
* **`prompts/`**: Multi-page report instructions and system prompt templates.
* **`report/`**: Document assembler and structural data mappers.
* **`services/`**: Integration clients (Email, Geocoding, LLM Router, Payments, PDF Overlay, Supabase).
* **`utils/`**: Common logging, spinner widgets, and astrological chart rendering helper modules.
* **`server.py`**: Principal FastAPI server application exposing checkout, webhook, and admin REST endpoints.
* **`main.py`**: Local CLI engine utility for assembling reports offline.
