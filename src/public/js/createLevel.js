const saveLevel = async() => {
    const levelStructure = getLevelStructure();
    await axios.post('/level', { levelStructure, author: 'Someone' });
}