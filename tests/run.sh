#!/bin/bash

rm -rf output/

mkdir -p output
mkdir -p output/pdf
mkdir -p output/svg

set -e

echo "Testing utils"
eval node utils

echo "Testing PDFs creation:"
pdf=(
  "a4"
  "a4-no-debtor-no-amount-no-reference"
  "a6-5.mjs"
  "a6-5-buildingnumber"
  "av1av2"
  "english"
  "euro"
  "french"
  "italian"
  "message"
  "no-reference-message"
  "message-additional-information"
  "additional-information"
  "multipage"
  "no-amount"
  "no-debtor"
  "no-debtor-no-amount"
  "no-debtor-no-amount-no-reference"
  "no-debtor-no-reference"
  "no-scissors"
  "no-scissors-no-outlines"
  "no-scissors-no-separate"
  "no-separate-no-outlines"
  "no-scissors-no-separate-no-outlines"
  "normal-iban-creditor-reference"
  "normal-iban-no-reference"
  "not-enough-space"
  "not-enough-space-a4"
  "qr-iban"
  "separate"
  "separate-scissors"
  "callback"
  "callback-with-options"
  "event"
  "stream"
  "zip-string"
)

for i in "${!pdf[@]}"; do
  echo  "$i": "${pdf[$i]}"
  eval node "${pdf[$i]}"

  if ! eval diff-pdf output/pdf/"${pdf[$i]}".pdf snapshots/pdf/"${pdf[$i]}".pdf; then
    echo "${pdf[$i]}" doesn\'t corresponds to its snapshot 
    exit 1
  fi

done