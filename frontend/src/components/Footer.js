import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#00796b', color: '#fff', padding: '1rem', marginTop: 'auto' }}>
      <p>&copy; {new Date().getFullYear()} Climate Awareness. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
