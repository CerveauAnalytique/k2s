# Open Prysel Marketplace in Prysel Chat

1. Install the Python SDK:

```bash
pip install -e ./sdk/python
```

2. Set environment variables in Prysel Chat:

```bash
NEURIY_MARKETPLACE_URL=http://127.0.0.1:8000
NEURIY_MARKETPLACE_STORE_URL=http://127.0.0.1:5011
```

3. Register this folder / `manifest.json` as a Prysel Chat plugin.

4. In chat, ask things like:
   - “Search the marketplace for assistants”
   - “Open Code Copilot from Prysel Marketplace”

The plugin exposes `marketplace_search`, `marketplace_get_app`, `marketplace_list_categories`, and `marketplace_open_app`.
