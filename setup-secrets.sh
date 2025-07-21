#!/bin/bash

# GitHub Secrets Setup Script for 2.5D Tetris
# This script helps you set up the required secrets for GitHub Actions

echo "🔧 GitHub Secrets Setup for 2.5D Tetris"
echo "========================================"

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it first:"
    echo "  Windows: winget install GitHub.cli"
    echo "  macOS: brew install gh"
    echo "  Linux: sudo apt install gh"
    exit 1
fi

# Check if user is logged in
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub first:"
    gh auth login
fi

echo ""
echo "📋 This script will help you set up the required secrets for automatic deployment."
echo "You can skip any secret by pressing Enter without entering a value."
echo ""

# Docker Hub Setup
echo "🐳 Docker Hub Setup"
echo "-------------------"
read -p "Enter your Docker Hub username (or press Enter to skip): " docker_username
if [ -n "$docker_username" ]; then
    read -s -p "Enter your Docker Hub access token (or press Enter to skip): " docker_token
    echo ""
    
    if [ -n "$docker_token" ]; then
        echo "Setting DOCKERHUB_USERNAME secret..."
        gh secret set DOCKERHUB_USERNAME --body "$docker_username"
        echo "Setting DOCKERHUB_TOKEN secret..."
        gh secret set DOCKERHUB_TOKEN --body "$docker_token"
        echo "✅ Docker Hub secrets configured!"
    else
        echo "⚠️ Skipping Docker Hub token setup"
    fi
else
    echo "⚠️ Skipping Docker Hub setup"
fi

echo ""

# Vercel Setup
echo "🚀 Vercel Setup (Optional)"
echo "--------------------------"
read -p "Enter your Vercel API token (or press Enter to skip): " vercel_token
if [ -n "$vercel_token" ]; then
    read -p "Enter your Vercel Organization ID (or press Enter to skip): " org_id
    if [ -n "$org_id" ]; then
        read -p "Enter your Vercel Project ID (or press Enter to skip): " project_id
        if [ -n "$project_id" ]; then
            echo "Setting VERCEL_TOKEN secret..."
            gh secret set VERCEL_TOKEN --body "$vercel_token"
            echo "Setting ORG_ID secret..."
            gh secret set ORG_ID --body "$org_id"
            echo "Setting PROJECT_ID secret..."
            gh secret set PROJECT_ID --body "$project_id"
            echo "✅ Vercel secrets configured!"
        else
            echo "⚠️ Skipping Vercel setup (missing Project ID)"
        fi
    else
        echo "⚠️ Skipping Vercel setup (missing Organization ID)"
    fi
else
    echo "⚠️ Skipping Vercel setup"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📊 To verify your secrets:"
echo "  gh secret list"
echo ""
echo "🚀 To trigger a deployment:"
echo "  git push origin main"
echo ""
echo "📖 For more information, see GITHUB_SETUP.md" 