#ilikethenightlife

Search for bars in a city and let your friends know that you are going there

App is live on heroku at: [ilikethenightlife](https://fast-temple-8765.herokuapp.com/)

User Story: As an unauthenticated user, I can view all bars in my area.

User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.

User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.

User Story: As an unauthenticated user, when I login I should not have to search again.

Resources:
1. Started with the 'clementinejs-fcc' boilerplate code:
https://github.com/johnstonbl01/clementinejs-fcc

2. I found a good yelp search function that I am using basically verbatim:
https://arian.io/how-to-use-yelps-api-with-node/

Requirements:
Everything required is in the package.json. After running npm install you need to create a .env file in the root of your project.
The .env should contain:
FACEBOOK_APP_ID
FACEBOOK_APP_SECRET
MONGO_URI
PORT
APP_URL
SESSION_SECRET
YELP_CONSUMER_KEY
YELP_CONSUMER_SECRET
YELP_TOKEN
YELP_TOKEN_SECRET