// 图标数据源（核心：新增图标只需在这个数组里加对象，通过category指定分类）
const iconData = [
    // ========== 原有图标（保留） ==========
    { name: "首页", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>', category: "基础图标" },
    { name: "设置", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c0.04-0.3 0.06-0.61 0.06-0.94 0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14 0.23-0.41 0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39 0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4 2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24 0-0.43 0.17-0.47 0.41L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33c-0.22-0.08-0.47 0-0.59 0.22L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48l2.03 1.58C4.84 11.36 4.8 11.69 4.8 12s0.02 0.64 0.07 0.94l-2.03 1.58c-0.18 0.14-0.23 0.41-0.12 0.61l1.92 3.32c0.12 0.22 0.37 0.29 0.59 0.22l2.39-0.96c0.5 0.38 1.03 0.7 1.62 0.94l0.36 2.54c0.05 0.24 0.24 0.41 0.48 0.41h3.84c0.24 0 0.44-0.17 0.47-0.41l0.36-2.54c0.59-0.24 1.13-0.56 1.62-0.94l2.39 0.96c0.22 0.08 0.47 0 0.59-0.22l1.92-3.32c0.12-0.22 0.07-0.47-0.12-0.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>', category: "功能图标" },
    { name: "搜索", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-0.79l-0.28-0.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-0.59 4.23-1.57l0.27 0.28v0.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>', category: "基础图标" },
    { name: "收藏", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>', category: "操作图标" },
    { name: "下载", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>', category: "操作图标" },
    { name: "返回", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>', category: "导航图标" },
    { name: "菜单", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>', category: "导航图标" },
    { name: "删除", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', category: "功能图标" },
    
    // ========== 手动新增图标示例（核心：通过category指定分类） ==========
    // 示例1：新增“分享”图标到「基础图标」分类
    { 
        name: "分享",  // 图标名称
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>',  // SVG代码
        category: "基础图标"  // 要归属的分类（和现有分类名称完全一致）
    },
    // 示例2：新增“日历”图标到「功能图标」分类
    { 
        name: "日历", 
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>', 
        category: "功能图标"  // 指定分类为“功能图标”
    },
    // 示例3：新增“打印”图标到「操作图标」分类
    { 
        name: "打印", 
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>', 
        category: "操作图标"  // 指定分类为“操作图标”
    },
    // 示例4：新增“前进”图标到「导航图标」分类
    { 
        name: "前进", 
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>', 
        category: "导航图标"  // 指定分类为“导航图标”
    },
    // 示例5：新增自定义分类（比如“营销图标”），会自动生成该分类
    { 
        name: "优惠券", 
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>', 
        category: "营销图标"  // 自定义新分类，页面会自动显示该分类
    }
];

// DOM元素获取
const selectWrapper = document.getElementById('custom-select-wrapper');
const selectBtn = document.getElementById('custom-select-btn');
const selectedText = document.getElementById('selected-category');
const selectList = document.getElementById('custom-select-list');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const iconContainer = document.getElementById('icon-categories-container');

// 分类列表（自动从iconData提取，无需手动改）
const allCategories = ['全部图标', ...new Set(iconData.map(item => item.category))];

// 替换后的SVG图标（20px尺寸）
const downloadSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path></svg>';
const copySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>';

// 页面初始化
(function init() {
    renderSelectOptions();
    renderIcons(iconData);
    bindEvents();
})();

// 事件绑定
function bindEvents() {
    // 下拉框展开/收起
    selectBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        selectWrapper.classList.toggle('open');
    });

    // 点击页面其他区域关闭下拉框
    document.addEventListener('click', function() {
        selectWrapper.classList.remove('open');
    });

    // 搜索框输入事件
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase().trim();
        const filtered = iconData.filter(icon => icon.name.toLowerCase().includes(keyword));
        renderIcons(filtered);
        resetSelect();

        if (this.value.trim() === '') {
            this.setAttribute('placeholder', '搜索图标...');
        } else {
            this.removeAttribute('placeholder');
        }
    });

    // 搜索图标点击事件
    searchIcon.addEventListener('click', function() {
        searchInput.focus();
        const keyword = searchInput.value.toLowerCase().trim();
        const filtered = iconData.filter(icon => icon.name.toLowerCase().includes(keyword));
        renderIcons(filtered);
        resetSelect();
    });
}

// 渲染下拉选项
function renderSelectOptions() {
    selectList.innerHTML = '';
    
    allCategories.forEach(cat => {
        const opt = document.createElement('div');
        opt.className = 'select-option ' + (cat === '全部图标' ? 'active' : '');
        opt.dataset.cat = cat;
        opt.textContent = cat;
        
        // 选项点击事件
        opt.addEventListener('click', function() {
            document.querySelectorAll('.select-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedText.textContent = cat;
            selectWrapper.classList.remove('open');
            filterByCategory(cat);
        });
        
        selectList.appendChild(opt);
    });
}

// 按分类筛选图标
function filterByCategory(cat) {
    const filtered = cat === '全部图标' ? iconData : iconData.filter(icon => icon.category === cat);
    renderIcons(filtered);
}

// 渲染图标列表
function renderIcons(data) {
    const grouped = {};
    data.forEach(icon => {
        if (!grouped[icon.category]) grouped[icon.category] = [];
        grouped[icon.category].push(icon);
    });

    iconContainer.innerHTML = '';
    Object.keys(grouped).forEach(cat => {
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = cat;

        const grid = document.createElement('div');
        grid.className = 'icon-grid';

        grouped[cat].forEach(icon => {
            const card = createIconCard(icon);
            grid.appendChild(card);
        });

        const wrapper = document.createElement('div');
        wrapper.appendChild(title);
        wrapper.appendChild(grid);
        iconContainer.appendChild(wrapper);
    });

    if (Object.keys(grouped).length === 0) {
        iconContainer.innerHTML = '<div class="empty-state">暂无匹配图标</div>';
    }
}

// 创建图标卡片
function createIconCard(icon) {
    const card = document.createElement('div');
    card.className = 'icon-card';
    // 按钮使用20px的SVG图标，添加data属性存储图标信息
    card.innerHTML = `
      <div class="icon-svg">${icon.svg}</div>
      <div class="icon-name">${icon.name}</div>
      <div class="icon-actions">
        <button class="icon-btn download-btn" data-name="${icon.name}" data-svg="${encodeURIComponent(icon.svg)}">
          ${downloadSvg}
        </button>
        <button class="icon-btn copy-btn" data-name="${icon.name}" data-svg="${encodeURIComponent(icon.svg)}">
          ${copySvg}
        </button>
      </div>
    `;

    // 下载按钮事件
    card.querySelector('.download-btn').addEventListener('click', function() {
        const name = this.dataset.name;
        const svg = decodeURIComponent(this.dataset.svg);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
        URL.revokeObjectURL(a.href);
    });

    // 复制按钮事件（玻璃拟态弹窗）
    card.querySelector('.copy-btn').addEventListener('click', function() {
        const name = this.dataset.name;
        const svg = decodeURIComponent(this.dataset.svg);
        copyIcon(name, svg);
    });

    return card;
}

// 复制图标（玻璃拟态弹窗）
function copyIcon(name, svg) {
    // 先尝试复制
    navigator.clipboard.writeText(svg).then(() => {
        // 创建自定义提示元素
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #333;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 14px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            border: 1px solid rgba(245, 179, 44, 0.2);
            box-shadow: 0 4px 16px rgba(245, 179, 44, 0.15);
            transform: translateX(-50%) translateY(10px);
        `;
        tip.innerHTML = ` <span style="color: #F5B32C; font-weight: 600;">${name}</span> 图标SVG代码已复制！`;
        document.body.appendChild(tip);
        
        // 显示提示后自动消失
        setTimeout(() => {
            tip.style.opacity = '1';
            tip.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        setTimeout(() => {
            tip.style.opacity = '0';
            tip.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => document.body.removeChild(tip), 300);
        }, 2000);

    }).catch(err => {
        console.error('复制失败:', err);
        // 失败提示
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #333;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 14px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            border: 1px solid rgba(220, 53, 69, 0.2);
            box-shadow: 0 4px 16px rgba(220, 53, 69, 0.1);
            transform: translateX(-50%) translateY(10px);
        `;
        tip.innerHTML = `❌ <span style="color: #dc3545; font-weight: 600;">${name}</span> 复制失败，请手动复制！`;
        document.body.appendChild(tip);
        
        setTimeout(() => {
            tip.style.opacity = '1';
            tip.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        setTimeout(() => {
            tip.style.opacity = '0';
            tip.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => document.body.removeChild(tip), 300);
        }, 2000);
    });
}

// 重置下拉框为默认状态
function resetSelect() {
    selectedText.textContent = '全部图标';
    document.querySelectorAll('.select-option').forEach(o => {
        o.classList.remove('active');
        if (o.dataset.cat === '全部图标') o.classList.add('active');
    });
}
