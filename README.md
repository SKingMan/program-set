# Toolkit - 工具集合网站

## 项目介绍
Toolkit 是一个集成多种小工具和小游戏的单页网站，用户可以通过点击不同的模块进入相应的工具或游戏。网站设计简洁现代，响应式布局适配各种设备。

## 功能特性
- **搜索功能**：可快速搜索工具和游戏
- **统计数据**：显示总点击次数、工具使用次数和游戏游玩次数
- **响应式设计**：适配桌面端、平板端和移动端
- **本地存储**：使用 localStorage 存储统计数据，无需后端数据库
- **模块化设计**：易于添加新的工具和游戏

## 项目结构
```
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 功能实现
├── PRD.md              # 产品需求文档
└── README.md           # 项目说明文档
```

## 如何运行项目
1. **克隆或下载项目**到本地
2. **启动本地服务器**：
   - 使用 Python：`python -m http.server 8000`
   - 或使用 Node.js：`npx http-server`
   - 或使用其他本地服务器工具
3. **访问网站**：在浏览器中打开 `http://localhost:8000`

## 如何添加新项目
要向 Toolkit 添加新的工具或游戏，请按照以下步骤操作：

### 1. 在 script.js 文件中添加新项目
在 `tools` 数组中添加一个新对象，包含以下属性：

```javascript
{
    id: 9, // 唯一ID，递增
    name: "新项目名称", // 显示名称
    type: "tool", // 类型："tool" 或 "game"
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=项目描述&image_size=square", // 图片URL
    description: "项目描述" // 项目描述
}
```

### 2. 图片生成
使用提供的图片生成API，替换 `prompt` 参数为项目相关的描述，例如：
- 对于计算器工具：`calculator%20tool%20icon%20simple%20modern`
- 对于贪吃蛇游戏：`snake%20game%20icon%20simple%20modern`

### 3. 保存文件
保存 `script.js` 文件后，刷新网站即可看到新添加的项目。

## 现有工具和游戏
- **工具**：计算器、记事本、倒计时、随机数生成器
- **游戏**：贪吃蛇、扫雷、2048、记忆翻牌

## 技术栈
- **前端**：HTML5, CSS3, JavaScript
- **存储**：localStorage
- **图片生成**：Trae API

## 未来计划
- 添加更多实用工具和有趣游戏
- 实现工具和游戏的详细页面
- 添加用户自定义工具功能
- 优化用户界面和交互体验

## 贡献
欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证
本项目采用 MIT 许可证。