# RESTful API
## REST
REST (Representational State Transfer) Services uses HTTP methods PUT, GET, POST and DELETE.

There are three fundamental aspects of the REST Design Pattern: Resources, HTTP Methods, and Representation.

RESTful web services are:
- Platform-independent (you don't care if the server is Unix, the client is a Mac, or anything else)
- Language-independent (you can write your server in Java and your client in Python if you like)
- Standards-based (HTTP is a standard, as is REST itself)


## Resources and URL
- Resources format: usually **JSON** or **XML**, but sometimes **CSV** or **plain-text** can be used.
  - Except in very specific cases, **HTML is not** acceptable as a response format (which is known as HTML Templates, not RESTful API).

- A URL uniquely identifies a resource. 
  - The slash `/` character is used to represent a parent-child relationship between resources. (e.g. `/users/123`)
  - Use **logical** URL, not physical URL. (e.g. `/users/123` instead of `/users/123.json`)
  - Use **nouns** instead of verbs in URLs. (e.g. `/users` instead of `/getUsers`)
  - Minimize use of query parameters. (e.g. `/users/123?verbose=true`)
- A method defines the operation to be performed on the resource.
  - `GET` - Read a resource (e.g. get the user's profile)
    - `GET` should be idempotent (i.e. multiple identical requests should have the same effect as a single request) and should not have side effects.
  - `POST` - Create a new resource (e.g. create a new user)
  - `PUT` - Update a resource (e.g. update the user's profile)
  - `DELETE` - Remove a resource (e.g. delete the user's profile)
  - Complex REST services may use as many as 10 HTTP methods including `PATCH`, `HEAD`, `OPTIONS`, `TRACE`, `CONNECT`, etc.

## Security
REST itself does not define any specific security implementation. It is up to the developer to ensure that the RESTful web service is secure from attacks.

Common security implementations include:
- **HTTPS** - Encrypts the data between the client and the server.
- **SSL** - A standard security technology for establishing an encrypted link between a server and a client.

## REST versus Other Approaches
### REST
- Format: JSON, XML, CSV, or plain text
- Protocol: HTTP
- **Simple** to implement, thus gaining popularity
- **Lightweight**
### SOAP
- Format: XML
- Protocol: normally HTTP, but can also be SMTP, JMS, or other protocols
- More **robust** 
- **Complex** to implement
### RPC (XML-RPC, JSON-RPC)
- Format: XML or JSON
- Protocol: HTTP
- **Simple** to implement

## Example of RESTful API
### Client Request
```http
GET /users/123 HTTP/1.1
Host: example.com
Accept: application/json
```
### Server Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "johndoe@gmail.com"
}
```

## A minimum RESTful Server (Node.js)
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    id: id,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

