function Labirinto(context) {
    this.context = context;
    this.tamanhoBloco = 50; // Cada bloco do labirinto terá 50x50 pixels
    // Mapa: 1 = Parede, 0 = Caminho livre
    this.mapa = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,0,0,1,0,0,1],
        [1,0,1,1,1,1,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,1,1,1,1,0,1],
        [1,0,1,0,1,0,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ];
}

Labirinto.prototype = {
    atualizar: function() {}, // Necessário para a engine de animação
    desenhar: function() {
        var ctx = this.context;
        ctx.fillStyle = '#2d2d2d'; // Cor da parede do labirinto
        for (var i = 0; i < this.mapa.length; i++) {
            for (var j = 0; j < this.mapa[i].length; j++) {
                if (this.mapa[i][j] === 1) {
                    ctx.fillRect(j * this.tamanhoBloco, i * this.tamanhoBloco, this.tamanhoBloco, this.tamanhoBloco);
                }
            }
        }
    },
    // Verifica se uma área retangular sobrepõe alguma parede
    colidiu: function(x, y, largura, altura) {
        var blocoEsq = Math.floor(x / this.tamanhoBloco);
        var blocoDir = Math.floor((x + largura) / this.tamanhoBloco);
        var blocoCima = Math.floor(y / this.tamanhoBloco);
        var blocoBaixo = Math.floor((y + altura) / this.tamanhoBloco);

        for (var i = blocoCima; i <= blocoBaixo; i++) {
            for (var j = blocoEsq; j <= blocoDir; j++) {
                if (this.mapa[i] && this.mapa[i][j] === 1) {
                    return true; // Bateu na parede
                }
            }
        }
        return false;
    }
}