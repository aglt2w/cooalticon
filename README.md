我帮你完善这份README，补充Windows系统的完整操作步骤，统一Mac/Windows的表述逻辑，同时优化格式和易读性，让不同系统的用户都能清晰操作：

```markdown
# LOOMICON
> 专为设计师与开发者打造的**免费商用服装图标库**

Loom Icon 是一个专注于服装的矢量图标资源站，提供高质量、像素完美的图标素材，所有图标均可免费用于个人或商业项目。

## 图标库运行说明
本图标库支持「纯文件操作新增图标」，仅需少量配置即可运行，全程无需修改JS代码。

## 一、环境准备（仅首次配置）
### 1. 验证Python环境
| 系统 | 操作步骤 | 异常处理 |
|------|----------|----------|
| Mac | 打开「终端」，输入 `python3 --version` | ✅ 显示版本号（如`Python 3.9.x`）：环境正常<br>❌ 显示`command not found`：前往[Python官网](https://www.python.org/downloads/mac-osx/)下载安装（勾选「Add Python to PATH」） |
| Windows | 按下`Win + R`，输入`cmd`打开「命令提示符」，输入 `python --version` 或 `python3 --version` | ✅ 显示版本号：环境正常<br>❌ 显示`不是内部或外部命令`：前往[Python官网](https://www.python.org/downloads/windows/)下载安装（**务必勾选「Add Python to PATH」**） |

### 2. 安装VS Code插件（本地预览必备）
所有系统通用：
1. 下载并安装[VS Code](https://code.visualstudio.com/)
2. 打开VS Code → 左侧扩展栏（快捷键`Ctrl+Shift+X`/`Cmd+Shift+X`）
3. 搜索「Live Server」→ 点击安装
4. 作用：解决本地HTML无法正常加载图标文件的问题（**禁止双击直接打开HTML文件**）

## 二、核心运行步骤（首次/新增图标后必做）
### 步骤1：打开终端/命令行并进入文件夹
| 系统 | 操作步骤 |
|------|----------|
| Mac | 1. 按下 `Command + 空格` → 输入 `Terminal` 打开终端<br>2. 输入 `cd `（注意：cd后必须加一个空格）<br>3. 打开访达 → 拖拽「icon站文件」文件夹到终端窗口 → 回车<br>```bash
# 示例路径（替换成你的用户名）
cd /Users/你的用户名/Desktop/icon站
``` |
| Windows | 1. 按下`Win + R` → 输入`cmd`打开命令提示符<br>2. 输入 `cd `（注意：cd后必须加一个空格）<br>3. 打开文件资源管理器 → 拖拽「icon站文件」文件夹到命令提示符窗口 → 回车<br>```cmd
:: 示例路径（替换成你的用户名）
cd C:\Users\你的用户名\Desktop\icon站
``` |

### 步骤2：运行Python脚本生成图标清单
| 系统 | 运行命令 |
|------|----------|
| Mac | ```bash
python3 generate-icon-list.py
``` |
| Windows | ```cmd
python generate-icon-list.py
:: 若上述命令报错，尝试
python3 generate-icon-list.py
``` |

✅ 成功提示：终端/命令提示符显示 `✅ 生成完成：共XX个图标`，文件夹内会生成/更新 `icon-list.json` 文件。

### 步骤3：本地预览图标（所有系统通用）
1. 用VS Code打开「icon站」文件夹；
2. 右键点击 `index.html` → 选择「Open with Live Server」；
3. 浏览器自动打开 `http://127.0.0.1:5500`（端口可能不同），即可查看所有图标。

## 三、日常操作指南（无需修改JS代码）
### 1. 新增/删除图标（所有系统通用）
1. 将SVG图标放入 `assets/icons/` 下对应分类文件夹（如功能类图标放 `assets/icons/function/`）；
2. 重复「核心运行步骤」的步骤1-2（运行Python脚本）；
3. 刷新浏览器页面，图标自动更新。

### 2. 修改分类显示名（如「配饰部件」→「配饰配件」）
1. 打开 `generate-icon-list.py` 文件，找到 `CATEGORY_MAP` 配置：
   ```python
   CATEGORY_MAP = {
       "function": "功能标识",  # 修改冒号后的文字即可
       "category": "服装品类",
       "basic": "基础图标",
       "logo": "LOGO",
   }
   ```
2. 保存文件后，重新运行Python脚本 → 刷新页面生效。

### 3. 新增分类（如「功能标识」）
1. 新建文件夹：在 `assets/icons/` 下新建分类文件夹（如 `assets/icons/functions/`）；
2. 修改脚本：在 `CATEGORY_MAP` 中新增一行映射：
   ```python
   CATEGORY_MAP = {
       # 原有分类...
       "functions": "功能标识"  # 键=文件夹名，值=分类显示名
   }
   ```
3. 将SVG放入新建文件夹 → 重新运行Python脚本 → 刷新页面生效。

### 4. 修改图标显示名（英文→中文）
1. 打开 `generate-icon-list.py` 文件，找到 `ICON_NAME_MAP` 配置：
   ```python
   ICON_NAME_MAP = {
       "t-shirt": "T恤",
       "pants": "裤子",
       # 新增：SVG文件名 → 中文显示名
       "hat": "帽子"
   }
   ```
2. 保存文件后，重新运行Python脚本 → 刷新页面生效。

## 四、常见问题
### 1. 页面仅显示感叹号默认图标？
- ✅ 检查是否生成 `icon-list.json` 文件；
- ✅ 必须用VS Code的Live Server打开（禁止双击直接打开HTML）；
- ✅ 核对 `assets/icons/` 下的文件夹名、SVG文件名是否与 `CATEGORY_MAP` 一致（大小写敏感）；
- ✅ 确认SVG文件编码为UTF-8，无语法错误。

### 2. 终端/命令提示符运行脚本报错？
| 错误提示 | 解决方案 |
|----------|----------|
| `No such file or directory` | 1. 检查 `assets/icons` 文件夹是否存在<br>2. 核对文件夹名拼写（如是否写成`icon`而非`icons`）<br>3. 确认终端/命令提示符已进入正确的文件夹路径 |
| `command not found: python/python3` | 1. 重新安装Python并勾选「Add Python to PATH」<br>2. Windows可尝试重启命令提示符<br>3. Mac可尝试 `brew install python3`（需先安装Homebrew） |
| `UnicodeDecodeError: 'gbk' codec can't decode` | Python脚本已内置UTF-8编码配置，无需额外操作，确保SVG文件为UTF-8编码即可 |

### 3. Live Server无法打开？
- 确认VS Code已安装「Live Server」插件；
- 右键 `index.html` 时确保VS Code已打开整个「icon站」文件夹（而非单独打开index.html）；
- 检查端口是否被占用（可在VS Code右下角修改Live Server端口）。

## 🤝 贡献指南
欢迎提交新的服装相关图标，一起丰富图标库！
1. Fork 本仓库
2. 准备符合规范的 SVG 图标（建议尺寸 24×24，线条统一，无冗余代码）
3. 将SVG放入对应分类文件夹，或新增分类并配置 `CATEGORY_MAP`
4. 运行Python脚本验证图标是否正常加载
5. 提交 Pull Request，说明新增图标的名称与分类

## 📄 许可证
本项目所有图标与代码均基于 **MIT 许可证** 开源，你可以自由使用、修改和分发，无需注明出处。

## 💬 联系我们
- GitHub 仓库：[https://aglt2w.github.io/loomicon/]
- 官网地址：[https://loomicon.fun/]
``
