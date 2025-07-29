const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function setupAdminPanel() {
  console.log('🚀 Setting up Admin Panel...\n');

  // Check if environment variables are set
  if (!process.env.POSTGRES_URL) {
    console.error('❌ Error: POSTGRES_URL not found in .env.local');
    console.log('Please create a .env.local file with your database configuration.');
    console.log('See .env.example for reference.\n');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful\n');

    // Read and execute admin schema
    console.log('📋 Creating admin tables...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'admin-schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('✅ Admin tables created successfully\n');

    // Check if admin user already exists
    console.log('👤 Checking admin user...');
    const { rows } = await pool.query('SELECT username FROM admin_users WHERE username = $1', ['admin']);
    
    if (rows.length > 0) {
      console.log('✅ Admin user already exists\n');
    } else {
      // Create default admin user
      console.log('🔐 Creating default admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
        ['admin', hashedPassword]
      );
      console.log('✅ Default admin user created\n');
    }

    console.log('🎉 Admin Panel setup completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Visit: http://localhost:3000/admin/login');
    console.log('3. Login with:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  Remember to change the default password in production!\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('- Make sure PostgreSQL is running');
      console.log('- Check your POSTGRES_URL in .env.local');
      console.log('- Verify database credentials and permissions\n');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run setup if called directly
if (require.main === module) {
  setupAdminPanel();
}

module.exports = setupAdminPanel;
