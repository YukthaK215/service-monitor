import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './ServiceCard';
function Dashboard() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/monitor/check')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      {services.map((s, i) => <ServiceCard key={i} service={s} />)}
    </div>
  );
}
export default Dashboard;