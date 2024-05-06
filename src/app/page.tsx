import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "@/app/pages/home/page";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export default function Home() {
  return (
      <>
        <Header/>
        <div style={{height: '90px', background: "orange"}}/>
        <HomePage></HomePage>
        <Footer/>
      </>
  );
}
