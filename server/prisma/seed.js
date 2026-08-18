import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedQuestions = [
  {
    key: 'roof_area',
    label: 'Approximate Roof Area',
    type: 'number',
    unit: 'sq ft',
    required: true,
    min: 800,
    max: 6000,
    active: true,
    order: 1,
    options: [],
  },
  {
    key: 'material',
    label: 'Roofing Material',
    type: 'select',
    required: true,
    active: true,
    order: 2,
    options: [
      { value: 'asphalt', label: 'Architectural Asphalt Shingles', rate_per_sqft: 4.25 },
      { value: 'metal', label: 'Standing Seam Metal', rate_per_sqft: 8.50 },
      { value: 'cedar', label: 'Cedar Shake', rate_per_sqft: 9.75 },
      { value: 'flat_tpo', label: 'Flat Roof (TPO)', rate_per_sqft: 6.50 },
    ],
  },
  {
    key: 'pitch',
    label: 'Roof Pitch',
    type: 'select',
    required: true,
    active: true,
    order: 3,
    options: [
      { value: 'low', label: 'Low (2/12 – 4/12)', multiplier: 1.0 },
      { value: 'moderate', label: 'Moderate (5/12 – 7/12)', multiplier: 1.08 },
      { value: 'steep', label: 'Steep (8/12 – 10/12)', multiplier: 1.15 },
      { value: 'very_steep', label: 'Very Steep (11/12+)', multiplier: 1.25 },
    ],
  },
  {
    key: 'layers',
    label: 'Existing Roof Layers',
    type: 'select',
    required: true,
    active: true,
    order: 4,
    options: [
      { value: 'one', label: 'One Layer (no tear-off needed)', tear_off_per_sqft: 0 },
      { value: 'two', label: 'Two Layers', tear_off_per_sqft: 1.25 },
      { value: 'three', label: 'Three+ Layers', tear_off_per_sqft: 2.0 },
    ],
  },
  {
    key: 'stories',
    label: 'Number of Stories',
    type: 'select',
    required: true,
    active: true,
    order: 5,
    options: [
      { value: '1', label: 'Single Story', multiplier: 1.0 },
      { value: '2', label: 'Two Story', multiplier: 1.12 },
      { value: '3', label: 'Three Story', multiplier: 1.28 },
    ],
  },
];

async function main() {
  await prisma.lead.deleteMany();
  await prisma.config.deleteMany();

  await prisma.config.create({
    data: {
      configVersion: 3,
      businessName: 'Northline Roofing & Exteriors',
      businessRegion: 'Pacific Northwest',
      currency: 'USD',
      wasteFactor: 0.10,
      permitFlatFee: 350,
      rangeSpreadPct: 12,
      isActive: true,
      questions: JSON.stringify(seedQuestions),
    },
  });

  console.log('Seeded config version 3 successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
