import Header from './components/Header'; // Add this import

// Inside your return:
<AvatarProvider>
  <Router>
    <div className="min-h-screen bg-[#0a192f]">
      <Header /> {/* Add this here! */}
      <Routes>
        <Route path="/avatar" element={<AvatarSelector />} />
      </Routes>
    </div>
  </Router>
</AvatarProvider>
