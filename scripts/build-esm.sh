#!/usr/bin/env bash

command ./node_modules/.bin/tsc -p ./tsconfig.esm.json
command cat >./lib/node/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF