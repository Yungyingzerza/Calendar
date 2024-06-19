import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "store/testSlice";
import { ItestSlice } from "interfaces/ItestSlice";
function App() {
  const dispatch = useDispatch();
  const test = useSelector((state : ItestSlice) => state.test.value);
  return (
    <>
      <h1>{test}</h1>
      <button onClick={() => dispatch(increment())} className="btn btn-success">INCRESE</button>
      <button onClick={() => dispatch(decrement())} className="btn btn-error">DECRESE</button>
    </>
  );
}

export default App;
