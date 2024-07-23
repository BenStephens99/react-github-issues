import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Breadcrumb from './components/Breadrumb/Breadcrumb';
import IssueList from './components/IssueList/IssueList';
import IssuePage from './components/IssuePage/IssuePage';

import './App.css'

function App() {
  return (
    <>
    <Router>
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<IssueList />} />
        <Route path="/:issueNumber" element={<IssuePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
