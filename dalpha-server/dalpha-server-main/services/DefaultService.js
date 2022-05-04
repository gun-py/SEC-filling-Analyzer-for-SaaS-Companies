/* eslint-disable no-unused-vars */
const Service = require('./Service');
const CompanyModel = require('../models/company')
const AnnouncementsModel = require('../models/announcements')
const FinanceService = require('./FinanceService')
const textFilter = require('../utils/textFilter');

/**
* Get attribute information for a company in the time range specified
*
* attributeId String 
* id String 
* start date  (optional)
* end date  (optional)
* returns List
* */
const getAttribute = ({ attributeId, id, start, end }) => new Promise(
  async (resolve, reject) => {
    const doc = await CompanyModel.findOne({ _id: id });

    if ( typeof FinanceService[attributeId] === 'function' ) {
      try {
        const response = FinanceService[attributeId](doc);
        if ( !start && !end ) return resolve(Service.successResponse(response));

        const filteredResponse = [];
        const maxYearInResponse = response[0].year;
        const minYearInResponse = response[response.length - 1].year;
        end = end ? end : maxYearInResponse;
        start = start ? start : minYearInResponse;

        if ( maxYearInResponse < end ) {
          for ( let i = end; i > maxYearInResponse; i-- ) {
            filteredResponse.push({
              year: i,
              quat: [false]
            })
          }
        } else {
          while ( response[0].year > end ) {
            response.shift()
          }
        }

        if ( minYearInResponse >= start ) {
          filteredResponse.push(...response)

          for ( let i = minYearInResponse - 1; i >= start; i-- ) {
            filteredResponse.push({
              year: i,
              quat: [false]
            })
          }
        } else {
          while ( response[response.length - 1].year < start ) {
            response.pop()
          }

          filteredResponse.push(...response)
        }

        resolve(Service.successResponse(filteredResponse))
      } catch ( e ) {
        console.log(e)
        
        resolve(Service.successResponse({}));
      }
    } else {
      return [];
    }
  },
);

/**
* Get attribute information for a company in the time range specified
*
* attributeId String
* returns List
* */
const getFinancials = ({ id }) => new Promise(
  async (resolve, reject) => {
    const doc = await CompanyModel.findOne({ _id: id });

    try {
      const response = FinanceService.financials(doc);
      resolve(Service.successResponse(response));
    } catch ( e ) {
      console.log(e)
      resolve(Service.successResponse({}));
    }
  },
);
  
/**
* Search a company by it's name
*
* name String 
* returns SearchResults
* */
const searchCompany = ({ name }) => new Promise(
  async (resolve, reject) => {
    try {
      const doc = await CompanyModel.findOne({ name });

      if ( !doc ) return resolve(Service.successResponse({exact: true, results: []}))

      const response = {
          exact: true,
          results: [{
            id: doc._id,
            name
          }]
      }

      resolve(Service.successResponse(response));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Downloads CSV file with the data
*
* id Number
* returns String
* */
const generateCSV = ({ id, start, end }) => new Promise(
  async (resolve, reject) => {
    try {
      let csv = 'CIK,Company Name,From,To,Attribute,Value\n'
      const doc = await CompanyModel.findOne({ _id: id })

      const attributes = Object.keys(doc.reports.attributes)
      const options = {
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      };

      for ( let attribute of attributes ) {
        if ( doc.reports.attributes[attribute]?.length > 0 ) {
          for ( let metric of doc.reports.attributes[attribute] ) {
            csv += `${doc._id},`
            csv += `${doc.name},`
            if ( metric.date ) {
              csv += `"=""${metric.date.toLocaleDateString('gb-IN', options)}""",NA,`
            } else {
              csv += `"=""${metric.from.toLocaleDateString('gb-IN', options)}""",`
              csv += `"=""${metric.to.toLocaleDateString('gb-IN', options)}""",`
            }
            csv += `${attribute},`
            csv += `${metric.value},`
            csv += '\n'
          }
        }
      }

      resolve(Service.successResponse(csv));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

const getAnnouncements = ({ id }) => new Promise(
  async (resolve, reject) => {
    const company = await CompanyModel.findOne({ _id: id });
    if ( !company ) return resolve(Service.successResponse([]))
    
    const doc = await AnnouncementsModel.findOne({ 
      name: company.name, 
      announcements: {
        $exists: true
      }
    })
    if ( !doc ) return resolve(Service.successResponse([]))

    const response = doc.announcements.map(announcement => ({
      date: announcement.date,
      positive: announcement.data['% positive'],
      negative: announcement.data['% negative'],
      text: textFilter(announcement.text),
    }));

    resolve(Service.successResponse(response))
  },
);

const getFraud = ({ id }) => new Promise(
  async (resolve, reject) => {
    const document = await AnnouncementsModel.findOne({
      _id: id.toString(),
      fraud: {
        $exists: true
      }
    });
    if ( !document || !document.fraud ) return resolve(Service.successResponse({fraud: 0}))

    resolve(Service.successResponse({fraud: document.fraud}))
  },
);

module.exports = {
  getAttribute,
  searchCompany,
  generateCSV,
  getFinancials,
  getAnnouncements,
  getFraud
};
