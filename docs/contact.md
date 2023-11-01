# Contact API Specs

### Group : Contact

## Create Contact API

#### Endpoint : `POST /api/contacts`

#### Headers :

- Authorization : token

#### Request Body :

```json
{
  "first_name": "first",
  "last_name": "last name",
  "email": "example@email.com",
  "phone": "1234567890"
}
```

#### Response Body (Success) :

```json
{
  "status": "201",
  "message": "CONTACT_CREATED_SUCCESSFULLY",
  "data": {
    "id": "unique-id",
    "first_name": "first",
    "last_name": "last name",
    "email": "example@email.com",
    "phone": "1234567890"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "Email Already Used"
}
```

## Update Contact API

#### Endpoint : `PUT /api/contacts/:id`

#### Headers :

- Authorization : token

#### Request Body :

```json
{
  "first_name": "first",
  "last_name": "last name",
  "email": "example@email.com",
  "phone": "1234567890"
}
```

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "UPDATE_SUCCESS",
  "data": {
    "id": "unique-id",
    "first_name": "first",
    "last_name": "last name",
    "email": "example@email.com",
    "phone": "1234567890"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "404",
  "message": "Contact not Found"
}
```

## Get Contact API

#### Endpoint : `GET /api/contacts/:id`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "GET_CONTACT_SUCCESS",
  "data": {
    "id": "unique-id",
    "first_name": "first",
    "last_name": "last name",
    "email": "example@email.com",
    "phone": "1234567890"
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

## Remove Contact API

#### Endpoint : `DELETE /api/contacts/:id`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "CONTACT_DELETED"
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "Unauthorized"
}
```

## Search Contact API

#### Endpoint : `DELETE /api/contacts/:id`

#### Headers :

- Authorization : token

#### Query Params :

- name : Search by first_name or last_name, using like, **optional**
- email : Search by email, using like, **optional**
- phone : Search by phone, using like, **optional**
- page : Page number, default 1
- size : Size per page, default 10

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "CONTACT_DELETED",
  "data": [
    {
      "id": "unique-id",
      "first_name": "first",
      "last_name": "last name",
      "email": "example@email.com",
      "phone": "1234567890"
    },
    {
      "id": "unique-id",
      "first_name": "first",
      "last_name": "last name",
      "email": "example@email.com",
      "phone": "1234567890"
    }
  ],
  "pagging": {
    "page": 1,
    "size": 10,
    "total": 3
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "contact not found"
}
```
