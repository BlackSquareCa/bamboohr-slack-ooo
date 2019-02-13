'use strict';


const whosOut = require('./whosOut')

// exports.handler must match the name of the handler given to AWS in the Handler section below Function Code
exports.handler = function(event, context, callback) {

  whosOut()
  console.log('PTO Bot for',process.env.BAMBOOHR_SUBDOMAIN)
    
  // return the apiResponse object back to our API call.
  callback(null, "{message:'ok'}");
};
