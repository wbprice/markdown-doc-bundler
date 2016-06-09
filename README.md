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
  [ '/anatomy/trailsProject', 'A different markdown file' ],
  [ '/anatomy/trailsProject/api', 'A totally new thing' ],
  [ '/concepts', 'Last markdown file, I promise.' ]
}
```

This allows us to bind routes on the server and pass them context.

##### Usage

```js
  const docs = markdownDocBundler(/* absolute path to directory */)
  const routesMaker = require('markdown-doc-bundler').routesMaker
  const routes = routesGenerator(docs)
```

### Tests
```sh
  npm test
```
