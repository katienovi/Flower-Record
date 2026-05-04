# Flower-Record
Term project for CSC 372 - Flower Record. 

<b>Setup instructions</b>
1. Clone the repository.
2. Install dependencies for this project using:
```bash
    cd Flower-Record
    npm install
```
The dependencies for this project should include:
- express
- dotenv
-  ejs
-  multer
-  pg
-  passport
-  passport-google-oauth20

3. Create a .env file at the base directory. In this file, add the ClientID and Client Secret from your Google App credentials, as well as your Neon connection string.
```bash
    DATABASE_URL='NEON STRING'
    clientID='clientIDFromGoogleCloud'
    clientSecret='clientSecretFromGoogleCloud'
```
4. Run the server using:
```bash
    node --watch server.js
```
You can access the deployed version of this app at [Placeholder until I actually deploy it]


<b>Reflection Write-up:</b> <br>
Design choices: I chose to use EJS for my frontend because it was what I felt most confident with. I prefer not to use React because I don't feel as familiar with it, and I don't feel as though I understood components enough to implement them at a wider scale for my project. I like how centralized everything feels for EJS. I chose express for my backend because I like its simplicity. Again, I just didn't feel as comfortable with the other options, and I felt like I had the most practical experience through our assignments and in-class tutorials using express. I used Neon because it was the database schema we discussed in class, and it also helped that I had been using it for my software engineering course as well. 

Challenges: One challenge I had was figuring out how to make my UV index and current temperature responsive based on the users location, instead of just having one static value fetched from the API that might not be representative of all users. I solved this issue by researching javascripts geolocation API and using that to get the users latititude and longitude. This works out, since both of my APIs used latitude and longitude as a parameter. 

Learning Outcomes: During this project, I learned how to develop a comprehensive full-stack application. I learned how both the frontend and backend work seperately, and how to combine both to make a responsive and well designed web app. I also learned about the importance of .env files and hiding *some* data from the user. I also learned how to do proper authentication using Google, and how to navigate Google's console.cloud.google.com to create credentials. Finally, I learned how to deploy a web app using Render, and how to include my authentication and database into the deployed app. 

Future work: In the future, I'd like to work on creating a dark mode version of this app, since the main user interface uses very light colors. 
