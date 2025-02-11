#!/bin/bash
set -e

# 以前のサーバーの PID ファイルが残っている場合は削除
rm -f /backend/tmp/pids/server.pid

exec "$@"
