Je potreba aby se slozka s certifikatama jmenovala "certs" a byla umistena v rootu projektu.

## deploy.sh

Builds production Docker images and deploys them to the Synology NAS.

```bash
./deploy.sh                        # build + deploy via SSH (default)
./deploy.sh --build-only           # build images only, skip deploy
./deploy.sh --mode registry        # push to NAS Docker registry instead of SSH pipe
./deploy.sh --tag v1.2.0           # tag images as v1.2.0 instead of latest
NAS_HOST=10.0.0.5 ./deploy.sh     # override NAS IP address
```

### Flags

| Flag | When to use |
|------|-------------|
| _(none)_ | Standard deploy — builds images and transfers them to the NAS via SSH pipe (`docker save \| ssh \| docker load`). No registry required. |
| `--build-only` | Only build the Docker images locally. Use to verify the build succeeds before deploying, or to iterate on Dockerfiles without triggering a transfer. |
| `--mode registry` | Push images to a private Docker registry on the NAS (`NAS_HOST:5000`), then the NAS pulls them. Faster for frequent deploys (only changed layers transfer), but requires a registry already running on the NAS. |
| `--mode ssh` | Explicit default. Same as running without `--mode`. |
| `--tag <tag>` | Override the image tag (default: `latest`). Use for versioned releases (`v1.2.0`) or canary builds alongside current prod. |

### Environment variable overrides

| Variable | Default | Description |
|----------|---------|-------------|
| `NAS_HOST` | `192.168.0.98` | NAS hostname or IP |
| `NAS_USER` | `azul` | SSH user |
| `NAS_PROJECT_DIR` | `/volume1/docker/books` | Project directory on the NAS |
| `NAS_SSH_PORT` | `22` | SSH port |
| `REGISTRY_HOST` | `NAS_HOST:5000` | Docker registry host:port |
| `TAG` | `latest` | Image tag |
| `NAS_PLATFORM` | `linux/amd64` | Target build platform (use `linux/arm64` for ARM NAS models) |
