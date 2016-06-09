# markdown-doc-bundler
Accepts the path of a directory. Produces an object containing the contents of
markdown files as strings organized according to the directory's original structure.

## Usage

### Installation
```sh
  npm install --save markdown-doc-bundler
```

#### Bundler

Given a path to a directory containing markdown files organized like this:

```
  README.md
  - anatomy
  -- README.md
  -- backbone.md
  -- kneebone.md
  -- tailbone.md
  --- trailsProject
  ---- README.md
  --- api
  ---- README.md
  - concepts
  -- README.md
```

Returns an object that looks like this:

```js
{
  'README.md': 'This is a markdown file',
  'anatomy': {
    'trailsProject': {
      'README.md': 'A different markdown file',
      'backbone.md': 'Backbone is a client side JavaScript framework',
      'kneebone.md': 'The kneebone is connected to the ankle bone',
      'tailbone.md': 'The tailbone is connected to the backbone',
      'api': {
        'README.md': 'A totally new thing'
      }
    },
    'README.md': 'Bomb diggity'
  },
  'concepts': {
    'README.md': 'Last markdown file, I promise.'
  }
}
```

##### Usage

```js
  const markdownDocBundler = require('markdown-doc-bundler').bundler
  const docs = markdownDocBundler(/* absolute path to directory */)
```

#### Routes Maker

Given input that looks like this:

```js
{
  'README.md': 'This is a markdown file',
  'anatomy': {
    'trailsProject': {
      'README.md': 'A different markdown file',
      'backbone.md': 'Backbone is a client side JavaScript framework',
      'kneebone.md': 'The kneebone is connected to the ankle bone',
      'tailbone.md': 'The tailbone is connected to the backbone',
      'api': {
        'README.md': 'A totally new thing'
      }
    },
    'README.md': 'Bomb diggity'
  },
  'concepts': {
    'README.md': 'Last markdown file, I promise.'
  }
}
```

Returns output that look like:

```js
[
  [ '/', 'This is a markdown file' ],
  [ '/anatomy', 'Bomb diggity' ],
  [ '/anatomy/backbone', 'Backbone is a client side JavaScript framework'],
  [ '/anatomy/kneebone', 'The kneebone is connected to the ankle bone'],
  [ '/anatomy/tailbone', 'The tailbone is connected to the backbone'],
  [ '/anatomy/trailsProject', 'A different markdown file' ],
  [ '/anatomy/trailsProject/api', 'A totally new thing' ],
  [ '/concepts', 'Last markdown file, I promise.' ]
}
```

This allows us to create routes on the server based on the structure of the
directory containing our documentation, passing the contents of the markdown
files as context to the views.

##### Usage

```js
  const docs = markdownDocBundler(/* absolute path to directory */)
  const routesMaker = require('markdown-doc-bundler').routesMaker
  const routes = routesMaker(docs)
```

### Tests
```sh
  npm test
```
