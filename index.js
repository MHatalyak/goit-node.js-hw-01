import { program } from "commander";

import * as contacts from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contactsList = await contacts.listContacts();
        return console.table(contactsList);
      case "get":
        const contact = await contacts.getContactById(id);
        return console.log(contact);
      case "add":
        const newContact = await contacts.addContact({ name, email, phone });
        return console.log(newContact);
      case "remove":
        const deleteContact = await contacts.removeContact(id);
        return console.log(deleteContact);
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    throw new Error(`Error occurred: ${error}`);
  }
}

invokeAction(argv);
