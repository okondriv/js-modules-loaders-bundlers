# js-modules-loaders-bundlers
Example of JavaScript modules loaders and bundlers.

RequireJS allows us to write AMD module definition, and dynamically load module dependancies.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>JS Modules</title>
  </head>
  <body>
    <h1>In this example we calculate sum of range [0..100000] using Browserify.</h1>
    <h1>
      Sum = 
      <span id="answer"></span>
    </h1>

    <script data-main="main" src="require.js"></script>
  </body>
</html>
```
