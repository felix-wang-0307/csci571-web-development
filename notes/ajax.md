# AJAX (Asynchronous JavaScript and XML)
AJAX allows for just part of a page to be reloaded with direct access to the server.

AJAX uses JavaScript and HTML DOM to display the data.

Some features about an AJAX application:
- They have visual effects
- They present live content
- They are single page

## XHR (XMLHttpRequest)
Example of an AJAX request using the `XMLHttpRequest` object:
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // readyState 4: request finished and response is ready
    // status 200: "OK" (or check xhr.statusText === "OK")
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();
```
- The `open()` method initializes a request. 
  - The third parameter specifies whether the request should be asynchronous (`true`) or synchronous (`false`).
  - **It is bad to use `false` because a time-consuming synchronous request on the main thread will degrade UX.**
  - **Synchronous `XMLHttpRequest()` has been deprecated.**
- The `onreadystatechange` event is triggered every time the `readyState` property changes. **We should check**:
  - **The `readyState` property** holds the status of the XMLHttpRequest.
  - **The `status` property holds** the status of the XMLHttpRequest.
  - **The `statusText` property** holds the status-text (e.g. "OK" or "Not Found").
- The `responseText` property returns the response data (e.g. JSON) as a string.
- The `send()` method sends the request to the server.

**Netscape 7 and Mozilla Firefox 1.0 were the first browsers to "clone"
XMLHttpRequest functionality from Internet Explorer.**

## jQuery AJAX
Example of an AJAX request using jQuery:
```javascript
$.ajax({
  url: 'https://api.example.com/data',
  type: 'GET',
  success: function(data) {
    console.log(data);
  }
});
```
- The `url` property specifies the URL to send the request to.
- The `type` property specifies the type of request (e.g. "GET" or "POST").
- The `success` property specifies a function to run if the request succeeds (i.e. the `status` is 200).

jQuery is not required for AJAX. There is **no major difference aside from syntactical sugar.**

## Fetch API
Example of an AJAX request using the `fetch()` API:
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```
- The `fetch()` method returns a Promise that resolves to the `Response` to that request - a modern replacement for `XMLHttpRequest`.
- It provides a more powerful and flexible feature set than
`XMLHttpRequest`.
- Introduced in ES6 (ECMAScript 2015).

## Axios
Example of an AJAX request using Axios:
```javascript
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data));
```
- Axios is a promise-based HTTP client for the browser and Node.js.
- It is a package that is not built into JavaScript.