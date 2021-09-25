if not exist output mkdir output
if not exist output mkdir output/pdf
if not exist output mkdir output/svg

echo "utils"
  call node utils
echo "a4"
  call node a4
echo "a6-5"
  call node a6-5.mjs
echo "a6-5-housenmuber"
  call node a6-5-buildingnumber
echo "av1av2"
  call node av1av2
echo "english"
  call node english
echo "euro"
  call node euro
echo "french"
  call node french
echo "italian"
  call node italian
echo "message"
  call message
echo "no-reference-message"
  call no-reference-message
echo "message-additional-information"
  call message-additional-information
echo "additional-information"
  call additional-information
echo "multipage"
  call node multipage
echo "no-amount"
  call node no-amount
echo "no-debtor"
  call node no-debtor
echo "no-debtor-no-amount"
  call node no-debtor-no-amount
echo "no-debtor-no-amount-no-reference"
  call node no-debtor-no-amount-no-reference
echo "no-debtor-no-reference"
  call node no-debtor-no-reference
echo "normal-iban-creditor-reference"
  call node normal-iban-creditor-reference
echo "normal-iban-no-reference"
  call node normal-iban-no-reference
echo "not-enough-space"
  call node not-enough-space
echo "not-enough-space-a4"
  call node not-enough-space-a4
echo "no-scissors"
  call node no-scissors
echo "no-scissors-no-outlines"
  call node no-scissors-no-outlines
echo "no-scissors-no-separate"
  call node no-scissors-no-separate
echo "no-separate-no-outlines"
  call node no-separate-no-outlines
echo "no-scissors-no-separate-no-outlines"
  call node no-scissors-no-separate-no-outlines
echo "qr-iban"
  call node qr-iban
echo "separate"
  call node separate
echo "separate-scissors"
  call node separate-scissors
echo "callback"
  call node callback
echo "callback-with-options"
  call node callback-with-options
echo "event"
  call node event
echo "stream"
  call node stream
echo "zip-string"
call node zip-string