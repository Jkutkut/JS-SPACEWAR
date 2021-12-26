class ScoreSystem {

    static playerIds = {
        usr:    (i) => { return `#usr${i+1}`;},
        d:      (i) => { return `#kda-d${i+1}`;},
        k:      (i) => { return `#kda-k${i+1}`;}
    }

    constructor(configuration) {
        this.players = this.createPlayers(configuration);
        this.updatePlayers();
    }

    createPlayers(players) {
        for (let i = 0; i < players.length; i++) {
            players[i].deaths = 0;
            players[i].kills = 0;
            players[i].score = 0;
            players[i].streak = 0;
        }
        return players;
    }

    updatePlayers() {
        for (let i = 0; i < this.players.length; i++) {
            this.updatePlayer(i);
        }
    }

    updatePlayer(index) {
        if (index > this.players.length) {
            return;
        }
        $(ScoreSystem.playerIds.usr(index)).html(this.players[index].name);
        $(ScoreSystem.playerIds.d(index)).html(this.players[index].deaths);
        $(ScoreSystem.playerIds.k(index)).html(this.players[index].kills);

    }
}