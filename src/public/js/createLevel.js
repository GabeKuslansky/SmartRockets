const saveLevel = () => {
   const levelStructure = level.serialize();
    axios.post('/level', levelStructure);
}