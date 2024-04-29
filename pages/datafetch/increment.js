import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Increment({ data, time, date }) {
  const router = useRouter();

  const [count, setCount] = useState(0);
  return (
    <Layout title={"Increment Page"}>
      <h1>Increment</h1>
      <h2>Count : {count}</h2>
      <button className="btn" onClick={() => setCount(count + 1)}>
        click
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>UserName</th>
            <th>Address</th>
            <th>Company</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((val) => {
              return (
                <tr key={val?.id}>
                  <td>{val?.name}</td>
                  <td>{val?.email}</td>
                  <td>{val?.phone}</td>
                  <td>{val?.username}</td>
                  <td>{val?.address?.city}</td>
                  <td>{val?.company?.name}</td>
                  <td>{val?.website}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div onClick={() => router.push("/")} className="back">
        {"<"} Go Back
      </div>
      <div className="current">
        <b>Current Timestamp:</b> {date} {time}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  return {
    props: { data, time, date },
    revalidate: 10,
  };
}
