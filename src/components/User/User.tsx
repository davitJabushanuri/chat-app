/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { IUser } from "@/types/types";
import styles from "./User.module.scss";

interface IUserProps {
  user: IUser;
}

const User = ({ user }: IUserProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={user.image || ""} alt="user-image" />
      </div>
      <div className={styles.info}>
        <h3>{user.name}</h3>
        <p>last message</p>
      </div>
      <div className={styles.time}>
        <p>11:45PM</p>
      </div>
    </div>
  );
};

export default User;
