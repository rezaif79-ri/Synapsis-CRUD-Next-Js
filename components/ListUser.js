import Link from "next/link";
import { useState, useEffect } from "react";

ListUser.getInititialProps = () => {
    fetch("api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data, data.data);
        setLoading(false);
      });
}

function ListUser() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true);
    fetch("api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data, data.data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>User Data: </h1>
      {data.map((row) => {
        return (
          <Link className="w-full" href={"/users/" + row._id}>
            <div className="c-card block bg-indigo-50 shadow-md hover:shadow-xl rounded-lg overflow-hidden" >
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-indigo-200 text-indigo-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                  ID: {row._id}
                </span>
                <h2 className="mt-2 mb-2 font-bold">
                  {row.first_name} {row.last_name}
                </h2>
                <h2 className="mt-2 mb-2">
                  {row.address}
                </h2>
                <p className="flex gap-3 text-sm font-gray-600 justify-end items-center border-t pt-2">
                    {row.phone} | {row.email} 
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ListUser;
