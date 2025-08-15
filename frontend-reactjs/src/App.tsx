import { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Contacts:</h1>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li key={contact.id} className="text-gray-800">
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
