import { connectDB } from "./modules/db.js";
import { client } from "./modules/wspAuth.js";

import { Message } from "whatsapp-web.js";
import mongoose from "mongoose";

import { IDBdata } from "./types.js";

connectDB();

const dataSchema = new mongoose.Schema<IDBdata>({
  voltage: Number,
  current: Number,
  temperature: Number,
  date: Number,
});

client.on("message", (message: Message) => {
  console.log(message.body);

  if (message.body==="!t") {
    var Voltage = mongoose.model<IDBdata>("Voltage", dataSchema);

     Voltage.find({})
      .sort({ _id: -1 })
      .limit(1)
      .then((item) => {

        const [values]=item
        const time=new Date(values.date).toLocaleTimeString()
        console.log("message:",`Temperatura:${values.temperature} °C , ${time}`);
        message.reply(`Temperatura: ${values.temperature} °C , ${time}`);
      });
  }
});

