#!/usr/bin/env bash

command ./node_modules/.bin/tsc -p ./tsconfig.cjs.json
command cat >./lib/node/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF