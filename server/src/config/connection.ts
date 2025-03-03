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

// Check if we're in production (Render or similar environments)
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true, // Ensure SSL is used in production
              rejectUnauthorized: false, // Disable certificate validation (specific to Render)
            },
          }
        : {},
    })
  : new Sequelize(
      process.env.DB_NAME || '',  // Database name
      process.env.DB_USER || '',  // Database user
      process.env.DB_PASSWORD,    // Database password
      {
        host: 'localhost',         // Default to localhost for local development
        dialect: 'postgres',      // PostgreSQL dialect
        dialectOptions: {
          decimalNumbers: true,   // Ensure decimal numbers are returned correctly
        },
      }
    );

export default sequelize;
