# Dockerfile for VS Code Dev Container
# Base image with Node 20 and common tooling
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-20

ARG DEBIAN_FRONTEND=noninteractive

# Install OS dependencies needed for Playwright browsers
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        wget \
        git \
        unzip \
        zip \
        gnupg \
        procps \
        chromium \
        fonts-liberation \
        fonts-noto-color-emoji \
        libnss3 \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libcups2 \
        libxrandr2 \
        libxcomposite1 \
        libxdamage1 \
        libgbm1 \
        libgtk-3-0 \
        libxss1 \
        libasound2 \
        libgconf-2-4 \
        libx11-xcb1 \
        libu2f-udev \
        libv4l-0 \
        xvfb \
        xauth \
        x11vnc \
        fluxbox \
        novnc \
        websockify \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Ensure X11 socket dir exists for Xvfb when running as non-root.
RUN mkdir -p /tmp/.X11-unix && chmod 1777 /tmp/.X11-unix

# Ensure 'yarn' is available (this image already has corepack but ensure it's enabled)
RUN corepack enable && corepack prepare yarn@stable --activate || true

# Install Playwright system dependencies (distro-specific packages required by browsers)
# Use Playwright's helper to detect and install the correct OS packages for the host.
# Keep the command tolerant to transient network issues during image build.
RUN npx --yes playwright install-deps || true

# Ensure Playwright browsers are installed into a location with write perms
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Default display for headed runs inside Xvfb.
ENV DISPLAY=:99

# Add a non-root user (node) is provided by base image; ensure workspace dir exists
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN mkdir -p /ms-playwright && chown ${USER_UID}:${USER_GID} /ms-playwright

# Set a safer PATH
ENV PATH="/usr/local/bin:${PATH}"

# Default to bash
SHELL ["/bin/bash", "-lc"]

# Clean up
RUN echo "Dev container image ready"
