#!/usr/bin/env bash

T2_PROJECTS_DIR_PATH="$T2_HOME/projects"
# if running script from outside of our projects folder -> exit
if [[ $PWD != $T2_PROJECTS_DIR_PATH/** ]]; then
    echo "You must run this script from within a subdirectory inside $T2_PROJECTS_DIR_PATH"
    exit 1
fi