var CdataINR=require('../Data/CSV/CsubINR.json')
var CdataUSD=require('../Data/CSV/CsubUSD.json')
var GdataINR=require('../Data/GRES/GsubINR.json')
var GdataUSD=require('../Data/GRES/GsubUSD.json')

var sknames = [
    "G Suite Basic",
    "Google Workspace Business Plus",
    "Google Workspace Business Standard",
    "Google Workspace Business Starter",
    "Google Workspace Enterprise Plus",
    "Google Workspace Enterprise Standard",
]

function findMisMatch(c,g){
for(var i=0;i<c.length;i++){
    for(var j=0;j<g.length;j++){
console.log(c[i].licensedNumberOfSeats+" "+g[j].seats.licensedNumberOfSeats)
    }
}
}

function tonumber(g) {
    var data=[];
    var number = g.map(function (item) {
        data.push(parseInt(item.seats.licensedNumberOfSeats))
        data.push(item.customerId)
    })
  const fs =require('fs');
    fs.writeFileSync('nG.json',JSON.stringify(data));
}

function Total(CdataINR) {
    console.log(CdataINR.length)
    var total = CdataINR.filter(function (item) {
        return sknames.includes(item.skuName);
    })
    let sort = total.sort((a, b) => a.customerId.localeCompare(b.customerId));
    const fs = require('fs');
    fs.writeFileSync('../Data/CSV/CTotalActINR.json', JSON.stringify(sort));
    console.log("Total: " + total.length);
}

function FilterId(Gdata, Cdata) {
    return new Promise(function (resolve) {
        const IDS = {
            GID: [],
            CID: [],
        };
        const filter = async (Gdata, Cdata) => {
            for (var i = 0; i < Gdata.length; i++) {
                var customerId = Gdata[i].customerId
                IDS.GID.push(customerId)
            }
            for (var i = 0; i < Cdata.length; i++) {
                var customerId = Cdata[i].customerId
                IDS.CID.push(customerId)
            }
            const result = await Compare(IDS);
            resolve(result);
        }
        filter(Gdata, Cdata);
    })

}

Compare = (IDS) => {
    var result = IDS.GID.filter(function (item) {
        return !IDS.CID.includes(item)
    })
    const fs = require('fs');
    fs.writeFileSync('../Data/mismatchId.json', JSON.stringify(result));
    console.log("Difrence: " + result.length);
}

function Filter(Gdata) {
    var filter = Gdata.filter(function (item) {
        return item.skuName == "Google Workspace Business Starter"
    })
    console.log(filter.length)
    const fs = require('fs');
    fs.writeFileSync('G.json', JSON.stringify(filter));
}

function FilterGRes(TotalGRes) {
    var filter = TotalGRes.filter(function (item) {
        return item.skuName == "G Suite Basic"
    })
    console.log(filter.length)
    const fs = require('fs');
    fs.writeFileSync('../Data/GSuiteBasicGrs.json', JSON.stringify(filter));


}

function getActiveUser(data) {
    var aciveUser = data.filter(function (item) {
        return item.status == "ACTIVE";
    })
    const fs = require('fs');
    fs.writeFile('../Data/ActAcGres.json', JSON.stringify(aciveUser, null, 4), (err) => {
        if (err) {
            throw err;
        }
    });
    console.log("Total Acive Users: " + aciveUser.length);
}


// findMisMatch(c,g)
// Compare()
// FilterId(Gdata, Cdata)
// Filter(Gdata);
// FilterGRes(TotalGRes);
// Total(CdataINR);
// getActiveUser(data);
// tonumber(g)
