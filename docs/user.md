# User API Specs

### Group : User

## Register User API

#### Endpoint : `POST /api/users`

#### Request Body :

```json
{
  "username": "username example",
  "password": "passwordexample",
  "name": "name example"
}
```

#### Response Body (Success) :

```json
{
  "status": "201",
  "message": "USER_CREATED_SUCCESSFULLY",
  "data": {
    "username": "username example",
    "name": "name example"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "err message"
}
```

## Login User API

#### Endpoint : `POST /api/users/login`

#### Request Body :

```json
{
  "username": "username example",
  "password": "passwordexample"
}
```

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "USER_LOGGEDIN_SUCCESSFULLY",
  "data": {
    "token": "unique-token-example"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "ERR_MESSAGE"
}
```

## Update User API

#### Endpoint : `PATCH /api/users/current`

#### Headers :

- Authorization : token

#### Request Body :

```json
{
  "name": "new name", //optional
  "password": "new password" //optional
}
```

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "USER_UPDATED_SUCCESSFULLY",
  "data": {
    "name": "new name",
    "username": "username example"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "ERR_MESSAGE"
}
```

## Get User API

#### Endpoint : `GET /api/users/current`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "GET_USER_SUCCESS",
  "data": {
    "name": "name example",
    "username": "username example"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "ERR_MESSAGE"
}
```

## Logout User API

#### Endpoint : `DELETE /api/users/logout`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "USER_LOGGEDOUT_SUCCESSFULLY"
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "Unauthorized"
}
```
