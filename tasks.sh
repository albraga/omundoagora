#!/bin/bash
for argument in "$@"
do
case $argument in
	staticdata_from_docs_2_root)
		if [ -d "docs/staticdata" ]; then mv -v docs/staticdata . && rm -rfv docs; fi
	;;
	toinitialcommit)
		rm -rfv .git
		git init
		git add --all
		git commit -m "to initial commit"
		git remote add origin https://github.com/albraga/bible.git
		git push -u --force origin master
	;;
	pug2html)
					pug --pretty ./pug/index.pug -o ./
	;;
	assemble_docs_2_githubpages)
		mkdir docs
		mv -fv staticdata docs/
		cp -fv index.html docs/
		mv -fv dist docs/
	;;
	lint)
	# add to .eslintrc.js
	# "rules": {
	# "no-console": "off",
					./node_modules/.bin/eslint --ext .js,.vue src; exit 0
	;;
	eslintinit)
					./node_modules/.bin/eslint --init
	;;
	static)
					rm -rfv static && mkdir -v static
					cd static
					wget -O temp.zip "https://jqueryui.com/resources/download/jquery-ui-1.12.1.zip"
					unzip temp.zip && rm temp.zip
					mv jquery-ui-1.12.1 jquery-ui
					cd jquery-ui
					rm AUTHORS.txt
					rm index.html
					rm jquery-ui.css
					rm jquery-ui.js
					rm jquery-ui.structure.css
					rm jquery-ui.theme.css
					rm LICENSE.txt
					rm package.json
					cd ..
					wget -O temp.zip "https://github.com/twbs/bootstrap/releases/download/v3.3.7/bootstrap-3.3.7-dist.zip"
					unzip temp.zip && rm temp.zip
					mv bootstrap-3.3.7-dist bootstrap
					cd bootstrap/css
					rm bootstrap.css 
					rm bootstrap.css.map 
					rm bootstrap.min.css.map 
					rm bootstrap-theme.css 
					rm bootstrap-theme.css.map 
					rm bootstrap-theme.min.css.map
					cd ../js
					rm bootstrap.js
					rm npm.js
					cd ../..
					wget https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js
	;;
esac
done
