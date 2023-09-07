const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const User = require('./models/users')
const Report = require('./models/report')
const PrescriptionForm = require('./models/PrescriptionForm')
const multer = require('multer')
const jwt = require('jsonwebtoken')
var os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
var queries = require('./blockchainController/queries');


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  require('express-session')({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const jwtSecret = 'supersecretkey'

app.post('/register', async (req, res) => {
  const user = await User.findOne(
    { email: req.body.email },
    { contact: req.body.contact },
  )
  if (user) {
    res.send('<h1>Email or Phone Number Already Registered</h1>')
    return res.status(422)
  } else {
    const firstName = req.body.firstName
    const role = req.body.role
    const email = req.body.email
    const password = req.body.password
    const contact = req.body.contact
    const dob = req.body.dob
    console.log(firstName, role)

    const formData = new User({
      name: firstName,
      role: role,
      email: email,
      password: password,
      contact: contact,
      dob: dob,
    })
    try {
      await formData.save()
      res.send('inserted data..')
    } catch (err) {
      console.log(err)
    }
  }
})

app.post('/login', async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (req.body.password === user.password) {
        const role = user.role
        const token = jwt.sign({ email: user.email }, jwtSecret)
        res.status(200).json({
          message: 'Login Approved',
          token,
          role,
          email: user.email,
          name: user.name,
        })
      } else {
        console.log('Invalid Password')
        res.status(200).json({ message: 'Login Denied' })
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
})

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Import the File model

// Define route for file upload

app.post('/report', upload.single('file'), async (req, res) => {
  const Patientname = req.body.name;
  const email = req.body.email;
  const file = req.file;

  const fileData = fs.readFileSync(file.path);
  const base64Data = fileData.toString('base64');

  console.log(base64Data);

  try {
    var report = {
      email: email,
      patientName: Patientname,
      file: base64Data,
      fileName: file.originalname, 
    }

    console.log("Report data is ", report);
    let response = await queries.createReport(report);
    console.log(response.result);

    if (response.result === "Successfully committed the change to the ledger by the peer" ||
        response.result === "Successfully updated the asset on the ledger") {
      // Delete the uploaded file after processing
      fs.unlinkSync(file.path);
      
      res.send(response.result);
    } else {
      // Delete the uploaded file even if there was an error
      fs.unlinkSync(file.path);
      
      res.send("Error Committing Chaincode!");
    }
  } catch (err) {
    console.log(err);
    // Delete the uploaded file in case of an error
    fs.unlinkSync(file.path);
    
    res.status(500).send('Error uploading file');
  }
});


app.post('/addOrg', async (req, res) => {
   // ./addOrg.sh
   var org_number = 0;
   var chaincodeVersion = req.body.chaincodeversion;
   var port1 = 0;
   var port2 = 0;
   var port3 = 0;
   //var org_name = req;
   console.log(req.body);
   var org_name = req.body.orgname;
   switch (org_name) {
      case "org3":
         // code block
         port1 = 11051;
         port2 = 12051;
         port3 = 11052;
         org_number = 3;
         break;
      case "org4":
         // code block
         port1 = 13051;
         port2 = 14051;
         port3 = 13052;
         org_number = 4;
         break;
      case "org5":
         // code block
         port1 = 15051;
         port2 = 16051;
         port3 = 15052;

         org_number = 5;
         break;
      case "org6":
         // code block
         port1 = 17051;
         port2 = 18051;
         port3 = 17052;

         org_number = 6;
         break;
      case "org7":
         // code block
         port1 = 19051;
         port2 = 20051;
         port3 = 19052;

         org_number = 7;
         break;
      case "org8":
         // code block
         port1 = 21051;
         port2 = 22051;
         port3 = 21052;

         org_number = 8;
         break;
      case "org9":
         // code block
         port1 = 23051;
         port2 = 24051;
         port3 = 23052;

         org_number = 9;
         break;
      case "org10":
         // code block
         port1 = 25051;
         port2 = 26051;
         port3 = 25052;

         org_number = 10;
         break;
      case "org11":
         // code block
         port1 = 27051;
         port2 = 28051;
         port3 = 27052;

         org_number = 11;
         break;
      case "org12":
         // code block
         port1 = 29051;
         port2 = 30051;
         port3 = 29052;

         org_number = 12;
         break;
      default:
      // code block
      port1 = 31051;
      port2 = 32051;
      port3 = 31052;

      org_number = 13;
  
   }
   
   // yamlGenerator.generateCrypto(org_name, port1, port2, port3);
   // yamlGenerator.generateconnectionyaml(org_name, port1, port2, port3);
   // yamlGenerator.generateconnectionjson(org_name, port1, port2, port3);
   // yamlGenerator.generateConfigtx(org_name, port1, port2, port3);
   // yamlGenerator.generateDockerCompose(org_name, port1, port2, port3);
   //scriptGenerator.generateInstallOrgScript(req, chaincodeVersion);


//    var query = `
//    cd ../../first-network
//    rm -r ${org_name}-artifacts
//    rm -r docker-compose-${org_name}.yaml
//    rm -r channel-artifacts/${org_name}.json
//    rm -r connection-${org_name}.yaml
//    rm -r connection-${org_name}.json
//    mkdir ${org_name}-artifacts
//    cp ../medical/backend/configtx.yaml ${org_name}-artifacts
//    cp ../medical/backend/${org_name}-crypto.yaml ${org_name}-artifacts
//    cp ../medical/backend/docker-compose-${org_name}.yaml .
//    cp ../medical/backend/connection-${org_name}.yaml .
//    cp ../medical/backend/connection-${org_name}.json .
//    rm -r ../medical/backend/configtx.yaml
//    rm -r ../medical/backend/${org_name}-crypto.yaml
//    rm -r ../medical/backend/docker-compose-${org_name}.yaml
//    rm -r ../medical/backend/connection-${org_name}.yaml
//    rm -r ../medical/backend/connection-${org_name}.json

//    `;
// console.log(query);
//    await exec(query).then(function (response) {
      
      
//       console.log("exec result : ", response.stdout.search("Error"));
//       res.status(200).send("success");
      
//    }).catch(function(err){
//       throw err;
//    });
  
})

app.post('/prescription', async (req, res) => {
  console.log('Request', req.body)
  let reqPatientName = req.body.patientName
  let reqEmail = req.body.email
  let reqMedicines = req.body.medicines
  let reqRemarks = req.body.remarks

  let newForm = new PrescriptionForm({
    patientName: reqPatientName,
    email: reqEmail,
    medicines: [...reqMedicines],
    remarks: reqRemarks,
  })
  try {
    await newForm.save()
    res.send(newForm)
    res.status(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error sending data')
  }
})

app.get('/physiciandoctor', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const user = await User.findOne({ email: decoded.email })
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.get('/radiologistdoctor', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const user = await User.findOne({ email: decoded.email })
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.get('/patient', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const user = await User.findOne({ email: decoded.email })
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.get('/patient/reports', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    var report = {
      email:decoded.email,
    }
    let response = await queries.fetchReports(report);
    console.log("Response - ", response)
    const jsonString = Buffer.from(response.result.data).toString('utf8');
    console.log("JSONSTRING- ", jsonString)
    const parsedData = JSON.parse(jsonString);

    console.log("Server pe jo aaya wo:- ")
    console.log(parsedData.fileNames);
    res.status(200).json(parsedData.fileNames)
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})


app.get('/patient/reports/:index', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret);
    var report = {
      email: decoded.email,
      index: req.params.index,
    };
    let response = await queries.downloadReport(report);
    const jsonString = Buffer.from(response.result.data).toString('utf8');
    const parsedData = JSON.parse(jsonString);
    const filePath = parsedData.filename;
    fs.writeFile(filePath, parsedData.file, 'base64', function(err) {
      if (err) {
        res.status(500).json({ message: 'Error writing file' });
        return;
      }

      // Now you have the original data in decodedData
      setTimeout(() => {
        res.download(filePath, parsedData.filename, function(err) {
          if (err) {
            res.status(500).json({ message: 'Error downloading file' });
            return;
          }
          //Remove the file after the download is complete
          fs.unlink(filePath, function(err) {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted:', filePath);
            }
          });
        });
      }, 1000);
    });
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' });
  }
});



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001') // Replace with your React app URL
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001') // Replace with your React app URL
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(
  bodyParser.json({ limit: '50mb' }) // Set the payload size limit to 50MB
);
app.use(
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`)
})