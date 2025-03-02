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

// Check if DB_URL is provided, if so use it; otherwise, fall back to individual connection details
let sequelize: Sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

  // Ensure that required environment variables are present
  if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
    throw new Error('Missing required database connection environment variables: DB_NAME, DB_USER, or DB_PASSWORD');
  }

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',  // or your database host, if different
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,  // This option helps ensure correct handling of decimal values
    },
  });
}

export default sequelize;
