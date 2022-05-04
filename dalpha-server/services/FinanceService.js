module.exports.returnonequity = document => {
    const netincome = document.reports.attributes.netincomeloss ?? [];
    const shareholderequity = document.reports.attributes.stockholdersequity ?? [];
    
    let data = {};
    netincome.forEach(d => {
        const year = (new Date(d.to)).getFullYear()
        data[year] = { ...data[year], netincome: d.value }
    })
    
    shareholderequity.forEach(d => {
        const year = new Date(d.date).getFullYear()
        data[year] = { ...data[year], shareholderequity: d.value }
    })
    
    data = Object.keys(data)
        .filter(d => data[d].netincome && data[d].shareholderequity)
        .reduce((res, key) => (res[key] = data[key], res), {});
    
    const years = Object.keys(data);
    if ( years.length == 0 ) return [];
    
    const minYear = years[0];
    const maxYear = years[years.length - 1];
    
    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].netincome && data[i].shareholderequity ) {
            response.push({
                year: i,
                quat: [data[i].netincome / data[i].shareholderequity]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }
    
    return response;
}

module.exports.netinventory = document => {
    const netinventory = document.reports.attributes.inventorynet ?? [];
    let data = {};
    netinventory.forEach(d => {
        const year = new Date(d.date).getFullYear()
        data[year] = { ...data[year], netinventory: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].netinventory ) {
            response.push({
                year: i,
                quat: [data[i].netinventory]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }
}

module.exports.liabilities = document => {
    const liabilities = document.reports.attributes.liabilities ?? [];
    let data = {};
    liabilities.forEach(d => {
        const year = new Date(d.date).getFullYear()
        data[year] = { ...data[year], liabilities: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].liabilities ) {
            response.push({
                year: i,
                quat: [data[i].liabilities]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.financialleverage = document => {
    const longtermdebt = document.reports.attributes.longtermdebt ?? [];
    const shareholderequity = document.reports.attributes.stockholdersequity ?? [];

    let data = {};
    longtermdebt.forEach(d => {
        const year = new Date(d.date).getFullYear()
        data[year] = { ...data[year], longtermdebt: d.value }
    })
    
    shareholderequity.forEach(d => {
        const year = new Date(d.date).getFullYear()
        data[year] = { ...data[year], shareholderequity: d.value }
    })

    data = Object.keys(data)
        .filter(d => data[d].longtermdebt && data[d].shareholderequity)
        .reduce((res, key) => (res[key] = data[key], res), {});

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];
    
    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].longtermdebt && data[i].shareholderequity ) {
            response.push({
                year: i,
                quat: [data[i].longtermdebt / data[i].shareholderequity]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.operatingincome = document => {
    const incomeloss = document.reports.attributes.operatingincomeloss ?? [];
    let data = {};
    incomeloss.forEach(d => {
        const year = new Date(d.to).getFullYear()
        data[year] = { ...data[year], incomeloss: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].incomeloss ) {
            response.push({
                year: i,
                quat: [data[i].incomeloss]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.nonoperatingincomeexpense = document => {
    const incomeloss = document.reports.attributes.othernonoperatingincomeexpense ?? [];
    let data = {};
    incomeloss.forEach(d => {
        const year = new Date(d.to).getFullYear()
        data[year] = { ...data[year], incomeloss: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].incomeloss ) {
            response.push({
                year: i,
                quat: [data[i].incomeloss]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.depreciation = document => {
    const depreciation = document.reports.attributes.depreciation ?? [];
    let data = {};
    depreciation.forEach(d => {
        const year = new Date(d.to).getFullYear()
        data[year] = { ...data[year], depreciation: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].depreciation ) {
            response.push({
                year: i,
                quat: [data[i].depreciation]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.incometaxesextraordinaryitemsnoncontrollinginterest = document => {
    const incometaxesextraordinaryitemsnoncontrollinginterest = document.reports.attributes.incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest ?? [];
    let data = {};
    incometaxesextraordinaryitemsnoncontrollinginterest.forEach(d => {
        const year = (new Date(d.to)).getFullYear()
        data[year] = { ...data[year], incometaxesextraordinaryitemsnoncontrollinginterest: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].incometaxesextraordinaryitemsnoncontrollinginterest ) {
            response.push({
                year: i,
                quat: [data[i].incometaxesextraordinaryitemsnoncontrollinginterest]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}

module.exports.netincomeloss = document => {
    const netincomeloss = document.reports.attributes.netincomeloss ?? [];
    let data = {};
    netincomeloss.forEach(d => {
        const year = (new Date(d.to)).getFullYear()
        data[year] = { ...data[year], netincomeloss: d.value }
    })

    const years = Object.keys(data);
    if ( years.length == 0 ) return [];

    const minYear = years[0];
    const maxYear = years[years.length - 1];

    const response = [];
    for ( let i = +maxYear; i >= minYear; i-- ) {
        if ( data[i] && data[i].netincomeloss ) {
            response.push({
                year: i,
                quat: [data[i].netincomeloss]
            });
        } else {
            response.push({
                year: i,
                quat: [false]
            })
        }
    }

    return response;
}


module.exports.financials = document => {
    const financials = document.reports.financials
    const response = {}

    for ( let metric of Object.keys(financials)) {
        response[metric] = financials[metric][0]
    }

    return response
}