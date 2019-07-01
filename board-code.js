var target = document.querySelector('.board-code')
var allToAll = []
var isFinish = false
var topExport = ''
target.innerHTML =
    ` 
        <input name='product-code'>
        <button onclick='showResult()'>Search</button>
    `


//getAll()

function getAll() {
    fetch('https://atlas.media.mit.edu/hs92/export/2010/all/all/show/')
        .then(result => result.json())
        .then(result => {
            allToAll = result.data
            console.log(result.data)
        })
        .then(() => {
            isFinish = true
        })
        .then(() => {
            if (isFinish) {
                console.log('ok')
            }
        })
}

function getInfomation(productCode) {
    for (var i in allToAll) {
        if (allToAll[i].hs92_id == productCode) {
            console.log('Top export: ', allToAll[i].top_exporter)
            console.log('Top import: ', allToAll[i].top_importer)
            topExport = allToAll[i].top_exporter
            topImport = allToAll[i].top_importer
            show()
        }
    }
}

function showResult() {
    var input = document.querySelector('.board-code [name=product-code]')
    getInfomation(input.value)
}

function show() {
    document.querySelector('.board-code').innerHTML += `
    Top export ${topExport}  Top import ${topImport}
    `

}