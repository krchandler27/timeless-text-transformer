import { openDB } from 'idb';
// Creates a new database called 'jate'
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates an object in which the data is stored and gives unique 'id' that auto-increments.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Put takes content typed into the text editor and adds it to the 'jate'Db
export const putDb = async (content) => {
  console.log('Add text to database. 👍');

  const jateDb = await openDB('jate', 1);
  const transact = jateDb.transaction('jate', 'readwrite');
  const store = transact.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Text saved to the database. 👍', result);
};

// Retrieves all saved text from the database.
export const getDb = async () => {
  console.log('Operation GET from database');

  const jateDb = await openDB('jate', 1);
  const transact = jateDb.transaction('jate', 'readonly')
  const store = transact.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.value;
  console.log('Operation GET was a success.');
};

//Call function to start the database
initdb();
