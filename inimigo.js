function Inimigo(context, labirinto, x, y) {
    this.context = context;
    this.labirinto = labirinto;
    this.x = x;
    this.y = y;
    this.largura = 30;
    this.altura = 30;
    this.velocidadeX = 2;
    this.velocidadeY = 0;
    this.excluir = false; // Flag para remover o inimigo se morrer
}

Inimigo.prototype = {
    atualizar: function() {
        var novoX = this.x + this.velocidadeX;
        var novoY = this.y + this.velocidadeY;

        // Se bater na parede, inverte a direção
        if (this.labirinto.colidiu(novoX, novoY, this.largura, this.altura)) {
            this.velocidadeX *= -1;
        } else {
            this.x = novoX;
            this.y = novoY;
        }
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.fillStyle = 'green'; // Cor do inimigo
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}