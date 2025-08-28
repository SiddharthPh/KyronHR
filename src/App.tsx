import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeDirectory from './pages/EmployeeDirectory';
import BoardingManagement from './pages/BoardingManagement';
import PerformanceGoals from './pages/PerformanceGoals';
import TimeOffManagement from './pages/TimeOffManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<EmployeeDirectory />} />
          <Route path="boarding" element={<BoardingManagement />} />
          <Route path="performance" element={<PerformanceGoals />} />
          <Route path="timeoff" element={<TimeOffManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
