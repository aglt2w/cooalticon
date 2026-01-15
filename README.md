# LOOMICON
一个轻量的图标资源展示网站，提供直观的图标浏览与管理功能。

## 🌐 网站地址
[https://loomicon.fun/](https://loomicon.fun/)

## 🚀 自动更新&提交说明
本项目支持自动化更新图标配置文件（`icon-list.json`）并推送至GitHub，无需手动执行Git命令，核心操作方式二选一：

### 方式1：Python脚本（跨平台，推荐）
适用于 Windows/Mac/Linux 系统，可自动运行JSON更新脚本 + 推送代码：
#### 第一步：快速进入本地仓库根目录
##### Windows 快速进入方式（二选一）：
1. **文件管理器直接开终端**（推荐）：
   - 打开文件管理器，找到你的Loomicon仓库文件夹（如 `D:\个人文件\web\loomicon-git`）；
   - 在文件夹地址栏输入 `cmd` 并按回车，直接打开终端且自动定位到该目录；
2. **终端手动切换路径**：
   ```bash
   # 示例：仓库在D盘的web文件夹下
   cd /d D:\个人文件\web\loomicon-git
   ```

##### Mac 快速进入方式（二选一）：
1. **访达直接开终端**（推荐）：
   - 打开访达，找到你的Loomicon仓库文件夹（如 `~/Desktop/loomicon`）；
   - 右键点击文件夹 → 选择「新建终端位于文件夹」（或按 `Option + 右键` 调出该选项）；
2. **终端手动切换路径**：
   ```bash
   # 示例：仓库在桌面的loomicon文件夹下
   cd ~/Desktop/loomicon
   ```

#### 第二步：执行自动化脚本
##### Windows
```bash
python auto_update_and_push.py
```

##### Mac/Linux
```bash
python3 auto_update_and_push.py
```

**功能说明**：
1. 自动运行 `generate-icon-list.py` 更新 `icon-list.json`；
2. 先拉取GitHub远程最新代码（避免冲突）；
3. 自动提交（备注格式：`[Loomicon] 自动更新JSON文件 - 时间戳`）并推送到 `main` 分支。

### 方式2：批处理文件（Windows专属，便捷）
双击项目根目录的 `push.bat` 即可一键推送所有本地修改：
- 自动拉取远程最新代码 → 提交（备注格式：`[Loomicon] 更新 - 时间戳`） → 推送；
- 无需打开终端，适合Windows用户快速操作。

## 📝 开发说明
本网站（HTML/CSS/JS）及所有自动化提交脚本（`auto_update_and_push.py`、`push.bat` 等）均由豆包辅助编写完成。

如果遇到其他问题，可查看项目提交记录或联系开发者。
