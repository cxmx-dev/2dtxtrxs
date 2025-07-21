// Cache busting: 2025-07-21 clean, working 2D Tetris game
class Tetris {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');
        this.holdElement = document.getElementById('holdPiece');
        this.nextElement = document.getElementById('nextPiece');
        this.gameOver = false;
        this.paused = false;
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = 30;
        this.BOARD_OFFSET_X = 50;
        this.BOARD_OFFSET_Y = 50;
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.heldPiece = null;
        this.canHold = true;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropTime = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.linesToClear = [];
        this.strobeTime = 0;
        this.strobeDuration = 500;
        this.strobeVisible = true;
        this.strobeInterval = 50;
        this.keys = {};
        this.isMobile = false;
        this.actionButtons = null;
        this.init();
    }
    init() {
        this.resizeCanvas();
        this.initBoard();
        this.spawnPiece();
        this.setupEventListeners();
        this.setupMobileControls();
        this.gameLoop();
    }
    resizeCanvas() {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        this.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (this.isMobile) {
            this.canvas.width = Math.min(containerWidth, 480);
            // Reduce height to leave more space for controls, and move playfield up
            this.canvas.height = Math.min(containerHeight * 0.6, 480);
        } else {
            this.canvas.width = Math.min(containerWidth * 0.5, 480);
            this.canvas.height = Math.min(containerHeight * 0.8, 800);
        }
        this.BLOCK_SIZE = Math.floor(this.canvas.width / (this.BOARD_WIDTH + 2));
        this.BOARD_OFFSET_X = (this.canvas.width - this.BOARD_WIDTH * this.BLOCK_SIZE) / 2;
        // On mobile, move playfield up to avoid overlap with controls
        if (this.isMobile) {
            this.BOARD_OFFSET_Y = 8; // 8px from top
        } else {
            this.BOARD_OFFSET_Y = (this.canvas.height - this.BOARD_HEIGHT * this.BLOCK_SIZE) / 2;
        }
    }
    initBoard() {
        this.board = [];
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            this.board[y] = [];
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                this.board[y][x] = 0;
            }
        }
    }
    spawnPiece() {
        if (!this.nextPiece) {
            this.nextPiece = this.getRandomPiece();
        }
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.getRandomPiece();
        this.canHold = true;
        if (this.isCollision(this.currentPiece)) {
            this.gameOver = true;
        }
    }
    getRandomPiece() {
        const pieces = [
            { shape: [[1, 1, 1, 1]], color: '#00ffff', name: 'I' },
            { shape: [[1, 1], [1, 1]], color: '#ffff00', name: 'O' },
            { shape: [[1, 1, 1], [0, 1, 0]], color: '#800080', name: 'T' },
            { shape: [[1, 1, 1], [1, 0, 0]], color: '#0000ff', name: 'J' },
            { shape: [[1, 1, 1], [0, 0, 1]], color: '#ff8000', name: 'L' },
            { shape: [[1, 1, 0], [0, 1, 1]], color: '#00ff00', name: 'S' },
            { shape: [[0, 1, 1], [1, 1, 0]], color: '#ff0000', name: 'Z' }
        ];
        const piece = pieces[Math.floor(Math.random() * pieces.length)];
        return {
            shape: piece.shape,
            color: piece.color,
            name: piece.name,
            x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
            y: 0
        };
    }
    isCollision(piece, offsetX = 0, offsetY = 0) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x + offsetX;
                    const newY = piece.y + y + offsetY;
                    if (newX < 0 || newX >= this.BOARD_WIDTH || newY >= this.BOARD_HEIGHT || (newY >= 0 && this.board[newY][newX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    rotatePiece(piece) {
        const rotated = [];
        const rows = piece.shape.length;
        const cols = piece.shape[0].length;
        for (let x = 0; x < cols; x++) {
            rotated[x] = [];
            for (let y = rows - 1; y >= 0; y--) {
                rotated[x][rows - 1 - y] = piece.shape[y][x];
            }
        }
        return rotated;
    }
    tryRotate(dir = 1) {
        if (!this.currentPiece || this.gameOver || this.paused) return;
        const originalShape = this.currentPiece.shape;
        const rotatedShape = this.rotateMatrix(this.currentPiece.shape, dir);
        const kicks = this.getWallKickTests(this.currentPiece.name, this.currentPiece.rotation || 0, dir);
        for (let i = 0; i < kicks.length; i++) {
            const [dx, dy] = kicks[i];
            const testPiece = {
                ...this.currentPiece,
                shape: rotatedShape,
                x: this.currentPiece.x + dx,
                y: this.currentPiece.y + dy
            };
            if (!this.isCollision(testPiece)) {
                this.currentPiece.shape = rotatedShape;
                this.currentPiece.x += dx;
                this.currentPiece.y += dy;
                this.currentPiece.rotation = ((this.currentPiece.rotation || 0) + dir + 4) % 4;
                return;
            }
        }
        // If all kicks fail, do not rotate
    }
    rotateMatrix(matrix, dir) {
        // dir: 1 = CW, -1 = CCW
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotated = [];
        if (dir === 1) {
            for (let x = 0; x < cols; x++) {
                rotated[x] = [];
                for (let y = rows - 1; y >= 0; y--) {
                    rotated[x][rows - 1 - y] = matrix[y][x];
                }
            }
        } else {
            for (let x = cols - 1; x >= 0; x--) {
                rotated[cols - 1 - x] = [];
                for (let y = 0; y < rows; y++) {
                    rotated[cols - 1 - x][y] = matrix[y][x];
                }
            }
        }
        return rotated;
    }
    getWallKickTests(pieceName, rotation, dir) {
        // SRS wall kick data for all pieces
        // Only I and O have special rules, others use standard
        const kicks = {
            I: [
                [[0,0],[ -2,0],[ 1,0],[ -2,-1],[ 1,2]], // 0->R
                [[0,0],[ -1,0],[ 2,0],[ -1,2],[ 2,-1]], // R->2
                [[0,0],[ 2,0],[ -1,0],[ 2,1],[ -1,-2]], // 2->L
                [[0,0],[ 1,0],[ -2,0],[ 1,-2],[ -2,1]]  // L->0
            ],
            O: [ [[0,0]] ],
            default: [
                [[0,0],[ -1,0],[ -1,1],[ 0,-2],[ -1,-2]], // 0->R
                [[0,0],[ 1,0],[ 1,-1],[ 0,2],[ 1,2]],     // R->2
                [[0,0],[ 1,0],[ 1,1],[ 0,-2],[ 1,-2]],    // 2->L
                [[0,0],[ -1,0],[ -1,-1],[ 0,2],[ -1,2]]   // L->0
            ]
        };
        if (pieceName === 'O') return kicks.O;
        if (pieceName === 'I') return kicks.I[(rotation + (dir === 1 ? 0 : 3)) % 4];
        return kicks.default[(rotation + (dir === 1 ? 0 : 3)) % 4];
    }
    movePiece(dx, dy) {
        if (!this.currentPiece || this.gameOver || this.paused) return false;
        if (!this.isCollision(this.currentPiece, dx, dy)) {
            this.currentPiece.x += dx;
            this.currentPiece.y += dy;
            return true;
        }
        return false;
    }
    dropPiece() {
        if (!this.currentPiece || this.gameOver || this.paused) return;
        // Only drop one piece per call
        if (!this.movePiece(0, 1)) {
            this.placePiece();
            this.clearLines();
            this.spawnPiece();
        }
    }
    hardDrop() {
        if (!this.currentPiece || this.gameOver || this.paused) return;
        let dropDistance = 0;
        while (this.movePiece(0, 1)) {
            dropDistance++;
        }
        this.score += dropDistance * 2;
        this.placePiece();
        this.clearLines();
        this.spawnPiece();
    }
    placePiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardX = this.currentPiece.x + x;
                    const boardY = this.currentPiece.y + y;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }
    }
    clearLines() {
        const linesToClear = [];
        for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                linesToClear.push(y);
            }
        }
        if (linesToClear.length > 0) {
            this.linesToClear = linesToClear;
            this.strobeTime = 0;
            this.strobeVisible = true;
            const lineCount = linesToClear.length;
            this.lines += lineCount;
            this.score += [0, 100, 300, 500, 800][lineCount] * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 50);
            this.updateUI();
        }
    }
    removeLines() {
        if (this.linesToClear.length === 0) return;
        for (let lineIndex of this.linesToClear) {
            this.board.splice(lineIndex, 1);
            this.board.unshift(new Array(this.BOARD_WIDTH).fill(0));
        }
        this.linesToClear = [];
    }
    holdPiece() {
        if (!this.currentPiece || !this.canHold || this.gameOver || this.paused) return;
        if (!this.heldPiece) {
            this.heldPiece = {
                shape: this.currentPiece.shape,
                color: this.currentPiece.color,
                name: this.currentPiece.name
            };
            this.spawnPiece();
        } else {
            const temp = this.heldPiece;
            this.heldPiece = {
                shape: this.currentPiece.shape,
                color: this.currentPiece.color,
                name: this.currentPiece.name
            };
            this.currentPiece = {
                shape: temp.shape,
                color: temp.color,
                name: temp.name,
                x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(temp.shape[0].length / 2),
                y: 0
            };
        }
        this.canHold = false;
        this.updateUI();
    }
    updateUI() {
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.levelElement.textContent = `Level: ${this.level}`;
        this.linesElement.textContent = `Lines: ${this.lines}`;
        this.holdElement.textContent = this.heldPiece ? `Hold: ${this.heldPiece.name}` : 'Hold: None';
        this.nextElement.textContent = this.nextPiece ? `Next: ${this.nextPiece.name}` : 'Next: None';
    }
    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        const now = Date.now();
        const strobePhase = Math.floor((now % 1000) / 500);
        let borderColor = strobePhase === 0 ? '#00ff88' : '#fff';
        let borderGlow = strobePhase === 0 ? 'rgba(0,255,136,0.5)' : 'rgba(255,255,255,0.5)';
        this.ctx.save();
        this.ctx.shadowColor = borderGlow;
        this.ctx.shadowBlur = 20;
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 6;
        this.ctx.strokeRect(
            this.BOARD_OFFSET_X - 6,
            this.BOARD_OFFSET_Y - 6,
            this.BOARD_WIDTH * this.BLOCK_SIZE + 12,
            this.BOARD_HEIGHT * this.BLOCK_SIZE + 12
        );
        this.ctx.restore();
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(
            this.BOARD_OFFSET_X - 5, 
            this.BOARD_OFFSET_Y - 5, 
            this.BOARD_WIDTH * this.BLOCK_SIZE + 10, 
            this.BOARD_HEIGHT * this.BLOCK_SIZE + 10
        );
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                const cell = this.board[y][x];
                if (cell) {
                    const isStrobing = this.linesToClear.includes(y);
                    if (isStrobing && !this.strobeVisible) {
                        continue;
                    }
                    this.drawBlock(x, y, cell, isStrobing);
                }
            }
        }
        if (this.currentPiece && !this.gameOver && !this.paused) {
            const ghostPiece = {
                shape: this.currentPiece.shape,
                color: this.currentPiece.color,
                x: this.currentPiece.x,
                y: this.currentPiece.y
            };
            while (!this.isCollision(ghostPiece, 0, 1)) {
                ghostPiece.y++;
            }
            for (let y = 0; y < ghostPiece.shape.length; y++) {
                for (let x = 0; x < ghostPiece.shape[y].length; x++) {
                    if (ghostPiece.shape[y][x]) {
                        const boardX = ghostPiece.x + x;
                        const boardY = ghostPiece.y + y;
                        if (boardY >= 0) {
                            const pixelX = this.BOARD_OFFSET_X + boardX * this.BLOCK_SIZE;
                            const pixelY = this.BOARD_OFFSET_Y + boardY * this.BLOCK_SIZE;
                            this.ctx.save();
                            this.ctx.globalAlpha = 0.25;
                            this.ctx.fillStyle = '#fff';
                            this.ctx.fillRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
                            this.ctx.globalAlpha = 0.5;
                            this.ctx.strokeStyle = '#fff';
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
                            this.ctx.restore();
                        }
                    }
                }
            }
        }
        if (this.currentPiece) {
            this.drawPiece(this.currentPiece);
        }
    }
    drawBlock(x, y, color, isStrobing = false) {
        const pixelX = this.BOARD_OFFSET_X + x * this.BLOCK_SIZE;
        const pixelY = this.BOARD_OFFSET_Y + y * this.BLOCK_SIZE;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
        this.ctx.strokeStyle = isStrobing ? '#fff' : '#333';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE);
        this.ctx.fillStyle = isStrobing ? '#fff' : 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(pixelX + 2, pixelY + 2, this.BLOCK_SIZE - 4, 4);
        this.ctx.fillRect(pixelX + 2, pixelY + 2, 4, this.BLOCK_SIZE - 4);
    }
    drawPiece(piece) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardX = piece.x + x;
                    const boardY = piece.y + y;
                    if (boardY >= 0) {
                        this.drawBlock(boardX, boardY, piece.color);
                    }
                }
            }
        }
    }
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.keys[e.code]) return;
            this.keys[e.code] = true;
            if (this.gameOver) {
                if (e.code === 'KeyR') {
                    this.restart();
                }
                return;
            }
            if (e.code === 'KeyP') {
                this.togglePause();
                return;
            }
            if (this.paused) return;
            switch (e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    this.movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.movePiece(1, 0);
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.dropPiece();
                    break;
                case 'ArrowUp':
                case 'KeyW':
                    this.tryRotate(1);
                    break;
                case 'KeyZ':
                    this.tryRotate(-1);
                    break;
                case 'Space':
                    this.hardDrop();
                    break;
                case 'KeyQ':
                    this.holdPiece();
                    break;
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            if (this.isMobile) {
                this.setupMobileControls();
            }
        });
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.resizeCanvas();
                if (this.isMobile) {
                    this.setupMobileControls();
                }
            }, 100);
        });
        // --- Mobile touch events ---
        if (this.isMobile) {
            let lastTap = 0;
            let startY = 0;
            let startX = 0;
            let touchMoved = false;
            this.canvas.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    startY = e.touches[0].clientY;
                    startX = e.touches[0].clientX;
                    touchMoved = false;
                }
            });
            this.canvas.addEventListener('touchmove', (e) => {
                touchMoved = true;
            });
            this.canvas.addEventListener('touchend', (e) => {
                const endY = e.changedTouches[0].clientY;
                const endX = e.changedTouches[0].clientX;
                const deltaY = endY - startY;
                const deltaX = endX - startX;
                const minSwipe = 40;
                const now = Date.now();
                // Only allow one action per touch
                if (!touchMoved) {
                    // Tap to pause
                    this.togglePause();
                    return;
                }
                if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -minSwipe) {
                    // Swipe up: rotate CW
                    this.tryRotate(1);
                } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > minSwipe) {
                    // Swipe down: hard drop
                    this.hardDrop();
                } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < -minSwipe) {
                    // Swipe right: move right
                    this.movePiece(1, 0);
                } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > minSwipe) {
                    // Swipe left: move left
                    this.movePiece(-1, 0);
                } else if (now - lastTap < 350) {
                    // Double tap: rotate CCW
                    this.tryRotate(-1);
                }
                lastTap = now;
            });
        }
    }
    setupMobileControls() {
        if (!this.isMobile) {
            const mobileControls = document.getElementById('mobileControls');
            if (mobileControls) mobileControls.style.display = 'none';
            // Remove restart button if present
            const restartBtn = document.getElementById('restartBtn');
            if (restartBtn) restartBtn.remove();
            return;
        }
        const mobileControls = document.getElementById('mobileControls');
        if (mobileControls) mobileControls.style.display = 'block';
        this.actionButtons = document.querySelectorAll('.actionBtn');
        if (this.actionButtons.length > 0) {
            this.setupActionButtons();
        }
        // Add a small restart button at bottom right if not present
        if (!document.getElementById('restartBtn')) {
            const restartBtn = document.createElement('button');
            restartBtn.id = 'restartBtn';
            restartBtn.textContent = '⟳';
            restartBtn.style.position = 'fixed';
            restartBtn.style.bottom = '12px';
            restartBtn.style.right = '12px';
            restartBtn.style.width = '40px';
            restartBtn.style.height = '40px';
            restartBtn.style.borderRadius = '50%';
            restartBtn.style.background = '#222';
            restartBtn.style.color = '#fff';
            restartBtn.style.fontSize = '1.5em';
            restartBtn.style.opacity = '0.7';
            restartBtn.style.zIndex = '1001';
            restartBtn.style.border = 'none';
            restartBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            restartBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.restart();
            });
            restartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.restart();
            });
            document.body.appendChild(restartBtn);
        }
    }
    setupActionButtons() {
        const buttons = this.actionButtons;
        const actions = [
            { key: 'ArrowLeft', action: () => this.movePiece(-1, 0) },
            { key: 'ArrowUp', action: () => this.tryRotate(1) },
            { key: 'ArrowRight', action: () => this.movePiece(1, 0) },
            { key: 'ArrowDown', action: () => this.dropPiece() },
            { key: 'Space', action: () => this.hardDrop() },
            { key: 'KeyQ', action: () => this.holdPiece() }
        ];
        buttons.forEach((button, index) => {
            const action = actions[index];
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                action.action();
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(1)';
            });
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                action.action();
                button.style.transform = 'scale(0.95)';
            });
            button.addEventListener('mouseup', () => {
                button.style.transform = 'scale(1)';
            });
        });
    }
    togglePause() {
        this.paused = !this.paused;
        const pauseElement = document.getElementById('pause');
        if (pauseElement) pauseElement.style.display = this.paused ? 'block' : 'none';
    }
    restart() {
        this.board = [];
        this.currentPiece = null;
        this.nextPiece = null;
        this.heldPiece = null;
        this.canHold = true;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameOver = false;
        this.paused = false;
        this.dropTime = 0;
        this.dropInterval = 1000;
        this.linesToClear = [];
        this.strobeTime = 0;
        this.strobeDuration = 500;
        this.strobeInterval = 50;
        this.strobeVisible = true;
        this.initBoard();
        this.spawnPiece();
        this.updateUI();
        const gameOverElement = document.getElementById('gameOver');
        const pauseElement = document.getElementById('pause');
        if (gameOverElement) gameOverElement.style.display = 'none';
        if (pauseElement) pauseElement.style.display = 'none';
    }
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        if (!this.gameOver && !this.paused) {
            this.dropTime += deltaTime;
            if (this.dropTime >= this.dropInterval) {
                this.dropPiece();
                this.dropTime = 0;
            }
            if (this.linesToClear.length > 0) {
                this.strobeTime += deltaTime;
                if (Math.floor(this.strobeTime / this.strobeInterval) % 2 === 0) {
                    this.strobeVisible = true;
                } else {
                    this.strobeVisible = false;
                }
                if (this.strobeTime >= this.strobeDuration) {
                    this.removeLines();
                }
            }
            if (this.keys['ArrowDown'] || this.keys['KeyS']) {
                this.dropTime += 50;
            }
        }
        this.draw();
        this.updateUI();
        if (this.gameOver) {
            const gameOverElement = document.getElementById('gameOver');
            if (gameOverElement) gameOverElement.style.display = 'block';
        }
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}
window.addEventListener('load', () => {
    new Tetris();
});