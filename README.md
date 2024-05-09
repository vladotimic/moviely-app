# Moviely App

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

An application that shows top 10 rated movies/tv shows, allow users to search for specific movie/tv show and view detailed information.

A [Vite](https://vitejs.dev/) application bootstrapped with [`npm create vite@latest`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project), serving the moviely application.

## Features

- Loads Top 10 Rated Movies / TV Shows, depending which tab you've selected.
- Search for Movies / TV Shows.
- App has cool card hover animations.
- Project has Prettier and ESLint configuration for better formating and linting.

## Requirements

You'll need to have `Node.js` installed, specifically:

- `Node == 20.12.2`

## Getting Started

Install the project dependencies by running the following command in the root of the project:

```bash
npm install
```

After successful installation, create `.env` file in project `root` folder next to `.env.example` file and copy `environment` variables from `.env.example` file into that `.env` file. This is necessary for the application to run and fetch the data from the TMDB API.

```.env
VITE_API_ROOT_URL=https://api.themoviedb.org/3
VITE_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQzMjExNTQyNTVkN2M0YjU2N2ZjZDk1ODlkNGRlZSIsInN1YiI6IjYwOGMwNDJjNWI0ZmVkMDA0MWUzNTc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gQD1PaKyE7obHLo_3asYWCuGI-jBPWaBCPKTDzgKXH8
VITE_IMAGE_URL_ROOT=https://image.tmdb.org/t/p
```

Next, run the command that builds and serves the application in the browser:

```bash
npm run prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

1. Fork it (<https://github.com/vladotimic/moviely-app/fork>)
2. Create your feature branch (`git switch -c mva-1-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin mva-1-feature`)
5. Create a new Pull Request
