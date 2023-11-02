import Image from "next/image";
import styles from "./appInfo.module.css"

export default function AppInfo() {
  return (
    <div className={styles.appNameLogo}>
      <Image 
        src={"/logo.png"}
        width={0}
        height={0}
        style={{
          width: "auto",
          height: "100px",
          objectFit: "contain",
        }}
        priority={true}
        alt={"TaskAlas logo"}
      />
      <h1 className={styles.appName}> TASKATLAS </h1>
    </div>
  )
}
