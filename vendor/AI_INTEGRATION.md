# AI integrations — ElloFive + FRC7

Vendored from:
- https://github.com/EricksonAtHome/ElloFive.git → `vendor/ellofive`
- https://github.com/EricksonAtHome/FRC7.git → `vendor/frc7`

## Architecture

```
Browser (Start chat /chat-neuriy)
  → POST /api/ai/chat  (Next.js, server-only secrets)
  → FRC7 gateway :3100  (/v1/chat, Neuriy orchestration)
  → ElloFive :3101      (/v1/chat/completions OpenAI-compat)
  → Ollama :11434       (local LLM weights)
```

## Run

```bash
# once
pnpm ai:install
ollama serve
ollama pull llama3.2:3b

# terminals
pnpm ai:ellofive   # :3101
pnpm ai:frc7       # :3100  (auto-points NEURIY_LLM_* at ElloFive when healthy)
pnpm dev           # :3000
```

Open `/chat-neuriy` or use the home “Start chat” input.
