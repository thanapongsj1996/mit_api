var target = document.querySelector('.board-code')
var allToAll = []
var productData = []


getAll()
getProduct()


function getAll() {
    fetch('https://atlas.media.mit.edu/hs92/export/2010/all/all/show/')
        .then(result => result.json())
        .then(result => {
            allToAll = result.data
            console.log('allToAll: ', result.data)
        })
        .then(() => {
            target.innerHTML =
                `
                    <input name='product-name'>
                    <button onclick='showResult()'>Search</button>
                    <p>Example : Rubber Pipes, Stainless Steel Wire, Building Stone</p>
                    <table class='result' style="width:80%">
                        <tr>
                            <th colspan="2">Import</th>
                            <th colspan="2">Export</th>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <th>Value</th>
                            <th>Country</th>
                            <th>Value</th>
                        </tr>
                    </table>
                    <style>
                        table, th {
                            border: 3px solid black;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 15px;
                        }
                        td {
                            border: 1px solid black;
                        }
                    </style>
                `
        })
        .catch(err => {
            console.log(err)
        })
}

function getProduct() {
    fetch('https://atlas.media.mit.edu/attr/hs92/')
        .then(product => product.json())
        .then(product => {
            productData = product.data
            console.log('productData: ', product.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function getProductCode(productName) {
    for (var i in productData) {
        if (productData[i].name == productName) {
            console.log('productCode: ', productData[i].id)
            var productCode = productData[i].id
            return productCode
        }
    }
}

function getProductCountry(productCode) {
    for (var i in allToAll) {
        if (allToAll[i].hs92_id == productCode) {
            console.log('Top export: ', allToAll[i].top_exporter)
            console.log('Top import: ', allToAll[i].top_importer)
            var topImport = allToAll[i].top_importer
            var topImportValue = allToAll[i].import_val
            var topExport = allToAll[i].top_exporter
            var topExportValue = allToAll[i].export_val
            return { topExport, topImport, topExportValue, topImportValue }
        }
    }
}

function showResult() {
    var input = document.querySelector('.board-code [name=product-name]')
    var productCode = getProductCode(input.value)
    var { topExport, topImport, topExportValue, topImportValue } = getProductCountry(productCode)
    var add = document.querySelector('.result')
    add.insertAdjacentHTML("beforeend",
        `
            <tr><td>${topImport}</td><td>${topImportValue}</td><td>${topExport}</td><td>${topExportValue}</td></tr>
        `
    );

}