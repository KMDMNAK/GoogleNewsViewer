

```
acquireVsCodeApi()
() => { if (acquired) { throw new Error('An instance of the VS Code API has already been acquired'); } acquired = true; return Object.freeze({ postMessage: function(msg) { return originalPostMessage({ command: 'onmessage', data: msg }, targetOrigin); }, setState: function(newState) { state = newState; originalPostMessage({ command: 'do-update-state', data: JSON.stringify(newState) }, targetOrigin); return newState; }, getState: function() { return state; } }); }
```