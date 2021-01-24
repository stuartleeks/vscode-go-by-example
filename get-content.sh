#!/bin/bash

rm -rf tmp
mkdir -p tmp
echo "*" > tmp/.gitignore
git clone https://github.com/mmcgrana/gobyexample/ tmp/gbe

rm -rf media
mkdir -p media
cp tmp/gbe/public/* media/
rm -rf tmp

cat ./media-overrides/site.css >> ./media/site.css
