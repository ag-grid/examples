
// const fs = require("fs");
// const fs = require("fs").promises;

// async function readFiles(dirname, onError) {

//     let getFilenames = () => fs.readdir(dirname, function (err, filenames) {
//         if (err) {
//             onError(err);
//             return;
//         }
//         return filenames;
//     })

//     let getFileContent = (filename) => fs.readFile(dirname + filename, 'utf-8', function (err, content) {
//         if (err) {
//             onError(err);
//             return;
//         }
//         return content;
//     });

//     let result = {};

//     let filenames = await getFilenames();

//     for (filename of filenames) {
//         let fileContent = await getFileContent(filename);
//         result[filename] = {
//             source: fileContent,
//             isFramework: false
//         }
//     }

//     console.log('result', result);

//     return result;
// }

// function onError(err) {
//     throw err;
// }

// let projectFiles;

// (async function () {
//     try {
//         projectFiles = await readFiles(process.cwd() + '/', onError);
//     } catch (err) {
//         console.log('error', err);
//     }
// })();

// console.log('projectFiles', projectFiles);





// =================================================================
// =================================================================


// var fs = require('fs');

// var htmlContent = `
// <html>
//     <head></head>
//     <body>
//         <script>
//             function getExampleFiles() {
//                 let exampleFiles = {
//                     'index.html': {
//                         source: 'hello world',
//                         // source: indexSource,
//                         isFramework: false,
//                     },
//                     'main.js': {
//                         source: 'goodbye world',
//                         // source: mainSource,
//                         isFramework: false,
//                     },
//                 };
//                 return new Promise((resolve, reject) => {
//                     resolve(exampleFiles);
//                 });
//             }


//             function submitForm() {
//                 const title = 'Range selection test';

//                 getExampleFiles().then((files) => {
//                     console.log('exampleFiles', files);
//                     const form = document.createElement('form');
//                     form.method = 'post';
//                     form.style.display = 'none';
//                     form.action = 'https://plnkr.co/edit/?p=preview';
//                     // form.target = '_blank';

//                     const addHiddenInput = (name, value) => {
//                         const input = document.createElement('input');
//                         input.type = 'hidden';
//                         input.name = name;
//                         input.value = value;

//                         form.appendChild(input);
//                     };

//                     addHiddenInput('tags[0]', 'ag-grid');
//                     addHiddenInput('tags[1]', 'example');
//                     addHiddenInput('private', true);
//                     addHiddenInput('description', title);

//                     Object.keys(files).forEach((key) => {
//                         addHiddenInput(\`files[\${key}]\`, files[key].source);
//                     });

//                     document.body.appendChild(form);
//                     console.log('submitting form', form);
//                     // debugger;
//                     form.submit();
//                     document.body.removeChild(form);
//                 });
//             };

//             submitForm()

//         </script>
//     </body>
// </html>`

// fs.writeFile('my-page.html', htmlContent, (error) => { /* handle error */ });

// // create server to open up the created file
// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     fs.createReadStream('my-page.html').pipe(res)
// })
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`launched a server at port ${PORT}`);
// })

// // open browser
// var url = 'http://localhost:3000';
// var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
// require('child_process').exec(start + ' ' + url);

// // close server
// // server.close(function () { console.log('Server closed!'); });
// // server.emit('close')

// // delete the created file
// // fs.unlink('my-page.html', htmlContent, (error) => { /* handle error */ });
// setTimeout(() => {
//     const path = './my-page.html';
//     try {
//         fs.unlinkSync(path)
//         //file removed
//     } catch (err) {
//         console.error(err)
//     }
// }, 2000);


// =================================================================
// =================================================================
// =================================================================
// =================================================================


const fsPromise = require("fs").promises;

async function readFiles(dirname, onError) {

    let getFilenames = () => fsPromise.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        return filenames;
    });

    let getFileContent = (filename) => fsPromise.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
            onError(err);
            return;
        }
        return content;
    });

    let result = {};

    let filenames = await getFilenames();

    for (filename of filenames) {
        let fileContent = await getFileContent(filename);
        result[filename] = {
            source: fileContent,
            isFramework: false
        }
    }

    return result;
}

let projectFiles;

function onError(err) {
    throw err;
}

(async function () {
    try {
        projectFiles = await readFiles(process.cwd() + '/', onError);

        let escapedProjectFiles = JSON.stringify(projectFiles).replace(/[\\\/$'"]/g, "\\$&");

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

            // function getExampleFiles() {
            //     let exampleFiles = {
            //         'index.html': {
            //             source: 'hello world',
            //             // source: indexSource,
            //             isFramework: false,
            //         },
            //         'main.js': {
            //             source: 'goodbye world',
            //             // source: mainSource,
            //             isFramework: false,
            //         },
            //     };
            //     return new Promise((resolve, reject) => {
            //         resolve(exampleFiles);
            //     });
            // }


            function submitForm() {
                const title = 'Range selection test';

                getExampleFiles().then((files) => {
                    console.log('exampleFiles', files);
                    files = JSON.parse(files);
                    debugger;
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
                    // debugger;
                    form.submit();
                    document.body.removeChild(form);
                })
                .catch(err => console.log(err));
            };

            setTimeout(() => {
                submitForm()
            },5000)

        </script>
    </body>
</html>`

        const fs = require("fs");

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

