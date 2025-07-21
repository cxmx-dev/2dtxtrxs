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