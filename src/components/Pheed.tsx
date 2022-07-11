import { dbService } from "fbase";
import { doc } from "@firebase/firestore";

interface IProps {
  pheedObj: any;
  isOwner: boolean;
}

const Pheed: React.FC<IProps> = ({ pheedObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      const data = await doc(dbService, `pheeds/${pheedObj.id}`);
      console.log(data);
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
