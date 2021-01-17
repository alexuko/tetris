let playerUI = document.querySelector('strong.current_player');
let levelUI = document.querySelector('strong.current_level');
let linesUI = document.querySelector('strong.current_lines');
let scoreUI = document.querySelector('strong.current_score');

export default class Records {
    constructor(player,level){
        this.player = !player ? 'unknown' : player;
        this.score = 0;
        this.level = !level ? 0 : level ;
        this.lines = 0;        

        
    }
    
    setInitialUIvalues(){
        playerUI.textContent = `${this.player}`;
        levelUI.textContent = `${this.level}`;
        linesUI.textContent = `${this.lines}`;
        scoreUI.textContent = `${this.score}`;
        
    }

    updateUIValues(score,level,lines) {
        //get the current values and update UI
        levelUI.textContent = `${level}`;
        linesUI.textContent = `${lines}`;
        scoreUI.textContent = `${score}`;
    }


}