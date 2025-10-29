import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/submit", (req,res) =>{
    console.log(`received value ${req.body.value}`)
    const filePath = `../survey_results/resp${Date.now()}.csv`;

    fs.writeFileSync(filePath,`value,${req.body.value}`);

}); 

app.listen(PORT,"0.0.0.0", () =>{
    console.log("Server running!")
})