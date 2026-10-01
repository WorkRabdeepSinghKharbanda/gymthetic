#!/usr/bin/env python3
"""Builds keywords.md (readable index) from keywords.json. Re-run after fetch_keywords.py."""
import json


def classify(q: str) -> str:
    ql = q.lower()
    if ql.startswith("how to") or ql.startswith("is "):
        return "informational"
    if ql.startswith("best") or "vs" in ql.split() or "alternative" in ql:
        return "comparison"
    if "free" in ql or "online" in ql:
        return "commercial (free/online tool-seeking)"
    return "informational"


def main():
    data = json.load(open("keywords.json"))
    lines = ["# Keyword research index", "", "Source: Google Autocomplete, raw data in `keywords.json`.", ""]

    lines.append("## Features / pages")
    lines.append("")
    lines.append("| Page | Primary keyword | Top long-tails | Intent |")
    lines.append("|---|---|---|---|")
    for seed, entry in data["features"].items():
        all_suggestions = []
        for q, suggestions in entry["queries"].items():
            all_suggestions.extend(suggestions)
        # dedupe, keep order, drop ones identical to the seed itself, cap at 8
        seen = set()
        longtails = []
        for s in all_suggestions:
            sl = s.lower().strip()
            if sl == seed.lower() or sl in seen:
                continue
            seen.add(sl)
            longtails.append(s)
        longtails = longtails[:8]
        intents = sorted({classify(q) for q in entry["queries"] if entry["queries"][q]})
        lines.append(
            f"| `{entry['page']}` | {seed} | {', '.join(longtails) if longtails else '(no data)'} | {', '.join(intents) if intents else '-'} |"
        )

    lines.append("")
    lines.append("## Competitor / alternative pages")
    lines.append("")
    lines.append("| Page | Competitor | Top long-tails | Intent |")
    lines.append("|---|---|---|---|")
    for seed, entry in data["competitors"].items():
        all_suggestions = []
        for q, suggestions in entry["queries"].items():
            all_suggestions.extend(suggestions)
        seen = set()
        longtails = []
        for s in all_suggestions:
            sl = s.lower().strip()
            if sl == seed.lower() or sl in seen:
                continue
            seen.add(sl)
            longtails.append(s)
        longtails = longtails[:8]
        lines.append(f"| `{entry['page']}` | {seed} | {', '.join(longtails) if longtails else '(no data)'} | comparison |")

    with open("keywords.md", "w") as f:
        f.write("\n".join(lines) + "\n")
    print("Saved keywords.md")


if __name__ == "__main__":
    main()
