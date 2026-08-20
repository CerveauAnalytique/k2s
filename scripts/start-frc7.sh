#!/usr/bin/env bash
# Start FRC7 gateway on FRC_PORT (default 3100), optionally backed by ElloFive
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="${HOME}/.local/bin:/usr/local/bin:${PATH}"
export PORT="${FRC_PORT:-3100}"
export FRC_API_KEYS="${FRC_API_KEYS:-frc_test_key,ayiti_gov_test_key}"
export AYITI_API_KEY="${AYITI_API_KEY:-ayiti_gov_test_key}"
export FRC_ALLOW_BUILTIN="${FRC_ALLOW_BUILTIN:-1}"
export NEURIY_MARKETPLACE_URL="${NEURIY_MARKETPLACE_URL:-http://127.0.0.1:8000}"

# Point Neuriy remote LLM at ElloFive OpenAI-compatible endpoint when available
ELLO_URL="${ELLOFIVE_API_URL:-http://127.0.0.1:3101}"
if curl -sf "${ELLO_URL}/health" >/dev/null 2>&1; then
  export NEURIY_LLM_BASE_URL="${NEURIY_LLM_BASE_URL:-${ELLO_URL}/v1}"
  export NEURIY_LLM_API_KEY="${NEURIY_LLM_API_KEY:-ellofive-local}"
  export NEURIY_LLM_MODEL="${NEURIY_LLM_MODEL:-${ELLO5_MODEL:-ellofive}}"
  echo "FRC7 → ElloFive remote LLM at ${NEURIY_LLM_BASE_URL}"
else
  echo "ElloFive not reachable at ${ELLO_URL}; FRC7 will use local Neuriy engine"
fi

cd "$ROOT/vendor/frc7"
if [[ ! -d node_modules ]]; then
  npm install
fi

exec npm run start:gateway
