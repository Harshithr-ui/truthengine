# Truth Engine - React Version

This is the React version of the Truth Engine fact-checking website. All design, animations, and functionality have been preserved from the original HTML version.

## Features

- 🎨 **Identical Design**: All visual styling, animations, and effects preserved
- 🔄 **Live API Integration**: Real-time fact-checking using Lyzr AI backend
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **React Components**: Modern component-based architecture
- 🎭 **Smooth Animations**: Floating elements, fade-ins, parallax effects

## Project Structure

```
truth-engine-react/
├── public/
│   ├── index.html
│   └── 0cc54d61-2171-4b18-982a-6f90f37144ca.png
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── HeroSection.js
│   │   ├── AnalysisSection.js
│   │   └── HistorySection.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```

## Installation

1. Navigate to the project directory:
   ```bash
   cd truth-engine-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000)

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory.

## Components

### Navigation
Fixed navigation bar with smooth scroll links to each section.

### HeroSection
Landing page with animated astronaut image and search input.

### AnalysisSection
Interactive fact-checking interface with:
- Text input for headlines/URLs
- Live API integration with Lyzr AI
- Dynamic result display with verdict, confidence score, and sources

### HistorySection
Historical log of verified fact-checks with status badges and confidence scores.

## API Integration

The app connects to the Lyzr AI API for fact-checking:
- **Endpoint**: `https://agent-prod.studio.lyzr.ai/v3/inference/chat/`
- **Method**: POST
- **Authentication**: API key included in headers

## Technologies

- React 18.2+
- Tailwind CSS (via CDN)
- Google Fonts (Work Sans)
- Material Symbols Icons
- Lyzr AI API

## Notes

- All animations and effects from the original HTML version are preserved
- The API key is included in the source - consider moving to environment variables for production
- CORS may block API requests if running locally as file:// - use the dev server instead

## License

All rights reserved.
