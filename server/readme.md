- Install all the packages required for backend.
- After installing nodemon add the following line in the scripts part of package.json file
"server": "nodemon server.js"
- And run the server using "npm run server" command
- Doing this will allow you to run the backend server if error occurs while using following default command
"nodemon .\index.js"


- create an index.js file. this will be the entry point to the backend
- copy the basic code from express js website and make small required changes like
     * change port from 3000 to 5000
     * and add http://localhost before the port