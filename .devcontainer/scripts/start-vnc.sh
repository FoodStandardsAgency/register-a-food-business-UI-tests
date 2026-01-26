#!/usr/bin/env bash
set -euo pipefail

DISPLAY_NUMBER="${DISPLAY:-:99}"
VNC_PORT="${VNC_PORT:-5900}"
NOVNC_PORT="${NOVNC_PORT:-7900}"
VNC_PASSWORD="${VNC_PASSWORD:-vscode}"
SCREEN_GEOMETRY="${VNC_SCREEN_GEOMETRY:-1280x720x24}"

log() {
  echo "[devcontainer:vnc] $*"
}

is_listening() {
  local port="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -ltnp 2>/dev/null | grep -q ":${port} "
    return $?
  fi
  if command -v netstat >/dev/null 2>&1; then
    netstat -ltnp 2>/dev/null | grep -q ":${port} "
    return $?
  fi
  return 1
}

ensure_vnc_password() {
  local passfile="/tmp/.x11vnc.pass"
  if [[ -f "$passfile" ]]; then
    return 0
  fi

  # x11vnc -storepasswd prompts unless passed both args.
  x11vnc -storepasswd "$VNC_PASSWORD" "$passfile" >/dev/null
  chmod 600 "$passfile"
}

start_xvfb() {
  if pgrep -x Xvfb >/dev/null 2>&1; then
    log "Xvfb already running on ${DISPLAY_NUMBER}"
    return 0
  fi

  log "Starting Xvfb on ${DISPLAY_NUMBER} (${SCREEN_GEOMETRY})"
  nohup Xvfb "${DISPLAY_NUMBER}" \
    -screen 0 "${SCREEN_GEOMETRY}" \
    -ac +extension GLX +render -noreset \
    >/tmp/xvfb.log 2>&1 &
}

start_window_manager() {
  if pgrep -x fluxbox >/dev/null 2>&1; then
    log "fluxbox already running"
    return 0
  fi

  log "Starting fluxbox"
  nohup fluxbox -display "${DISPLAY_NUMBER}" >/tmp/fluxbox.log 2>&1 &
}

start_x11vnc() {
  if is_listening "${VNC_PORT}"; then
    log "x11vnc already running"
    return 0
  fi

  ensure_vnc_password

  log "Starting x11vnc on port ${VNC_PORT}"
  # Start in x11vnc's own background mode so it doesn't get torn down when
  # the VS Code postStart command/session ends (x11vnc can treat SIGHUP as fatal).
  DISPLAY="${DISPLAY_NUMBER}" env -u WAYLAND_DISPLAY XDG_SESSION_TYPE=x11 x11vnc \
    -display "${DISPLAY_NUMBER}" \
    -rfbport "${VNC_PORT}" \
    -rfbauth /tmp/.x11vnc.pass \
    -forever \
    -shared \
    -noxdamage \
    -repeat \
    -nolookup \
    -bg \
    -o /tmp/x11vnc.log
}

start_novnc() {
  if is_listening "${NOVNC_PORT}"; then
    log "noVNC/websockify already running"
    return 0
  fi

  local web_root="/usr/share/novnc"
  if [[ ! -d "$web_root" ]]; then
    # Some distros install here.
    web_root="/usr/share/novnc"
  fi

  if [[ ! -d "$web_root" ]]; then
    log "WARNING: noVNC web root not found; web UI may not work"
  fi

  log "Starting noVNC on port ${NOVNC_PORT} (VNC -> localhost:${VNC_PORT})"
  rm -f /tmp/novnc.log
  websockify -D \
    --log-file=/tmp/novnc.log \
    --web="${web_root}" \
    "${NOVNC_PORT}" \
    "localhost:${VNC_PORT}"
}

start_xvfb
start_window_manager
start_x11vnc
start_novnc

log "Ready. Open http://localhost:${NOVNC_PORT}/vnc.html (password: ${VNC_PASSWORD})"
