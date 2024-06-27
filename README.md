## How to start the server

-Prequisites
npm install express

Start server by entering >>> node app.js

Verify server is running by going to >>> Server is running on http://localhost:3000


getEvent: 

```
curl --location --request GET 'http://localhost:3000/api/events?userId=1111' \
--header 'x-my-app-test-auth: 1111' \
--header 'Content-Type: application/json' \
--data '{
    "jpmcLocation": "Palo Alto"
}'
```

postEvent:
```
curl --location 'http://localhost:3000/api/events/create' \
--header 'x-my-app-test-auth: 1111' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1234,
    "location": "NYC office",
    "description": "PS 5 games",
    "userId": 123,
    "category": "Video Games",
    "jpmcLocation": "New York"
}'
```

updateEvent:
```
curl --location --request PATCH 'http://localhost:3000/api/events/update?eventId=123' \
--header 'x-my-app-test-auth: 1111' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1234,
    "location": "New NYC office",
    "description": "Lets play PS 5 games",
    "userId": 123,
    "category": "Video Games",
    "jpmcLocation": "New York"
}'
```
