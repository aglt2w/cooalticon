@echo off
chcp 65001 > nul  # 解决中文乱码
echo ================ 开始推送代码到 GitHub ================

:: 【新增】拉取远程最新内容，避免推送冲突（仅加这1行）
git pull origin main

:: 1. 添加所有修改的文件到暂存区
git add .

:: 2. 提交代码（自动生成提交信息，格式：更新-当前时间）
set "datetime=%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%"
git commit -m "更新-%datetime%"

:: 3. 推送到 GitHub 的 main 分支（如果你的分支是 master，改成 master）
git push origin main

echo ================ 推送完成！===============
pause  # 保留窗口，方便看结果