import "./ResgistSpot.css";

const RegistSpot = (props) => {
    const closeModal = () => {
        props.setShowComponent(false);
    };

    const resistSpot = () => {
      console.log(props);
    }
  return (
    <>
      {props.showFlag ? (
        <div id="overlay">
          <h3>地点を登録しますか？</h3>
          <button onClick={closeModal}>&times;</button>
          <div>
            <input id="form"></input>
          </div>
          <button onClick={resistSpot}>登録する</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RegistSpot;
