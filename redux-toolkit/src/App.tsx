import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <Counter />
    </>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
