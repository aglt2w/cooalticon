# LOOMICON
> 专为设计师与开发者打造的**免费商用服装图标库**

Loom Icon 是一个专注于服装的矢量图标资源站，提供高质量、像素完美的图标素材，所有图标均可免费用于个人或商业项目。

我为你写好了一份清晰易懂的 `README.md` 文件，你可以直接复制到「icon站0109」文件夹里，包含完整的运行说明、日常操作指南和常见问题，适配你的Mac环境和使用场景：

```markdown
# 图标库运行说明（icon站0109）
本图标库支持「纯文件操作新增图标」，仅需少量配置即可运行，全程无需修改JS代码。

## 一、环境准备（仅首次配置）
### 1. 验证Python环境（Mac自带）
打开终端，输入以下命令验证Python3是否安装：
```bash
python3 --version
```
- ✅ 显示版本号（如`Python 3.9.x`）：环境正常；
- ❌ 显示`command not found`：前往[Python官网](https://www.python.org/downloads/mac-osx/)下载安装（勾选「Add Python to PATH」）。

### 2. 安装VS Code插件（本地预览必备）
打开VS Code → 左侧扩展栏搜索「Live Server」→ 点击安装，用于本地正常加载图标文件（禁止双击直接打开HTML）。

## 二、核心运行步骤（首次/新增图标后必做）
### 步骤1：打开终端并进入文件夹
1. 按下 `Command + 空格` → 输入 `Terminal` 打开终端；
2. 在终端输入 `cd `（注意：cd 后**必须加一个空格**）；
3. 打开访达 → 拖拽桌面的「icon站0109」文件夹到终端窗口 → 回车进入文件夹：
   ```bash
   # 示例路径（替换成你的用户名）
   cd /Users/你的用户名/Desktop/icon站0109
   ```

### 步骤2：运行Python脚本生成图标清单
在终端输入以下命令，回车运行：
```bash
python3 generate-icon-list.py
```
✅ 成功提示：终端显示 `✅ 图标清单生成完成：icon-list.json`，文件夹内会新增 `icon-list.json` 文件。

### 步骤3：本地预览图标
1. 用VS Code打开「icon站0109」文件夹；
2. 右键点击 `index.html` → 选择「Open with Live Server」；
3. 浏览器自动打开 `http://127.0.0.1:5500`，即可查看所有图标。

## 三、日常操作指南（无需修改JS代码）
### 1. 新增/删除图标
1. 将SVG图标放入 `icons/` 下对应分类文件夹（如抗静电/可机洗放 `icons/functions/`）；
2. 重复「核心运行步骤」的步骤1-2（运行Python脚本）；
3. 刷新浏览器页面，图标自动更新。

### 2. 修改分类显示名（如「配饰部件」→「配饰配件」）
1. 打开 `generate-icon-list.py` 文件，找到 `CATEGORY_MAP` 配置：
   ```python
   CATEGORY_MAP = {
       "accessories": "配饰部件",  # 修改冒号后的文字即可
       "clothing": "服装品类",
       "fabric": "面料纹理",
       "tools": "制衣工具",
       "functions": "功能标识"    # 抗静电/可机洗的分类名
   }
   ```
2. 保存文件后，重新运行Python脚本 → 刷新页面生效。

### 3. 新增分类（如「功能标识」）
1. 新建文件夹：在 `icons/` 下新建分类文件夹（如 `icons/functions/`）；
2. 修改脚本：在 `CATEGORY_MAP` 中新增一行映射：
   ```python
   CATEGORY_MAP = {
       # 原有分类...
       "functions": "功能标识"  # 键=文件夹名，值=分类显示名
   }
   ```
3. 将SVG放入新建文件夹 → 重新运行Python脚本 → 刷新页面生效。

## 四、常见问题
### 1. 页面仅显示感叹号默认图标？
- 检查是否生成 `icon-list.json` 文件；
- 必须用VS Code的Live Server打开（禁止双击直接打开HTML）；
- 核对 `icons/` 下的文件夹名、SVG文件名是否与 `CATEGORY_MAP` 一致（大小写敏感）。

### 2. 终端运行脚本报错？
- 报错 `No such file or directory`：检查 `icons` 文件夹是否存在，或文件夹名拼写错误；
- 报错 `command not found: python3`：重新安装Python并勾选「Add Python to PATH」。
```

### 使用方法
1. 在「icon站0109」文件夹里新建一个名为 `README.md` 的文件；
2. 把上面的内容完整复制进去并保存；
3. 后续不管是自己操作，还是给其他人看，打开这个文件就能看懂所有步骤。

这份说明覆盖了所有核心操作：首次运行、新增图标、改分类名、新增分类，还有常见问题排查，完全适配你的使用场景，不用再记零散的命令和步骤～
## 🤝 贡献指南
欢迎提交新的服装相关图标，一起丰富图标库！
1. Fork 本仓库
2. 准备符合规范的 SVG 图标（建议尺寸 24×24，线条统一）
3. 添加图标信息到分类配置文件
4. 提交 Pull Request，说明新增图标的名称与分类

## 📄 许可证
本项目所有图标与代码均基于 **MIT 许可证** 开源，你可以自由使用、修改和分发。

## 💬 联系我们
- GitHub 仓库：[https://aglt2w.github.io/loomicon/]
- 官网地址：[https://aglt2w.github.io/loomicon/]
