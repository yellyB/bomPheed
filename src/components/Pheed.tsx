import { dbService } from "fbase";
import { doc } from "@firebase/firestore";
import { deleteDoc, deleteField, updateDoc } from "firebase/firestore";
import { IPheed } from "type/interface";

interface IProps {
  pheedObj: IPheed;
  isOwner: boolean;
}

const Pheed: React.FC<IProps> = ({ pheedObj, isOwner }) => {
  const ref2 = doc(dbService, "text", "kkk");

  console.log(pheedObj);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      //   const data = await doc(dbService, `pheeds/${pheedObj.id}`);
      //   console.log(data);
      await deleteDoc(doc(dbService, "text", "fff"));
      // updateDoc(ref2, { creatorId: deleteField() });
    }
  };

  return (
    <>
      <div>
        <h4>{pheedObj.text}</h4>
        {isOwner && (
          <>
            <button onClick={onDeleteClick}>Delete Pheed</button>
            <button>Edit Pheed</button>
          </>
        )}
      </div>
    </>
  );
};

export default Pheed;
