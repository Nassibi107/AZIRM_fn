/**
 * Cash Report seed.
 *
 * The dashboard "Cash Report" page (page-sections/dashboards/Cash/Cash.jsx)
 * calls GET /ad/reportDaily -> getDonationsByDate -> getDonationsSummary,
 * which aggregates the `Donation` table joined to `User`. With an empty DB
 * the page shows nothing.
 *
 * This script creates fake `Donation` rows (with Montreal lat/lng so the
 * detail page's address lookup works) spread across the last 14 days, plus a
 * couple of `Don_Details` lines per donation.
 *
 * Run with:  npm run seed:cash
 * Re-seed (wipes existing donations first):  RESEED=1 npm run seed:cash
 */

require('dotenv').config();
const db = require('../db/db');
const Model = require('../Models');

// Field agents who actually collect cash (these show up on the Cash Report).
const COLLECTOR_ROLES = ['distributeur', 'Leader', 'teamLeader'];

// A handful of Montreal-area points so the map / address lookup is realistic.
const MONTREAL_SPOTS = [
  { lat: 45.5017, lng: -73.5673 }, // Downtown
  { lat: 45.5088, lng: -73.554 },  // Old Montreal
  { lat: 45.5231, lng: -73.5817 }, // Plateau
  { lat: 45.5601, lng: -73.6157 }, // Villeray
  { lat: 45.4769, lng: -73.5996 }, // Verdun
  { lat: 45.495,  lng: -73.5779 }, // Westmount
  { lat: 45.5377, lng: -73.6213 }, // Rosemont
  { lat: 45.4581, lng: -73.6391 }, // LaSalle
];

const DAYS_BACK = 14;          // spread donations across the last 2 weeks
const MIN_PER_DAY = 1;         // donations per collector per day (range)
const MAX_PER_DAY = 4;
const MIN_AMOUNT = 5;
const MAX_AMOUNT = 100;

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const round2 = (n) => Math.round(n * 100) / 100;
const round5 = (n) => Math.round(n * 1e5) / 1e5;

// A donation at a given day, with a random time during working hours.
function makeDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(randInt(9, 19), randInt(0, 59), randInt(0, 59), 0);
  return d;
}

async function run() {
  try {
    await db.sync();

    const collectors = await Model.User.findAll({
      where: { role: COLLECTOR_ROLES },
    });

    if (collectors.length === 0) {
      console.error('✗ No collector users found. Run `npm run seed` first.');
      process.exit(1);
    }

    const existing = await Model.Donation.count();
    if (existing > 0) {
      if (process.env.RESEED === '1') {
        console.log(`• RESEED=1 -> deleting ${existing} existing donations...`);
        await Model.Don_Details.destroy({ where: {} });
        await Model.Donation.destroy({ where: {} });
      } else {
        console.log(`• ${existing} donations already exist. Skipping.`);
        console.log('  Run with RESEED=1 to wipe and re-create.');
        await db.close();
        process.exit(0);
      }
    }

    let totalDonations = 0;
    let totalDetails = 0;
    let grandTotal = 0;

    for (const user of collectors) {
      for (let day = 0; day < DAYS_BACK; day++) {
        const count = randInt(MIN_PER_DAY, MAX_PER_DAY);
        for (let i = 0; i < count; i++) {
          const amount = round2(rand(MIN_AMOUNT, MAX_AMOUNT));
          const spot = pick(MONTREAL_SPOTS);
          const createdAt = makeDate(day);
          const feed = Math.max(1, Math.round(amount / 15)); // ~children fed

          const donation = await Model.Donation.create({
            amount,
            type: pick(['cash', 'card', 'interac']),
            feed,
            lat: round5(spot.lat + rand(-0.004, 0.004)), // jitter ~±0.004°
            lng: round5(spot.lng + rand(-0.004, 0.004)),
            userId: user.id,
            createdAt,
            updatedAt: createdAt,
          }, { silent: true });

          // Break the donation into 1-2 detail lines.
          const lines = randInt(1, 2);
          let remaining = amount;
          for (let l = 0; l < lines; l++) {
            const isLast = l === lines - 1;
            const lineAmount = isLast ? round2(remaining) : round2(rand(1, remaining));
            remaining = round2(remaining - lineAmount);
            await Model.Don_Details.create({
              amount: lineAmount,
              type: donation.type,
              feed: Math.max(1, Math.round(lineAmount / 15)),
              num_p: String(randInt(1, 5)),
              description: pick(['Repas enfant', 'Kit scolaire', 'Don general', 'Vetements']),
              donationId: donation.idD,
            });
            totalDetails++;
          }

          totalDonations++;
          grandTotal += amount;
        }
      }
      console.log(`✔ Donations seeded for ${user.firstName} ${user.lastName} (${user.role})`);
    }

    console.log(`\n✔ Created ${totalDonations} donations + ${totalDetails} detail lines`);
    console.log(`  Total cash collected: $${round2(grandTotal)}`);
    console.log('  Open the Cash Report page and pick a date range covering the last 14 days.');
    await db.close();
    process.exit(0);
  } catch (err) {
    console.error('✗ Cash seed failed:', err);
    process.exit(1);
  }
}

run();
