// 删掉原有所有categoryFolderMap、mockSvg相关代码

// 图标数据源
let iconData = [];

// DOM元素获取（保持不变）
const selectWrapper = document.getElementById('custom-select-wrapper');
const selectBtn = document.getElementById('custom-select-btn');
const selectedText = document.getElementById('selected-category');
const selectList = document.getElementById('custom-select-list');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-icon');
const iconContainer = document.getElementById('icon-categories-container');

// 分类列表
let allCategories = [];

// 替换后的SVG图标（保持不变）
const downloadSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path></svg>';
const copySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>';

// 自动加载图标数据（仅读取JSON清单，终身不用改）
async function loadIconData() {
  try {
    // 1. 读取图标清单
    const listRes = await fetch('./icon-list.json');
    const iconList = await listRes.json();
    
    // 2. 加载每个SVG的内容
    iconData = [];
    for (const item of iconList) {
      const svgRes = await fetch(`./assets/icons/${item.folder}/${item.filename}`);
      const svgContent = await svgRes.text();
      iconData.push({
        name: item.name,
        svg: svgContent,
        category: item.category
      });
    }
  } catch (err) {
    console.error("加载图标失败:", err);
    // 本地测试兜底：显示默认图标
    iconData = [{
      name: "默认图标",
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>',
      category: "默认分类"
    }];
  }
}

// 页面初始化（保持不变）
(async function init() {
  await loadIconData();
  allCategories = ['全部图标', ...new Set(iconData.map(item => item.category))];
  renderSelectOptions();
  renderIcons(iconData);
  bindEvents();
})();

// 以下所有函数（bindEvents、renderSelectOptions等）完全保留，不用改
function bindEvents() {
    selectBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        selectWrapper.classList.toggle('open');
    });
    document.addEventListener('click', function() {
        selectWrapper.classList.remove('open');
    });
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
    searchIcon.addEventListener('click', function() {
        searchInput.focus();
        const keyword = searchInput.value.toLowerCase().trim();
        const filtered = iconData.filter(icon => icon.name.toLowerCase().includes(keyword));
        renderIcons(filtered);
        resetSelect();
    });
}

function renderSelectOptions() {
    selectList.innerHTML = '';
    allCategories.forEach(cat => {
        const opt = document.createElement('div');
        opt.className = 'select-option ' + (cat === '全部图标' ? 'active' : '');
        opt.dataset.cat = cat;
        opt.textContent = cat;
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

function filterByCategory(cat) {
    const filtered = cat === '全部图标' ? iconData : iconData.filter(icon => icon.category === cat);
    renderIcons(filtered);
}

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

function createIconCard(icon) {
    const card = document.createElement('div');
    card.className = 'icon-card';
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
    card.querySelector('.copy-btn').addEventListener('click', function() {
        const name = this.dataset.name;
        const svg = decodeURIComponent(this.dataset.svg);
        copyIcon(name, svg);
    });
    return card;
}

function copyIcon(name, svg) {
    navigator.clipboard.writeText(svg).then(() => {
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

function resetSelect() {
    selectedText.textContent = '全部图标';
    document.querySelectorAll('.select-option').forEach(o => {
        o.classList.remove('active');
        if (o.dataset.cat === '全部图标') o.classList.add('active');
    });
}
