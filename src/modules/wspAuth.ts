import whatsapp, { Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
// const { MongoStore } = require('wwebjs-mongo');
const { Client, LocalAuth, RemoteAuth } = whatsapp;
const { generate } = qrcode;

// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     const store = new MongoStore({ mongoose: mongoose });
//     const client = new Client({
//         authStrategy: new RemoteAuth({
//             store: store,
//             backupSyncIntervalMs: 300000
//         })
//     });

//     client.initialize();
// });

// client.on('remote_session_saved', () => {
//     console.log(session saved)
// }

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on("authenticated", (session: any) => {
  //console.log(session);
});

client.on("qr", (qr: string) => {
    generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

export { client };
