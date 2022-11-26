# **User's route**

## **Authors**

- hikupapp@gmail.com

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Register user | `POST` | `/api/auth/signup` |
| Login user | `POST` | `/api/auth/login` |

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
