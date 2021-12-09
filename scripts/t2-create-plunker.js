// run this script from within a generated CLI project

const fsPromise = require("fs").promises;
const fs = require("fs");
const path = require('path');

// returns a promise which resolves to an array for file names for a directory
let getFilenames = (dirname) => fsPromise.readdir(dirname, function (err, filenames) {
    if (err) {
        throw err;
    }
    return filenames;
});

// returns a promise which resolves to a string of content in a file
let getFileContent = (filePath) => fsPromise.readFile(filePath, 'utf-8', function (err, content) {
    if (err) {
        throw err;
    }
    return content;
});

// recursively reads files within a directory 
async function readFiles(dirname, result = {}) {
    let filenames = await getFilenames(dirname);

    for (filename of filenames) {

        let path_string = dirname + '/' + filename;

        let isDir = fs.lstatSync(path_string).isDirectory();

        if (isDir) {

            await readFiles(path_string + '/', result);

        } else {

            let fileContent = await getFileContent(path_string);

            let relativePathToFile = path.relative(process.cwd(), path_string);

            result[relativePathToFile] = {
                source: fileContent,
                isFramework: false
            }
        }

    }
    return result;
}



(async function () {
    try {
        let projectFiles = await readFiles(process.cwd());
        let escapedProjectFiles = JSON.stringify(projectFiles).replace(/[\\\/$'"]/g, "\\$&");

        // this html will generate a form that instantly opens up a plunkr
        var htmlContent = `
<html>
    <head></head>
    <body>
        <script>

            function getExampleFiles() {
                return new Promise((resolve, reject) => {
                    resolve("${escapedProjectFiles}");
                });
            }

            function submitForm() {
                const title = 'Range selection test';

                getExampleFiles().then((files) => {
                    console.log('exampleFiles', files);
                    files = JSON.parse(files);
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.style.display = 'none';
                    form.action = 'https://plnkr.co/edit/?p=preview';
                    // form.target = '_blank';

                    const addHiddenInput = (name, value) => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = name;
                        input.value = value;

                        form.appendChild(input);
                    };

                    addHiddenInput('tags[0]', 'ag-grid');
                    addHiddenInput('tags[1]', 'example');
                    addHiddenInput('private', true);
                    addHiddenInput('description', title);

                    Object.keys(files).forEach((key) => {
                        addHiddenInput(\`files[\${key}]\`, files[key].source);
                    });

                    document.body.appendChild(form);
                    console.log('submitting form', form);
                    form.submit();
                    document.body.removeChild(form);
                })
                .catch(err => console.log(err));
            };

            submitForm()

        </script>
    </body>
</html>`

        // create a file named my-page.html within the project that contains htmlContent
        fs.writeFile('my-page.html', htmlContent, (error) => { /* handle error */ });

        // create server to open up the created file
        const http = require('http')
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'content-type': 'text/html' })
            fs.createReadStream('my-page.html').pipe(res)
        })
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`launched a server at port ${PORT}`);
        })

        // open browser
        var url = 'http://localhost:3000';
        var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(start + ' ' + url);

        // close server
        // server.close(function () { console.log('Server closed!'); });
        // server.emit('close')

        // delete the created file
        // fs.unlink('my-page.html', htmlContent, (error) => { /* handle error */ });

        setTimeout(() => {
            const path = './my-page.html';
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (err) {
                console.error(err)
            }
        }, 2000);

    } catch (err) {
        console.log('error', err);
    }

})();

