const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html"); 
});

app.post("/",function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    console.log("hello there");
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jData=JSON.stringify(data);

    const url="https://us11.api.mailchimp.com/3.0/lists/'your mailchimp audience Id'";

    const options={
        method:"POST",
        auth:"key:'Your mailchimp api id'"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/"); 
})
app.listen(process.env.PORT  || 3000,function(){
    console.log("Listening at port 3000");
})
//3b323ac3788a12de7749a58801e2577f-us11
//c986d81ed9
