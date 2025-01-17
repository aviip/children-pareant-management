require("dotenv").config();

const CONFIG = {
  DB: {
    DB_HOST: process.env.MONGODB_URL,
    DB_NAME: process.env.DB_NAME,
  },
  HOST: {
    web: process.env.CLIENT,
    android: process.env.CREATION_PORTAL_URL,
  },
  APIS: {
    auth: "/api/v1/auth",
    profile: "/api/v1/profile",
    parent:"/api/v1/parent",
  },
  KEYS: {
    CLOUDINARY: {
      CLOUD_NAME: process.env.CLOUD_NAME,
      API_KEY: process.env.CLOUDINARY_API_KEY,
      API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    NODEMAILER: {
      MAIL_HOST: process.env.MAIL_HOST,
      MAIL_USER: process.env.MAIL_USER,
      HOST_PASS: process.env.MAIL_PASS,
    },
  },
  JWT: {
    TOKEN: process.env.JWT_SECRET,
  },
  ACCOUNT_TYPE: {
    PARENT: "Parent",
    CHILD: "Child",
  },
  STORE_TYPE: {
    STORE: "Store",
    DISTRIBUTION_CENTER: "Distribution Center",
  },
};

module.exports = {
  CONFIG,
};
