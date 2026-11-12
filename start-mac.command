#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
fi
if ! command -v node >/dev/null 2>&1; then
  echo "请先从 https://nodejs.org/ 安装 Node.js，然后重新启动。"
  read -r -p "按回车退出…"
  exit 1
fi
server_port="${PORT:-4173}"
(sleep 1; open "http://127.0.0.1:${server_port}/") &
exec node server.js
