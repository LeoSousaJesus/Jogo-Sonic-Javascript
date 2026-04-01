function Labirinto(context) {
    this.context = context;
    this.tamanhoBloco = 50; 
    this.imagemFundo = null; // Receberá a imagem de fundo da fase
    this.nivelAtual = 0;

    // 5 Mapas (0 a 4). 1 = Parede, 0 = Caminho livre
    this.mapas = [
        // Fase 1 (Mais aberto)
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        // Fase 2
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,1,0,0,0,0,0,1],
            [1,0,0,1,0,1,1,1,0,1],
            [1,1,0,0,0,0,0,1,0,1],
            [1,0,0,1,1,1,0,0,0,1],
            [1,0,1,1,0,0,0,1,1,1],
            [1,0,0,0,0,1,0,0,0,1],
            [1,1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        // Fase 3
        [
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
        ],
        // Fase 4
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,1,0,0,0,1,0,0,1],
            [1,0,1,0,1,0,1,0,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,0,0,1],
            [1,0,0,0,1,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        // Fase 5 (Chefe - Muito fechado)
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,1,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ]
    ];
}

Labirinto.prototype = {
    atualizar: function() {}, 
    desenhar: function() {
        var ctx = this.context;
        var mapaAtual = this.mapas[this.nivelAtual];

        // 1. Desenhar a imagem de fundo (se existir)
        if (this.imagemFundo) {
            ctx.drawImage(this.imagemFundo, 0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
            // Fundo escuro padrão caso a imagem não carregue
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        // 2. Desenhar as paredes do labirinto (com transparência para ver o fundo)
        ctx.fillStyle = 'rgba(45, 45, 45, 0.8)'; // Parede semi-transparente
        for (var i = 0; i < mapaAtual.length; i++) {
            for (var j = 0; j < mapaAtual[i].length; j++) {
                if (mapaAtual[i][j] === 1) {
                    ctx.fillRect(j * this.tamanhoBloco, i * this.tamanhoBloco, this.tamanhoBloco, this.tamanhoBloco);
                    // Opcional: borda na parede
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(j * this.tamanhoBloco, i * this.tamanhoBloco, this.tamanhoBloco, this.tamanhoBloco);
                }
            }
        }
    },
    colidiu: function(x, y, largura, altura) {
        var mapaAtual = this.mapas[this.nivelAtual];
        var blocoEsq = Math.floor(x / this.tamanhoBloco);
        var blocoDir = Math.floor((x + largura) / this.tamanhoBloco);
        var blocoCima = Math.floor(y / this.tamanhoBloco);
        var blocoBaixo = Math.floor((y + altura) / this.tamanhoBloco);

        for (var i = blocoCima; i <= blocoBaixo; i++) {
            for (var j = blocoEsq; j <= blocoDir; j++) {
                if (mapaAtual[i] && mapaAtual[i][j] === 1) {
                    return true;
                }
            }
        }
        return false;
    }
}