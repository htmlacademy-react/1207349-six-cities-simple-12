import Main from "../../pages/main/main";

type AppSceenProps = {
  offersDisplayCount: number;
}

function App({offersDisplayCount}: AppSceenProps): JSX.Element {
  return (
    <Main offersDisplayCount = {offersDisplayCount} />
  );
}

export default App;
