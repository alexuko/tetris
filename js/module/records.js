
export default class Records {
    constructor(player,level){
        this.player = !player ? 'unknown' : player;
        this.level = !level || level < 1 ? 1 : level ;
        this.score = 0;
        this.lines = 0;        
        
    }
    
    setInitialUIvalues(){
        this.setName(this.player);
        this.setLevel(this.level);
        this.setLines(this.lines);
        this.setScore(this.score);
        
    }
    
    getLevel(){
        return this.level;
    }    
    getScore(){
        return this.score;
    }
    getLines(){
        return this.lines;
    }

    setLevel(level){
        let levelUI = document.querySelector('strong.current_level');
        levelUI.textContent = this.level = level;        
    }    

    setScore(score){
        let scoreUI = document.querySelector('strong.current_score');
        scoreUI.textContent = this.score = score;
    }
    setLines(lines){
        let linesUI = document.querySelector('strong.current_lines');
        linesUI.textContent = this.lines = lines;
    }
    setName(name){
        let playerUI = document.querySelector('strong.current_player');
        playerUI.textContent = this.player = name;
    }


}