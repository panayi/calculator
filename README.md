# 3R (React, Redux, Ramda) Calculator [![Build Status](https://travis-ci.org/panayi/calculator.svg?branch=master)](https://travis-ci.org/panayi/calculator) [![Code Climate](https://codeclimate.com/github/panayi/calculator/badges/gpa.svg)](https://codeclimate.com/github/panayi/calculator)
A calculator built with React, Redux, Ramda and point free functional programming.

## [DEMO](http://panayi.github.io/calculator/)
[![3R Calculator](https://cloud.githubusercontent.com/assets/707005/12324852/797c1cbe-bace-11e5-8dff-f12f3c8a2e93.png)](http://panayi.github.io/calculator/)

## Features
- Point-free functional programming with [Ramda](http://ramdajs.com/).
- Math expression evaluation based on [Math.js](http://mathjs.org/).
- Uses [Redux](redux.js.org) for validating pressed keys and calculating expressions while typing. Default keys for basic arithmetic calculations, but easy to customize the allowed keys (see [initialState.js](https://github.com/panayi/calculator/blob/master/src/initialState.js)).
- Theme switching based on Redux, a custom `<ThemeManager>` component and [Radium](https://github.com/FormidableLabs/radium).
- Based on [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit).

## Usage

```
git clone git@github.com:panayi/calculator.git
cd calculator
npm install
npm run dev
```

Go to [http://localhost:3000/](http://localhost:3000/)

## Tests
Watch for changes and re-run tests:

```
npm run test:dev
```

Run tests once and generate coverage report:

```
npm run test
```
