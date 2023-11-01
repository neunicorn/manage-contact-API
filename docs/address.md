# Address API Specs

### Group : Address

## Create Address API

#### Endpoint : `POST /api/contacts/:contactId/addresses`

#### Headers :

- Authorization : token

#### Request Body :

```json
{
  "sreeet": "Jalan APa kek",
  "city": "Kota name",
  "province": "province apa",
  "country": "Negara",
  "postal_code": "123456"
}
```

#### Response Body (Success) :

```json
{
  "status": "201",
  "message": "ADDRESS_CREATED_SUCCESSFULLY",
  "data": {
    "id": "unique-id",
    "sreeet": "Jalan APa kek",
    "city": "Kota name",
    "province": "province apa",
    "country": "Negara",
    "postal_code": "123456"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "Country is Required"
}
```

## Update Address API

#### Endpoint : `PUT /api/contacts/:contactId/addresss/:addressId`

#### Headers :

- Authorization : token

#### Request Body :

```json
{
  "sreeet": "Jalan APa kek",
  "city": "Kota name",
  "province": "province apa",
  "country": "Negara",
  "postal_code": "123456"
}
```

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "UPDATE_SUCCESS",
  "data": {
    "sreeet": "Jalan APa kek",
    "city": "Kota name",
    "province": "province apa",
    "country": "Negara",
    "postal_code": "123456"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "400",
  "message": "Country is Required"
}
```

## Get Address API

#### Endpoint : `GET /api/contacts/:contactId/addresses/:addressId`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "GET_ADDRESS_SUCCESS",
  "data": {
    "id": "unique-id",
    "sreeet": "Jalan APa kek",
    "city": "Kota name",
    "province": "province apa",
    "country": "Negara",
    "postal_code": "123456"
  }
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "CONTACTS_NOT_FOUND"
}
```

## Remove Address API

#### Endpoint : `DELETE /api/contacts/:contactId/addresss/:addressId`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "ADDRESS_DELETED"
}
```

#### Response Body (Error) :

```json
{
  "status": "404",
  "message": "Address is not Found"
}
```

## List Address API

#### Endpoint : `GET /api/contacts/:contactId/addresses`

#### Headers :

- Authorization : token

#### Response Body (Success) :

```json
{
  "status": "200",
  "message": "GET_ADDRESS_SUCCESS",
  "data": [
    {
      "id": "unique-id",
      "sreeet": "Jalan APa kek",
      "city": "Kota name",
      "province": "province apa",
      "country": "Negara",
      "postal_code": "123456"
    },
    {
      "id": "unique-id",
      "sreeet": "Jalan APa kek",
      "city": "Kota name",
      "province": "province apa",
      "country": "Negara",
      "postal_code": "123456"
    }
  ]
}
```

#### Response Body (Error) :

```json
{
  "status": "err status code",
  "message": "CONTACTS_NOT_FOUND"
}
```
