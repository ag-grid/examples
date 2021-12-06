#!/usr/bin/env bash

# foo
echo "hello moto"


# open $T2_HOME/scripts/helpers/create-plunker.html
node $T2_HOME/scripts/helpers/play.js

# open './my-page.html'

# # =======================
# =======================

# node $T2_HOME/scripts/helpers/create-plunker.js


# open $T2_HOME/scripts/helpers/create-plunker.html

# AG_GRID_REPO_LOCATION='/Users/ahmedgadir/Documents/ag-grid'
# RANGE_SELECTION_EXAMPLE='$AG_GRID_REPO_LOCATION/grid-packages/ag-grid-docs/documentation/doc-pages/range-selection/examples/range-selection'


# =======================
# =======================

# files_in_directory=(*)
# pos=$(( ${#files_in_directory[*]} - 1 ))
# last=${files_in_directory[$pos]}

# output="["

# for file in *
#     do
#     # echo $file
#     # cat $file
#     # printf -v file_contents "%q\n" `cat $file`
#     # file_contents=`cat $file`
#     # FORMATTED_STLYE_IMPORTS=$( echo $STYLE_IMPORTS | gsed -e 's/( @)\|@//g' | gsed -e 's/; /;\\n/g' )
#     file=$( echo $STYLE_IMPORTS | gsed -e 's/( @)\|@//g' | gsed -e 's/; /;\\n/g' )
#     output+="{\"$file\": \"$file_contents\"}"

#     if [[ $file != $last ]] 
#     then
#         output+=","
#     fi
# done


# output+="]"

# echo $output

# echo $output >> files.json
