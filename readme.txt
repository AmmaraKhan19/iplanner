- use the following command to run both servers simultaniously
     "npm run both"
- do this only after you have added the following line in frontend package.js file
    "both": "concurrently \"npm run start\"  \"cd..&& cd backend && npm run server\""