# Daniel Sweet — Portfolio

Personal portfolio site, hand-written HTML/CSS/JS with no build step or framework.
Live at [portfolio.sweets-lab.net](https://portfolio.sweets-lab.net), self-hosted on a
Proxmox homelab behind a Cloudflare Tunnel and NGINX Proxy Manager.

## Stack
- Static HTML/CSS/JS (fonts: IBM Plex Sans/Mono, Big Shoulders Display)
- nginx (Alpine), hardened: read-only filesystem, strict CSP, security headers
- Docker Compose

## Structure
- `site/` — the static site nginx serves
- `nginx/default.conf` — server config and security headers
- `docker-compose.yml` — the service definition