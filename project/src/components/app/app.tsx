import Main from "../../pages/main/main";
import Header from "../header/header";

type AppSceenProps = {
  offersDisplayCount: number;
}

function App({offersDisplayCount}: AppSceenProps): JSX.Element {
  return (
    <>
      <Header />
      <Main offersDisplayCount = {offersDisplayCount} />
    </>
  );
}

export default App;
