/**
 * Minimal seed script for the loyalty system.
 * Shared DB: mysql://root:root@localhost:3306/basiq360
 *
 * Run: node --import ../aliasLoader.js prisma/seed.js
 */

import prisma from '@shared/dbConfig/database.js';

async function main() {
  console.log('🌱 Starting seed...\n');

  // ─────────────────────────────────────────────
  // 1. CREATE MISSING TABLES (distribution_network, scan_limit)
  // ─────────────────────────────────────────────
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`distribution_network\` (
      \`id\`                INT          NOT NULL AUTO_INCREMENT,
      \`date_created\`      DATETIME(3)  NOT NULL,
      \`created_by\`        INT          NULL,
      \`created_by_name\`   VARCHAR(40)  NULL,
      \`module_name\`       VARCHAR(300) NULL,
      \`distribution_type\` VARCHAR(30)  NULL,
      \`del\`               BIT(1)       NOT NULL DEFAULT b'0',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('✅ distribution_network table ensured');

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`scan_limit\` (
      \`id\`              INT          NOT NULL AUTO_INCREMENT,
      \`updated_on\`      DATETIME(3)  NULL,
      \`updated_by_id\`   INT          NULL,
      \`updated_by_name\` VARCHAR(100) NULL,
      \`scan_limit\`      INT          NULL DEFAULT 10,
      \`spin_limit\`      INT          NULL DEFAULT 3,
      \`redeem_limit\`    INT          NULL DEFAULT 5,
      \`del\`             TINYINT(1)   NOT NULL DEFAULT 0,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('✅ scan_limit table ensured');

  // ─────────────────────────────────────────────
  // 2. distribution_network  (influencer type list for app registration)
  // ─────────────────────────────────────────────
  const dnCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM distribution_network`;
  if (Number(dnCount[0].c) === 0) {
    await prisma.$executeRaw`
      INSERT INTO distribution_network (date_created, created_by_name, module_name, distribution_type, del)
      VALUES
        (NOW(), 'system', 'Painter',     'Influencer', b'0'),
        (NOW(), 'system', 'Contractor',  'Influencer', b'0'),
        (NOW(), 'system', 'Karigar',     'Influencer', b'0')
    `;
    console.log('✅ distribution_network seeded (3 influencer types)');
  } else {
    console.log('⏭  distribution_network already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 3. point_master  (welcome/referral point config)
  //    Required non-nullable fields: created_by_id, created_by_name,
  //    welcome_point, birthday_point, anniversary_point,
  //    registration_refferal, registration_refferal_own, org_id
  // ─────────────────────────────────────────────
  const pmCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM point_master`;
  if (Number(pmCount[0].c) === 0) {
    await prisma.$executeRaw`
      INSERT INTO point_master
        (created_by_id, created_by_name, welcome_point, birthday_point,
         anniversary_point, registration_refferal, registration_refferal_own,
         transaction_incentive, site_point, del)
      VALUES
        (1, 'system', 100, 50, 50, 50, 25, 10, 5, 0)
    `;
    console.log('✅ point_master seeded (welcome=100, referral=50/25)');
  } else {
    console.log('⏭  point_master already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 4. roles  (designations for SFA/web users)
  //    Required: role_name (unique), user_type enum('Sales','System')
  //    created_by_id, created_by_name are required (NO NULL, no default)
  // ─────────────────────────────────────────────
  const roleNames = ['Admin', 'Sales Executive', 'Manager', 'Distributor', 'Retailer'];
  for (const name of roleNames) {
    const existing = await prisma.$queryRawUnsafe(
      `SELECT id FROM roles WHERE role_name = ? LIMIT 1`, name
    );
    if (existing.length === 0) {
      const type = name === 'Admin' ? 'SYSTEM' : 'SALES';
      await prisma.$executeRawUnsafe(
        `INSERT INTO roles (created_by_id, created_by_name, role_name, role_type, user_type, del)
         VALUES (1, 'system', ?, ?, ?, 0)`,
        name, type, type
      );
      console.log(`✅ role created: ${name}`);
    }
  }

  // ─────────────────────────────────────────────
  // 5. module_master  (web admin navigation modules)
  //    Required: created_by_id, created_by_name, module_name, department_name
  // ─────────────────────────────────────────────
  const modules = [
    { name: 'Dashboard',              dept: 'Admin'   },
    { name: 'User Management',        dept: 'Admin'   },
    { name: 'Influencer Management',  dept: 'Network' },
    { name: 'Point Configuration',    dept: 'Admin'   },
    { name: 'Coupon Management',      dept: 'QR'      },
    { name: 'Gift Gallery',           dept: 'Redeem'  },
    { name: 'Redeem Requests',        dept: 'Redeem'  },
    { name: 'Reports',                dept: 'Reports' },
    { name: 'Banner Management',      dept: 'Admin'   },
    { name: 'FAQ',                    dept: 'Admin'   },
  ];
  for (const m of modules) {
    const existing = await prisma.$queryRawUnsafe(
      `SELECT id FROM module_master WHERE module_name = ? LIMIT 1`, m.name
    );
    if (existing.length === 0) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO module_master
           (created_by_id, created_by_name, module_name, department_name,
            \`add\`, view, edit, \`delete\`, \`import\`, export, approval, del)
         VALUES (1, 'system', ?, ?, 1, 1, 1, 1, 1, 1, 1, 0)`,
        m.name, m.dept
      );
      console.log(`✅ module created: ${m.name}`);
    }
  }

  // ─────────────────────────────────────────────
  // 6. scan_limit  (1 global config row)
  // ─────────────────────────────────────────────
  const slCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM scan_limit`;
  if (Number(slCount[0].c) === 0) {
    await prisma.$executeRaw`
      INSERT INTO scan_limit (scan_limit, spin_limit, redeem_limit, del)
      VALUES (10, 3, 5, 0)
    `;
    console.log('✅ scan_limit seeded');
  } else {
    console.log('⏭  scan_limit already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 7. master_category
  // ─────────────────────────────────────────────
  const catCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM master_category`;
  if (Number(catCount[0].c) === 0) {
    await prisma.$executeRaw`
      INSERT INTO master_category (category, status, del)
      VALUES
        ('Paint',     1, 0),
        ('Primer',    1, 0),
        ('Putty',     1, 0),
        ('Accessories', 1, 0)
    `;
    console.log('✅ master_category seeded (4 categories)');
  } else {
    console.log('⏭  master_category already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 8. master_sub_category
  //    Required: created_by_id, created_by_name, master_category_id, sub_category_name
  // ─────────────────────────────────────────────
  const scCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM master_sub_category`;
  if (Number(scCount[0].c) === 0) {
    const cat = await prisma.$queryRaw`SELECT id FROM master_category WHERE category = 'Paint' LIMIT 1`;
    const catId = cat[0]?.id || 1;
    await prisma.$executeRawUnsafe(
      `INSERT INTO master_sub_category
         (created_by_id, created_by_name, master_category_id, sub_category_name, status, del)
       VALUES
         (1, 'system', ?, 'Interior Paint', 1, 0),
         (1, 'system', ?, 'Exterior Paint', 1, 0),
         (1, 'system', ?, 'Emulsion',       1, 0)`,
      catId, catId, catId
    );
    console.log('✅ master_sub_category seeded');
  } else {
    console.log('⏭  master_sub_category already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 9. point_category_master
  //    Required: created_by_id, created_by_name, point_category_name, influencer_point
  // ─────────────────────────────────────────────
  const pcCount = await prisma.$queryRaw`SELECT COUNT(*) as c FROM point_category_master`;
  if (Number(pcCount[0].c) === 0) {
    await prisma.$executeRaw`
      INSERT INTO point_category_master
        (created_by_id, created_by_name, point_category_name, contractor_point, painter_point, del)
      VALUES
        (1, 'system', 'Standard', 10, 10, 0),
        (1, 'system', 'Premium',  20, 20, 0)
    `;
    console.log('✅ point_category_master seeded');
  } else {
    console.log('⏭  point_category_master already has data, skipping');
  }

  // ─────────────────────────────────────────────
  // 10. superadmin sfa_user
  //     contact_01 = 9319180958 → always gets OTP 123456 (bypass)
  //     username: superadmin | password: superadmin@123
  // ─────────────────────────────────────────────
  const adminRole = await prisma.$queryRaw`SELECT id FROM roles WHERE role_name = 'Admin' LIMIT 1`;
  const adminRoleId = adminRole[0]?.id || 1;

  const superadminExists = await prisma.$queryRawUnsafe(
    `SELECT id FROM sfa_user WHERE username = ? LIMIT 1`, 'superadmin'
  );
  if (superadminExists.length === 0) {
    await prisma.$executeRawUnsafe(
      `INSERT INTO sfa_user
         (user_type, login_type, name, username, password, contact_01,
          designation_id, designation_name, status, date_created)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      'SYSTEM', 'WEB', 'Super Admin', 'superadmin', 'superadmin@123',
      '9319180958', adminRoleId, 'Admin', true
    );
    console.log('✅ superadmin user created (username: superadmin | password: superadmin@123 | OTP: 123456)');
  } else {
    console.log('⏭  superadmin already exists, skipping');
  }

  // ─────────────────────────────────────────────
  // 11. assign all modules to Admin designation
  // ─────────────────────────────────────────────
  const allModules = await prisma.$queryRaw`SELECT id, module_name, department_name FROM module_master WHERE del = 0`;
  for (const mod of allModules) {
    const existing = await prisma.$queryRawUnsafe(
      `SELECT id FROM assign_designation_module WHERE designation_id = ? AND module_id = ? LIMIT 1`,
      adminRoleId, mod.id
    );
    if (existing.length === 0) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO assign_designation_module
           (created_by_id, created_by_name, designation_id, designation_name,
            module_id, module_name, department_name,
            \`add\`, view, edit, \`delete\`, \`import\`, export, approval, del)
         VALUES (1, 'system', ?, 'Admin', ?, ?, ?, 1, 1, 1, 1, 1, 1, 1, 0)`,
        adminRoleId, mod.id, mod.module_name, mod.department_name
      );
      console.log(`✅ Admin assigned module: ${mod.module_name}`);
    }
  }

  console.log('\n✅ Seed complete.\n');
}

main()
  .catch(e => { console.error('❌ Seed failed:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
