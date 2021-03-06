import { useState } from "react";
import { authService, dbService } from "fbase";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
  query,
  getDocs,
} from "@firebase/firestore";
import { useEffect } from "react";
import { User } from "firebase/auth";
import Pheed from "components/Pheed";
import { Firestore } from "firebase/firestore";
import { IPheed } from "type/interface";

interface IProps {
  userObj: null | User;
}

const Home: React.FC<IProps> = ({ userObj }) => {
  const ref = doc(
    dbService,
    "pheed",
    authService.currentUser ? authService.currentUser.uid : ""
  );
  const ref2 = doc(dbService, "pheed", "JX9UaLAfvRdNaCeoP13nzolyetC2");

  const [text, setText] = useState("");
  const [pheeds, setPheeds] = useState<IPheed[]>([]);

  const getPheeds = async () => {
    const q = query(collection(dbService, "pheed"));
    const dataSnapShot = await getDocs(q);
    const data = dataSnapShot.docs.map((document) => ({
      text: document.data()?.text,
      createdAt: document.data()?.createdAt,
      creatorId: document.id,
    }));
    setPheeds(data);

    // const dbPheeds = await getDoc(ref2).then((res) => {
    //   setPheeds([
    //     {
    //       text: res.data()?.text,
    //       createdAt: res.data()?.createdAt,
    //       creatorId: res.id,
    //     },
    //   ]);
    //   // if(res){
    //   //   res.forEach((document: any) => console.log(document.data()));
    //   // }
    // });
    // // dbPheeds.forEach((document: any) => console.log(document.data()));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // await collection(dbService,"pheeds").add({
    //   text: pheed,
    //   createdAt: Date.now(),
    // });
    setDoc(
      ref,
      { text: text, createdAt: Date.now(), creatorId: userObj?.uid },
      { merge: true }
    );
    setText("");
  };

  const onChange = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setText(value);
  };

  useEffect(() => {
    getPheeds();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Pheed" />
      </form>
      <div>
        {pheeds.map((pheed: IPheed) => (
          <Pheed
            key={pheed.creatorId}
            pheedObj={pheed}
            isOwner={pheed.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
