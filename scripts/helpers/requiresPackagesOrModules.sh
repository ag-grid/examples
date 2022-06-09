#!/usr/bin/env bash

AG_GRID_METHOD=$(echo $2 | gsed -n -e 's/--\(packages\).*/\1/p' -e 's/--\(modules\).*/\1/p')

if [[ ! -z "$2" && -z "$AG_GRID_METHOD" ]]; then
    echo -e "You must supply an AG Grid installation method"
    echo -e "For example: ${CYAN}--packages or --modules"
    exit 1
fi