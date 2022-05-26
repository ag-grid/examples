#!/usr/bin/env bash

# FRAMEWORK=$( echo $1 | gsed -n -e 's/--\(react\).*/\1/p' -e 's/--\(angular\).*/\1/p' -e 's/--\(vue\).*/\1/p' -e 's/--\(vanilla\).*/\1/p')

if [ -z $1 ]; then
    echo -e "Please specify the project directory:\n  ${CYAN}t2-create-$FRAMEWORK ${GREEN}<project-directory>"
    echo -e "\n${NOCOLOR}For example:\n  ${CYAN}t2-create-$FRAMEWORK ${GREEN}my-$FRAMEWORK-app"
    exit 1
fi