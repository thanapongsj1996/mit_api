var target = document.querySelector('.board-demo')
var count = 0
var added = 0
var country = [];
var product_summary = []
target.innerHTML =
    `
        <a href='javascript:boardDemoRefresh()'>Refresh</a>
        <div class='list'></div>
    `

function boardDemoRefresh() {
    var list = document.querySelector('.board-demo .list')
    list.innerHTML = ''

    var d = 0
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
            }
            // console.log(product_summary)
        })
        .then(() => {
            // create an array contain country data
            fetch('https://atlas.media.mit.edu/attr/country/')
                .then(result => result.json())
                .then(result => {
                    country = result.data
                    console.log(country.length)
                })
                .then(() => {
                    //check the exports of every country (test Thailand first) 
                    for (var i in country) {
                        if (country[i].display_id == 'tha') {
                            var current_num = i
                            fetch(`https://atlas.media.mit.edu/hs92/export/2010/${country[current_num].display_id}/all/show/`)
                                .then(result => result.json())
                                .then(result => {
                                    // for every results save to export in each product 
                                    console.log('data length', result.data.length)
                                    for (var j in result.data) {

                                        for (var k in product_summary) {
                                            // hs92_id is product id

                                            if (result.data[j].hs92_id == product_summary[k].id) {

                                                product_summary[k].export.push({
                                                    country_name: country[current_num].name,
                                                    value: result.data[j].export_val
                                                })
                                                d++
                                                console.log('add success : ', d)
                                                console.log(product_summary[k])
                                                break
                                            }
                                        }
                                    }
                                })
                                .catch(function(error) {
                                    alert(error)
                                });
                        }
                    }
                })
                .catch(function(error) {
                    alert(error)
                });
        })
        .catch(function(error) {
            alert(error)
        });
}