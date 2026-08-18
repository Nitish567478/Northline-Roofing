# Architectural Decisions

## Stack Choice

**Frontend:** React + Vite + Tailwind CSS  
**Backend:** Express.js  
**Database:** SQLite via Prisma (local dev); PostgreSQL recommended for production  

We chose this stack because it matches the assignment spec, enables fast local development without external DB setup, and Prisma makes schema migrations and seeding straightforward. SQLite can be swapped to PostgreSQL by changing the datasource provider and `DATABASE_URL`.

## Pricing Formula

All calculations run server-side in `server/src/services/calculator.js`:

1. **Base Material Cost** = `roof_area × rate_per_sqft × (1 + waste_factor)`
2. **Tear-Off Cost** = `roof_area × tear_off_per_sqft`
3. **Adjusted Subtotal** = `(Base Material + Tear-Off) × pitch_multiplier × stories_multiplier`
4. **Mid Estimate (E_mid)** = Adjusted Subtotal + permit_flat_fee ($350)
5. **Estimate Low** = round(E_mid × (1 - spread_pct))
6. **Estimate High** = round(E_mid × (1 + spread_pct)

Default modifiers: waste_factor = 0.10, permit_flat_fee = 350, range_spread_pct = 12%.

Rates and multipliers come from the selected options in the active config — never from the frontend.

## Config Versioning

Each admin save creates a new config row with an incremented `config_version` and deactivates the previous one. Leads store the `config_version` used at submission time for auditability.

## Authentication

JWT stored in an httpOnly cookie (8-hour expiry). Simpler than session stores for a two-user owner panel. Credentials come from environment variables with assignment defaults for local dev.

## Out of Scope

- **Role-based permissions** (Dale vs Marcus) — single admin role only
- **Multi-tenancy** — one business (Northline Roofing)
- **Email/SMS notifications** on new leads
- **Payment processing or contract signing**
- **Complex audit logs** beyond config versioning on leads

## Seed Data Notes

- Seed config is **Version 3** with five questions: roof_area, material, pitch, layers, stories.
- Numeric strings in seed JSON (e.g. `"1.12"`) are stored as numbers in the database.
- Questions are stored as JSON in a single column for flexibility; Prisma normalizes on read/write.

## Questions for Dale Before Production

1. Should estimate ranges include tax, or remain pre-tax?
2. Are permit fees always flat $350, or region-dependent?
3. Should inactive questions be hidden entirely or shown as "contact us"?
4. Who receives lead notifications, and via what channel?
5. Is a 12% spread appropriate year-round, or seasonal?
6. Should historical leads remain tied to old config versions for reporting?
