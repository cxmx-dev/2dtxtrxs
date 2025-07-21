#!/bin/bash

# 2.5D Tetris Project Structure Creator
# Creates the complete file structure and files for the project

echo "🎮 Creating 2.5D Tetris project structure..."

# Create main project directory
mkdir -p tetris-2d5
cd tetris-2d5

# Create directories
mkdir -p .github/workflows

# Create all files
echo "📁 Creating project files..."

# Main game files
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.5D Tetris - Fullscreen Edition</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }

        body {
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
            font-family: 'Courier New', monospace;
            overflow: hidden;
            cursor: none;
            border: none;
            outline: none;
        }

        body::-webkit-scrollbar {
            display: none;
        }

        #gameContainer {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            outline: none;
        }

        #gameCanvas {
            border: 3px solid #00ff88;
            border-radius: 10px;
            box-shadow: 
                0 0 20px rgba(0, 255, 136, 0.5),
                inset 0 0 20px rgba(0, 255, 136, 0.1);
            background: #000;
            outline: none;
        }

        #ui {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #00ff88;
            font-size: 18px;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
            z-index: 10;
        }

        #score {
            margin-bottom: 10px;
        }

        #level {
            margin-bottom: 10px;
        }

        #lines {
            margin-bottom: 10px;
        }

        #holdPiece {
            margin-bottom: 10px;
        }

        #nextPiece {
            margin-top: 30px;
        }

        #controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            color: #00ff88;
            font-size: 14px;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
            z-index: 10;
        }

        #gameOver {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #ff0066;
            padding: 40px;
            border-radius: 15px;
            border: 2px solid #ff0066;
            text-align: center;
            font-size: 24px;
            display: none;
            z-index: 20;
            box-shadow: 0 0 30px rgba(255, 0, 102, 0.5);
        }

        #pause {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #ffff00;
            padding: 30px;
            border-radius: 15px;
            border: 2px solid #ffff00;
            text-align: center;
            font-size: 20px;
            display: none;
            z-index: 20;
            box-shadow: 0 0 30px rgba(255, 255, 0, 0.5);
        }

        .glow {
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from { text-shadow: 0 0 10px rgba(0, 255, 136, 0.8); }
            to { text-shadow: 0 0 20px rgba(0, 255, 136, 1), 0 0 30px rgba(0, 255, 136, 0.8); }
        }

        #fullscreenBtn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            color: #00ff88;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            transition: all 0.3s ease;
            z-index: 10;
            outline: none;
        }

        #fullscreenBtn:hover {
            background: rgba(0, 255, 136, 0.4);
            box-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
        }

        #fullscreenBtn:focus {
            outline: none;
        }

        /* Disable context menu */
        canvas {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            outline: none;
        }
    </style>
</head>
<body oncontextmenu="return false;">
    <div id="gameContainer">
        <canvas id="gameCanvas"></canvas>
        
        <div id="ui">
            <div id="score">Score: 0</div>
            <div id="level">Level: 1</div>
            <div id="lines">Lines: 0</div>
            <div id="holdPiece">Hold:</div>
            <div id="nextPiece">Next:</div>
        </div>

        <div id="controls">
            <div>WASD : Move</div>
            <div>↓ : Soft Drop</div>
            <div>↑ : Rotate</div>
            <div>Space : Hard Drop</div>
            <div>C : Hold Piece</div>
            <div>P : Pause</div>
            <div>R : Restart</div>
        </div>

        <button id="fullscreenBtn">Fullscreen</button>

        <div id="gameOver">
            <div class="glow">GAME OVER</div>
            <div style="margin-top: 20px; font-size: 16px;">Press R to restart</div>
        </div>

        <div id="pause">
            <div class="glow">PAUSED</div>
            <div style="margin-top: 20px; font-size: 16px;">Press P to resume</div>
        </div>
    </div>

    <script src="tetris.js"></script>
</body>
</html>
EOF

# Copy the full tetris.js content (this would be the complete file)
cp ../tetris.js .

# Create package.json
cat > package.json << 'EOF'
{
  "name": "tetris-2d5",
  "version": "1.0.0",
  "description": "A modern, visually stunning Tetris game with 2.5D graphics and fullscreen support",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 8000",
    "dev": "python -m http.server 8000",
    "serve": "npx http-server -p 8000",
    "docker:build": "docker build -t tetris-2d5 .",
    "docker:run": "docker run -p 8080:80 tetris-2d5",
    "docker:deploy": "./deploy.sh",
    "docker:compose": "docker-compose up -d",
    "docker:compose:down": "docker-compose down"
  },
  "keywords": [
    "tetris",
    "game",
    "2d5",
    "html5",
    "canvas",
    "javascript",
    "fullscreen",
    "wall-kick",
    "hold-piece"
  ],
  "author": "username",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/tetris-2d5.git"
  },
  "bugs": {
    "url": "https://github.com/username/tetris-2d5/issues"
  },
  "homepage": "https://github.com/username/tetris-2d5#readme",
  "devDependencies": {
    "http-server": "^14.1.1"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
EOF

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine

# Copy the game files to nginx's default web directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
EOF

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  tetris-game:
    build: .
    ports:
      - "8080:80"
    container_name: tetris-2d5
    restart: unless-stopped
    volumes:
      # Optional: Mount source code for development
      # - .:/usr/share/nginx/html
      # Optional: Custom nginx config
      # - ./nginx.conf:/etc/nginx/nginx.conf
    environment:
      - NGINX_HOST=localhost
      - NGINX_PORT=80
EOF

# Create deploy.sh
cat > deploy.sh << 'EOF'
#!/bin/bash

# 2.5D Tetris Deployment Script

echo "🎮 Deploying 2.5D Tetris..."

# Stop and remove existing container if it exists
echo "🛑 Stopping existing container..."
docker stop tetris-2d5 2>/dev/null || true
docker rm tetris-2d5 2>/dev/null || true

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t tetris-2d5 .

# Run the container
echo "🚀 Starting container..."
docker run -d -p 8080:80 --name tetris-2d5 tetris-2d5

# Check if container is running
if docker ps | grep -q tetris-2d5; then
    echo "✅ Deployment successful!"
    echo "🌐 Game is running at: http://localhost:8080"
    echo "📊 Container status:"
    docker ps | grep tetris-2d5
else
    echo "❌ Deployment failed!"
    echo "📋 Container logs:"
    docker logs tetris-2d5
    exit 1
fi

echo ""
echo "🎯 Useful commands:"
echo "  Stop game: docker stop tetris-2d5"
echo "  View logs: docker logs tetris-2d5"
echo "  Remove container: docker rm tetris-2d5"
EOF

# Make deploy.sh executable
chmod +x deploy.sh

# Create .gitignore
cat > .gitignore << 'EOF'
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Temporary files
*.tmp
*.temp

# Build outputs
dist/
build/
EOF

# Create GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy 2.5D Tetris

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies (if any)
      run: |
        echo "No dependencies to install for this project"
    
    - name: Run tests (if any)
      run: |
        echo "No tests configured yet"
    
    - name: Validate HTML
      run: |
        echo "Validating HTML structure..."
        # Basic HTML validation could be added here

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          ${{ secrets.DOCKER_USERNAME }}/tetris-2d5:latest
          ${{ secrets.DOCKER_USERNAME }}/tetris-2d5:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
EOF

# Create README.md
cat > README.md << 'EOF'
# 2.5D Tetris - Fullscreen Edition

A modern, visually stunning Tetris game with 2.5D graphics, fullscreen support, and advanced rotation mechanics.

## 🎮 Features

### Visual Effects
- **2.5D Graphics**: Depth-based rendering with shadows, highlights, and glow effects
- **Gradient Blocks**: Each piece has unique gradients and lighting
- **Cyberpunk Theme**: Dark background with neon green accents
- **Responsive Design**: Automatically scales to any screen size
- **Fullscreen Support**: Immersive gaming experience

### Gameplay Features
- **Advanced Wall Kick System**: SRS-inspired rotation with 16+ wall kick tests
- **Hold Piece**: Save pieces for strategic use (press C)
- **Ghost Piece**: Shows where the current piece will land
- **Smart Movement**: Horizontal slide-up when blocked
- **Visual Feedback**: Pulsing effects during rotation attempts
- **I-Piece Enhancement**: Special handling for the challenging I-piece

### Controls
- **WASD** : Move piece left/right/up/down
- **↓** : Soft drop (move down faster)
- **↑** : Rotate piece with wall kicks
- **Space** : Hard drop (instant drop)
- **C** : Hold piece
- **P** : Pause/unpause
- **R** : Restart game
- **Fullscreen Button** : Toggle fullscreen mode

## 🚀 Quick Start

### Option 1: Direct Browser
1. Clone the repository
2. Open `index.html` in your browser
3. Start playing!

### Option 2: Docker
```bash
# Build the Docker image
docker build -t tetris-2d5 .

# Run the container
docker run -p 8080:80 tetris-2d5

# Open http://localhost:8080 in your browser
```

### Option 3: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000

# Open http://localhost:8000 in your browser
```

## 🐳 Docker Setup

The project includes a Dockerfile for easy deployment:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Docker Commands
```bash
# Build image
docker build -t tetris-2d5 .

# Run container
docker run -d -p 8080:80 --name tetris-game tetris-2d5

# Stop container
docker stop tetris-game

# Remove container
docker rm tetris-game
```

## 📁 Project Structure

```
tetris-2d5/
├── index.html          # Main HTML file
├── tetris.js           # Game logic and 2.5D rendering
├── Dockerfile          # Docker configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎯 Game Mechanics

### Wall Kick System
The game uses an advanced wall kick system inspired by the Super Rotation System (SRS):

- **Standard Pieces**: 16 wall kick test positions
- **I-Piece**: 28 wall kick test positions including extreme kicks
- **Smart Movement**: Automatic slide-up when horizontal movement is blocked
- **Room Making**: Attempts to move pieces to make rotation space

### Scoring System
- **Line Clear**: 100 × level points per line
- **Hard Drop**: 2 points per cell dropped
- **Level Progression**: Every 10 lines cleared
- **Speed Increase**: Faster dropping at higher levels

### Hold System
- **One-time use**: Can only hold once per piece placement
- **Strategic tool**: Save pieces for better positioning
- **Visual feedback**: Clear display of held piece

## 🛠️ Development

### Prerequisites
- Modern web browser with HTML5 Canvas support
- Docker (optional, for containerized deployment)

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Use browser developer tools for debugging

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you find any bugs or have feature requests, please open an issue on GitHub.

## 📊 Performance

The game is optimized for:
- **60 FPS** gameplay
- **Responsive scaling** to any screen size
- **Smooth animations** with hardware acceleration
- **Low memory usage** with efficient rendering

## 🎨 Customization

The game can be easily customized by modifying:
- **Colors**: Edit the piece color definitions in `tetris.js`
- **Speed**: Adjust the `dropInterval` values
- **Effects**: Modify the `drawBlock2D5` function for different visual styles
- **Controls**: Update the key event listeners

---

**Enjoy playing 2.5D Tetris!** 🎮✨
EOF

# Create SETUP.md
cat > SETUP.md << 'EOF'
# Quick Setup Guide

## 🚀 Getting Started

### Prerequisites
- Git
- Docker (optional)
- Modern web browser

### 1. Clone the Repository
```bash
git clone https://github.com/username/tetris-2d5.git
cd tetris-2d5
```

### 2. Initialize Git (if starting fresh)
```bash
git init
git add .
git commit -m "Initial commit: 2.5D Tetris game"
```

### 3. Choose Your Deployment Method

#### Option A: Direct Browser (Simplest)
```bash
# Just open index.html in your browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

#### Option B: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npm run serve

# Using npm scripts
npm start
```

#### Option C: Docker (Recommended for deployment)
```bash
# Quick deployment
./deploy.sh

# Or using docker-compose
docker-compose up -d

# Or manual Docker commands
docker build -t tetris-2d5 .
docker run -p 8080:80 tetris-2d5
```

### 4. Access the Game
- **Direct browser**: Open `index.html`
- **Local server**: http://localhost:8000
- **Docker**: http://localhost:8080

## 📝 Next Steps

### For GitHub
1. Create a new repository on GitHub
2. Update the repository URL in `package.json`
3. Push your code:
```bash
git remote add origin https://github.com/username/tetris-2d5.git
git branch -M main
git push -u origin main
```

### For Docker Hub
1. Create a Docker Hub account
2. Build and tag your image:
```bash
docker build -t username/tetris-2d5 .
docker push username/tetris-2d5
```

### For GitHub Actions
1. Add Docker Hub secrets to your GitHub repository:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
2. Push to main branch to trigger automatic deployment

## 🎮 Game Controls
- **WASD** : Move piece
- **↓** : Soft drop
- **↑** : Rotate with wall kicks
- **Space** : Hard drop
- **C** : Hold piece
- **P** : Pause
- **R** : Restart

## 🐛 Troubleshooting

### Docker Issues
```bash
# Check if Docker is running
docker --version

# Check container status
docker ps

# View logs
docker logs tetris-2d5

# Remove and rebuild
docker stop tetris-2d5
docker rm tetris-2d5
./deploy.sh
```

### Browser Issues
- Ensure you're using a modern browser
- Check browser console for errors
- Try a different browser if issues persist

### Port Issues
- Change the port in `docker-compose.yml` or `deploy.sh`
- Ensure the port isn't already in use

## 📞 Support
- Create an issue on GitHub
- Check the README.md for detailed documentation
- Review the code comments for implementation details
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📁 Project structure:"
tree -a

echo ""
echo "🚀 Next steps:"
echo "1. cd tetris-2d5"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial commit'"
echo "5. Create GitHub repository and push"
echo "6. Run: ./deploy.sh (for Docker deployment)"
echo ""
echo "🎮 Game will be available at:"
echo "- Direct: Open index.html"
echo "- Local server: http://localhost:8000"
echo "- Docker: http://localhost:8080" 