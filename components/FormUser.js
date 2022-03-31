import { useState } from "react";
import { useRouter } from "next/router";

function FormUser({ onCompleteSubmit, method, setLoading }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
	const router = useRouter();
  const id = router.query.id;

	const updateUser = async () => {
		try {
			setLoading(true);
			await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					phone: number,
					email: email,
					address: address,
				}),
			}).then(() => {
				setLoading(false);
				setFirstName("");
				setLastName("");
				setNumber("");
				setEmail("");
				setAddress("");

				onCompleteSubmit(id);
			});
		} catch (error) {
			setLoading(false);
		}
	}

  const createUser = async () => {
    try {
      setLoading(true);
      await fetch("api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone: number,
          email: email,
          address: address,
        }),
      }).then(() => {
        setLoading(false);
        setFirstName("");
        setLastName("");
        setNumber("");
        setEmail("");
        setAddress("");

        onCompleteSubmit();
      });
    } catch (error) {
      setLoading(false);
    }
  }

	const handleSubmit = (e) => {
    e.preventDefault()
		switch (method) {
			case "CREATE":
				createUser()
				break;
			case "UPDATE":
				updateUser()
				break;
			default:
				break;
		}
	}

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                placeholder="John"
                required={true}
                maxLength={25}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                placeholder="Dave"
                required={true}
                maxLength={25}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required={true}
                maxLength={50}
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="name@domain.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone-number"
                name="phone-number"
                value={number}
                placeholder="0123456789"
                onChange={(e) => {
                  setNumber(e.target.value.replace(/\D/g, ""));
                }}
                maxLength={12}
                minLength={8}
                required={true}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                required={true}
                maxLength={100}
                placeholder="Jln. your place number city"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {method}
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormUser;
