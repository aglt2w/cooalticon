# Loomicon
一个轻量的图标资源展示网站，提供直观的图标浏览与管理功能。

## 🌐 网站地址
[https://loomicon.fun/](https://loomicon.fun/)

## 🚀 自动更新&提交说明
本项目支持自动化更新图标配置文件（`icon-list.json`）并推送至GitHub，无需手动执行Git命令，核心操作方式二选一：

### 方式1：Python脚本（跨平台，推荐）
适用于 Windows/Mac/Linux 系统，可自动运行JSON更新脚本 + 推送代码：
```bash
# 进入项目根目录
cd 你的本地仓库路径/loomicon
# 执行自动化脚本
python auto_update_and_push.py
```
**功能说明**：
1. 自动运行 `generate-icon-list.py` 更新 `icon-list.json`；
2. 先拉取GitHub远程最新代码（避免冲突）；
3. 自动提交（备注格式：`[Loomicon] 自动更新JSON文件 - 时间戳`）并推送到 `main` 分支。

### 方式2：批处理文件（Windows专属，便捷）
双击项目根目录的 `push.bat` 即可一键推送所有本地修改：
- 自动拉取远程最新代码 → 提交（备注格式：`[Loomicon] 更新 - 时间戳`） → 推送；
- 无需打开终端，适合Windows用户快速操作。

## ⚙️ 环境配置（Git + Python）
### 1. Git 环境配置
确保本地安装Git并完成基础配置（首次使用必做）：
```bash
# 安装Git后，配置用户名和邮箱（与GitHub账号一致）
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub绑定邮箱"
# 验证配置是否生效
git config --list
```

### 2. Python 环境配置
确保本地安装Python（3.8+ 版本），并验证环境：
```bash
# 检查Python版本
python --version  # Windows
python3 --version # Mac/Linux
# 无需额外安装依赖（脚本仅使用Python内置库）
```

### 3. 关键配置检查
1. 项目根目录的 `auto_update_and_push.py` 中，确认分支为 `main`：
   ```python
   ["git", "push", "origin", "main"]  # 若分支为master，改为master
   ```
2. `push.bat` 无需额外配置，放在项目根目录即可运行。

## ❓ 常见问题
### Q1：运行脚本/bat提示「Git拉取冲突」？
- 原因：本地版本与GitHub远程版本不一致；
- 解决：手动执行 `git pull origin main` 拉取远程代码，解决冲突后再运行脚本/bat。

### Q2：logo.svg 显示空白/GitHub提示「Invalid image source」？
- 原因：SVG文件包含重复根标签 `<svg>` 或Git冲突标记；
- 解决：删除SVG文件中重复的代码块/冲突标记（仅保留一个 `<svg>` 根标签），保存后重新推送。

### Q3：Python脚本提示「找不到generate-icon-list.py」？
- 原因：脚本路径配置错误；
- 解决：修改 `auto_update_and_push.py` 中 `JSON_UPDATE_SCRIPT_PATH` 为正确路径（如 `./generate-icon-list.py`）。

### Q4：推送失败提示「网络错误」？
- 检查网络是否能访问GitHub；
- 确认Git已配置正确的账号信息（用户名/邮箱）；
- Windows用户可尝试以管理员身份运行bat/终端。

## 📝 开发说明
本网站（HTML/CSS/JS）及所有自动化提交脚本（`auto_update_and_push.py`、`push.bat` 等）均由豆包全程编写完成。

---
如果遇到其他问题，可查看项目提交记录或联系开发者。
