const newWallet = wallet - costs[type];
    setWallet(newWallet);
    localStorage.setItem('survivor_wallet', newWallet.toString());

    if (type === 'energy') {
      const nextEnergy = energyMax + 20;
      setEnergyMax(nextEnergy);
      localStorage.setItem('upgrade_energy', nextEnergy.toString());
    } else if (type === 'speed') {
      const nextSpeed = speedMod + 1;
      setSpeedMod(nextSpeed);
      localStorage.setItem('upgrade_speed', nextSpeed.toString());
    } else if (type === 'shield') {
      setHasShield(true);
    }
    setShowShop(false);
  };
