class Game2048 {
    constructor() {
        this.size = 4; // 4x4网格
        this.grid = []; // 游戏网格
        this.score = 0; // 当前分数
        this.bestScore = localStorage.getItem('bestScore') || 0; // 最高分
        this.gameOver = false; // 游戏结束标志
        this.gameWon = false; // 游戏胜利标志
        this.setup();
    }

    // 初始化游戏
    setup() {
        // 初始化网格
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        
        // 更新分数显示
        document.getElementById('score').textContent = this.score;
        document.getElementById('best-score').textContent = this.bestScore;
        
        // 初始化事件监听
        this.setupEventListeners();
        
        // 开始游戏
        this.startGame();
    }

    // 开始游戏
    startGame() {
        // 重置游戏状态
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
        
        // 清空网格
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        
        // 生成初始方块
        this.generateTile();
        this.generateTile();
        
        // 更新显示
        this.updateDisplay();
        this.hideGameMessage();
    }

    // 生成随机方块
    generateTile() {
        // 找出所有空白位置
        const emptyCells = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.grid[y][x] === 0) {
                    emptyCells.push({ x, y });
                }
            }
        }
        
        // 如果有空白位置，随机生成一个方块
        if (emptyCells.length > 0) {
            const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[y][x] = Math.random() < 0.9 ? 2 : 4; // 90%概率生成2，10%概率生成4
        }
    }

    // 移动方块
    move(direction) {
        if (this.gameOver || this.gameWon) return;
        
        let moved = false;
        
        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }
        
        // 如果有移动，生成新方块并检查游戏状态
        if (moved) {
            this.generateTile();
            this.updateDisplay();
            this.checkGameStatus();
        }
    }

    // 向上移动
    moveUp() {
        let moved = false;
        
        for (let x = 0; x < this.size; x++) {
            for (let y = 1; y < this.size; y++) {
                if (this.grid[y][x] !== 0) {
                    let newY = y;
                    // 找到可以移动到的位置
                    while (newY > 0 && this.grid[newY - 1][x] === 0) {
                        this.grid[newY - 1][x] = this.grid[newY][x];
                        this.grid[newY][x] = 0;
                        newY--;
                        moved = true;
                    }
                    // 检查是否可以合并
                    if (newY > 0 && this.grid[newY - 1][x] === this.grid[newY][x]) {
                        this.grid[newY - 1][x] *= 2;
                        this.score += this.grid[newY - 1][x];
                        this.grid[newY][x] = 0;
                        moved = true;
                        // 检查是否胜利
                        if (this.grid[newY - 1][x] === 2048 && !this.gameWon) {
                            this.gameWon = true;
                            this.showGameMessage('胜利！', true);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    // 向下移动
    moveDown() {
        let moved = false;
        
        for (let x = 0; x < this.size; x++) {
            for (let y = this.size - 2; y >= 0; y--) {
                if (this.grid[y][x] !== 0) {
                    let newY = y;
                    // 找到可以移动到的位置
                    while (newY < this.size - 1 && this.grid[newY + 1][x] === 0) {
                        this.grid[newY + 1][x] = this.grid[newY][x];
                        this.grid[newY][x] = 0;
                        newY++;
                        moved = true;
                    }
                    // 检查是否可以合并
                    if (newY < this.size - 1 && this.grid[newY + 1][x] === this.grid[newY][x]) {
                        this.grid[newY + 1][x] *= 2;
                        this.score += this.grid[newY + 1][x];
                        this.grid[newY][x] = 0;
                        moved = true;
                        // 检查是否胜利
                        if (this.grid[newY + 1][x] === 2048 && !this.gameWon) {
                            this.gameWon = true;
                            this.showGameMessage('胜利！', true);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    // 向左移动
    moveLeft() {
        let moved = false;
        
        for (let y = 0; y < this.size; y++) {
            for (let x = 1; x < this.size; x++) {
                if (this.grid[y][x] !== 0) {
                    let newX = x;
                    // 找到可以移动到的位置
                    while (newX > 0 && this.grid[y][newX - 1] === 0) {
                        this.grid[y][newX - 1] = this.grid[y][newX];
                        this.grid[y][newX] = 0;
                        newX--;
                        moved = true;
                    }
                    // 检查是否可以合并
                    if (newX > 0 && this.grid[y][newX - 1] === this.grid[y][newX]) {
                        this.grid[y][newX - 1] *= 2;
                        this.score += this.grid[y][newX - 1];
                        this.grid[y][newX] = 0;
                        moved = true;
                        // 检查是否胜利
                        if (this.grid[y][newX - 1] === 2048 && !this.gameWon) {
                            this.gameWon = true;
                            this.showGameMessage('胜利！', true);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    // 向右移动
    moveRight() {
        let moved = false;
        
        for (let y = 0; y < this.size; y++) {
            for (let x = this.size - 2; x >= 0; x--) {
                if (this.grid[y][x] !== 0) {
                    let newX = x;
                    // 找到可以移动到的位置
                    while (newX < this.size - 1 && this.grid[y][newX + 1] === 0) {
                        this.grid[y][newX + 1] = this.grid[y][newX];
                        this.grid[y][newX] = 0;
                        newX++;
                        moved = true;
                    }
                    // 检查是否可以合并
                    if (newX < this.size - 1 && this.grid[y][newX + 1] === this.grid[y][newX]) {
                        this.grid[y][newX + 1] *= 2;
                        this.score += this.grid[y][newX + 1];
                        this.grid[y][newX] = 0;
                        moved = true;
                        // 检查是否胜利
                        if (this.grid[y][newX + 1] === 2048 && !this.gameWon) {
                            this.gameWon = true;
                            this.showGameMessage('胜利！', true);
                        }
                    }
                }
            }
        }
        
        return moved;
    }

    // 检查游戏状态
    checkGameStatus() {
        // 检查是否还有空白位置
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.grid[y][x] === 0) {
                    return; // 还有空白位置，游戏继续
                }
            }
        }
        
        // 检查是否还有可合并的方块
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const value = this.grid[y][x];
                // 检查右侧
                if (x < this.size - 1 && this.grid[y][x + 1] === value) {
                    return; // 可以合并，游戏继续
                }
                // 检查下方
                if (y < this.size - 1 && this.grid[y + 1][x] === value) {
                    return; // 可以合并，游戏继续
                }
            }
        }
        
        // 游戏结束
        this.gameOver = true;
        this.showGameMessage('游戏结束！');
    }

    // 更新显示
    updateDisplay() {
        // 清空方块容器
        const tileContainer = document.getElementById('tile-container');
        tileContainer.innerHTML = '';
        
        // 更新分数
        document.getElementById('score').textContent = this.score;
        
        // 更新最高分
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            document.getElementById('best-score').textContent = this.bestScore;
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        // 生成方块
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const value = this.grid[y][x];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value}`;
                    // 动态计算位置和大小
                    const gridContainer = document.querySelector('.grid-container');
                    const containerWidth = gridContainer.clientWidth;
                    const containerHeight = gridContainer.clientHeight;
                    const padding = parseInt(window.getComputedStyle(gridContainer).paddingLeft);
                    const gap = parseInt(window.getComputedStyle(gridContainer).gap);
                    const availableWidth = containerWidth - (padding * 2) - (gap * (this.size - 1));
                    const tileSize = availableWidth / this.size;
                    
                    tile.style.width = `${tileSize}px`;
                    tile.style.height = `${tileSize}px`;
                    tile.style.left = `${padding + x * (tileSize + gap)}px`;
                    tile.style.top = `${padding + y * (tileSize + gap)}px`;
                    tile.textContent = value;
                    tileContainer.appendChild(tile);
                }
            }
        }
    }

    // 显示游戏消息
    showGameMessage(message, isWin = false) {
        const gameMessage = document.getElementById('game-message');
        gameMessage.querySelector('p').textContent = message;
        gameMessage.classList.add('show');
    }

    // 隐藏游戏消息
    hideGameMessage() {
        const gameMessage = document.getElementById('game-message');
        gameMessage.classList.remove('show');
    }

    // 设置事件监听
    setupEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.move('up');
                    break;
                case 'ArrowDown':
                    this.move('down');
                    break;
                case 'ArrowLeft':
                    this.move('left');
                    break;
                case 'ArrowRight':
                    this.move('right');
                    break;
            }
        });
        
        // 重新开始按钮
        document.getElementById('restart-button').addEventListener('click', () => {
            this.startGame();
        });
        
        // 再来一局按钮
        document.querySelector('.retry-button').addEventListener('click', () => {
            this.startGame();
        });
        
        // 触摸事件（移动端）
        let startX, startY;
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = endX - startX;
            const diffY = endY - startY;
            
            // 确定移动方向
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // 水平移动
                if (Math.abs(diffX) > 20) {
                    if (diffX > 0) {
                        this.move('right');
                    } else {
                        this.move('left');
                    }
                }
            } else {
                // 垂直移动
                if (Math.abs(diffY) > 20) {
                    if (diffY > 0) {
                        this.move('down');
                    } else {
                        this.move('up');
                    }
                }
            }
            
            startX = null;
            startY = null;
        });
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});