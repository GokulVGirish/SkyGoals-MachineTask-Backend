import appData from "./entities/applicationConfig";
import connectDB from "./frameworks/db/config";
import app from "./frameworks/express/app";
connectDB()
app.listen(appData.PORT,()=>{

     console.log(`server listening and is ready to go ${appData.PORT}`);

})