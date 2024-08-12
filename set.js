const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FtK2xIT3VPRklmVW14Q0F4TldjV2IyalNqekdGUndrL1RKeFBvS0kzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3pzUTNmdk40dGpMU0NpVU95RlV6bWh5TVNVQTVET0c1MG1mTmpwQXRnQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSXVxOGVGbFVPR01vTFIzWWNnOEhVVlF5Z3l2SE80VC84NmtMWDRnZUdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsRHNtcE4veTNRU0NkZ3dNdUIrVkloTVVCWi9PakV3UW5wS2JaUXFVTzJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPNHNHakozY3RNM0hpdlM2Vkh5dkJzSmVXTU5FSm9aZGFqc2YzR0RnSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inpnd0k0MEZYa20zSVAwWVpxR1Q1dWEwT01YWWlzTTBqTUMvaVVNYnpBdzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVBxZ3UyVWRxOXdJYXRIcnJST0l6N0VuUkRYekRvdnF0WmsxUU1CTTBIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFo5SlpUSTNOT3dhU2ExeTBhTHRKMWh1V0JKMmx5UUxuKzNpejF1eTF3QT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImM1M0hNNFRTNDRPcTJEY1BhVkdPdURvM0t0a1huOGZ1SmdVUng4NjVzUWl1TTlsYWMwL2x5L2pXMVh0bnB0aExNNXBuT2ZrakZrTGZVNHNhblUzMEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJaQk9xMlhwdk5JeXZvdktQSkZiNXc0SDNKUWZ6amNDYmQ2Qmw2clNyVis4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmSGEyTTg1Q1FYaWxST3N2ZURPeG9RIiwicGhvbmVJZCI6ImE3MjZlNmQ0LWZhOTgtNGFhOC1iYTM0LTFkZDhjM2U1NjQzYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3SUdZd0JEV2VNTE1QcktZeUdtb09XWEJ3Vms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1lRVzh0dG9VQjNDQ2lmWGNxUmgxVFJFWHlRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilg4R1ZCWFFZIiwibWUiOnsiaWQiOiIyMzQ3MDE3MTkzNTI3OjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01EOXVMTUZFTy8vNmJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVJb1hJakNCRWNQRDJVdmJBQWxhZmFWQkRFeitNOUxwbjFiUnhSTTdBaW89IiwiYWNjb3VudFNpZ25hdHVyZSI6ImVoREpZbFlzVTBmUEdiTXZJeG96UXNTMTJGMmYwVkR6R1N4TVFDbDF6WUhWVXZWL3AwS3ZhMnZGdHc0K3kwY1pwOWY0WVJORTBnanQvVmFLL204WUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsT0VkVG5QMWRvalNsOXZ1TFc2YmQwVS9uR1BYL2RzakFVcFh4RENnUkJTYkdTa3RZSWdxU1V1OUxLOUtIemlwUUJHZ0VubERqSk1tQ0NBZDFOWThCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMTcxOTM1Mjc6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWQ0tGeUl3Z1JIRHc5bEwyd0FKV24ybFFReE0valBTNlo5VzBjVVRPd0lxIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNDk4NDkyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
