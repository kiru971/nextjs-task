import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss a"));
  setInterval(() => {
    setTime(moment().format("YYYY-MM-DD HH:mm:ss a"));
    console.log(time);
  }, [1000]);
  return (
    <Layout title={"Data Fetching"}>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div>
            <h3>getServerSideProps</h3>
            <p>
              Fetch Data on every request.It returns JSON and pass data as
              props.It runs on every request
            </p>
          </div>
          <button className="btn1">
            <Link href={"/datafetch/serversideprops"} className="btn">
              Click
            </Link>
          </button>
        </div>
        <div className={styles.card}>
          <div>
            <h3>getStaticProps</h3>
            <p>
              Fetch data only on build time and cannot use for dynamic routes
              because api call runs in build time so data cannot changed on
              request
            </p>
          </div>
          <button className="btn1">
            <Link href={"/datafetch/staticprops"} className="btn">
              Click
            </Link>
          </button>
        </div>
        <div className={styles.card}>
          <div>
            <h3>getStaticPaths</h3>
            <p>
              It can be used for dynamic routes.If we use staticprops and we
              need dynamic routes for request we can use staticpaths.It runs on
              every request
            </p>
          </div>
          <button className="btn1">
            <Link href={"/datafetch/staticpaths"} className="btn">
              Click
            </Link>
          </button>
        </div>
        <div className={styles.card}>
          <div>
            <h3>client-side fetching</h3>
            <p>
              It can be used when we dont need pre-render data and fetch data on
              client side
            </p>
          </div>
          <button className="btn1">
            <Link href={"/datafetch/clientside"} className="btn">
              Click
            </Link>
          </button>
        </div>
        <div className={styles.card}>
          <div>
            <h3>Incremental Static Regeneration(ISR)</h3>
            <p>
              It can be used when we need staticprops to re-run and fetch data
              after some time
            </p>
          </div>
          <button className="btn1">
            <Link href={"/datafetch/increment"} className="btn">
              Click
            </Link>
          </button>
        </div>
      </div>
      <div className="current">
        <b>Current Timestamp:</b> {time}
      </div>
    </Layout>
  );
}
