import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [vibez, setVibez] = useState([
    { url: ' /videos/v1.mp4' },
    { url: ' /videos/v2.mp4' },
    { url: '/videos/v4.mp4' },
    { url: '/videos/v3.mp4' },
    { url: '/videos/v6.mp4' },
    { url: '/videos/v7.mp4' },
    { url: '/videos/v8.mp4' },
    { url: '/videos/v9.mp4' },
    { url: '/videos/v10.mp4' },
    { url: '/videos/v5.mp4' },
    { url: '/videos/v11.mp4' }

  ]);
  const [message, setMessage] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false); // No need for loading if hardcoding
  const videoRefs = useRef([]);

  const headerStyle = {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderBottom: '1px solid #eaeaea',
  };

  const searchStyle = {
    marginLeft: '20px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const navStyle = {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const videoStyle = {
    width: '100%',
    marginBottom: '20px',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('Login successful!');
    setIsLoginOpen(false);
  };

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause(); // Pause all other videos except the one that is playing
      }
    });
  };

  const VideoPlayer = ({ videoSrc, index }) => (
    <section style={{ flex: '2', padding: '10px' }}>
      <h2 style={{ fontSize: '1.8em', marginBottom: '10px' }}>Featured Video {index + 1}</h2>
      <video
        controls
        style={videoStyle}
        ref={(el) => (videoRefs.current[index] = el)}
        onPlay={() => handlePlay(index)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );

  
  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
      <header style={headerStyle}>
        <h1 style={{ fontSize: '1.5em', color: '#FF0000' }}>Vibez</h1>
       
        <nav>
          <ul style={navStyle}>
            <li><a href="#home">Home</a></li>       
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#login" onClick={() => setIsLoginOpen(true)}>Login</a></li>
          </ul>
        </nav>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        {vibez.map((video, index) => (
          <VideoPlayer key={index} videoSrc={video.url} index={index} />
        ))}
      </main>

      <footer
        style={{
          padding: '10px 0',
          backgroundColor: '#f9f9f9',
          textAlign: 'center',
          borderTop: '1px solid #eaeaea',
        }}
      >
        <p style={{ margin: '0' }}>&copy; 2024 Vibez - Your Video Streaming Platform</p>
      </footer>

      {isLoginOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '100%',
                  }}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '100%',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#FF0000',
                  color: '#fff',
                  border: 'none',
                }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  backgroundColor: '#ccc',
                  color: '#000',
                  border: 'none',
                  marginLeft: '10px',
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


  
  