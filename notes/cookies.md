# Cookies
Cookies are small pieces of data stored in the **browser** by websites to remember user preferences, login status, and other information. They are sent by the server to the client's browser and are included in subsequent requests to the server.

## Attributes of a Cookie
Required attributes:
- **Name/Value Pair**: The name of the cookie, followed by an equal sign and the value.
- **Domain**: The domain that the cookie is valid for.

Optional attributes:
- **Path**: The path within the domain that the cookie is valid for.
- **Expires/Max-Age**: The expiration date or maximum age of the cookie.
- **HttpOnly**: Specifies whether the cookie is accessible only through HTTP requests.
  - Http Only cookies are invisible to JavaScript
- **SameSite**: Specifies whether the cookie should be restricted to first-party or same-site requests.
- **SameParty**: Specifies whether the cookie should be restricted to first-party or same-party requests.
- **Secure**: Specifies whether the cookie should only be sent over secure connections (HTTPS).

## Types of Cookies
- Persistent cookies
- Non-secure cookies
- Client-side cookies
- Server-side cookies
- Conversion-tracking cookies

## Cookie Processing Headers
Client-side:
- **Cookie**: Sent by the client to include cookies in subsequent requests.

Server-side:
- **Set-Cookie**: Sent by the server to create a new cookie.

## Cookie Processing in JavaScript
### escape() and unescape()
`escape()` and `unescape()` are deprecated and should not be used. Instead, use `encodeURIComponent()` and `decodeURIComponent()`.

### encodeURIComponent() and decodeURIComponent()
`encodeURIComponent()`: Encodes a URI component by replacing special characters with escape sequences.

`decodeURIComponent()`: Decodes a URI component by replacing escape sequences with their original characters.

### Read a cookie
```javascript
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}
```

### Set a cookie
```javascript
function setCookie(name, value, expire) {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expire}; path=/`;
}
```

### Delete a cookie
```javascript
// There are no built-in methods to delete a cookie. Instead, set the cookie's expiration date to a past date.
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
```

## Usage
- **Session Management**: Cookies are commonly used to manage user sessions on websites (e.g. login status).
- **Personalization**: Cookies can be used to remember user preferences (e.g. language settings).
- Cookies can track your IP address
- Cookies can store any information you provide to a site

## Cookies Can't:
- **Store Sensitive Information**: Cookies are stored in plain text and can be read by anyone, so sensitive information should not be stored in cookies.
- **Disk I/O**: Cookies are stored in memory and are not written to disk.
- **Read or Write cookies from another domain**: The Same-Origin Policy restricts scripts from one origin from reading or writing cookies from another origin.