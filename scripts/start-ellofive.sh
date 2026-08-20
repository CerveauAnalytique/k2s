#!/usr/bin/env bash
# Start ElloFive (Elloten API) on ELLOFIVE_PORT (default 3101)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="${HOME}/.local/bin:/usr/local/bin:${PATH}"
export ELLOFIVE_PORT="${ELLOFIVE_PORT:-3101}"
export PORT="$ELLOFIVE_PORT"
export ELLO5_MODEL="${ELLO5_MODEL:-${ELLOFIVE_MODEL:-ellofive}}"
export ELLOFIVE_HOST="${ELLOFIVE_HOST:-${OLLAMA_HOST:-http://127.0.0.1:11434}}"

cd "$ROOT/vendor/ellofive"
if [[ ! -d node_modules ]]; then
  npm install --omit=dev
fi

# Ensure Ollama is up
if ! curl -sf "${ELLOFIVE_HOST}/api/tags" >/dev/null 2>&1; then
  echo "Starting Ollama runtime..."
  (ollama serve >/tmp/ollama-serve.log 2>&1 &) || true
  for _ in $(seq 1 30); do
    curl -sf "${ELLOFIVE_HOST}/api/tags" >/dev/null 2>&1 && break
    sleep 1
  done
fi

# Prefer ellofive model; fall back to llama3.2:3b / whatever is available
if ! curl -sf "${ELLOFIVE_HOST}/api/tags" | grep -q "ellofive"; then
  if curl -sf "${ELLOFIVE_HOST}/api/tags" | grep -q "llama3.2"; then
    export ELLO5_MODEL="${ELLO5_MODEL:-llama3.2:3b}"
  fi
fi

exec node frc/server.js
