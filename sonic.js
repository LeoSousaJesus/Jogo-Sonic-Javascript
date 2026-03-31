var SONIC_DIREITA = 1;

var SONIC_ESQUERDA = 2;

var SONIC_SUBINDO = 3;

var SONIC_DESCENDO = 4;

function Sonic(context, teclado, imagem) { 

   this.context = context; 

   this.teclado = teclado; 

   this.animacao = animacao;

   this.x = 0; 

   this.y = 0; 

   this.velocidade = 8;



   // Criando a spritesheet a partir da imagem recebida

   this.sheet = new Spritesheet(context, imagem, 3, 8);

   this.sheet.intervalo = 60;



   // Estado inicial

   this.andando = false;

   this.direcao = SONIC_DIREITA;

} 

Sonic.prototype = { 

   atualizar: function() { 

      if (this.teclado.pressionada(SETA_DIREITA)) {

         // Se já não estava neste estado...

         if (! this.andando || this.direcao != SONIC_DIREITA) {

            // Seleciono o quadro da spritesheet

            this.sheet.linha = 1;

            this.sheet.coluna = 0;

         }



         // Configuro o estado atual

         this.andando = true;

         this.direcao = SONIC_DIREITA;



         // Neste estado, a animação da spritesheet deve rodar

         this.sheet.proximoQuadro();



         // Desloco o Sonic

         this.x += this.velocidade;

      }



      else if (this.teclado.pressionada(SETA_ESQUERDA)) {

         if (! this.andando || this.direcao != SONIC_ESQUERDA) {

            this.sheet.linha = 2;  // Atenção, aqui será 2!

            this.sheet.coluna = 0;

         }



         this.andando = true;

         this.direcao = SONIC_ESQUERDA;

         this.sheet.proximoQuadro();

         this.x -= this.velocidade;  // E aqui é sinal de menos!

      }

      else if (this.teclado.pressionada(SETA_CIMA)) {
            if (! this.andando || this.direcao != SONIC_SUBINDO) {
                this.sheet.linha = 0; 
                this.sheet.coluna = 0; 
            }
            this.andando = true;
            this.direcao = SONIC_SUBINDO;
            //this.sheet.proximoQuadro();
            this.y -= this.velocidade; 
      }

      else if (this.teclado.pressionada(SETA_BAIXO)) {
            if (! this.andando || this.direcao != SONIC_DESCENDO) {
                this.sheet.linha = 0; 
                this.sheet.coluna =0;
            }
            this.andando = true;
            this.direcao = SONIC_DESCENDO;
            //this.sheet.proximoQuadro();
            this.y += this.velocidade; 
      }

      else {

         if (this.direcao == SONIC_DIREITA) 

            this.sheet.coluna = 0; 

         else if (this.direcao == SONIC_ESQUERDA) 

            this.sheet.coluna = 1; 



         this.sheet.linha = 0; 

         // Não chamo proximoQuadro!

         this.andando = false; 

      }

   }, 

   desenhar: function() { 

      this.sheet.desenhar(this.x, this.y);         

   },
      atirar: function() {
      var tiro = new Bola(this.context);
      tiro.x = this.x + 10;
      tiro.y = this.y + 30;
      tiro.raio = 5;
      tiro.cor = 'red';

      // Lendo a direção atual
      if (this.direcao == SONIC_ESQUERDA)
         tiro.velocidadeX = -20;
      else 
         tiro.velocidadeX = 20;

      this.animacao.novoSprite(tiro);bola.js

   }

   }