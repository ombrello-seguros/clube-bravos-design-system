#!/usr/bin/env bash
#
# release.sh — bump semver em package.json + CHANGELOG + tag.
#
# Uso:
#   ./scripts/release.sh                   # detecta bump dos commits convencionais desde a última tag
#   ./scripts/release.sh patch|minor|major # força o tipo de bump
#
# O push da tag dispara o bitbucket-pipelines.yml, que builda e publica
# no registry da Figma. Este script NÃO publica — só versiona e cria a tag.

set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"
PKG_JSON="package.json"

if [ ! -f "$PKG_JSON" ]; then
  echo "❌ Não achei $PKG_JSON. Rodando da raiz do repo?" >&2
  exit 1
fi

# Garante árvore limpa (exceto untracked) — versionar com dirty fica confuso
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "❌ Working tree tem mudanças não commitadas. Commit ou stash antes de versionar." >&2
  git status --short >&2
  exit 1
fi

# Garante que está na main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "⚠️  Você está em '$BRANCH'. Releases saem da 'main'." >&2
  read -r -p "Continuar mesmo assim? [y/N] " ans
  [ "$ans" = "y" ] || [ "$ans" = "Y" ] || exit 1
fi

# Determina bump
BUMP="${1:-}"
if [ -z "$BUMP" ]; then
  echo "🔍 Detectando bump dos commits convencionais desde a última tag..."
  BUMP=$(npx --no-install conventional-recommended-bump -p conventionalcommits 2>/dev/null || echo "patch")
fi

case "$BUMP" in
  patch|minor|major) ;;
  *)
    echo "❌ Bump inválido: '$BUMP' (use patch|minor|major)" >&2
    exit 1
    ;;
esac

# Lê versão atual e calcula nova
CURRENT=$(node -p "require('./$PKG_JSON').version")
IFS='.' read -r MAJOR MINOR PATCH <<<"$CURRENT"
case "$BUMP" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
esac
NEW="$MAJOR.$MINOR.$PATCH"

echo "📦 Bump $BUMP: $CURRENT → $NEW"

# Atualiza version em package.json (preservando JSON formatado)
node -e "
const fs = require('fs');
const p = require('./$PKG_JSON');
p.version = '$NEW';
fs.writeFileSync('./$PKG_JSON', JSON.stringify(p, null, 2) + '\n');
"

# Gera/atualiza CHANGELOG.md
echo "📝 Gerando CHANGELOG.md..."
npx --no-install conventional-changelog -p conventionalcommits -i CHANGELOG.md -s -r 0

# Stage + commit + tag
git add "$PKG_JSON" CHANGELOG.md
git commit -m "chore(release): v$NEW"
git tag -a "v$NEW" -m "v$NEW"

echo ""
echo "✅ Tag v$NEW criada localmente."
echo ""
echo "Pra disparar o publish via Bitbucket Pipelines:"
echo "  git push origin main"
echo "  git push origin v$NEW"
echo ""
echo "Pra publicar manualmente (sem CI) ver README.md → 'Publicar manualmente'."
