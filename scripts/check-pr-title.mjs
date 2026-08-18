const allowedTypes = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];
const pattern = new RegExp(`^(?:${allowedTypes.join('|')})(?:\\([a-z0-9][a-z0-9._/-]*\\))?!?: .+`);
const title = process.env.PR_TITLE?.trim() ?? '';

if (!pattern.test(title)) {
    console.error(`Pull-request title must use Conventional Commits, for example:
  feat: add a new evaluator
  fix(poker): handle ace-low straight ties
  feat!: make a breaking API change

Received: ${title || '(empty title)'}`);
    process.exitCode = 1;
}
