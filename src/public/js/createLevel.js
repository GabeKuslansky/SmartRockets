const createLevel = true;
const saveLevel = async () => {
    if(level.target == null || level.spawnCoordinate == null)
        return;
   const levelStructure = level.serialize();
   $('#createLevelBtn').attr('disabled', 'disabled').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
   try {
       await axios.post(API.level, levelStructure);
       window.location.href = '/';
    } catch (error) {
        alert(error);
    }

}