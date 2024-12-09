#!/bin/sh
# this script creates a zip file that is compatible with hacker rank
/usr/bin/zip -r  project.zip .jest src .env .eslintrc.json .gitignore hackerrank.yml package.json package-lock.json README.md tsconfig.eslint.json tsconfig.json
