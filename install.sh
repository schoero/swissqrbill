#!/bin/bash

sudo apt-get install make automake g++
sudo apt-get install libpoppler-glib-dev poppler-utils libwxgtk3.0-gtk3-dev

unzip diff-pdf-0.5.zip
cd diff-pdf-0.5.zip || exit

./bootstrap
./configure
make 
make install