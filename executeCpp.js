const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  console.log("Outputh path  " + outputPath );
  console.log("filepath    " + filepath);
  const jobId = path.basename(filepath).split(".")[0];
  console.log("Niki JobID  "+jobId);
  const outPath = path.join(outputPath, `.${jobId}.exe`);
  console.log("Niki Outpath  "+ outPath);
  return new Promise((resolve, reject) => {
    // exec(
    //   `g++ ${filepath} -o ${outPath} && cd ${outputPath} -o ./${jobId}.exe`,
    //   (error, stdout, stderr) => {
    //     error && reject({ error, stderr });
    //     stderr && reject(stderr);
    //     resolve(stdout);
    //   }
    // );

    exec(
      `g++ -o ${outPath} ${filepath} && cd ${outputPath} && .${jobId}.exe`, (error, stdout, stderr) => {
      error && reject({error, stderr});
      stderr && reject(stderr);
      resolve(stdout);
  });


  });
};

module.exports = {
  executeCpp,
};














// // const { rejects } = require('assert');
// const { rejects } = require("assert");
// const {exec} = require("child_process");
// const { error } = require("console");
// // const path = require('path');
// const fs = require("fs");
// const path = require("path");
// const { stdout, stderr } = require("process");
// // const { resolve } = require('path');
// // const { consumers } = require("stream");


// const outputPath = path.join(__dirname,"outputs");

// if(!fs.existsSync(outputPath)){
//     fs.mkdirSync(outputPath,{require:true});
// }

// const executeCpp = (filepath) => {

//     const jobId = path.basename(filepath).split(".")[0];
//         const outputPath = path.join(outputPath,`${jobId}.out`);

//     return new Promise((resolve,reject) =>{
//        //F:\Web Vs Code\Online Compiler\backend\codes\dd9b0519-3dcd-4f6a-b9df-90ada6d6be75.cpp
//         exec(`g++ ${$filepath} -o ${outputPath} && cd ${outputPath} && ./${jobId}.out`,
//         (error,stdout , stderr)=> {
//             error && reject({error, stderr});
//             stderr && reject(stderr);
//             resolve(stderr);
//             // if (error) {
               
//             //     reject({error,stderr});
//             // }
//             // if (stderr){
//             //     reject(stderr);
//             // }
//             // resolve(stdout);
//         }
//         );
//     });
// };

// module.exports = {
//     executeCpp
// }