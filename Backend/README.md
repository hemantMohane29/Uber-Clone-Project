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

The `user` object is the created user document with `_id`, `fullname`, `email`, etc. The **`password` field is not included** in the response.

---

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | Malformed JSON body (`message`, `hint`, `detail` from the parser) **or** validation failed (`errors` array from Express Validator). |
| **`500 Internal Server Error`** | Possible when the service throws (for example missing required fields inside the service layer) or on database errors (for example duplicate `email` if unique index applies), unless you add centralized error handling. |

---

## `POST /user/login`

Authenticates an existing user by email and password. On success, returns a JWT and the user document (without the password).

**Path:** **`POST /user/login`** — same `/user` router mount as registration.

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
| `password` | Yes | String, at least **6** characters. |

**Example:**

```json
{
  "email": "user@example.com",
  "password": "hunter2"
}
```

Use the same JSON rules as for registration (valid JSON, double-quoted keys).

---

### Success response

**Status: `200 OK`**

```json
{
  "message": "User logged in successfully",
  "token": "<JWT string>",
  "user": { }
}
```

The `user` object includes fields such as `_id`, `fullname`, and `email`. The **`password` is never returned**.

The JWT is signed with `JWT_SECRET` and contains the user’s `_id` (same scheme as registration).

---

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | Malformed JSON body **or** validation failed (`errors` array from Express Validator). |
| **`401 Unauthorized`** | No user with that email, or password does not match. Response body: `{ "message": "Invalid email or password" }` (same message in both cases). |
| **`500 Internal Server Error`** | Database or other unexpected errors if not handled by middleware. |

---

### Environment

JWT signing uses `JWT_SECRET` from your environment (see `.env`). Ensure the database connection is configured before calling these user endpoints.

---

## `GET /users/profile`

Returns the authenticated user's profile. Requires a valid JWT.

| Item | Value |
|------|--------|
| **Method** | `GET` |
| **Auth** | Required |

### Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <JWT token>` |

You can also send the token as a cookie named `token`.

### Success response

**Status: `200 OK`**

```json
{
  "user": {
    "_id": "...",
    "fullname": {
      "firstname": "Ada",
      "lastname": "Lovelace"
    },
    "email": "user@example.com"
  }
}
```

The `password` field is never returned.

### Error responses

| Status | When |
|--------|------|
| **`401 Unauthorized`** | No token provided, token is blacklisted, token is invalid/expired, or user not found. |

---

## `GET /users/logout`

Logs out the authenticated user by blacklisting the current JWT. The token will be rejected on all future requests.

| Item | Value |
|------|--------|
| **Method** | `GET` |
| **Auth** | Required |

### Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <JWT token>` |

You can also send the token as a cookie named `token`.

### Success response

**Status: `200 OK`**

```json
{
  "message": "User logged out successfully"
}
```

The `token` cookie is also cleared in the response.

### Error responses

| Status | When |
|--------|------|
| **`401 Unauthorized`** | No token provided, token already blacklisted, or token is invalid/expired. |

---

## `POST /captains/register`

Registers a new captain with personal details and vehicle information. On success, returns a JWT and the created captain document.

| Item | Value |
|------|--------|
| **Method** | `POST` |
| **Content-Type** | `application/json` |

---

### Request body (JSON)

| Field | Required | Rules |
|-------|----------|-------|
| `fullname.firstname` | Yes | String, at least **3** characters. |
| `fullname.lastname` | Yes | String, at least **3** characters. |
| `email` | Yes | Must be a valid email address. |
| `password` | Yes | String, at least **6** characters. |
| `vehicle.color` | Yes | String, at least **3** characters. |
| `vehicle.plate` | Yes | String, at least **3** characters. |
| `vehicle.capacity` | Yes | Integer, at least **1**. |
| `vehicle.vehicleType` | Yes | One of: `car`, `motorcycle`, `auto`. |

**Example:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "captain@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "black",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Success response

**Status: `201 Created`**

```json
{
  "token": "<JWT string>",
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

The `password` field is never returned in the response.

---

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | Validation failed (`errors` array) or a captain with that email already exists (`{ "messages": "Captain already exist" }`). |
| **`500 Internal Server Error`** | Database or unexpected server errors. |

---

## `POST /captains/login`

Authenticates an existing captain. Returns a JWT and the captain document on success.

| Item | Value |
|------|--------|
| **Method** | `POST` |
| **Content-Type** | `application/json` |

### Request body (JSON)

| Field | Required | Rules |
|-------|----------|-------|
| `email` | Yes | Must be a valid email address. |
| `password` | Yes | String, at least **6** characters. |

**Example:**

```json
{
  "email": "captain@example.com",
  "password": "secret123"
}
```

### Success response

**Status: `200 OK`**

```json
{
  "message": "Captain logged in successfully",
  "token": "<JWT string>",
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | Validation failed (`errors` array). |
| **`401 Unauthorized`** | No captain found with that email, or password does not match. |

---

## `GET /captains/profile`

Returns the authenticated captain's profile. Requires a valid JWT.

| Item | Value |
|------|--------|
| **Method** | `GET` |
| **Auth** | Required |

### Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <JWT token>` |

### Success response

**Status: `200 OK`**

```json
{
  "captain": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "captain@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "black",
      "plate": "AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

The `password` field is never returned.

### Error responses

| Status | When |
|--------|------|
| **`401 Unauthorized`** | No token provided, token is blacklisted, or token is invalid/expired. |

---

## `GET /captains/logout`

Logs out the authenticated captain by blacklisting the current JWT.

| Item | Value |
|------|--------|
| **Method** | `GET` |
| **Auth** | Required |

### Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <JWT token>` |

### Success response

**Status: `200 OK`**

```json
{
  "message": "Captain logged out successfully"
}
```

The `token` cookie is also cleared in the response.

### Error responses

| Status | When |
|--------|------|
| **`400 Bad Request`** | No token provided in request. |
| **`401 Unauthorized`** | Token is blacklisted or invalid/expired. |
