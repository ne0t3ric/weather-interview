# weather-interview

Display 5 days forecast based in user input via geocoding search. Using opendatasoft arpege weather data.

## Stack

- SPA Framework : Vue.js
- Design system : Vuetify
- Language: Typescript
- Linter: Eslint
- Deploy: Netlify
- Build & dev tool: Vite

## Project Setup

Pre-requisites :

- Install NVM
- Install Netlify-cli

Install packages

```sh
nvm use
npm install
```

### Compile and Hot-Reload for Development

SPA only :

```sh
npm run dev
```

With proxy/redirect apis, use netlify wrapper

```sh
netlify dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploy

See @netlify

Deploy url : https://weather-interview.netlify.app
