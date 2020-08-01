
import app from "./config/Server";

app.listen(process.env.PORT, (): void => {
    console.log("Server running in address: http://localhost:3000");
});



