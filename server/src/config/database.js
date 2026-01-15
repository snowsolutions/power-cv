/**
 * Database Configuration
 *
 * Prisma Client setup for PostgreSQL
 */

const { PrismaClient } = require('@prisma/client');

// Initialize Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
  errorFormat: 'pretty',
});

/**
 * Connect to database and verify connection
 * @returns {Promise<PrismaClient>}
 */
const connectDB = async () => {
  try {
    // Test the connection
    await prisma.$connect();

    console.log('✅ PostgreSQL Connected successfully');
    console.log('📦 Database: power_cv');

    return prisma;
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error.message);
    console.error('Please ensure PostgreSQL is running (docker-compose up -d)');

    // Exit process with failure in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }

    throw error;
  }
};

/**
 * Disconnect from database
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('PostgreSQL connection closed');
  } catch (error) {
    console.error('Error closing PostgreSQL connection:', error);
    throw error;
  }
};

/**
 * Graceful shutdown handler
 */
const setupGracefulShutdown = () => {
  process.on('SIGINT', async () => {
    console.log('\nSIGINT signal received: closing database connection');
    await disconnectDB();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing database connection');
    await disconnectDB();
    process.exit(0);
  });
};

module.exports = {
  prisma,
  connectDB,
  disconnectDB,
  setupGracefulShutdown,
};
