function Explosao(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.raio = 5;
    this.fim = false;
}
Explosao.prototype = {
    atualizar: function() {
        this.raio += 2;
        if (this.raio > 30) { // Limite do tamanho da explosão
            this.fim = true; // Marca para ser removida da tela
        }
    },
    desenhar: function() {
        if (this.fim) return;
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = 'orange';
        ctx.globalAlpha = 1 - (this.raio / 30); // Efeito de esmaecer
        ctx.beginPath();
        ctx.arc(this.x + 15, this.y + 15, this.raio, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
    }
}