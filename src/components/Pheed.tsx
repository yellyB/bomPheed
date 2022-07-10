interface IProps {
  pheedObj: any;
  isOwner: boolean;
}

const Pheed: React.FC<IProps> = ({ pheedObj, isOwner }) => {
  return (
    <>
      <div>
        <h4>{pheedObj.text}</h4>
        {isOwner && (
          <>
            <button>Delete Pheed</button>
            <button>Edit Pheed</button>
          </>
        )}
      </div>
    </>
  );
};

export default Pheed;
