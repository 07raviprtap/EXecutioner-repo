const express =require("express");
const {generateFile} = require("./generateFile");
const app = express();
const {executeCpp}=require("./executeCpp");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.get('/',(req,res) =>{

//    return res.json({hello:"world!"});
// })

app.post("/run",async (req,res) => {

    // const language = req.body.language;
    // const code = req.body.code;->
    //it is same code as writen in the below line in reduce form0
    
    const { language="cpp",code} = req.body;
    
    // const{} = req.body;

    if(code === undefined) {
        return res.status(400).json({success: false , error : "Empty code body!"});
    }
    try{
    // we need to generate cpp file with content from the request 
    //we need to run the file and send the resposne 
    const filepath =await generateFile(language,code);
    const output = await executeCpp(filepath);

    return res.json({filepath,output});
    } catch (err){
        res.status(500).json({err});
    }
});

app.listen(5000, ()=>{
    console.log(`listning on port 5000!`);
});