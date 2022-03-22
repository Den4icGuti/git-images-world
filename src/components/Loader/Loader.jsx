import { Oval } from "react-loader-spinner";
import styles from '../Loader/Loader.module.css';


const loader = () => { 
  return (
   <div className={styles.load}>
    <Oval color="#00BFFF" width={40} height={40}/>
  </div>
 ) 
}

export default loader;
