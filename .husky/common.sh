//common.sh 
#!/bin/sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi
//pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged