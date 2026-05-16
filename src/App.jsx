import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

export default function App() {
  const element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/creators', element: <ShowCreators /> },
    { path: '/creator/add', element: <AddCreator /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/creator/:id/edit', element: <EditCreator /> },
  ])
  return element
}
