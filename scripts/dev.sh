#!/bin/bash
export PATH="/Users/ff/.nvm/versions/node/v22.22.0/bin:$PATH"

# Ensure Turbopack child processes can find node
mkdir -p /tmp/nodebin
ln -sf /Users/ff/.nvm/versions/node/v22.22.0/bin/node /tmp/nodebin/node
export PATH="/tmp/nodebin:$PATH"

cd "$(dirname "$0")/.."
exec node_modules/.bin/next dev --webpack
