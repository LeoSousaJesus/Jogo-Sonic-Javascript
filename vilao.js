function Vilao(context, imagem, animacao, labirinto, sonic, nivel) {
    this.context = context;
    this.animacao = animacao;
    this.labirinto = labirinto;
    this.sonic = sonic; // Referência ao herói para perseguição
    
    // TAMANHO PADRÃO DO SONIC PARA COLISÃO E DESENHO
    this.largura = 35;
    this.altura = 40;
    
    // Posição inicial (ajustada para não nascer dentro da parede)
    this.x = 400; 
    this.y = 400;
    
    // Dificuldade baseada no nível (1 a 5)
    this.velocidade = 1 + (nivel * 0.5); // Aumenta a velocidade
    this.intervaloTiro = 120 - (nivel * 15); // Atira mais rápido em níveis altos
    this.contadorTiro = 0;

    // IA de movimento
    this.direcoes = [
        {vx: this.velocidade, vy: 0, l: 1, c: 0}, // Direita
        {vx: -this.velocidade, vy: 0, l: 2, c: 0}, // Esquerda
        {vx: 0, vy: -this.velocidade, l: 0, c: 0}, // Cima
        {vx: 0, vy: this.velocidade, l: 0, c: 0}  // Baixo
    ];
    this.dirAtual = 0; // Começa indo pra direita

    // Criando a spritesheet a partir da imagem recebida (padrão 3x8)
    this.sheet = new Spritesheet(context, imagem, 3, 8);
    this.sheet.intervalo = 60;
    this.excluir = false;
    this.tipo = "vilao";
}

Vilao.prototype = {
    atualizar: function() {
        // Tentar mover na direção atual
        var novoX = this.x + this.direcoes[this.dirAtual].vx;
        var novoY = this.y + this.direcoes[this.dirAtual].vy;

        // Se bater na parede, escolhe uma nova direção
        if (this.labirinto.colidiu(novoX, novoY, this.largura, this.altura)) {
            // Escolhe uma direção aleatória válida para não ficar travado
            var possiveis = [];
            for(var i=0; i<4; i++) {
                if(!this.labirinto.colidiu(this.x + this.direcoes[i].vx, this.y + this.direcoes[i].vy, this.largura, this.altura)){
                    possiveis.push(i);
                }
            }
            if(possiveis.length > 0) {
                // Tenta focar no Sonic se der, senão vai aleatório
                this.dirAtual = possiveis[Math.floor(Math.random() * possiveis.length)];
            }
        } else {
            this.x = novoX;
            this.y = novoY;
        }

        // Atualiza a animação
        this.sheet.linha = this.direcoes[this.dirAtual].l;
        this.sheet.proximoQuadro();

        // Lógica de Atirar
        this.contadorTiro++;
        if (this.contadorTiro >= this.intervaloTiro) {
            this.atirar();
            this.contadorTiro = 0;
        }
    },
    desenhar: function() {
        // O método desenhar da Spritesheet já usa a largura e altura definidas no construtor
        this.sheet.desenhar(this.x, this.y);
    },
    atirar: function() {
        var tiro = new Bola(this.context);
        tiro.x = this.x + 15;
        tiro.y = this.y + 20;
        tiro.raio = 6;
        tiro.cor = 'gold'; // Moeda de ouro
        tiro.tipo = "tiro_vilao"; // Identificador para não acertar o próprio vilão

        // Atira na direção que está olhando
        if (this.direcoes[this.dirAtual].vx < 0) tiro.velocidadeX = -8;
        else if (this.direcoes[this.dirAtual].vx > 0) tiro.velocidadeX = 8;
        else if (this.direcoes[this.dirAtual].vy < 0) tiro.velocidadeY = -8;
        else tiro.velocidadeY = 8;

        this.animacao.novoSprite(tiro);
    }
}