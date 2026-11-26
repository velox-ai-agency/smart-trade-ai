#!/usr/bin/env python3
"""Screen a company or person against OpenSanctions watchlists.

Usage:
  python3 sanctions_check.py "Green Harvest Egypt" --country eg --schema Organization
  python3 sanctions_check.py "Vladimir Putin" --schema Person --json

Requires OPENSANCTIONS_API_KEY in the environment or ~/.hermes/.env.
Never prints the API key.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API = "https://api.opensanctions.org/match/default"


def load_key():
    key = os.environ.get("OPENSANCTIONS_API_KEY", "").strip()
    if key:
        return key
    env_file = Path.home() / ".hermes" / ".env"
    if env_file.exists():
        for line in env_file.read_text(errors="ignore").splitlines():
            if line.startswith("OPENSANCTIONS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"\'')
    return ""


def screen(names, schema, country):
    key = load_key()
    if not key:
        raise SystemExit("OPENSANCTIONS_API_KEY not found in env or ~/.hermes/.env")
    queries = {}
    for i, name in enumerate(names):
        props = {"name": [name]}
        if country:
            props["country"] = [country]
        queries[f"q{i}"] = {"schema": schema, "properties": props}
    payload = json.dumps({"queries": queries}).encode()
    req = urllib.request.Request(
        API, data=payload, method="POST",
        headers={"Authorization": "ApiKey " + key, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def main():
    ap = argparse.ArgumentParser(description="Screen names against OpenSanctions")
    ap.add_argument("names", nargs="+", help="company or person names to screen")
    ap.add_argument("--schema", default="Organization", choices=["Organization", "Person"])
    ap.add_argument("--country", default="", help="ISO 2-letter country code filter (e.g. eg for organizations); empty = no filter")
    ap.add_argument("--threshold", type=float, default=0.85, help="review threshold (default 0.85)")
    ap.add_argument("--json", action="store_true", help="emit raw match response as JSON")
    args = ap.parse_args()

    try:
        data = screen(args.names, args.schema, args.country or "")
    except urllib.error.HTTPError as exc:
        raise SystemExit(f"OpenSanctions HTTP {exc.code}: {exc.read()[:300].decode(errors='ignore')}")
    except Exception as exc:
        raise SystemExit(f"OpenSanctions request failed: {exc}")

    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        return 0

    worst = 0.0
    any_hold = False
    for i, name in enumerate(args.names):
        resp = data["responses"].get(f"q{i}", {})
        results = resp.get("results", [])
        top = results[0] if results else None
        score = float(top.get("score", 0)) if top else 0.0
        matched = bool(top.get("match")) if top else False
        worst = max(worst, score)
        hold = score >= 0.95 or (matched and score >= 0.9)
        any_hold = any_hold or hold
        if hold:
            verdict = "HOLD"
        elif score >= args.threshold or matched:
            verdict = "REVIEW"
        else:
            verdict = "CLEAR"
        print(f"{verdict}  score={score:.3f}  {name}")
        if top:
            print(f"    top match: {top.get('caption')} ({top.get('schema')}) id={top.get('id')}")
            print(f"    datasets: {', '.join(top.get('datasets', [])[:8])}")
            print(f"    open: https://opensanctions.org/entities/{top.get('id')}")
    print("\nNOTE: watchlist screening only. No match is not a legal clearance; verify hits manually.")
    return 2 if any_hold else 0


if __name__ == "__main__":
    sys.exit(main())
