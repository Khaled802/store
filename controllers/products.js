const { get } = require('mongoose');
const { CustomeError } = require('../error/customeError');
const { Product } = require('../models/products');

const getProducts = async(req, res)=> {
    const query = filterData(req.query);
    const queryNumericFilter = getNumericFilters(req.query);
    const finalQuery = {...query, ...queryNumericFilter};
    const limit = getLimit(req.query);
    const products = await Product.find(finalQuery)
                            .sort(getSort(req.query))
                            .select("name price rating")
                            .skip(getSkip(getPage(req.query), limit))
                            .limit(limit).exec();
    const nbHits = products.length;
    res.status(200).json({products, nbHits});
}



function filterData(data) {
    const { featured, company, name}= data;
    const result = {};
    if(featured !== undefined) result.featured = featured;
    if(company !== undefined) result.company = company;
    if(name !== undefined) result.name = {$regex: `^${name}`, $options: 'i'};
    return result;
}

function getSort(data) {
    let { sort } = data;
    if(sort === undefined) sort = 'createdAt';
    console.log(sort);
    return sort;
}


function getNumericFilters(data) {
    let { numericFilters } = data;
    if(numericFilters === undefined) return {};
    numericFilters = numericFilters.split(',');
    const query = {};
    for(const filter of numericFilters) {
        console.log(filter)
        const normailizedFilter = normalizeNumericFilter(filter);
        if(normailizedFilter !== undefined) {
            query[normailizedFilter[0]] = {[normailizedFilter[1]]: normailizedFilter[2]};
        }
    }

    return query;
}

const normaolizeMapper = {
    '>': "$gt",
    '<': "$lt",
    '>=': "$gte",
    "<=": "$lte",
    "=": "$eq"
}

function normalizeNumericFilter(filter) {
    let normailized = filter;
    normailized = normailized.replace(/[><]=?|=/g, (match)=> `!${normaolizeMapper[match]}!`)
                            .split('!');
    if(normailized.length !== 3) {
        return undefined;
    }
    normailized[2] = Number(normailized[2]);
    return normailized
}

function getPage(data) {
    console.log(data.page)
    return Number(data.page) || 1;
}

function getLimit(data) {
    return Number(data.limit) || 10;
}
function getSkip(page, maxNumberOfItems) {
    return (page-1) * maxNumberOfItems;
}


module.exports = {
    getProducts
}