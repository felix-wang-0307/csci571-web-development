# Web Security
## HSTS (HTTP Strict Transport Security)

By enabling HSTS, a website tells the browser to only communicate with it over HTTPS, even if the user types `http://` in the address bar. This helps prevent the insecure transmission of sensitive data, such as login credentials or payment information.

## Same-Origin Policy
The Same-Origin Policy is a security measure implemented by **web browsers** to prevent malicious scripts from accessing data across different origins. An origin is defined by the combination of the protocol, domain, and port of a URL.

The Same-Origin Policy restricts the following actions:
- **Cookies**: Scripts from one origin cannot read or write cookies from another origin.
- **DOM**: Scripts from one origin cannot access the DOM of another origin.
- **AJAX**: Scripts from one origin cannot make AJAX requests to another origin.

But the Same-Origin Policy does not restrict the following actions:
- **Images, Stylesheets, and Scripts**: Scripts, images, and stylesheets can be loaded from different origins. They are are considered "safe" and can be retrieved cross-domain.
- **Fonts**: Fonts can be loaded from different origins.

### Ways to bypass the Same-Origin Policy
- **Cross-Origin Resource Sharing (CORS)**: Allows resources on a web page to be requested from another domain outside the domain from which the resource originated.
- **JSONP (JSON with Padding)**: A method for sending JSON data without being restricted by the Same-Origin Policy.
- **Server-Side Proxy**: A server-side script that acts as a middleman between the client and the server to bypass the Same-Origin Policy.
- **The Dynamic Script Tag**: A method for loading scripts from another domain without being restricted by the Same-Origin Policy.
- Some **Browser Extensions** or **Browser Plugins** can disable the Same-Origin Policy.

### CORS in Programming
CORS is implemented using HTTP headers that allow servers to specify who can access their resources. 

The following are some common CORS headers:
- HTTP Response (Server-Side):
  - **Access-Control-Allow-Origin**: Specifies which origins are allowed to access the resource.
  - **Access-Control-Allow-Methods**: Specifies which HTTP methods are allowed when accessing the resource.
  - **Access-Control-Allow-Headers**: Specifies which headers are allowed when accessing the resource.
  - **Access-Control-Allow-Credentials**: Specifies whether credentials such as cookies are allowed when accessing the resource.
- HTTP Request (Client-Side):
  - **Origin**: Specifies the origin of the request.
  - **Access-Control-Request-Method**: Specifies the HTTP method being used in the preflight request.
  - **Access-Control-Request-Headers**: Specifies the headers being used in the preflight request.
  - **Credentials**: Specifies whether credentials such as cookies should be included in the request.
## Authentication Attacks
### Bruteforce Attack
A bruteforce attack is a type of attack where an attacker tries to **guess** a user's password by systematically trying all possible combinations of characters until the correct one is found.
### Insufficient Authentication
Insufficient authentication is a type of attack where an attacker is able to bypass the authentication mechanism of a system by exploiting vulnerabilities such as:
- Weak passwords (e.g. website allows passwords like "123456" or "password")
- Weak password recovery mechanisms (e.g. security questions like "In what city were you born?", which can be easily guessed or researched)

## Authorization Attacks
### Session Hijacking
Session hijacking is a type of attack where an attacker steals a user's session token and uses it to impersonate the user. This allows the attacker to access the user's account and perform actions on their behalf.
- Typically, websites associate a unique value called a session ID with a user when the
authentication is done.
- The session ID authorizes the users' actions on the website.
- Deducing or guessing the unique value that identifies a particular session or a user is
enough to pose as a legitimate user and perform actions on the real user's behalf.

Defenses against Session Hijacking:
- **HTTPS**: Encrypts the data exchanged between the client and the server, making it harder for attackers to intercept and steal session tokens.
- **Secure Cookies**: Use the `Secure` and `HttpOnly` flags when setting cookies to prevent them from being accessed by malicious scripts.

> Authorization vs. Authentication:
> - **Authentication**: The process of verifying the identity of a user (e.g. logging in with a username and password).
> - **Authorization**: The process of determining what actions a user is allowed to perform (e.g. accessing certain resources or performing specific operations).


## Client-side Attacks and Defenses
### Cross-Site Scripting (XSS)
Cross-Site Scripting (XSS) is a type of security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. The injected script can access cookies, session tokens, or other sensitive information retained by the browser and used with that site.

Types of XSS attacks:
- **Stored XSS**: The malicious script is stored on the server and executed when a user visits the affected page.
  - Example: A user posts a comment containing a malicious script that is stored on the server and executed when other users view the comment.
- **Reflected XSS**: The malicious script is reflected off the web server and executed when a user visits a specially crafted URL.
  - Example: The server echoes user input back to the browser without proper validation, allowing an attacker to craft a URL that executes a malicious script when visited.
  - Like: `http://example.com/search?q=<script>alert('XSS')</script>`

Defenses against XSS:
- **Input Validation**: Validate and sanitize user input to prevent malicious scripts from being executed.
- **Output Encoding**: Encode user input before rendering it to the browser to prevent the browser from interpreting it as HTML or JavaScript.
- **Content Security Policy (CSP)**: A security standard that helps prevent XSS attacks by allowing website owners to define the sources from which the browser can load content.
### Browser and Plugin Vulnerabilities
Loosely defined, these are vulnerabilities in the client browser software or client plugins
(Java/ActiveX/Flash/Acrobat etc.) that can either enable other attacks, can enable
execution of arbitrary code, raise privileges, compromise users' privacy or simply crash
the browser. These are specific to the particular make and version of software like
Mozilla, IE etc. and cannot be generalized.
### Clickjacking
Clickjacking is a type of attack where an attacker tricks a user into clicking on a hidden element by overlaying it with a legitimate element. The attacker can use this technique to trick users into performing actions without their knowledge or consent.

Defenses against Clickjacking:
- **Frame Busting**: A technique that prevents a webpage from being displayed within an iframe.
- **X-Frame-Options Header**: A security header that allows a website to control whether or not the page can be displayed in an iframe.

## Injection Attacks and Defenses
### SQL Injection
SQL Injection is a type of attack where an attacker inserts malicious SQL code into a query to manipulate the database. This can allow the attacker to access, modify, or delete data from the database.

Example of SQL Injection:
```HTTP
GET /products?id=1; DROP TABLE products; -- HTTP/1.1
Host: example.com
```

Defenses against SQL Injection:
- **Prepared Statements**: Use parameterized queries to separate SQL code from user input.
- **Input Sanitization**: Validate and sanitize user input to prevent malicious SQL code from being executed.
- **ORMs (Object-Relational Mapping)**: Use an ORM library to interact with the database, which can help prevent SQL Injection by abstracting the SQL queries.

### JavaScript Hijacking
JavaScript Hijacking is a type of attack where an attacker steals sensitive data by exploiting the browser's support for JSONP (JSON with Padding). The attacker tricks the browser into executing the JSON response as JavaScript code, allowing them to access the data.

JSON makes JavaScript Hijacking easier by the fact that a JSON array stands on its own as a valid JavaScript statement. Since arrays are a natural form for communicating lists, they are commonly used wherever an application needs to communicate multiple values.

Example (Vulnerable Server Code):
```javascript
app.get('/data', (req, res) => {
  req = eval('(' + req.query.data + ')');
  res.json(req);
});
```
If a user visits `http://example.com/data?data={"key":"value"}`, the server will execute the JSON response as JavaScript code, allowing the attacker to access the data.

### Search Worms
Search Worms are a type of attack where an attacker injects malicious code into search engine results to redirect users to malicious websites. This can be used to spread malware, steal sensitive information, or perform other malicious activities.

### Cross Site Request Forgery (CSRF)
Cross-Site Request Forgery (CSRF) is a type of attack where an attacker tricks a user into performing actions on a website without their knowledge or consent. The attacker can use this technique to perform actions such as changing the user's password, transferring funds, or making purchases.
