import { useState } from "react/cjs/react.development";
import HomePage from "./components/routes/Home/Home";
import GamePage from "./components/routes/Games/Games";

const App = () => {

  const handleChangePage = (page) => {
    setPage(page);
  }



  const [page, setPage] = useState('app');

  switch (page) {
    case 'app':
      return <HomePage onChangePage={handleChangePage} />
    case 'game':
      return <GamePage onChangePage={handleChangePage} />
    default:
      return <HomePage onChangePage={handleChangePage} />

  }

};

export default App;
