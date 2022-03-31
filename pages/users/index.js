import { useState, useEffect } from "react";
import FormUser from "../../components/FormUser";
import ListUser from "../../components/ListUser";

ListUser.getInititialProps = () => {
  fetch("api/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data.data, data.data);
      setLoading(false);
    });
};

export default function App() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchListUser = () => {
    fetch("api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchListUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="container mx-auto mb-20">
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0 bg-gray-200 container">
        <div className="md:grid md:grid-cols-3 md:gap-6 p-5">
          <div className="md:col-span-1">
            <div className="p-10">
              <h3 className="text-xl font-medium leading-6 text-indigo-700">
                Dashboard - User Data
              </h3>
              <p className="mt-1 text-md text-gray-700">
                This form is used to input new user data, Please fill all the
                field required in the form
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <FormUser onCompleteSubmit={fetchListUser} setLoading={setLoading} method={"CREATE"}/>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="md:flex md:flex-col flex-wrap sm:container mx-auto sm:mx-5 lg:px-24">
        <h3 className="md:text-2xl text-xl my-4 mx-5 font-bold text-indigo-800">
          User Data
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mx-5">
          <ListUser data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
