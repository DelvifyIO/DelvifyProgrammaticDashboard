# Delvify Dashboard Application

This is the application for Delvify. It is built with the JAMstack, using Gatsby JS on the frontend and netlify lambda to run serverless functions on the backend. The data is stored on Airtable.

## Developing the Application

### Installation / Setup

1. Make sure you have Node 10 or higher installed, as well as Yarn (package dependencies).
2. `yarn` or `npm install` installs the node packages.
3. `cat .env.example > .env` in the repository root
4. Change the values in `.env` to match the credentials (Ask Dan)

### Starting local development

- `yarn start` starts both the server and frontend in parallel.
  - `yarn start:app` starts the frontend application
  - `yarn start:lambda` starts the server
- The frontend is hosted on port 8000 while backend is hosted on port 9000

### Deployment

- The application deployment is managed by Netlify.
- Netlify has built in CI/CD that deploys on every push to github.

## Configuring Data

### Creating user accounts

- The application depends on Airtable user accounts to log in
- To create an account, add a row in the `users` table.
- Ensure you fill out the following fields:
  - `name` -> (required) the full name of the client.
  - `google_id` -> (required) the advertiser id given by google.
  - `email` -> (required) for user login. The email must be unique, and must be a valid email format.
  - `password` -> (required) for user login. Minimum 8 characters.

### Associating campaigns with the user

- On Airtable, create a new row in the `campaigns` table for each user campaign. **Important**: ensure ALL campaigns belonging to the user are on Airtable.
  - `display_name` -> (required) shown to the user after logging in.
  - `google_id` -> (required) the campaign id given by google.
  - `budget` -> (required) determines user maximum spend.
  - `user_id` -> (required) the Airtable id of the associated user.
  - `campaign_type` -> (optional) A or B.
  - `weekly_report_subscription` -> (optional) will be necessary in v2.

### Creating, updating, deleting and retrieving queries

- Curl or use [Postman](https://www.postman.com/) to make requests to the backend
- Before performing any requests to the backend, please make sure you follow the steps in "Getting the Token" to attach the Token to the request Header.
- Queries are ADVERTISER-WIDE. Each query would contain all campaigns associated to that advertiser.

#### Getting the Token

1. Make a POST request to `https://silly-jennings-eeb5b0.netlify.com/.netlify/functions/login`, with the body `{ "email": <user.email>, "password": <user.password> }` in Application/JSON format.
2. Keep note of (or Copy & Paste somewhere) the Token from the response. To do this, in the token field of the JSON response, copy the text between the two `"` signs. Don't copy the `"` signs. The token string should start with "ey".
3. In Headers, add a key-value pair. Key: `Authorization`, Value: `Bearer <TOKEN>`. Make sure your token contains no `"` signs.
4. Make sure these headers are present in any Create, Delete or Get request to the backend.

#### Create a query

1. Get the request body from dv360 google sheets -> queries tab -> Column I.
2. Replace ADVERTISER_ID with `user`'s google_id in Airtable.
3. Create a POST request to `https://silly-jennings-eeb5b0.netlify.com/.netlify/functions/reportqueries` with the above body in Application/JSON format.
4. Take note of the report ID from the response, and enter it onto the related field in the `users` table on Airtable.
5. **IMPORTANT:** Queries are run daily at 5am, so don't try logging in before then.

#### Delete a query

1. Get the query id from Airtable > `users` Table
2. Create a DELETE request to `https://silly-jennings-eeb5b0.netlify.com/.netlify/functions/reportqueries/<QUERY_ID>`.
3. The query will be deleted.

#### Get all queries for a particular user

1. Create a GET request to `https://silly-jennings-eeb5b0.netlify.com/.netlify/functions/reportqueries`. Make sure your token contains no `"` signs.
2. The response should contain a list of report query IDs.
