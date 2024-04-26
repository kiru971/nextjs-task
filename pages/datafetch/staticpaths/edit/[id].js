import { API_URL } from "@/config";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";

export default function EditPage({ user }) {
  const router = useRouter();
  const [values, setValue] = useState({
    id: router.query.id,
    name: user?.name,
    email: user?.email,
    website: user?.website,
    username: user?.username,
    company: {
      name: user?.company?.name,
    },
    address: {
      city: user?.city?.name,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setValue({ ...values, company: { name: value } });
    } else if (name === "address") {
      setValue({ ...values, address: { city: value } });
    } else setValue({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((ele) => ele === "");
    if (hasEmptyFields) {
      console.log("Please fill in all fields");
    } else {
      console.log("submit");

      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) {
        console.log("Something went wrong");
      } else {
        const data = await res.json();
        console.log(data);
        router.push("/datafetch/staticpaths");
      }
    }
  };

  return (
    <div>
      <h1>StaticPaths EditPage</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div style={{ width: 800 }}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                onChange={handleInputChange}
                defaultValue={user?.name}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="Email"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleInputChange}
                defaultValue={user?.email}
              />
            </div>
            <div>
              <label htmlFor="website">website</label>
              <input
                type="text"
                id="website"
                name="website"
                onChange={handleInputChange}
                defaultValue={user?.website}
              />
            </div>
            <div>
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                onChange={handleInputChange}
                defaultValue={user?.username}
              />
            </div>
            <div>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                onChange={handleInputChange}
                defaultValue={user?.company?.name}
              />
            </div>
            <div>
              <label htmlFor="address">address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleInputChange}
                defaultValue={user?.address?.city}
              />
            </div>
          </div>
          <input type="submit" className={styles.btn} />
        </div>
      </form>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();

  const paths = data.map((val) => ({ params: { id: val.id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // console.log("slug", slug);
  const res = await fetch(`${API_URL}/${params.id}`);
  const data = await res.json();

  return {
    props: { user: data },
    revalidate: 1,
  };
}
