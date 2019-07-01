var target = document.querySelector('.board-all')
var allToAll = []
var productSummary = []
var count = 0
target.innerHTML =
    `
        <a href='javascript:boardDemoRefresh()'>all</a>
        <div class='list'></div>
    `
var finish = 0
getAll()
getProduct()

function getAll() {
    fetch('https://atlas.media.mit.edu/hs92/export/2010/all/all/show/')
        .then(async result => {
            var r = await result.json();
            r.type = 'all';
            return r;
        })
        .then(saveData)
}

function getProduct() {
    fetch('https://atlas.media.mit.edu/attr/hs92/')
        .then(async product => {
            var r = await product.json();
            r.type = 'product';
            return r;
        })
        .then(saveData)
}

function saveData(result) {
    if (result.type == 'all') {
        allToAll = result.data
        console.log(result.data)
        finish++
    }
    if (result.type == 'product') {
        productSummary = result.data
        console.log(result.data)
        finish++
    }
    if (finish == 2) {
        mapCountry()
    }
}

function mapCountry() {
    var index = {}
    for (var j in productSummary) {
        index[productSummary[j].name] = j
    }
    for (var i in allToAll) {
        var pos = index[allToAll[i].name]
        if (pos != null) {
            allToAll[i].name = 0
        }
    }
}

function getLastArray() {
    for (var i in allToAll) {
        console.log('i:', i)
        for (var j in productSummary) {
            console.log('j:', j)
            if (allToAll[i].hs92_id && productSummary[j].id && allToAll[i].hs92_id == productSummary[j].id) {
                allToAll[i].name = productSummary[j].name
                allToAll[i].keywords = productSummary[j].keywords
                console.log('count: ', count)
                count++
            }
        }
    }
}