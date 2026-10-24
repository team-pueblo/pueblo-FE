#!/usr/bin/env bash
set -euo pipefail

image="${IMAGE:-ghcr.io/team-pueblo/pueblo-fe:scan}"
test_dir=$(mktemp -d)
container_id=""
cleanup() {
  if [ -n "$container_id" ]; then docker rm -f "$container_id" >/dev/null; fi
  rm -rf "$test_dir"
}
trap cleanup EXIT

container_id=$(docker run -d --cap-drop ALL --security-opt no-new-privileges \
  --read-only --tmpfs /tmp -p 127.0.0.1::8080 "$image")
port=$(docker port "$container_id" 8080/tcp | sed 's/.*://')
base="http://127.0.0.1:${port}"
curl --retry 15 --retry-connrefused --retry-delay 1 --max-time 5 -fsS "$base/healthz"
curl -fsS "$base/" > "$test_dir/index.html"
curl -fsS "$base/product/1" > "$test_dir/product.html"
cmp "$test_dir/index.html" "$test_dir/product.html"
grep -q 'id="root"' "$test_dir/index.html"
test "$(curl -s -o /dev/null -w '%{http_code}' "$base/assets/missing.js")" = 404
test "$(curl -s -o /dev/null -w '%{http_code}' "$base/api/login")" = 404
echo 'Nginx health, SPA fallback, missing asset and API handling: PASS'
