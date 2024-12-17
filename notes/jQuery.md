# jQuery
As a framework for client-side JavaScript, jQuery provides useful alternatives for common programming tasks.

It simplifies:
- HTML document traversing 
- Event Handling
- Animating
- AJAX interactions

It abstracts:
- DOM (e.g. `document.getElementById('id')` -> `$('#id')`)
- JSON (e.g. `JSON.parse(data)` -> `$.parseJSON(data)`)
- XMLHttpRequest (e.g. `$.ajax({url: url, type: 'GET'})`)

## jQuery Selectors
jQuery uses CSS selectors to select elements from the DOM.

### Basic Selectors
- `${*}`: All Selector
- `${#x}`: ID Selector
- `${.class}`: Class Selector
- `${div}`: Element Selector
- `${.class1, .class2}`: Multiple Selector

### Attribute Selectors
- `${[attribute=value]}`: Attribute Equals Selector
  - e.g. `$("input[value='Hot Fuzz'] "). text( "Hot Fuzz" ) ;`
- `${[attribute!=value]}`: Attribute Not Equal Selector
- `${[attribute^=value]}`: Attribute Starts With Selector
- `${[attribute$=value]}`: Attribute Ends With Selector
- `${[attribute*=value]}`: Attribute Contains Selector

### Basic Filters
- `${:first}`: First Element Selector
- `${:last}`: Last Element Selector
- `${:even}`: Even Elements Selector
- `${:odd}`: Odd Elements Selector
- `${:eq(index)}`: Element at Index Selector
- `${:gt(index)}`: Greater Than Index Selector
- `${:lt(index)}`: Less Than Index Selector
- `${:not(selector)}`: Not Selector
- `${:header}`: Header Selector
- `${:animated}`: Animated Selector

### Child Filter
- `${:first-child}`: First Child Selector
- `${:last-child}`: Last Child Selector
- `${:nth-child(n)}`: Nth Child Selector
- `${:nth-last-child(n)}`: Nth Last Child Selector
- `${:only-child}`: Only Child Selector

### Content Filter
- `${:contains(text)}`: Contains Selector
- `${:empty}`: Empty Selector
- `${:has(selector)}`: Has Selector
- `${:parent}`: Parent Selector
- `${:hidden}`: Hidden Selector
- `${:visible}`: Visible Selector
- `${:focus}`: Focus Selector
- ...

### Form Filter
- `${:input}`: Input Selector
- `${:text}`: Text Selector



## jQuery Methods
jQuery provides methods to manipulate the selected elements.

Example:
```javascript
$('p').hide() // Hides all <p> elements
$('#id').show() // Shows the element with the id "id"
$('input[name="name"]').val('John Doe') // Sets the value of all <input> elements with the name "name" to "John Doe"
$('input[name="name"]').next().text('Next Element') // Sets the text of the next sibling of all <input> elements with the name "name" to "Next Element"
```


