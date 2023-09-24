import fs from "fs/promises";
import path from "path";
import uniqid from "uniqid";

const contactPath = path.resolve("db", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const buffer = await fs.readFile(contactPath);
  return JSON.parse(buffer);
}

export async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
}
