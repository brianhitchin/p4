<h1 style="text-align: center;"> Welcome to NeverAlone!</h1>

<p align="center">
Smack is a project developed to emulate <a href="https://slack.com">Slack</a>, built with flask backend and react frontend.
</p>

<p align="center">
<a href="https://www.linkedin.com/in/brian-hitchin-940b57268/">Linkedin</a>
</p>

<p align="center">
Please reference the <a href="https://github.com/brianhitchin/p4/wiki">Wiki</a> for full documentation, schema, store shape, and other information. 
</p>

## Getting started

1. Clone this repository.

2. Install dependencies in both app and react-app directories.

   -  In the app directory, run
      ```
      pipenv shell
      pipenv install
      ```

   - In the react-app directory, run
      ```
      npm install
      ```
   
3. Create a **.env** file based on the example with proper settings for your development environment. Basic **.env** file should include:

   - SECRET_KEY
   - DATABASE_URL (default: sqlite:///dev.db)
   - SCHEMA (default: flask_schema)

<br />

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, 

   ```bash
   npm start
   ```
