import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import FormUser from "../../components/FormUser";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

UserDetail.getInitialProps = async ({ query }) => {
  let initData;
  await fetch(`/api/users/${query.id}`)
    .then((res) => res.json())
    .then((data) => {
      initData = data.data;
    })
    .catch((err) => {
      initData = err.message;
    });

  return { initData };
};

function UserDetail(props) {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setUserData(props.initData);
    const id = router.query.id;
    fetchUserData(id);
  }, []);

  const fetchUserData = (id) => {
    setLoading(true);
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setUserData(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteUser(router.query.id);
  };

  const deleteUser = (id) => {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        router.push("/users");
      });
  };

  return (
    <div className="container mx-auto px-20 mt-10 max-w-4xl">
      {isLoading ? (
        <h1 className="block text-center mt-20">Loading data...</h1>
      ) : (
        <>
          <div className="w-full">
            <div className="c-card block bg-indigo-200 shadow-md hover:shadow-xl rounded-lg overflow-hidden">
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-indigo-500 text-white rounded-full font-semibold uppercase tracking-wide text-xs">
                  ID: {userData._id}
                </span>
                <h2 className="mt-2 mb-2 font-bold">
                  {userData.first_name} {userData.last_name}
                </h2>
                <h2 className="mt-2 mb-2">{userData.address}</h2>
                <p className="flex gap-3 text-sm font-gray-600 justify-end items-center border-t pt-2">
                  {userData.phone} | {userData.email}
                </p>
              </div>
              <Tab.Group>
                <Tab.List className="flex p-2 space-x-2 bg-blue-900/20 rounded-xl max-h-20 mx-5">
                  <Tab
                    key={"1"}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                        selected
                          ? "bg-green-600 shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    Update
                  </Tab>
                  <Tab
                    key={"2"}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-white rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                        selected
                          ? "bg-red-600 shadow "
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    Delete
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                  <Tab.Panel
                    key={"3"}
                    className={classNames(
                      "bg-white rounded-xl p-3",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                    )}
                  >
                    <h3 className="font-semibold">
                      Please fill all field in update form
                    </h3>
                    <FormUser
                      onCompleteSubmit={fetchUserData}
                      method={"UPDATE"}
                      setLoading={setLoading}
                    />
                  </Tab.Panel>
                  <Tab.Panel
                    key={"4"}
                    className={classNames(
                      "bg-white rounded-xl p-3",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                    )}
                  >
                    <form onSubmit={handleDelete}>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-md font-medium text-gray-700"
                        >
                          Confirm delete?
                        </label>
                        <input
                          name="delete-confirm"
                          type="text"
                          minLength={6}
                          maxLength={6}
                          placeholder={
                            "Type 'DELETE' to confirm this operation"
                          }
                          required={true}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetail;
