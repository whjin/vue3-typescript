#!/usr/bin/env sh

# 构建
npm run build

# 提交main主分支
git add .
git commit -m "提交更新main主分支"
git push origin main

# 部署
npm run deploy

# 按任意键关闭
echo "按任意键关闭"
read -n 1

#关闭脚本
exit 0

