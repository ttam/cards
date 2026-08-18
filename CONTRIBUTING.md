# Contributing

## Development

Use Node.js 22 and npm:

```sh
nvm use
npm ci
npm run check
```

Run `npm run docs:build` when documentation or browser UI behavior changes.

## Pull requests and commits

Use [Conventional Commits](https://www.conventionalcommits.org/) for commits and
pull-request titles. When using a pull request, squash merge it so the title
becomes the commit that the changelog generator reads from `main`.

Common prefixes are:

- `fix:` for a bug fix and SemVer patch.
- `feat:` for a feature and SemVer minor.
- `feat!:` or a `BREAKING CHANGE:` footer for a SemVer major.
- `docs:`, `test:`, `refactor:`, `perf:`, `build:`, `ci:`, and `chore:` for other changes.

Scopes are optional: `fix(poker): handle ace-low straight ties`.

Pull requests must pass type checking, tests, linting, formatting, package-consumer
type checks, the production build, the documentation build, and a package dry run.

## Releases

Releases are maintainer-driven. Start from a clean `main` branch with current tags,
then choose the next version:

```sh
git pull --ff-only
git fetch --tags
npm version patch # or minor, major, or an exact version such as 1.0.0
```

`npm version` runs `npm run check`, updates `package.json` and
`package-lock.json`, generates and stages `CHANGELOG.md` from commits since the
previous version tag, then creates a `chore(release): x.y.z` commit and `vx.y.z` tag.
The changelog updater keeps the introduction and all earlier releases in place.

Inspect the generated commit and tag, then publish explicitly:

```sh
git push --follow-tags
npm publish
```
