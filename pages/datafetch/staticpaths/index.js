import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function StaticPaths({ data, time }) {
  const router = useRouter();

  return (
    <Layout title={"StaticPaths Page"}>
      <h1>StaticPaths</h1>
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
          {data?.length > 0 &&
            data?.map((val) => {
              return (
                <tr key={val?.id}>
                  <td>{val?.name}</td>
                  <td>{val?.email}</td>
                  <td>{val?.username}</td>
                  <td>{val?.address?.city}</td>
                  <td>{val?.company?.name}</td>
                  <td>{val?.website}</td>
                  <td style={{ display: "flex" }}>
                    <button
                      className="btn-secondary"
                      onClick={() =>
                        router.push(`/datafetch/staticpaths/edit/${val?.id}`)
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

export async function getStaticProps() {
  const res = await fetch(`${API_URL}`);
  const data = await res.json();
  const time = new Date().toLocaleTimeString();
  return {
    props: { data, time },
    revalidate: 1,
  };
}
