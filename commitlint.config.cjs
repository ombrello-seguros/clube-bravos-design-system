module.exports = {
  extends: ['@commitlint/config-conventional'],
  // git subtree import commits ("Add 'pkg/' from commit <sha>") are git-generated,
  // not human commits — exempt them from Conventional Commits. Real commits stay gated.
  ignores: [(message) => /^Add '.+\/' from commit [0-9a-f]+/.test(message)],
};
