# AI Usage Log

## Tools Used

- **Cursor** (Composer) — primary IDE and code generation
- **Claude** — architecture planning and assignment analysis

## Incorrect AI Output & Corrections

**Issue:** Initial scaffold duplicated the `QuestionField` component function declaration (import + export default with same name inline), which would cause a syntax/runtime error.

**Correction:** Removed the erroneous import line and kept a single `export default function QuestionField` definition in `client/src/components/dynamic/QuestionField.jsx`.

**Issue:** Assignment examples used Mongoose; AI initially considered MongoDB but assignment also allows PostgreSQL/Prisma. For zero-friction local setup, SQLite via Prisma was chosen so reviewers can run without a cloud DB.

**Correction:** Documented in DECISIONS.md that production should use PostgreSQL; schema is Prisma-compatible for easy migration.

## Human-Authored / Reviewed Portions

- Pricing formula validation against assignment spec (human verification of math)
- Seed question structure and business naming (Northline Roofing & Exteriors)
- Environment variable naming and security notes in README
- Out-of-scope decisions and production questions for Dale in DECISIONS.md

## AI-Generated Portions

- Express route handlers and middleware structure
- React wizard step logic and dynamic form rendering
- Tailwind styling and layout
- Prisma schema and seed script
- Documentation templates (README, DECISIONS, AI_LOG)
