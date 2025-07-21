# 2D Tetris - Fullscreen Edition

A modern, responsive 2D Tetris game built with HTML5 Canvas and JavaScript. Features smooth gameplay, advanced wall kick system, hold piece functionality, and stunning visual effects.

## 🎮 Features

### **Core Gameplay**
- **Classic 2D Tetris**: Clean, crisp visual design
- **Advanced Wall Kick System**: 16+ rotation tests for tight spaces
- **Hold Piece**: Strategic piece management with Q key
- **Ghost Piece**: Shows landing position
- **Line Clearing Animation**: Strobing effect when lines are formed
- **Progressive Difficulty**: Speed increases with level

### **Controls**
- **WASD** or **Arrow Keys**: Move and rotate pieces
- **Space**: Hard drop
- **Q**: Hold piece (was C key)
- **P**: Pause/Resume
- **R**: Restart
- **Mouse**: Click and drag for movement
- **Fullscreen**: Click fullscreen button

### **Visual Effects**
- **Strobing Line Clear**: Lines flash white before disappearing
- **Smooth Animations**: 60fps gameplay
- **Responsive Design**: Scales to any screen size
- **No Right-Click**: Clean gaming experience
- **No White Borders**: Seamless fullscreen

## 🚀 Quick Start

### **Local Development**
```bash
# Start local server
python -m http.server 8000
# Open http://localhost:8000
```

### **Docker Deployment**
```bash
# Quick deployment
./deploy.sh
# Access at http://localhost:8080
```

### **GitHub Pages**
```bash
# Push to GitHub repository
git remote add origin https://github.com/username/tetris-2d.git
git push -u origin main
# Game will be live at: https://username.github.io/tetris-2d/
```

## 🎯 Wall Kick System Explained

The game features an advanced **Super Rotation System (SRS)** wall kick system that allows pieces to rotate in tight spaces:

### **How It Works**
1. **Primary Test**: Try rotation at current position
2. **Wall Kicks**: Test 16+ offset positions around the piece
3. **I-Piece Special**: Extended wall kicks for the I-piece (20+ tests)
4. **O-Piece**: No wall kicks needed (square shape)

### **Wall Kick Tests**
```javascript
// Standard SRS wall kicks for most pieces
{0,0}, {-1,0}, {-1,1}, {0,-2}, {-1,-2},
{0,0}, {1,0}, {1,-1}, {0,2}, {1,2},
{0,0}, {1,0}, {1,1}, {0,-2}, {1,-2},
{0,0}, {-1,0}, {-1,-1}, {0,2}, {-1,2}

// I-piece gets additional extreme kicks
{-2,0}, {1,0}, {-2,-1}, {1,2}, {2,0}, {-1,0}, {2,1}, {-1,-2}
```

### **Benefits**
- **Tight Space Rotation**: Rotate pieces in confined areas
- **Last-Minute Saves**: Rotate at the last moment to fit
- **Professional Feel**: Matches modern Tetris standards
- **Strategic Depth**: More placement options

## 🎨 Visual Design

### **2D Rendering**
- Clean, flat blocks with simple borders
- Classic Tetris color scheme
- Smooth animations and transitions
- Responsive canvas scaling

### **Line Clearing Animation**
- **Duration**: 0.5 seconds
- **Strobe Speed**: Every 50ms
- **Effect**: Lines flash white before disappearing
- **Visual Feedback**: Clear indication of line completion

## 🏗️ Project Structure

```
tetris-2d/
├── index.html              # Main game interface
├── tetris.js               # Complete game logic
├── .github/workflows/      # GitHub Actions CI/CD
│   └── deploy.yml          # Automated deployment
├── setup-secrets.sh        # GitHub secrets setup
├── GITHUB_SETUP.md         # Comprehensive setup guide
├── create_structure.sh     # Auto-create project structure
├── deploy.sh               # Docker deployment script
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker container setup
├── package.json            # Project metadata
├── README.md               # This file
├── SETUP.md                # Quick setup guide
└── .gitignore              # Git ignore rules
```

## 🎯 Game Mechanics

### **Scoring System**
- **Single Line**: 100 × level
- **Double Lines**: 300 × level
- **Triple Lines**: 500 × level
- **Tetris (4 Lines)**: 800 × level
- **Hard Drop**: 2 points per cell dropped

### **Level Progression**
- **Level Up**: Every 10 lines cleared
- **Speed Increase**: 50ms faster per level
- **Minimum Speed**: 50ms (very fast)

### **Hold Piece Strategy**
- **One-Time Use**: Can only hold once per piece
- **Strategic Timing**: Save pieces for optimal placement
- **Risk Management**: Balance current vs. future needs

## 🚀 Deployment Options

### **Local Development**
Perfect for testing and development:
```bash
python -m http.server 8000
```

### **Docker Container**
Production-ready containerized deployment:
```bash
./deploy.sh
```

### **GitHub Pages**
Free hosting with automatic deployment:
```bash
git push origin main
```

### **Vercel/Netlify**
Modern hosting platforms with CI/CD:
```bash
# Configure in GitHub Actions workflow
```

## 🔧 Technical Details

### **Performance**
- **60 FPS**: Smooth gameplay
- **Responsive**: Scales to any screen
- **Optimized**: Efficient rendering and collision detection
- **Memory Efficient**: Minimal resource usage

### **Browser Compatibility**
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: Touch controls (future enhancement)
- **Fullscreen API**: Native fullscreen support

### **Code Quality**
- **ES6+**: Modern JavaScript features
- **Modular Design**: Clean, maintainable code
- **Error Handling**: Robust input validation
- **Accessibility**: Keyboard and mouse support

## 🎮 Game Controls Reference

| Action | Primary Key | Alternative Key |
|--------|-------------|-----------------|
| Move Left | A | ← |
| Move Right | D | → |
| Soft Drop | S | ↓ |
| Rotate | W | ↑ |
| Hard Drop | Space | - |
| Hold Piece | Q | - |
| Pause | P | - |
| Restart | R | - |

## 🏆 Tips for High Scores

1. **Use Hold Piece Strategically**: Save I-pieces for Tetris opportunities
2. **Master Wall Kicks**: Practice rotating in tight spaces
3. **Plan Ahead**: Look at next piece and held piece
4. **Build Efficiently**: Avoid creating holes and gaps
5. **Use Ghost Piece**: Plan precise landings
6. **Chain Combos**: Clear multiple lines for bonus points

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing 2D Tetris!** 🎮✨

**Play Now**: https://cxmx-dev.github.io/tetris-2d/

## 🚀 **Quick Setup Options**

**Which method would you prefer?**

1. **Personal Access Token** (Quickest):
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
   - Use token as password when prompted

2. **Install GitHub CLI** (Recommended):
   ```bash
   sudo apt install gh
   gh auth login
   ```

3. **SSH Key Setup** (Most secure):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Then add to GitHub SSH keys
   ```

4. **Use HTTPS with stored credentials**:
   ```bash
   git config --global credential.helper store
   ```

**What would you like to do?** I can help you with any of these methods, or if you already have a personal access token, you can just run the push command again and enter your credentials when prompted. 

## 📱 **Mobile Features Added**

### **✅ Thumb Controller (Bottom Left)**
- **Circular joystick** for precise movement
- **Smooth tracking** with deadzone for accuracy
- **Visual feedback** with glowing effects
- **Responsive design** that adapts to screen size

### **✅ Action Buttons (Bottom Right)**
- **Grid layout** (3x2) for easy thumb access
- **6 buttons total**:
  - **←** Move Left
  - **↻** Rotate
  - **→** Move Right
  - **↓** Soft Drop
  - **⏬** Hard Drop
  - **H** Hold Piece

### **✅ Touch Gestures**
- **Swipe left/right**: Move piece horizontally
- **Swipe up**: Rotate piece
- **Swipe down**: Soft drop
- **Double tap**: Pause/Resume game

### **✅ Mobile Optimizations**
- **Responsive canvas** that scales to screen size
- **Prevented zoom** and scrolling
- **Touch-friendly** button sizes
- **Orientation change** support
- **Android-specific** optimizations

## 🎮 **Mobile Controls Summary**

### **Primary Controls:**
1. **Thumb Controller**: Drag to move pieces
2. **Action Buttons**: Tap for specific actions
3. **Swipe Gestures**: Quick movements
4. **Double Tap**: Pause game

### **Button Layout:**
```
[←] [↻] [→]
[↓] [⏬] [H]
```

## 🚀 **Access Your Mobile Game**

### **GitHub Pages**: https://cxmx-dev.github.io/tetris-2d/
### **Docker Local**: http://localhost:8080

## 📱 **Mobile Testing**

**To test on your Android device:**
1. Open the GitHub Pages URL on your phone
2. The game will automatically detect mobile and show controls
3. Use the thumb controller for movement
4. Tap action buttons for specific actions
5. Try swipe gestures for quick moves

**Features optimized for Android:**
- ✅ Touch-responsive controls
- ✅ Proper viewport scaling
- ✅ No zoom interference
- ✅ Smooth 60fps gameplay
- ✅ Sleek cyberpunk design

Your 2D Tetris game is now fully mobile-optimized for Android devices! 🎮📱✨ 

## ✅ **Mobile Controls Updated Successfully!**

I've successfully updated your Tetris game to remove the thumb controller and arrange all action buttons horizontally across the bottom, just like in picture 2. Here's what was changed:

### **🎮 Mobile Controls Redesign:**

**✅ Removed:**
- Thumb controller (large circular joystick)
- All thumb controller JavaScript functionality
- Thumb controller CSS styles

**✅ Updated:**
- Action buttons now span horizontally across the bottom
- Buttons are larger (60px) and more spaced out
- Better mobile real estate utilization
- Cleaner, more streamlined interface

### **🎯 Benefits:**
- **More screen real estate** for the game area
- **Cleaner interface** without the large thumb controller
- **Better accessibility** with larger, more spaced buttons
- **Consistent with picture 2** layout you requested

The changes are ready to be committed and deployed! The mobile experience will now be much cleaner and give you more space to see the Tetris game board. 🎮✨

Would you like me to help you commit and push these changes to GitHub? 

## 📱 **New Mobile Layout:**
- **Left Arrow**: Move piece left
- **Rotate**: Rotate piece  
- **Right Arrow**: Move piece right
- **Down Arrow**: Soft drop
- **Hard Drop**: Fast drop piece
- **H**: Hold piece
```
[←] [↻] [→] [↓] [⏬] [H]