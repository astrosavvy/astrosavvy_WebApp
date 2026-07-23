# Vedic Astrology Report Engine

This project coordinates the calculations and synthesis of cosmic compatibility reports and handles e-commerce payment checkouts.

## Project Structure

* **`frontend/`**: Contains static web page templates, styling, scripts, forms, and images.
* **`backend/`**: Contains the core FastAPI application server, payment endpoints, and PDF generation compiler.
  * **`backend/database/`**: Relocated Supabase schema, configurations, and SQL migrations.
  * **`backend/src/`**: Python source packages including prompt templates, astrology data services, and utils.

## Local Configuration
Ensure a `.env` file exists at the root folder matching the parameters defined in `.env.example`.
