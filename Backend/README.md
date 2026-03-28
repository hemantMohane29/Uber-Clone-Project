# Backend API documentation

## `POST /user/register`

Registers a new user in the database. The password is hashed before storage. On success, the API returns a JWT and the created user payload.

**Path:** **`POST /user/register`** — the user router is mounted at `/user` in `app.js`.

| Item | Value |
|------|--------|
| **Method** | `POST` |
| **Content-Type** | `application/json` |

---

### Request body (JSON)

Fields validated by `express-validator` on this route:

| Field | Required | Rules |
|--------|-----------|--------|
| `email` | Yes | Must be a valid email address. |
| `firstname` | Yes | String, at least **3** characters. |
| `lastname` | Yes | String, at least **1** character. |
| `password` | Yes | String, at least **6** characters. |

**Example:**

```json
{
  "email": "user@example.com",
  "firstname": "Ada",
  "lastname": "Lovelace",
  "password": "hunter2"
}
```

Raw JSON must follow standard rules: double-quoted keys and strings, no trailing commas. If the body is not valid JSON, the API responds with **400** and a short explanation (see Error responses).

---

### Success response

**Status: `201 Created`**

```json
{
  "message": "User registered successfully",
  "token": "<JWT string>",
  "user": { }
}
```

The `user` object is the Mongoose document as returned after creation (includes `_id`, `fullname`, `email`, etc.; password handling depends on schema `toJSON` transforms if any).

---

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | Malformed JSON body (`message`, `hint`, `detail` from the parser) **or** validation failed (`errors` array from Express Validator). |
| **`500 Internal Server Error`** | Possible when the service throws (for example missing required fields inside the service layer) or on database errors (for example duplicate `email` if unique index applies), unless you add centralized error handling. |

---

### Environment

JWT signing uses `JWT_SECRET` from your environment (see `.env`). Ensure the database connection is configured before calling this endpoint.
