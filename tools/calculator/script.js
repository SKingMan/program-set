// 计算器功能实现

// 清除显示
function clearDisplay() {
    document.getElementById('result').value = '';
}

// 删除最后一个字符
function deleteChar() {
    const result = document.getElementById('result');
    result.value = result.value.slice(0, -1);
}

// 添加数字
function appendNumber(num) {
    const result = document.getElementById('result');
    result.value += num;
}

// 添加运算符
function appendOperator(operator) {
    const result = document.getElementById('result');
    const currentValue = result.value;
    
    // 防止连续输入运算符
    if (currentValue && !isOperator(currentValue.slice(-1))) {
        result.value += operator;
    }
}

// 检查是否为运算符
function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

// 计算结果
function calculate() {
    const result = document.getElementById('result');
    const expression = result.value;
    
    try {
        // 替换乘除符号为JavaScript运算符
        const formattedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // 计算结果
        const calculatedResult = eval(formattedExpression);
        // 显示结果
        result.value = calculatedResult;
    } catch (error) {
        result.value = '错误';
    }
}

// 键盘支持
document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    // 数字键
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // 运算符
    else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    }
    // 小数点
    else if (key === '.') {
        appendNumber('.');
    }
    // 回车键
    else if (key === 'Enter') {
        calculate();
    }
    // 删除键
    else if (key === 'Backspace') {
        deleteChar();
    }
    // Escape键
    else if (key === 'Escape') {
        clearDisplay();
    }
});