"""Write the successfully published image tag; never use a mutable tag for GitOps."""
import os
from pathlib import Path
import re

sha = os.environ["GITHUB_SHA"]
if not re.fullmatch(r"[0-9a-f]{40}", sha):
    raise ValueError("GITHUB_SHA must be a full commit SHA")

manifest = Path("k8s/deployment.yml")
content, count = re.subn(
    r"(?m)^(\s*image:\s*)ghcr\.io/team-pueblo/pueblo-fe:[^\s]+\s*$",
    lambda match: f"{match[1]}ghcr.io/team-pueblo/pueblo-fe:sha-{sha}",
    manifest.read_text(),
)
if count != 1:
    raise ValueError(f"Expected one frontend image reference, found {count}")
manifest.write_text(content)
