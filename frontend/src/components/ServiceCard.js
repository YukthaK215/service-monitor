import React from 'react';
function ServiceCard({ service }) {
  return (
    <div style={{ border: '1px solid gray', margin: '10px', padding: '10px', backgroundColor: service.status === 'UP' ? 'lightgreen' : 'lightcoral' }}>
      <h3>{service.name}</h3>
      <p>{service.url}</p>
      <p>Status: {service.status}</p>
    </div>
  );
}
export default ServiceCard;