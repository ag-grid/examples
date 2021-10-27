// import { argv } from 'process';

// // print process.argv
// argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });


let indexSource = `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>JavaScript example</title>
		<meta charSet="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<meta http-equiv="last-modified" content="Mon Oct 18 2021 16:27:20 GMT+0100 (British Summer Time)"/>
		<style media="only screen">
            html, body {
                height: 100%;
                width: 100%;
                margin: 0;
                box-sizing: border-box;
                -webkit-overflow-scrolling: touch;
            }

            html {
                position: absolute;
                top: 0;
                left: 0;
                padding: 0;
                overflow: auto;
            }

            body {
                padding: 1rem;
                overflow: auto;
            }
        </style>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-grid.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-material.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-fresh.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-dark.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css"/>
		<link rel="stylesheet" href="//localhost:8080/dev/@ag-grid-community/all-modules/dist/styles/ag-theme-bootstrap.css"/>
	</head>
	<body>
		<div id="myGrid" class="ag-theme-alpine" style="height: 100%;">
		</div>
		<script>var __basePath = './';</script>
		<script src="//localhost:8080/dev/@ag-grid-enterprise/all-modules/dist/ag-grid-enterprise.js">
		</script>
		<script src="main.js?t=1634570840665.94">
		</script>
	</body>
</html>`;

let mainSource = `var gridOptions = {
    columnDefs: [
        { field: "athlete", minWidth: 150 },
        { field: "age", maxWidth: 90 },
        { field: "country", minWidth: 150 },
        { field: "year", maxWidth: 90 },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" }
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
    enableRangeSelection: true
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    agGrid.simpleHttpRequest({ url: 'https://www.ag-grid.com/example-assets/olympic-winners.json' })
        .then(function(data) {
            gridOptions.api.setRowData(data);
        });
});
`;

function getExampleFiles() {
    let exampleFiles = {
        'index.html': {
            // source: 'hello world',
            source: indexSource,
            isFramework: false,
        },
        'main.js': {
            // source: 'goodbye world',
            source: mainSource,
            isFramework: false,
        },
    };

    return new Promise((resolve, reject) => {
        resolve(exampleFiles);
    });
}


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
//             addHiddenInput(`files[${key}]`, files[key].source);
//         });

//         document.body.appendChild(form);
//         console.log('form', form);
//         form.submit();
//         document.body.removeChild(form);
//     });
// })()

(function getallfiles() {
    // fetch('./create-plunker.html')
    //     .then(res => res.text())
    //     .then(text => console.log('text', text))
    //     .catch(err => {
    //         console.log(err);
    //     })


    fetch('./create-plunker.html').then(function (response) {
        // The API call was successful!
        return response.text();
    }).then(function (html) {
        console.log('html', html)
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        console.log('doc', doc)

    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
})()