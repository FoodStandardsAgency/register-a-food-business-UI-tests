Dev container for the Register a Food Business UI tests

Quick start

1. In VS Code open this folder.
2. Click the green >< icon in the bottom-left and choose "Reopen in Container".
3. After the container builds, the `postCreateCommand` will run:
   - Installs dependencies in the `playwright-tests` folder
   - Runs `npx playwright install --with-deps` to install Playwright browsers
4. Use the integrated terminal to run tests, e.g.:
   - `cd playwright-tests && npm test` (Playwright)

Headed Playwright (in container)

This devcontainer starts a lightweight X server (Xvfb) plus VNC/noVNC so you can run Playwright in headed or UI mode and see the browser.

1. Rebuild / reopen the devcontainer.
2. Wait for the container to start (the VNC stack is started via `postStartCommand`).
3. Open the noVNC viewer in your host browser:
   - http://localhost:7900/vnc.html
   - Password: `vscode` (override with `VNC_PASSWORD`)
4. Run Playwright in headed mode:
   - `cd playwright-tests && npm run test:headed`
   - If you want a single visible browser (recommended for VNC): `cd playwright-tests && npm run test:headed:chromium`
   - If the browser opens and closes too fast, pause on first action: `cd playwright-tests && npm run test:headed:pause`
   - Or UI mode: `cd playwright-tests && npm run test:ui`
   - Quick sanity check that VNC rendering works: `cd playwright-tests && npm run vnc:demo`

Troubleshooting

- If `http://localhost:7900/vnc.html` spins forever, it usually means the WebSocket proxy isn’t reachable.
   - Make sure you’re opening the forwarded port from VS Code’s **Ports** panel (especially in Codespaces/SSH/remote scenarios). The correct URL may not be `localhost`.
   - Inside the container, verify the HTTP endpoint responds:
      - `curl -I http://127.0.0.1:7900/vnc.html`
   - If you get `Connection refused`, start/restart the stack:
      - `bash /workspace/.devcontainer/scripts/start-vnc.sh`
- If the noVNC page loads but shows “Failed to connect to server”, websockify is up but can’t reach the VNC server.
   - Inside the container, verify both ports are listening:
      - `ss -ltnp | egrep ':(5900|7900)\\b'`
   - If `:7900` is listening but `:5900` is not, restart the stack:
      - `bash /workspace/.devcontainer/scripts/start-vnc.sh`
   - Check `/tmp/novnc.log` for lines like `Failed to connect to localhost:5900`.
- If the noVNC page is blank, check logs inside the container:
  - `/tmp/xvfb.log`
  - `/tmp/fluxbox.log`
  - `/tmp/x11vnc.log`
  - `/tmp/novnc.log`
- The startup script is at `/workspace/.devcontainer/scripts/start-vnc.sh`.

Tip

- If you run tests from the VS Code Playwright extension UI, it may wrap runs with `xvfb-run -a` on Linux. That creates a different virtual display than the VNC session, so the browser won’t appear in noVNC. Prefer running the npm scripts above in the terminal when you want to watch the browser.

Notes
- The container prepares Playwright browsers (Chromium, Firefox, WebKit) for local runs.
- Docker socket is mounted so you can run Docker commands from the container if needed.
- If you prefer `yarn`, the dev image supports it; `npm` is used as fallback in the `postCreateCommand`.
