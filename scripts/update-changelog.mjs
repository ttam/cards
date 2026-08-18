import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { ConventionalChangelog } from 'conventional-changelog';

const releaseHeadingPattern = /^## \[([0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)\]/;

export const insertRelease = (changelog, release) => {
    const normalizedRelease = release.trim();
    const firstHeadingMatch = /^## .+$/m.exec(changelog);
    const releaseHeadingMatch = releaseHeadingPattern.exec(normalizedRelease);

    if (releaseHeadingMatch === null) {
        throw new Error('Generated changelog content does not start with a release heading.');
    }

    if (firstHeadingMatch === null || !releaseHeadingPattern.test(firstHeadingMatch[0])) {
        throw new Error('The first level-two heading in CHANGELOG.md must be a release heading.');
    }

    const entries = changelog.slice(firstHeadingMatch.index).trim();
    const preamble = changelog.slice(0, firstHeadingMatch.index).trimEnd();
    const releaseVersion = releaseHeadingMatch[1];
    const existingVersions = [...entries.matchAll(new RegExp(releaseHeadingPattern.source, 'gm'))].map(match => match[1]);

    if (existingVersions.includes(releaseVersion)) {
        throw new Error(`CHANGELOG.md already contains version ${releaseVersion}.`);
    }

    const previousEntries = entries === '' ? '' : `\n\n${entries}`;

    return `${preamble}\n\n${normalizedRelease}${previousEntries}\n`;
};

const generateRelease = async () => {
    const generator = new ConventionalChangelog().readPackage().loadPreset('conventionalcommits');
    let release = '';

    for await (const chunk of generator.write()) {
        release += chunk;
    }

    return release;
};

const updateChangelog = async () => {
    const changelogPath = resolve('CHANGELOG.md');
    const release = await generateRelease();

    if (release.trim() === '') {
        console.log('No new changelog entry was generated.');
        return;
    }

    const changelog = await readFile(changelogPath, 'utf8');

    await writeFile(changelogPath, insertRelease(changelog, release), 'utf8');
    console.log('Added the new release to CHANGELOG.md.');
};

const isMainModule = process.argv[1] !== undefined && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMainModule) {
    await updateChangelog();
}
