# markdown-doc-bundler
Accepts the path of a directory. Produces an object containing the contents of
markdown files as strings organized according to the directory's original structure.

## Usage

```sh
  npm install --save markdown-doc-bundler
```

```js
  const markdownDocBundler = require('markdown-doc-bundler')
  const docs = markdownDocBundler(/* absolute path to directory */)
```
