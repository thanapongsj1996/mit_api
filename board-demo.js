var target = document.querySelector('.board-demo')
var countExport = 0
var countImport = 0
var exportAdded = 0
var importAdded = 0
var country = [];
var product_summary = []
var exportData = []
var importData = []
target.innerHTML =
    `
        <a href='javascript:boardDemoRefresh()'>Refresh</a>
        <div class='list'></div>
    `
    // getCountryAndData()
    // getProduct()
    // getAll()

function boardDemoRefresh() {
    var list = document.querySelector('.board-demo .list')
    list.innerHTML = ''
}


function getAll() {
    fetch('https://atlas.media.mit.edu/hs92/export/2010/all/all/show/')
        .then(result => result.json())
        .then(result => {
            allToAll = result.data
            console.log(allToAll)

        })
}

function getCountryAndData() {
    fetch('https://atlas.media.mit.edu/attr/country/')
        .then(result => result.json())
        .then(result => {
            country = result.data
            console.log(country)
            getDataExport()
            getDataImport()
        })
        .then(

        )
}

function getProduct() {
    fetch('https://atlas.media.mit.edu/attr/hs92/')
        .then(product => product.json())
        .then(product => {
            for (var h in product.data) {
                // create an array of objects contain product data
                product_summary.push({
                    name: product.data[h].name,
                    id: product.data[h].id,
                    display_id: product.data[h].display_id,
                    keywords: product.data[h].keywords,
                    import: [],
                    export: []
                })
                console.log(product_summary)
            }
        })
}

function getDataExport() {
    if (country.length == 0) return console.log('0 country')
    for (var i in country) {
        if (country[i].display_id) {
            console.log('countExport: ', countExport)
            countExport++
            fetch(`https://atlas.media.mit.edu/hs92/export/2010/${country[i].display_id}/all/show/`)
                .then(result => result.json())
                .then(result => addExport(result.data))
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
}

function getDataImport() {
    if (country.length == 0) return console.log('0 country')
    for (var i in country) {
        if (country[i].display_id) {
            console.log('countImport: ', countImport)
            countImport++
            fetch(`https://atlas.media.mit.edu/hs92/import/2010/${country[i].display_id}/all/show/`)
                .then(result => result.json())
                .then(result => addImport(result.data))
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
}

function addExport(d) {
    exportData[exportAdded] = d
    console.log('exportAdded : ', exportAdded)
    exportAdded++
    if (exportAdded == countExport) {
        console.log('export finished!')
        console.log('exportData: ', exportData)
        console.log('exportData length: ', exportData.length)
    }
}

function addImport(d) {
    importData[importAdded] = d
    console.log('importAdded : ', importAdded)
    importAdded++
    if (importAdded == countImport) {
        console.log('import finished!')
        console.log('importData: ', importData)
        console.log('importData length: ', importData.length)
    }
}

function addToProductSum() {
    //     for (var j in result.data) {

    //         for (var k in product_summary) {
    //             // hs92_id is product id

    //             if (result.data[j].hs92_id == product_summary[k].id) {

    //                 product_summary[k].export.push({
    //                     country_name: country[i].name,
    //                     value: result.data[j].export_val
    //                 })
    //                 d++
    //                 console.log('add success : ', d)
    //                 console.log(product_summary[k])
    //                 break
    //             }
    //         }
    //     }
}