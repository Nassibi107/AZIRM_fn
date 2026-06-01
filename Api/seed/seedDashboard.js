/**
 * Dashboard seed / migration script.
 *
 * What it does:
 *   1. Syncs the Sequelize models to the database (creates the tables if the
 *      DB is empty -- this is the "migration" step for the dashboard users).
 *   2. Inserts a demo Company and a set of fake users covering every role,
 *      so the empty dashboard has data to show.
 *   3. Generates a QR code per user (same as the real register flow) and a
 *      PDF "mini doc" (seed/accounts.pdf) listing every account's login
 *      credentials.
 *
 * Run with:  npm run seed
 *
 * NOTE: the dashboard login (adminMiddleware) only lets role === 'admin'
 *       through, so use the admin account below to sign in.
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

const db = require('../db/db');
const Model = require('../Models');

const URL_SQ = process.env.SQ_URL_REDIRECT || 'http://localhost:4000';

// QR codes are served from controllers/public/qrcodes (see adminController.js)
const qrCodeDirectory = path.join(__dirname, '..', 'controllers', 'public', 'qrcodes');
fs.mkdirSync(qrCodeDirectory, { recursive: true });

// Demo company every seeded user belongs to.
const DEMO_COMPANY = { label: 'Azirm Montreal' };

// Plain passwords are kept here ONLY so they can be printed in the PDF doc.
// They are stored hashed in the database.
const FAKE_USERS = [
  {
    firstName: 'Yassine', lastName: 'Admin', role: 'admin',
    email: 'admin@azirm.ca', phoneNumber: '(514) 555-0100',
    address: '1000 Rue Sainte-Catherine, Montreal, QC', password: 'Admin@123',
    income: 0, team_member_id: 'TM-ADMIN-01',
  },
  {
    firstName: 'Sophie', lastName: 'Tremblay', role: 'assistant',
    email: 'sophie.assistant@azirm.ca', phoneNumber: '(514) 555-0101',
    address: '215 Avenue du Mont-Royal, Montreal, QC', password: 'Assist@123',
    income: 0, team_member_id: 'TM-ASSIST-01',
  },
  {
    firstName: 'Karim', lastName: 'Benali', role: 'teamLeader',
    email: 'karim.teamlead@azirm.ca', phoneNumber: '(438) 555-0102',
    address: '4040 Boulevard Saint-Laurent, Montreal, QC', password: 'Team@1234',
    income: 1250.50, team_member_id: 'TM-TEAM-01',
  },
  {
    firstName: 'Amine', lastName: 'Rachid', role: 'Leader',
    email: 'amine.leader@azirm.ca', phoneNumber: '(438) 555-0103',
    address: '7100 Rue Jean-Talon, Montreal, QC', password: 'Leader@123',
    income: 2480.75, team_member_id: 'TM-LEAD-01',
  },
  {
    firstName: 'Lina', lastName: 'Hamdani', role: 'distributeur',
    email: 'lina.distrib@azirm.ca', phoneNumber: '(514) 555-0104',
    address: '900 Rue Notre-Dame, Montreal, QC', password: 'Distri@123',
    income: 640.00, team_member_id: 'TM-DIST-01',
  },
  {
    firstName: 'Omar', lastName: 'Fakhouri', role: 'distributeur',
    email: 'omar.distrib@azirm.ca', phoneNumber: '(514) 555-0105',
    address: '320 Rue Sherbrooke, Montreal, QC', password: 'Distri@456',
    income: 815.25, team_member_id: 'TM-DIST-02',
  },
  {
    firstName: 'Nadia', lastName: 'Cloutier', role: 'assistant',
    email: 'nadia.assistant@azirm.ca', phoneNumber: '(450) 555-0106',
    address: '55 Rue Saint-Jacques, Montreal, QC', password: 'Assist@456',
    income: 0, team_member_id: 'TM-ASSIST-02',
  },
  {
    firstName: 'Yacine', lastName: 'Bouzid', role: 'teamLeader',
    email: 'yacine.teamlead@azirm.ca', phoneNumber: '(438) 555-0107',
    address: '1500 Avenue Papineau, Montreal, QC', password: 'Team@5678',
    income: 1980.00, team_member_id: 'TM-TEAM-02',
  },
];

async function buildPdf(createdUsers, company) {
  const pdfPath = path.join(__dirname, 'accounts.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(fs.createWriteStream(pdfPath));

  // Header
  doc.fontSize(20).fillColor('#1a1a1a').text('Azirm — Comptes du tableau de bord', { align: 'center' });
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor('#666')
    .text(`Document genere le ${new Date().toLocaleString('fr-CA')}`, { align: 'center' });
  doc.moveDown(0.2);
  doc.fontSize(10).fillColor('#666')
    .text(`Entreprise: ${company.label} (ID ${company.cmpID})`, { align: 'center' });
  doc.moveDown(1);

  doc.fontSize(9).fillColor('#b00020')
    .text('Confidentiel — contient des mots de passe en clair. A remettre en main propre.', { align: 'center' });
  doc.moveDown(1);

  // One "mini doc" card per account
  createdUsers.forEach((u, i) => {
    if (doc.y > 680) doc.addPage();

    const top = doc.y;
    doc.roundedRect(50, top, 495, 120, 6).strokeColor('#dddddd').stroke();

    doc.fontSize(13).fillColor('#0b5394')
      .text(`${i + 1}. ${u.firstName} ${u.lastName}`, 65, top + 12);
    doc.fontSize(9).fillColor('#444')
      .text(`Role: ${u.role}`, 400, top + 14, { width: 130, align: 'right' });

    const lineY = top + 38;
    doc.fontSize(10).fillColor('#000');
    doc.text(`Email      : ${u.email}`, 65, lineY);
    doc.text(`Mot de passe: ${u.password}`, 65, lineY + 16);
    doc.text(`Telephone  : ${u.phoneNumber}`, 65, lineY + 32);
    doc.text(`Member ID  : ${u.team_member_id}`, 300, lineY + 32);
    doc.fontSize(8).fillColor('#888')
      .text(`User ID #${u.id} • Adresse: ${u.address}`, 65, lineY + 50, { width: 465 });

    doc.y = top + 132;
  });

  doc.moveDown(1);
  doc.fontSize(9).fillColor('#666')
    .text('Connexion au tableau de bord: seul le compte avec le role "admin" est autorise.', { align: 'left' });

  doc.end();

  // Wait for the file to finish writing.
  await new Promise((resolve) => doc.on('end', resolve));
  return pdfPath;
}

async function run() {
  try {
    console.log('→ Syncing models to the database (creating tables if missing)...');
    await db.sync(); // creates Users / Companies / Donations / ... tables if absent
    console.log('✔ Schema synced.');

    // Company
    const [company] = await Model.Company.findOrCreate({
      where: { label: DEMO_COMPANY.label },
      defaults: DEMO_COMPANY,
    });
    console.log(`✔ Company ready: ${company.label} (ID ${company.cmpID})`);

    const createdUsers = [];

    for (const u of FAKE_USERS) {
      const existing = await Model.User.findOne({ where: { email: u.email } });
      if (existing) {
        console.log(`• Skipped (already exists): ${u.email}`);
        createdUsers.push({ ...u, id: existing.id });
        continue;
      }

      const hashed = await bcrypt.hash(u.password, 10);
      const user = await Model.User.create({
        firstName: u.firstName,
        lastName: u.lastName,
        phoneNumber: u.phoneNumber,
        email: u.email,
        role: u.role,
        address: u.address,
        password: hashed,
        income: u.income,
        status: 1,
        team_member_id: u.team_member_id,
        CmpRid: company.cmpID,
      });

      // QR code, same convention as the register controller.
      const qrCodeFileName = `user_${user.id}.png`;
      await QRCode.toFile(
        path.join(qrCodeDirectory, qrCodeFileName),
        `${URL_SQ}/userQr/${user.id}`
      );
      user.qr = `/qrcodes/${qrCodeFileName}`;
      await user.save();

      createdUsers.push({ ...u, id: user.id });
      console.log(`✔ Created ${u.role.padEnd(12)} ${u.email} (ID ${user.id})`);
    }

    const pdfPath = await buildPdf(createdUsers, company);
    console.log(`\n✔ Accounts PDF written to: ${pdfPath}`);
    console.log('\nDone. Use admin@azirm.ca / Admin@123 to log into the dashboard.');
    await db.close();
    process.exit(0);
  } catch (err) {
    console.error('�‌✗ Seed failed:', err);
    process.exit(1);
  }
}

run();
