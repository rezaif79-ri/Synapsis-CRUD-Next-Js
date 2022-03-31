import Link from "next/link";

function ListUser({data, isLoading}) {
  if(isLoading) return <h1 className="block text-center"> Loading </h1>
  
  return (
    <>
      {data.map((row) => {
        return (
          <Link className="w-full" href={"/users/" + row._id} key={row._id}>
            <div className="c-card block bg-indigo-200 shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:cursor-pointer" >
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-indigo-500 text-white rounded-full font-semibold uppercase tracking-wide text-xs">
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
    </>
  );
}

export default ListUser;
