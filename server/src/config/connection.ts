// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(
//       process.env.DB_NAME || '',
//       process.env.DB_USER || '',
//       process.env.DB_PASSWORD,
//       {
//         host: 'localhost',
//         dialect: 'postgres',
//         dialectOptions: {
//           decimalNumbers: true,
//         },
//       }
//     );

// export default sequelize;

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Check if DB_URL (for Render) is provided, if so, use it; otherwise, fall back to individual connection details
let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // If DATABASE_URL is available (for Render), use it
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Ensures SSL is enabled (important for Render)
        rejectUnauthorized: false, // Allow self-signed certificates (common for cloud providers)
      },
    },
  });
} else {
  // Fall back to individual environment variables (for local development)
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

  // Ensure that required environment variables are present
  if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error('Missing required database connection environment variables: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, or DB_PORT');
  }

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST, // Use DB_HOST for local setup
    port: DB_PORT ? parseInt(DB_PORT) : 5432, // Use DB_PORT for local setup, default to 5432
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,  // This option helps ensure correct handling of decimal values
    },
  });
}

export default sequelize;
