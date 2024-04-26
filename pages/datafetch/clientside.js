import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function ClientSideFetch() {
  const [data, setData] = useState();
  const time = moment().format("YYYY-MM-DD HH:mm:ss a");
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Layout title={"ClientSide Page"}>
      <h1>ClientSideFetch</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>

            <th>UserName</th>
            <th>Address</th>
            <th>Company</th>
            <th>website</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val) => {
            return (
              <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.username}</td>
                <td>{val.address.city}</td>
                <td>{val.company.name}</td>
                <td>{val.website}</td>
                <td style={{ display: "flex" }}>
                  <button
                    className="btn-secondary"
                    onClick={() =>
                      router.push(`/datafetch/staticpaths/edit/${val.id}`)
                    }
                  >
                    <FaPencilAlt /> Edit
                  </button>
                  <button className="btn-delete">
                    <FaTimes /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div onClick={() => router.push("/")} className="back">
        {"<"} Go Back
      </div>
      <div className="current">
        <b>Current Timestamp:</b> {time}
      </div>
    </Layout>
  );
}
