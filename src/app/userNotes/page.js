"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function page() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("notes").select("*");
      if (error) setError(error);
      else setItems(data);
    };

    fetchItems();
  }, []);

  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      {items.map((entry) => (
        <div key={entry.id}>
          <p>Entry ID: {entry.id}</p>
          <pre>{JSON.stringify(entry.note_content, null, 2)}</pre>{" "}
          {/* Pretty print the JSON */}
        </div>
      ))}
    </div>
  );
}
