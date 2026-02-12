// 工具和游戏数据
const tools = [
    {
        id: 1,
        name: "计算器",
        type: "tool",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calculator%20tool%20icon%20simple%20modern&image_size=square",
        description: "基本计算器工具"
    },
    {
        id: 2,
        name: "记事本",
        type: "tool",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=notepad%20tool%20icon%20simple%20modern&image_size=square",
        description: "在线记事本"
    },
    {
        id: 3,
        name: "倒计时",
        type: "tool",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=countdown%20timer%20tool%20icon%20simple%20modern&image_size=square",
        description: "倒计时工具"
    },
    {
        id: 4,
        name: "随机数生成器",
        type: "tool",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=random%20number%20generator%20tool%20icon%20simple%20modern&image_size=square",
        description: "生成随机数"
    },
    {
        id: 5,
        name: "贪吃蛇",
        type: "game",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=snake%20game%20icon%20simple%20modern&image_size=square",
        description: "经典贪吃蛇游戏"
    },
    {
        id: 6,
        name: "扫雷",
        type: "game",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minesweeper%20game%20icon%20simple%20modern&image_size=square",
        description: "经典扫雷游戏"
    },
    {
        id: 7,
        name: "2048",
        type: "game",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=2048%20game%20icon%20simple%20modern&image_size=square",
        description: "2048游戏"
    },
    {
        id: 8,
        name: "记忆翻牌",
        type: "game",
        image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=memory%20card%20game%20icon%20simple%20modern&image_size=square",
        description: "记忆翻牌游戏"
    }
];

// 统计数据
let stats = {
    totalClicks: 0,
    toolUses: 0,
    gamePlays: 0
};

// 从本地存储加载统计数据
function loadStats() {
    const savedStats = localStorage.getItem('toolkitStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
    }
    updateStatsDisplay();
}

// 保存统计数据到本地存储
function saveStats() {
    localStorage.setItem('toolkitStats', JSON.stringify(stats));
}

// 更新统计数据显示
function updateStatsDisplay() {
    document.getElementById('total-clicks').textContent = stats.totalClicks;
    document.getElementById('tool-uses').textContent = stats.toolUses;
    document.getElementById('game-plays').textContent = stats.gamePlays;
}

// 渲染工具和游戏模块
function renderTools(toolsToRender = tools) {
    const toolGrid = document.getElementById('tool-grid');
    toolGrid.innerHTML = '';
    
    toolsToRender.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.dataset.id = tool.id;
        toolCard.dataset.type = tool.type;
        
        toolCard.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" class="tool-image">
            <div class="tool-name">${tool.name}</div>
        `;
        
        toolCard.addEventListener('click', () => {
            handleToolClick(tool);
        });
        
        toolGrid.appendChild(toolCard);
    });
}

// 处理工具点击
function handleToolClick(tool) {
    // 更新统计数据
    stats.totalClicks++;
    if (tool.type === 'tool') {
        stats.toolUses++;
    } else if (tool.type === 'game') {
        stats.gamePlays++;
    }
    saveStats();
    updateStatsDisplay();
    
    // 简单的弹窗提示，实际项目中可以跳转到具体工具页面
    alert(`你点击了${tool.name} (${tool.type})`);
}

// 搜索功能
function searchTools() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredTools = tools.filter(tool => {
        return tool.name.toLowerCase().includes(searchTerm) || 
               tool.description.toLowerCase().includes(searchTerm);
    });
    
    renderTools(filteredTools);
}

// 初始化
function init() {
    // 加载统计数据
    loadStats();
    
    // 渲染工具
    renderTools();
    
    // 搜索按钮事件
    document.getElementById('search-btn').addEventListener('click', searchTools);
    
    // 回车搜索
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchTools();
        }
    });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);