# Quick Setup Guide

## 🚀 Getting Started

### Prerequisites
- Git
- Docker (optional)
- Modern web browser

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tetris-2d5.git
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
git remote add origin https://github.com/yourusername/tetris-2d5.git
git branch -M main
git push -u origin main
```

### For Docker Hub
1. Create a Docker Hub account
2. Build and tag your image:
```bash
docker build -t yourusername/tetris-2d5 .
docker push yourusername/tetris-2d5
```

### For GitHub Actions
1. Add Docker Hub secrets to your GitHub repository:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
2. Push to main branch to trigger automatic deployment

## 🎮 Game Controls
- **← →** : Move piece
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