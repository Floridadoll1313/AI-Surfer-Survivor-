// Simple Navigation Logic for your Surfer Survivor tiers
const handleTierSelection = (tier) => {
  console.log(`User selected the ${tier} tier`);
  
  // Logic: Send them to the specific dashboard route
  if (tier === 'blue') {
    window.location.href = '/dashboard-blue';
  } else {
    window.location.href = '/dashboard-pink';
  }
};

// Example usage on a button:
// <button onClick={() => handleTierSelection('blue')}>Go Pro Survivor</button>
