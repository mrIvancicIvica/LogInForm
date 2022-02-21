import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Snackb from '../components/Snackb';

const Home = () => {
  const { openBar, setOpenBar } = useContext(UserContext);
  return (
    <div>
      <Snackb open={openBar} setOpen={setOpenBar} />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
