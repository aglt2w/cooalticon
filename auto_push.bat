@echo off
chcp 65001 > nul  # 解决中文路径/字符乱码问题
:: 进入新路径（双引号包裹含中文的路径）
cd /d "D:\个人文件\web\loomicon-git"

:: 拉取远程最新内容，避免推送冲突
git pull origin main
:: 添加所有变更文件
git add .
:: 自动提交（带时间戳，便于追溯）
git commit -m "自动推送：%date% %time%"
:: 推送到 GitHub 远程仓库
git push origin main

:: 执行完成后暂停（可选，方便查看执行结果）
pause