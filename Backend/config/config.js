const config =
{
    "API": {
        "port": 3000,
        "ip": "localhost",
        "secretKeyJWT": "mealtrain",
        "secretKeyRefresh": "m1e2a3l4t5r6a7i8n9",
        "secretKeyResetPassword":"mealtrain6150"
    },
    "dbConfig": {
        "host": "127.0.0.1",
        "port": "5432"
    },
    "email":{
        "senderEmail": "helpdesk.mealtrain@gmail.com",   //"mealtrain.admin@gmail.com",
        "emailPassword":"ggefcxkimsoscgqz"//"mealtrain6150"
    },
    "client":{
        "baseUrl":"http://localhost:3005"
    }
}

export default config;