# Content provenance

The Athens plot, mission story, Nyx companion, scene art and user interface are original MYTHOS QUEST material.

Beginner Modern Greek vocabulary and phrase examples are locally authored seed material informed by [Wikibooks Modern Greek](https://en.wikibooks.org/wiki/Modern_Greek). The source page and its [revision history and contributors](https://en.wikibooks.org/w/index.php?title=Modern_Greek&action=history) are linked in the app. The source is available under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The adapted educational text and challenge prompts are shared under CC BY-SA 4.0; source code and original narrative/art remain separate. Seed content is marked `seed-review` and needs educator review, including spelling, pronunciation guidance and level fit, before commercial release.

Run `npm run content:import` to fetch the specified lesson pages from the MediaWiki API. Each imported JSON file preserves original wikitext, section headings, candidate vocabulary and dialogue lines, URL, exact revision ID, attribution link, licence, and review flags. Imported candidates are **not** automatically published in game lessons. An editor must review and curate them. This separation prevents empty or ambiguous source sections from silently becoming curriculum.

No third-party images or audio are bundled. Device text-to-speech is used for listening practice when available.
