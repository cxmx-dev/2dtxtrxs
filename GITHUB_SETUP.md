# GitHub Setup Guide for 2.5D Tetris

## 🔧 Required GitHub Secrets

To enable automatic Docker builds and Vercel deployment, you need to set up the following secrets in your GitHub repository:

### 1. Docker Hub Secrets

#### DOCKERHUB_USERNAME
- **Value**: Your Docker Hub username
- **Example**: `cxmx-dev`
- **How to get**: Your Docker Hub account username

#### DOCKERHUB_TOKEN
- **Value**: Your Docker Hub access token
- **How to create**:
  1. Go to [Docker Hub](https://hub.docker.com)
  2. Sign in to your account
  3. Go to Account Settings → Security
  4. Click "New Access Token"
  5. Give it a name (e.g., "GitHub Actions")
  6. Copy the generated token

### 2. Vercel Secrets (Optional)

#### VERCEL_TOKEN
- **Value**: Your Vercel API token
- **How to get**:
  1. Go to [Vercel](https://vercel.com)
  2. Sign in to your account
  3. Go to Settings → Tokens
  4. Create a new token
  5. Copy the token

#### ORG_ID
- **Value**: Your Vercel organization ID
- **How to get**:
  1. In Vercel dashboard, go to Settings
  2. Copy the Organization ID

#### PROJECT_ID
- **Value**: Your Vercel project ID
- **How to get**:
  1. Create a new project in Vercel
  2. Go to project settings
  3. Copy the Project ID

## 🚀 Setting Up GitHub Secrets

### Method 1: GitHub Web Interface
1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with the exact names above

### Method 2: GitHub CLI
```bash
# Install GitHub CLI if you haven't
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: sudo apt install gh

# Login to GitHub
gh auth login

# Add secrets
gh secret set DOCKERHUB_USERNAME --body "your-dockerhub-username"
gh secret set DOCKERHUB_TOKEN --body "your-dockerhub-token"
gh secret set VERCEL_TOKEN --body "your-vercel-token"
gh secret set ORG_ID --body "your-org-id"
gh secret set PROJECT_ID --body "your-project-id"
```

## 📋 Complete Setup Checklist

### ✅ Repository Setup
- [ ] Repository created on GitHub
- [ ] Code pushed to main/master branch
- [ ] GitHub Actions enabled

### ✅ Docker Hub Setup
- [ ] Docker Hub account created
- [ ] Access token generated
- [ ] `DOCKERHUB_USERNAME` secret added
- [ ] `DOCKERHUB_TOKEN` secret added

### ✅ Vercel Setup (Optional)
- [ ] Vercel account created
- [ ] Project created in Vercel
- [ ] `VERCEL_TOKEN` secret added
- [ ] `ORG_ID` secret added
- [ ] `PROJECT_ID` secret added

### ✅ Testing
- [ ] Push to main branch triggers workflow
- [ ] Docker image builds successfully
- [ ] Docker image pushes to Docker Hub
- [ ] Vercel deployment works (if configured)

## 🔍 Troubleshooting

### Docker Hub Issues
```bash
# Test Docker Hub login locally
docker login -u your-username -p your-token

# Check if image exists
docker pull your-username/tetris-2d5:latest
```

### GitHub Actions Issues
1. **Check workflow runs**: Go to Actions tab in your repository
2. **View logs**: Click on failed workflow to see detailed logs
3. **Verify secrets**: Ensure secret names match exactly
4. **Check permissions**: Ensure GitHub Actions has write permissions

### Common Errors
- **"Context access might be invalid"**: Secret name doesn't match
- **"Authentication failed"**: Invalid Docker Hub credentials
- **"Permission denied"**: Repository doesn't have Actions enabled

## 🎯 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/username/tetris-2d5.git
cd tetris-2d5

# Add secrets via CLI (if using GitHub CLI)
gh secret set DOCKERHUB_USERNAME --body "your-username"
gh secret set DOCKERHUB_TOKEN --body "your-token"

# Push to trigger workflow
git add .
git commit -m "Setup GitHub Actions"
git push origin main
```

## 📊 Monitoring Deployment

### GitHub Actions
- Go to your repository → Actions tab
- Monitor workflow runs in real-time
- View logs for each step

### Docker Hub
- Go to [Docker Hub](https://hub.docker.com)
- Check your repository for new images
- Verify tags are being created

### Vercel (if configured)
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Monitor deployment status
- Check deployment logs

## 🔒 Security Notes

- **Never commit secrets** to your repository
- **Use access tokens** instead of passwords
- **Rotate tokens** regularly
- **Limit token permissions** to minimum required
- **Monitor token usage** for suspicious activity

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all secrets are set correctly
3. Test Docker Hub login locally
4. Create an issue in the repository

---

**Your 2.5D Tetris game will be automatically deployed on every push to main!** 🎮✨ 