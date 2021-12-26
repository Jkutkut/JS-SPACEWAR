/**
 * Class to handle the score system of the game SPACEWAR.
 */
class ScoreSystem {

    /**
     * Kills needed to start a killing streak.
     */
    static STREAK = 3;

    /**
     * The points for killing a player.
     */
    static KILL_POINTS = 10;

    /**
     * The points for killing a player on a killing streak.
     */
    static KILL_STREAK_POINTS = 30;

    /**
     * Functions to get id of the element of the given player by their index.
     */
    static playerIds = {
        usr:    (i) => { return `#usr${i+1}`;},
        score:      (i) => { return `#points${i+1}`;},
        d:      (i) => { return `#kda-d${i+1}`;},
        k:      (i) => { return `#kda-k${i+1}`;},
        ac:      (i) => { return `#kda-ac${i+1}`;},
        flame:      (i) => { return `#flame${i+1}`;}
    }

    constructor(configuration) {
        this.players = this.createPlayers(configuration);
        
        for (let i = 0; i < this.players.length; i++) {
            this.updatePlayer(i);
        }

        for (let i = this.players.length; i < 4; i++) {
            $(`.player${i+1}`).hide();
        }
    }

    /**
     * @param {Object[]} players - Array of objects with the information of the players.
     * @returns The same object array with the information of the players and the stat elements.
     */
    createPlayers(players) {
        for (let i = 0; i < players.length; i++) {
            players[i].score = 0;
            players[i].kills = 0;
            players[i].deaths = 0;
            players[i].killStreak = 0;

            players[i].shots = 0;
            players[i].hits = 0;
        }
        return players;
    }

    /**
     * Updates the player's information on the screen.
     * @param {number} index - The index of the player to update.
     */
    updatePlayer(index) {
        if (index > this.players.length) {
            return;
        }
        $(ScoreSystem.playerIds.usr(index)).html(this.players[index].name);
        $(ScoreSystem.playerIds.score(index)).html(this.players[index].score);
        $(ScoreSystem.playerIds.d(index)).html(this.players[index].deaths);
        $(ScoreSystem.playerIds.k(index)).html(this.players[index].kills);

        // Calculate accuracy as a integer percentage
        let accuracy = Math.round(this.players[index].hits / this.players[index].shots * 100);
        $(ScoreSystem.playerIds.ac(index)).html((isNaN(accuracy)) ? "" : `${accuracy}%`);

        if (this.players[index].killStreak >= ScoreSystem.STREAK) {
            $(ScoreSystem.playerIds.flame(index)).attr('src', 'Res/Img/flame.png');
        }
        else {
            $(ScoreSystem.playerIds.flame(index)).attr('src', 'Res/Img/empty.png');
        }
    }

    // data entry methods

    /**
     * @param {number} killer - The index of the player who killed the victim.
     * @param {number} killed - The index of the player who was killed.
     */
    addKill(killer, killed) {
        if (killer != killed) {
            this.players[killer].kills++;
            this.players[killer].killStreak++;

            if (this.players[killer].killStreak >= ScoreSystem.STREAK) {
                this.players[killer].score += ScoreSystem.KILL_STREAK_POINTS;
            }
            else {
                this.players[killer].score += ScoreSystem.KILL_POINTS;
            }
        }
        this.players[killed].deaths++;
        this.players[killed].killStreak = 0;

        this.updatePlayer(killer);
        this.updatePlayer(killed);
    }

    /**
     * @param {number} shooter - The index of the player who shot the bullet.
     */
    addShot(shooter) {
        this.players[shooter].shots++;
        this.updatePlayer(shooter);
    }

    /**
     * @param {number} shooter - The index of the player who shot the bullet.
     */
    addBulletHit(shooter) {
        this.players[shooter].hits++;
        this.updatePlayer(shooter);
    }
}