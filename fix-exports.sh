cat >./lib/node/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >./lib/node/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF

cat >./lib/browser/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF