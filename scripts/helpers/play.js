// // step 1) read files 

// const fs = require("fs");

// async function readFiles(dirname, onFileContent, onError) {

//     let promiseArr = [];

//     await fs.readdir(dirname, async function (err, filenames) {
//         if (err) {
//             onError(err);
//             return;
//         }
//         filenames.forEach(async function (filename) {
//             await fs.readFile(dirname + filename, 'utf-8', async function (err, content) {
//                 if (err) {
//                     onError(err);
//                     return;
//                 }
//                 let promise = new Promise((resolve, reject) => {
//                     onFileContent(filename, content, resolve);
//                 });
//                 promiseArr.push(promise);
//             });
//         });
//     });

//     return Promise.all(promiseArr)
// }


// function getPostData() {
//     let result = {};
//     console.log('getPostData start', result);

//     function onFileContent(filename, content, resolve) {
//         result[filename] = {
//             source: content,
//             isFramework: false
//         };
//         resolve(results);
//     }

//     function onError(err) {
//         throw err;
//     }

//     readFiles(process.cwd() + '/', onFileContent, onError)
//         .then(res => console.log('result', res));


//     // console.log('result before returning', result);
//     // console.log('getPostData end', result);
//     // return result;
// }

// let data = getPostData();



// =================================================================
// =================================================================


var fs = require('fs');

var htmlContent = `
<html>
    <head></head>
    <body>
        <script>
            function getExampleFiles() {
                let exampleFiles = {
                    'index.html': {
                        source: 'hello world',
                        // source: indexSource,
                        isFramework: false,
                    },
                    'main.js': {
                        source: 'goodbye world',
                        // source: mainSource,
                        isFramework: false,
                    },
                };
                return new Promise((resolve, reject) => {
                    resolve(exampleFiles);
                });
            }


            function submitForm() {
                const title = 'Range selection test';

                getExampleFiles().then((files) => {
                    console.log('exampleFiles', files);
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
                });
            };

            submitForm()

        </script>
    </body>
</html>`

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

// const open = require('open');

// open('https://localhost:3000')

// ************************************************************************
// ************************************************************************
// open it with a server, and serve the files and then close the server straight away
// ************************************************************************
// ************************************************************************







// let http = require('http');

// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     response.write('Hi There!');
//     response.end();
// };

// http.createServer(handleRequest).listen(8000);






// var http = require('http');
// http.createServer(function (req, res) {
//     res.write('<html><head></head><body>');
//     res.write('<p>Write your HTML content here</p>');
//     res.write(`<script>
//     function getExampleFiles() {
//         let exampleFiles = {
//             'index.html': {
//                 source: 'hello world',
//                 // source: indexSource,
//                 isFramework: false,
//             },
//             'main.js': {
//                 source: 'goodbye world',
//                 // source: mainSource,
//                 isFramework: false,
//             },
//         };

//         return new Promise((resolve, reject) => {
//             resolve(exampleFiles);
//         });
//     }


//     function submitForm() {
//         const title = 'Range selection test';

//         getExampleFiles().then((files) => {
//             console.log('exampleFiles', files);
//             const form = document.createElement('form');
//             form.method = 'post';
//             form.style.display = 'none';
//             form.action = 'https://plnkr.co/edit/?p=preview';
//             // form.target = '_blank';

//             const addHiddenInput = (name, value) => {
//                 const input = document.createElement('input');
//                 input.type = 'hidden';
//                 input.name = name;
//                 input.value = value;

//                 form.appendChild(input);
//             };

//             addHiddenInput('tags[0]', 'ag-grid');
//             addHiddenInput('tags[1]', 'example');
//             addHiddenInput('private', true);
//             addHiddenInput('description', title);

//             Object.keys(files).forEach((key) => {
//                 addHiddenInput(\`files[\${key}]\`, files[key].source);
//             });

//             document.body.appendChild(form);
//             console.log('submitting form', form);
//             // debugger;
//             form.submit();
//             document.body.removeChild(form);
//         });
//     };

//     submitForm()

//     </script>`);
//     res.end('</body></html>');
// }).listen(1337);









































// console.log(123, __dirname);
// console.log(456, process.cwd());


// ***********************************
// testing promises

// let promiseArr = [];

// for (let i = 0; i < 5; i++) {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(i);
//         }, i * 1000);
//     })
//     promiseArr.push(promise)
// }

// Promise.all(promiseArr)
//     .then(result => {
//         console.log('result is', result);
//     })
//     .catch(err => {
//         console.log(err)
//     });


// ***********************************



// ***********************************
// step 2) post request

// const https = require('https')

// let data = JSON.stringify({
//     "index.html": { isFramework: false, source: 'Hello World!' },
//     "tags[0]": "ag-grid",
//     "tags[1]": "example",
//     "private": true,
//     "description": "test",
//     "files[index.html]": 'Hello World!',
//     "files[main.js]": "console.log('Laow G!')"
// });

// const options = {
//     // hostname: 'http://plnkr.co/edit/?p=preview',
//     hostname: 'plnkr.co',
//     //   port: 443,
//     path: 'edit/?p=preview',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': data.length
//     }
// }

// const req = https.request(options, res => {
//     console.log(`statusCode: ${ res.statusCode }`)

//     res.on('data', d => {
//         process.stdout.write(d)
//     })
// })

// req.on('error', error => {
//     console.error(error)
// })

// // req.write(JSON.stringify(data))
// req.write(data);
// req.end()




// ***********************************


// function getExampleFiles() {
//     let exampleFiles = {
//         'index.html': {
//             // source: 'hello world',
//             source: indexSource,
//             isFramework: false,
//         },
//         'main.js': {
//             // source: 'goodbye world',
//             source: mainSource,
//             isFramework: false,
//         },
//     };

//     return new Promise((resolve, reject) => {
//         resolve(exampleFiles);
//     });
// }


// (function createPlunker() {
//     const title = 'Range selection test';

//     getExampleFiles().then((files) => {
//         console.log('exampleFiles', files);
//         const form = document.createElement('form');
//         form.method = 'post';
//         form.style.display = 'none';
//         form.action = 'http://plnkr.co/edit/?p=preview';
//         // form.target = '_blank';

//         const addHiddenInput = (name, value) => {
//             const input = document.createElement('input');
//             input.type = 'hidden';
//             input.name = name;
//             input.value = value;

//             form.appendChild(input);
//         };

//         addHiddenInput('tags[0]', 'ag-grid');
//         addHiddenInput('tags[1]', 'example');
//         addHiddenInput('private', true);
//         addHiddenInput('description', title);

//         Object.keys(files).forEach((key) => {
//             addHiddenInput(`files[${ key }]`, files[key].source);
//         });

//         document.body.appendChild(form);
//         console.log('form', form);
//         form.submit();
//         document.body.removeChild(form);
//     });
// })()

//     (function getallfiles() {
//         // fetch('./create-plunker.html')
//         //     .then(res => res.text())
//         //     .then(text => console.log('text', text))
//         //     .catch(err => {
//         //         console.log(err);
//         //     })


//         fetch('./create-plunker.html').then(function (response) {
//             // The API call was successful!
//             return response.text();
//         }).then(function (html) {
//             console.log('html', html)
//             // Convert the HTML string into a document object
//             var parser = new DOMParser();
//             var doc = parser.parseFromString(html, 'text/html');
//             console.log('doc', doc)

//         }).catch(function (err) {
//             // There was an error
//             console.warn('Something went wrong.', err);
//         });
//     })()