const fs = require("fs");


// fs.readFile(__dirname + "/data.txt", (error, data) => {
//     if (error) {
//         throw error;
//     }
//     console.log(data.toString());
// });

function onError(err) {
    console.error(err);
}

function onFileContent(filename, content) {
    var data = {};
    readFiles('dirname/', function (filename, content) {
        data[filename] = content;
    }, function (err) {
        throw err;
    });
    console.log(filename, content);
}

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

readFiles(__dirname + '/', onFileContent, onError);
