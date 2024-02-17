# Game API Spec

## Sign Up User

Endpoint : https://joey-pet-minnow.ngrok-free.app/api/signup

Method : POST

Request Body :

```json
{
  "username": "densa123",
  "password": "densa123", // ketika di save buat jadi form data
  "retypePassword": "densa123",
  "name": "Deni Saputra"
}
```

Response Body (Success):

```json
{
  "data": "Ok"
}
```

Response Body (Failed):

```json
{
  "errors": "Username has already exist"
}
```

## Login User

Endpoint : https://joey-pet-minnow.ngrok-free.app/api/login

Method : POST

Request Body :

```json
{
  "username": "densa123",
  "password": "densa123" //form data
}
```

Response Body (Success):

```json
{
  "data": {
    "token": "TOKEN"
  }
}
```

Response Body (Failed, 401):

```json
{
  "errors": "username or password is incorrect"
}
```

## Game Display

Endpoint : https://joey-pet-minnow.ngrok-free.app0/api/game/{username}

Method : POST

Request Header :

- X-API-TOKEN : Token (Mandatory)

Request Body :

```json
{
  "userMove": "gunting",
  "computerMove": "kertas" //di random
}
```

Response Body (Success):

```json
{
  "data": "anda menang!"
}
```

Response Body (Failed, 401):

```json
{
  "errors": "Unauthorized"
}
```

## Leaderboard

Endpoint : https://joey-pet-minnow.ngrok-free.app/api/game/leaderboard/{username}

Method : POST

Request Header :

- X-API-TOKEN : Token (Mandatory)

Response Body (Success) :

```json
{
  "username": "densa123",
  "name": "Deni Saputra",
  "userWins": 5
},
{
  "username": "player2",
  "name": "PLAYER 2",
  "userWins": 3
}

```

## Reset Game

Endpoint : https://joey-pet-minnow.ngrok-free.app/api/game/reset/{username}

Method : POST

Request Header :

- X-API-TOKEN : Token (Mandatory)

Response Body (Success) :

```json
{
  "data": "Ok"
}
```
## Logout User

Endpoint : https://joey-pet-minnow.ngrok-free.app/api/logout/{username}

Method : DELETE

Request Header :

- X-API-TOKEN : Token (Mandatory)

Response Body (Success) :

```json
{
  "data": "Ok"
}
```