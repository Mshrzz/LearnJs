const ourTeamChangePhoto = () => {
    const commandBlock = document.getElementById('command');

    commandBlock.addEventListener('mouseover', (e) => 
        [e.target.dataset.img, e.target.src] = [e.target.src, e.target.dataset.img]);
    commandBlock.addEventListener('mouseout', (e) => 
    [e.target.src, e.target.dataset.img] = [e.target.dataset.img, e.target.src]);

};

export default ourTeamChangePhoto;