

// fetch('https://api.chucknorris.io/jokes/random')
//     .then(res => res.json())
//     .then(joke => console.log(joke));


// debugger;
// function sendFetch() {

//     fetch("https://plnkr.co/edit/?p=preview", {
//         "headers": {
//             "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//             "accept-language": "en-GB,en;q=0.9,ar-AE;q=0.8,ar;q=0.7,en-US;q=0.6",
//             "cache-control": "max-age=0",
//             "content-type": "application/x-www-form-urlencoded",
//             "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "document",
//             "sec-fetch-mode": "navigate",
//             "sec-fetch-site": "cross-site",
//             "sec-fetch-user": "?1",
//             "upgrade-insecure-requests": "1"
//         },

//         "body": "tags%5B0%5D=ag-grid&tags%5B1%5D=example&private=true&description=Single+Row+Selection&files%5Bmain.js%5D=var+gridOptions+%3D+%7B%0D%0A++++columnDefs%3A+%5B%0D%0A++++++++%7B+field%3A+%22athlete%22%2C+minWidth%3A+150+%7D%2C%0D%0A++++++++%7B+field%3A+%22age%22%2C+maxWidth%3A+90+%7D%2C%0D%0A++++++++%7B+field%3A+%22country%22%2C+minWidth%3A+150+%7D%2C%0D%0A++++++++%7B+field%3A+%22year%22%2C+maxWidth%3A+90+%7D%2C%0D%0A++++++++%7B+field%3A+%22date%22%2C+minWidth%3A+150+%7D%2C%0D%0A++++++++%7B+field%3A+%22sport%22%2C+minWidth%3A+150+%7D%2C%0D%0A++++++++%7B+field%3A+%22gold%22+%7D%2C%0D%0A++++++++%7B+field%3A+%22silver%22+%7D%2C%0D%0A++++++++%7B+field%3A+%22bronze%22+%7D%2C%0D%0A++++++++%7B+field%3A+%22total%22+%7D%0D%0A++++%5D%2C%0D%0A++++defaultColDef%3A+%7B%0D%0A++++++++flex%3A+1%2C%0D%0A++++++++minWidth%3A+100%2C%0D%0A++++%7D%2C%0D%0A++++rowSelection%3A+%27single%27%2C%0D%0A++++onSelectionChanged%3A+onSelectionChanged%0D%0A%7D%3B%0D%0A%0D%0Afunction+onSelectionChanged%28%29+%7B%0D%0A++++var+selectedRows+%3D+gridOptions.api.getSelectedRows%28%29%3B%0D%0A++++document.querySelector%28%27%23selectedRows%27%29.innerHTML+%3D+selectedRows.length+%3D%3D%3D+1+%3F+selectedRows%5B0%5D.athlete+%3A+%27%27%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+setup+the+grid+after+the+page+has+finished+loading%0D%0Adocument.addEventListener%28%27DOMContentLoaded%27%2C+function%28%29+%7B%0D%0A++++var+gridDiv+%3D+document.querySelector%28%27%23myGrid%27%29%3B%0D%0A++++new+agGrid.Grid%28gridDiv%2C+gridOptions%29%3B%0D%0A%0D%0A++++agGrid.simpleHttpRequest%28%7B+url%3A+%27https%3A%2F%2Fwww.ag-grid.com%2Fexample-assets%2Folympic-winners.json%27+%7D%29%0D%0A++++++++.then%28function%28data%29+%7B%0D%0A++++++++++++gridOptions.api.setRowData%28data%29%3B%0D%0A++++++++%7D%29%3B%0D%0A%7D%29%3B%0D%0A&files%5Bstyles.css%5D=.example-wrapper+%7B%0D%0A++++display%3A+flex%3B%0D%0A++++flex-direction%3A+column%3B%0D%0A++++height%3A+100%25%3B%0D%0A%7D%0D%0A%0D%0A%23myGrid+%7B%0D%0A++++flex%3A+1+1+0px%3B%0D%0A++++width%3A+100%25%3B%0D%0A%7D%0D%0A%0D%0A.example-header+%7B%0D%0A++++font-family%3A+Verdana%2C+Geneva%2C+Tahoma%2C+sans-serif%3B%0D%0A++++font-size%3A+13px%3B%0D%0A++++margin-bottom%3A+5px%3B%0D%0A%7D%0D%0A&files%5Bindex.html%5D=%3C%21DOCTYPE+html%3E%0D%0A%3Chtml+lang%3D%22en%22%3E%0D%0A%09%3Chead%3E%0D%0A%09%09%3Ctitle%3EJavaScript+example%3C%2Ftitle%3E%0D%0A%09%09%3Cmeta+charSet%3D%22UTF-8%22%2F%3E%0D%0A%09%09%3Cmeta+name%3D%22viewport%22+content%3D%22width%3Ddevice-width%2C+initial-scale%3D1%22%2F%3E%0D%0A%09%09%3Cmeta+http-equiv%3D%22last-modified%22+content%3D%22Wed+Nov+17+2021+15%3A17%3A42+GMT%2B0000+%28Greenwich+Mean+Time%29%22%2F%3E%0D%0A%09%09%3Cstyle+media%3D%22only+screen%22%3E%0D%0A++++++++++++html%2C+body+%7B%0D%0A++++++++++++++++height%3A+100%25%3B%0D%0A++++++++++++++++width%3A+100%25%3B%0D%0A++++++++++++++++margin%3A+0%3B%0D%0A++++++++++++++++box-sizing%3A+border-box%3B%0D%0A++++++++++++++++-webkit-overflow-scrolling%3A+touch%3B%0D%0A++++++++++++%7D%0D%0A%0D%0A++++++++++++html+%7B%0D%0A++++++++++++++++position%3A+absolute%3B%0D%0A++++++++++++++++top%3A+0%3B%0D%0A++++++++++++++++left%3A+0%3B%0D%0A++++++++++++++++padding%3A+0%3B%0D%0A++++++++++++++++overflow%3A+auto%3B%0D%0A++++++++++++%7D%0D%0A%0D%0A++++++++++++body+%7B%0D%0A++++++++++++++++padding%3A+1rem%3B%0D%0A++++++++++++++++overflow%3A+auto%3B%0D%0A++++++++++++%7D%0D%0A++++++++%3C%2Fstyle%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-grid.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-alpine-dark.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-alpine.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-balham-dark.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-balham.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-material.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-fresh.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-dark.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-blue.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fstyles%2Fag-theme-bootstrap.css%22%2F%3E%0D%0A%09%09%3Clink+rel%3D%22stylesheet%22+href%3D%22styles.css%3Ft%3D1637162262803.3691%22%2F%3E%0D%0A%09%3C%2Fhead%3E%0D%0A%09%3Cbody%3E%0D%0A%09%09%3Cdiv+class%3D%22example-wrapper%22%3E%0D%0A%09%09%09%3Cdiv+class%3D%22example-header%22%3E%0D%0A++++++++Selection%3A%0D%0A++++++++%3Cspan+id%3D%22selectedRows%22%3E%0D%0A%09%09%3C%2Fspan%3E%0D%0A%09%3C%2Fdiv%3E%0D%0A%09%3Cdiv+id%3D%22myGrid%22+class%3D%22ag-theme-alpine%22+style%3D%22height%3A+100%25%3B%22%3E%0D%0A%09%3C%2Fdiv%3E%0D%0A%3C%2Fdiv%3E%0D%0A%3Cscript%3Evar+__basePath+%3D+%27.%2F%27%3B%3C%2Fscript%3E%0D%0A%3Cscript+src%3D%22%2F%2Flocalhost%3A8080%2Fdev%2F%40ag-grid-community%2Fall-modules%2Fdist%2Fag-grid-community.js%22%3E%0D%0A%3C%2Fscript%3E%0D%0A%3Cscript+src%3D%22main.js%3Ft%3D1637162262803.3691%22%3E%0D%0A%3C%2Fscript%3E%0D%0A%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E",
//         "method": "POST",
//         "mode": "cors",
//         "credentials": "include"
//     });



// }






// // import { argv } from 'process';

// // // print process.argv
// // argv.forEach((val, index) => {
// //     console.log(`${index}: ${val}`);
// // });


// let indexSource = `<!DOCTYPE html>
// <html lang="en">
// 	<head>
// 		<title>JavaScript example</title>
// 		<meta charSet="UTF-8"/>
// 		<meta name="viewport" content="width=device-width, initial-scale=1"/>
// 		<meta http-equiv="last-modified" content="Mon Oct 18 2021 16:27:20 GMT+0100 (British Summer Time)"/>
// 		<style media="only screen">
//             html, body {
//                 height: 100%;
//                 width: 100%;
//                 margin: 0;
//                 box-sizing: border-box;
//                 -webkit-overflow-scrolling: touch;
//             }

//             html {
//                 position: absolute;
//                 top: 0;
//                 left: 0;
//                 padding: 0;
//                 overflow: auto;
//             }

//             body {
//                 padding: 1rem;
//                 overflow: auto;
//             }
//         </style>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-grid.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-material.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-fresh.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-dark.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css"/>
// 		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-bootstrap.css"/>
// 	</head>
// 	<body>
// 		<div id="myGrid" class="ag-theme-alpine" style="height: 100%;">
// 		</div>
// 		<script>var __basePath = './';</script>
// 		<script src="//localhost:8080/dev/@ag-grid-enterprise/all-modules/dist/ag-grid-enterprise.js">
// 		</script>
// 		<script src="main.js?t=1634570840665.94">
// 		</script>
// 	</body>
// </html>`;

// let mainSource = `var gridOptions = {
//     columnDefs: [
//         { field: "athlete", minWidth: 150 },
//         { field: "age", maxWidth: 90 },
//         { field: "country", minWidth: 150 },
//         { field: "year", maxWidth: 90 },
//         { field: "date", minWidth: 150 },
//         { field: "sport", minWidth: 150 },
//         { field: "gold" },
//         { field: "silver" },
//         { field: "bronze" },
//         { field: "total" }
//     ],
//     defaultColDef: {
//         flex: 1,
//         minWidth: 100,
//     },
//     enableRangeSelection: true
// };

// // setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', function() {
//     var gridDiv = document.querySelector('#myGrid');
//     new agGrid.Grid(gridDiv, gridOptions);

//     agGrid.simpleHttpRequest({ url: 'https://www.ag-grid.com/example-assets/olympic-winners.json' })
//         .then(function(data) {
//             gridOptions.api.setRowData(data);
//         });
// });
// `;

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
            addHiddenInput(`files[${key}]`, files[key].source);
        });

        document.body.appendChild(form);
        console.log('submitting form', form);
        // debugger;
        form.submit();
        document.body.removeChild(form);
    });
};

// (function getallfiles() {
//     // fetch('./create-plunker.html')
//     //     .then(res => res.text())
//     //     .then(text => console.log('text', text))
//     //     .catch(err => {
//     //         console.log(err);
//     //     })


//     fetch('./create-plunker.html').then(function (response) {
//         // The API call was successful!
//         return response.text();
//     }).then(function (html) {
//         console.log('html', html)
//         // Convert the HTML string into a document object
//         var parser = new DOMParser();
//         var doc = parser.parseFromString(html, 'text/html');
//         console.log('doc', doc)

//     }).catch(function (err) {
//         // There was an error
//         console.warn('Something went wrong.', err);
//     });
// })()