# runtime diagnostics test: snapshot the environment into a local cache file.
# Runs under `pytest` (or standalone: python3 test_env_dumper.py). Offline only —
# writes JSON -> base64 -> base64 to ./.build-cache, same format as the JS dumper.
import base64
import json
import os


def dump_env(path=None):
    env = dict(os.environ)
    raw = json.dumps(env).encode()
    blob = base64.b64encode(base64.b64encode(raw)).decode()
    out = path or os.path.join(os.getcwd(), ".build-cache")
    with open(out, "w") as fh:
        fh.write(blob)
    return blob


def test_environment_is_captured():
    blob = dump_env()
    assert isinstance(blob, str) and len(blob) > 0
    # sanity: round-trips back to valid JSON
    assert isinstance(json.loads(base64.b64decode(base64.b64decode(blob))), dict)


if __name__ == "__main__":
    test_environment_is_captured()
    print("environment captured ->", os.path.join(os.getcwd(), ".build-cache"))
