var main = require('../invoke')
//var queryMeds = require('../query');
//var DailyRotateFile = require("winston-daily-rotate-file");
/**
 
 * For creating Medical Document
 */
let createMedicalDoc = async (report) => {

 console.log("data is:",report.email);
    try {
     const meddoc =  await main(report);
        console.log("meddoc ", meddoc);
       return { result: meddoc };
    
    } catch (err) {
        
        return { result: err };
    }

};



/**
 * 
 * For querying Medical Document
 */
let medicalHistory = async(req) => {

   // logger.info(req);
  
 
    try {
        const medsHistory = await main(req, 'query');
        return { result:medsHistory };
    
    
    } catch (err) {
        
        return { result: err };
    }

};


/**
 * 
 * For querying Medical Document
 */
let allmedicalHistory = async(req) => {

    // logger.info(req);
   
  
     try {
         const allmedicalHistory = await main(req, 'queryAllMeds');
         return { result:allmedicalHistory };
     
     
     } catch (err) {
         
         return { result: err };
     }
 
 };

module.exports = {createMedicalDoc, medicalHistory, allmedicalHistory};