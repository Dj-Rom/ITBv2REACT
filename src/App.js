import { useDispatch, useSelector } from 'react-redux'
import { fetchPage, fetchFirstPage } from './redux/slices/pageSlice'
import { modalStatusChange, currentPersonageForWatch } from './redux/slices/modalSlice'
import Personage from './components/personage';
import KeepMountedModal from './components/KeepMountedModal';
import './App.scss'
import axios from 'axios';
const api = await axios("https://rickandmortyapi.com/api/character/").then((res) => res.data)

function App() {
  const dispatch = useDispatch()
  const getFirstPage = () => {
    dispatch(fetchFirstPage(api))
  }
  const loadFirstPage = useSelector((state) => (!!state.page.dataFromServer.info))
  if (!loadFirstPage) { getFirstPage() }



  const nextPageApi = useSelector((state) => state.page.dataFromServer.info.next === null ? `https://rickandmortyapi.com/api/character/?page=${state.page.dataFromServer.info.pages}` : state.page.dataFromServer.info.next)
  const prevPageApi = useSelector((state) => state.page.dataFromServer.info.prev === null ? "https://rickandmortyapi.com/api/character/" : state.page.dataFromServer.info.prev)
  const listWithPers = useSelector((state) => state.page.dataFromServer.results)
  const modalWindowStatus = useSelector((state) => state.modal.modalWindow)
  const currentPersonageForModal = useSelector((state) => state.modal.currentPersonage)


  const fetchNextPage = () => {
    dispatch(fetchPage(nextPageApi))
  }
  const fetchPrevPage = () => {
    dispatch(fetchPage(prevPageApi))
  }
  const openModalWindow = (eo) => {
    eo = eo || window.event
    eo.preventDefault()
    const currentEventId = (eo.target.id ? eo.target.id : eo.target.parentElement.id);
    dispatch(currentPersonageForWatch(listWithPers.filter((d) => +d.id === +currentEventId)[0]))
    dispatch(modalStatusChange())
  }
  return (
    <div className="App">
      {listWithPers.map((pers) => <Personage key={pers.id} id={pers.id} onClick={openModalWindow} namePersonage={pers.name} img={pers.image} />)}
      {modalWindowStatus ? <KeepMountedModal {...currentPersonageForModal} /> : ''}
      <button onClick={fetchNextPage}> click me for get next page</button>
      <button onClick={fetchPrevPage}> click me for get prev page</button>
    </div>
  );
}

export default App;
