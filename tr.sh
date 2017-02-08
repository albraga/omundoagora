#!/bin/bash
for argument in "$@"
do
case $argument in
        build)
                jade --pretty ./pug/index.jade -o ./
                webpack
        ;;
        docs)
                rm -Rf docs
                mkdir docs && cd docs
                cp -Rfv ../index.html ../dist ../data .
        ;;
        eslint)
                ./node_modules/.bin/eslint $1; exit 0
        ;;
        eslintinit)
                ./node_modules/.bin/eslint --init
        ;;
        vendor)
                rm -Rf vendor
                mkdir vendor && cd vendor
                mkdir jquery && cd jquery
                wget -O jquery.js "https://code.jquery.com/jquery-3.1.1.min.js"
                cd ..
                wget -O tmp.zip "https://github.com/twbs/bootstrap/releases/download/v3.3.7/bootstrap-3.3.7-dist.zip"
                unzip tmp.zip 
                mv bootstrap-3.3.7-dist bootstrap
                rm tmp.zip
                cd bootstrap/css
                rm *.map bootstrap-theme.css bootstrap.css
                cd ../js
                rm bootstrap.js npm.js 
        ;;
esac
done
