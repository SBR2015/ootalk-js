OoTalk-js
====================

[![Build Status](https://travis-ci.org/SBR2015/OoTalk-js.svg?branch=master)](https://travis-ci.org/SBR2015/OoTalk-js)

OoTalk Library for JavaScript.

## Usage

### Node.js/io.js

```js
var ootalk = require('ootalk');
var node = ootalk.newNode('Constant', 2);
ootalk.init();
ootalk.append(node);
console.log(ootalk.tree());
```

### Browser

```html
<html>
<head>
  <title>test page</title>
</head>
<body>
<script src="./ootalk.js"></script>
<script>
  var ootalk = require('ootalk');
  var node = ootalk.newNode('Constant', 2);
  ootalk.init();
  ootalk.append(node);
  console.log(ootalk.tree());
</script>
</body>
</html>
```

## Done

- create tree node
- cross platform support.
