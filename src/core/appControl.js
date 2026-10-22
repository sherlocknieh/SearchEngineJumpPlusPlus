let restartHandler = null;

export function onRestartRequest(handler) {
    restartHandler = handler;
}

export function requestRestart() {
    if (restartHandler) restartHandler();
}
