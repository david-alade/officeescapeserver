## How to start the server

-Prequisites
npm install express

Start server by entering >>> node app.js

Verify server is running by going to >>> Server is running on http://localhost:3000

## API Endpoints

### Events endpoints
### getEvent: 

```
curl --location --request GET 'http://localhost:3000/api/events?userId=1111' \
--header 'x-my-app-test-auth: 1111' \
--header 'Content-Type: application/json' \
--data '{
    "jpmcLocation": "Palo Alto"
}'
```

### postEvent:
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

### updateEvent:
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

### User endpoints

Get user events Endpoint - /api/users/getUserEvents
```
Request- pass in user id ex. 1, 2, 111 etc
Sample response:
Events Data: [
  {
    id: 123456,
    created_at: '2024-06-27T22:15:09.825326+00:00',
    location: '3223 Hanover St, Palo Alto, CA 94304',
    description: 'ping pong games',
    images: null,
    userId: 1111,
    category: 'sports',
    jpmcLocation: 'PALOALTO'
  },
  {
    id: 111222,
    created_at: '2024-06-27T22:53:13.818608+00:00',
    location: 'JPMC Plano Office',
    description: 'pickleball challenge',
    images: null,
    userId: 111111,
    category: 'sports',
    jpmcLocation: 'PLANO'
  }
]
```

Get profile Endpoint - /api/users/getProfile
```
Request- pass in user id ex. 1, 2, 111 etc
Sample response
{
  name: 'John Doe',
  bio: 'Passionate developer exploring new technologies',
  interests: null,
  jpmc_location: 'NEWYORK'
}
```



Update profile Endpoint - /api/users/getProfile
```
Request- pass in json with fields to update
{
    "name": "Kolade Adegbaye",
    "bio": "backend engineer at JPMC",
    "interests": ["soccer and basketball"],
    "jpmc_location": "palo alto, CA"
}

Sample response
Check db for update - should return profile updated!
```

Create User Endpoint - /api/users/getProfile
```
Request- pass in user id ex. 1, 2, 111 etc
Sample response
Check db for creation - should return User created!
```



