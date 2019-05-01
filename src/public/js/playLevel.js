const levelId = window.location.pathname.replace('/level/','');
let levelStructure = {};
const createLevel = false;

(async() => {
    const levelObj = await axios.get(API.level + '/' + levelId);
    levelStructure = levelObj.data.levelStructure;
    levelShouldLoad = true;
    const { author } = levelObj.data;
    document.title = `Playing ${author.name}'s level`;
})();
