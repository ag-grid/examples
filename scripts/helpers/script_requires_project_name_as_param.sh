#!/usr/bin/env bash

# FRAMEWORK=$( echo $1 | gsed -n -e 's/--\(react\).*/\1/p' -e 's/--\(angular\).*/\1/p' -e 's/--\(vue\).*/\1/p' -e 's/--\(vanilla\).*/\1/p')

if [ -z $2 ]; then
    echo -e "Please specify the project directory:\n  ${CYAN}t2-create-$1 ${GREEN}<project-directory>"
    echo -e "\n${NOCOLOR}For example:\n  ${CYAN}t2-create-$1 ${GREEN}my-$1-app"
    exit 1
fi