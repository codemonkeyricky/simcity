# SimCity Vite Webserver

A minimal Vite setup for serving scene.ts with Three.js functionality.

## Project Structure

- `index.html` - Entry point with render target container
- `src/main.ts` - Imports and runs createScene()
- `src/scene.ts` - Three.js scene implementation
- `vite.config.ts` - Vite configuration
- `package.json` - Dependencies and scripts

## Usage

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

The server will open at `http://localhost:3000` and display the Three.js scene.
