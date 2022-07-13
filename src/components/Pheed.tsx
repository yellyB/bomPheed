import { dbService } from "fbase";
import { doc } from "@firebase/firestore";
import { deleteDoc, updateDoc } from "firebase/firestore";
import { IPheed } from "type/interface";
import { useState } from "react";

interface IProps {
  pheedObj: IPheed;
  isOwner: boolean;
}

const Pheed: React.FC<IProps> = ({ pheedObj, isOwner }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newPheed, setNewPheed] = useState<string>(pheedObj.text);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewPheed(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "pheed", "JX9UaLAfvRdNaCeoP13nzolyetC2"), {
      text: newPheed,
    });
    setEditing(false);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      //   const data = await doc(dbService, `pheeds/${pheedObj.id}`);
      //   console.log(data);
      await deleteDoc(doc(dbService, "pheed", "JX9UaLAfvRdNaCeoP13nzolyetC2"));
      // updateDoc(ref2, { creatorId: deleteField() });
    }
  };

  return (
    <>
      <div>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input value={newPheed} required onChange={onChange} />
              <input type="submit" value="Update Pheed" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{pheedObj.text}</h4>
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Pheed</button>
                <button onClick={toggleEditing}>Edit Pheed</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Pheed;
