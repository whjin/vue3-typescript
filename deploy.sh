#!/usr/bin/env sh

# 构建 && 部署
npm run build

# 提交main主分支
git add .
git commit -m "提交更新main主分支"
git push origin main

# 进入dist文件夹
cd dist

# 提交gh-pages分支
git add .
git commit -m "提交部署gh-pages分支"
git push origin gh-pages

# 按任意键关闭
echo "按任意键关闭"
read -n 1

#关闭脚本
exit 0

