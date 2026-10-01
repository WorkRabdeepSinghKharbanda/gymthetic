#!/usr/bin/env python3
"""
One-off script: pulls Google Autocomplete suggestions for every Gymthetic page/feature
+ named competitor apps, saves raw results to keywords.json. Re-run and commit the new
output whenever the feature list changes meaningfully (not part of the build).
"""
import json
import subprocess
import time
import urllib.parse

ENDPOINT = "https://suggestqueries.google.com/complete/search?client=firefox&q="
THROTTLE_SECONDS = 0.15

# page -> (primary seed, action phrase for "how to <action>", owning route)
FEATURES = {
    "gym workout tracker": {"action": "track gym workouts", "page": "/"},
    "exercise library": {"action": "find gym exercises", "page": "/exercises"},
    "chest exercises": {"action": "build chest muscle", "page": "/best-chest-exercises"},
    "back exercises": {"action": "build a wider back", "page": "/best-back-exercises"},
    "shoulder exercises": {"action": "build shoulder size", "page": "/best-shoulder-exercises"},
    "leg exercises": {"action": "build leg muscle", "page": "/best-leg-exercises"},
    "bicep exercises": {"action": "build bigger biceps", "page": "/best-bicep-exercises"},
    "tricep exercises": {"action": "build bigger triceps", "page": "/best-tricep-exercises"},
    "core exercises": {"action": "build core strength", "page": "/best-core-exercises"},
    "forearm exercises": {"action": "build grip strength", "page": "/best-forearm-exercises"},
    "1rm calculator": {"action": "calculate one rep max", "page": "/calculators/one-rep-max"},
    "tdee calculator": {"action": "calculate tdee", "page": "/calculators/tdee"},
    "workout plateau": {"action": "break a lifting plateau", "page": "/calculators/plateau-breaker"},
    "plate calculator": {"action": "calculate barbell plates", "page": "/calculators/plates"},
    "warm up before lifting": {"action": "warm up before lifting", "page": "/calculators/warmup"},
    "workout log": {"action": "log a workout", "page": "/tracker"},
    "strength standards": {"action": "compare strength to standards", "page": "/standards"},
    "push pull legs": {"action": "structure a ppl split", "page": "/guides/push-pull-legs-split"},
    "beginner workout plan": {"action": "start lifting as a beginner", "page": "/beginner-workout-plan"},
    "home workout no equipment": {"action": "train without a gym", "page": "/home-gym-workout-plan"},
    "workout template": {"action": "build a workout template", "page": "/templates"},
}

COMPETITORS = {
    "Strong workout tracker app": "/alternatives/strong-app-alternative",
    "Hevy": "/alternatives/hevy-alternative",
    "StrongLifts 5x5": "/alternatives/stronglifts-alternative",
    "JEFIT": "/alternatives/jefit-alternative",
}

FEATURE_SUFFIXES = [
    "{q}",
    "{q} online",
    "{q} free",
    "{q} alternative",
    "best {q}",
]

COMPETITOR_SUFFIXES = [
    "{q}",
    "{q} alternative",
    "{q} vs",
    "is {q} safe",
    "{q} free",
]


def fetch(query: str):
    url = ENDPOINT + urllib.parse.quote(query)
    raw = subprocess.run(
        ["curl", "-s", "--max-time", "10", url], capture_output=True, text=True, check=True
    ).stdout
    data = json.loads(raw)
    return data[1] if len(data) > 1 else []


def main():
    results = {"features": {}, "competitors": {}}

    for seed, meta in FEATURES.items():
        entry = {"page": meta["page"], "queries": {}}
        for tmpl in FEATURE_SUFFIXES:
            q = tmpl.format(q=seed)
            entry["queries"][q] = fetch(q)
            time.sleep(THROTTLE_SECONDS)
        how_to = f"how to {meta['action']}"
        entry["queries"][how_to] = fetch(how_to)
        time.sleep(THROTTLE_SECONDS)
        results["features"][seed] = entry
        print(f"done: {seed}")

    for seed, page in COMPETITORS.items():
        entry = {"page": page, "queries": {}}
        for tmpl in COMPETITOR_SUFFIXES:
            q = tmpl.format(q=seed)
            entry["queries"][q] = fetch(q)
            time.sleep(THROTTLE_SECONDS)
        results["competitors"][seed] = entry
        print(f"done: {seed}")

    with open("keywords.json", "w") as f:
        json.dump(results, f, indent=2)
    print("Saved keywords.json")


if __name__ == "__main__":
    main()
