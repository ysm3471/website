import HomeBanner from "./main/HomeBanner/HomeBanner";
import classes from './Home.module.css'
import HomeHeader from "../../Layout/HomeHeader/HomeHeader";
import HomePost from "./main/HomePost/HomePost";


export default function Home() {
  return (
    <div className={classes.container}>
    <HomeHeader/>
    <main>
      <HomeBanner/>
      <HomePost/>
    </main>
    </div>
  )
}
