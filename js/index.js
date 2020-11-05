window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        document.querySelector('.game-intro').classList.add('hide');
        startGame();
    };
    
    
    function startGame() {
        App.init();
    }
  
};