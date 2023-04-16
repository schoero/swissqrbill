#!/usr/bin/env bash

command ./node_modules/.bin/tsc -p ./tsconfig.browser.esm.json
command webpack --mode production --config ./webpack.config.cjs
command cat >./lib/browser/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF