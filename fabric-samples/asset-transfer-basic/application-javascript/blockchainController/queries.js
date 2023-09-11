var invoke = require('../invoke')
//var queryMeds = require('../query');
//var DailyRotateFile = require("winston-daily-rotate-file");
/**
 
 * For creating Medical Document
 */
let CreateReport= async (report) => {

 console.log("data is:",report.email);
    try {
     const meddoc =  await invoke.addReports(report);
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
        const medsHistory = await invoke(req, email);
        return { result:medsHistory };
    
    
    } catch (err) {
        
        return { result: err };
    }

};


/**
 * 
 * For querying Medical Document
 */
let FetchReports = async(report) => {

    // logger.info(req);
    console.log("Searchining for records of the user:-", report.email);
  
     try {
         const allmedicalHistory = await invoke.displayReports(report);
         return { result:allmedicalHistory };
         
     } catch (err) {
         
         return { result: err };
     }
 
 };

 let DownloadReport = async(report) => {

    // logger.info(req);
    console.log("Searchining for records of the user:-", report.email);
  
     try {
         const allmedicalHistory = await invoke.downloadReport(report);
         return { result:allmedicalHistory };
         
     } catch (err) {
         
         return { result: err };
     }
 
 };

module.exports = {CreateReport, FetchReports, DownloadReport};