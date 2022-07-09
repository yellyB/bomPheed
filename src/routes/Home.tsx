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
} from "@firebase/firestore";
import { useEffect } from "react";

const Home = () => {
  const ref = doc(
    dbService,
    "pheed",
    authService.currentUser ? authService.currentUser.uid : ""
  );
  const ref2 = doc(dbService, "pheed", "JX9UaLAfvRdNaCeoP13nzolyetC2");

  const [pheed, setPheed] = useState("");
  const [pheeds, setPheeds] = useState<any>([]);

  const getPheeds = async () => {
    const dbPheeds = await getDoc(ref2).then((res) => {
      setPheeds([
        {
          text: res.data()?.text,
          createdAt: res.data()?.createdAt,
          id: res.id,
        },
      ]);
      // if(res){
      //   res.forEach((document: any) => console.log(document.data()));
      // }
    });
    // console.log(dbPheeds);
    // dbPheeds.forEach((document: any) => console.log(document.data()));
  };

  console.log(pheeds);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // await collection(dbService,"pheeds").add({
    //   text: pheed,
    //   createdAt: Date.now(),
    // });
    setDoc(ref, { text: pheed, createdAt: Date.now() }, { merge: true });
    setPheed("");
  };

  const onChange = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setPheed(value);
  };

  useEffect(() => {
    getPheeds();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={pheed}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Pheed" />
      </form>
      <div>
        {pheeds.map((pheed: any) => (
          <div key={pheed.id}>
            <h4>{pheed.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
