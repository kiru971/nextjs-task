import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import moment from "moment";
import { useRouter } from "next/router";

export default function StaticProps({ data }) {
  const router = useRouter();
  const time = moment().format("YYYY-MM-DD HH:mm:ss a");

  return (
    <Layout title={"StaticProps Page"}>
      <h1>StaticProps</h1>
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
          {data.map((val) => {
            return (
              <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>{val.username}</td>
                <td>{val.address.city}</td>
                <td>{val.company.name}</td>
                <td>{val.website}</td>
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
  return {
    props: { data },
  };
}
