# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Register user | `POST` | `/api/v2/register` |
| Login user | `POST` | `/api/v2/authenticate` |
| Unregister user | `POST` | `/api/v2/unregister` |
| Update user password | `POST` | `/api/v2/change-password` |
| Update the user's data | `POST` | `/api/v2/update-user-data` |
| Update the user's game data | `POST` | `/api/v2/update-game-data` |
| Get the user's data | `GET` | `/api/v2/get-user-data` |
| Get the user's game data | `GET` | `/api/v2/get-game-data` |

## **Routes description**

### **Register user**

Request type: `POST`.

URL: `/api/v2/register`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v2/register' \
--header 'authToken: 89cef0d1-5269-4cb0-aba6-501fb4335c62' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "itjustworks",
    "email": "itjustworks@bugthesda.com",
    "password": "bugthesda",
    "name": "",
    "lstName": ""
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "token": "89cef0d1-5269-4cb0-aba6-501fb4335c62"
}
```
____
### **Login user**

Request type: `POST`.

URL: `/api/v2/authenticate`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v2/authenticate' \
--header 'authToken: 89cef0d1-5269-4cb0-aba6-501fb4335c62' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "itjustworks@bugthesda.com",
    "password": "bugthesda"
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "token": "41948c87-4766-4f5f-89d7-f28bd986513e"
}
```
____
### **Unregister user**

Request type: `POST`.

URL: `/api/v2/unregister`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v2/unregister' \
--header 'authToken: 89cef0d1-5269-4cb0-aba6-501fb4335c62' \
--header 'Content-Type: application/json' \
--data-raw '{
    "password": "bugthesda"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Update user password**

Request type: `POST`.

URL: `/api/v2/change-password`.

Exemple of request in cURL:
```bash
curl --location --request POST 'http://localhost:8080/api/v2/change-password' \
--header 'authToken: 89cef0d1-5269-4cb0-aba6-501fb4335c62' \
--header 'Content-Type: application/json' \
--data-raw '{
    "oldPassword": "bugthesda",
    "newPassword": "bugthesdaa"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
