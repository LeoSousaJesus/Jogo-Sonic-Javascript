var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;
var SONIC_SUBINDO = 3;
var SONIC_DESCENDO = 4;

function Sonic(context, teclado, imagem, animacao) { 
   this.context = context; 
   this.teclado = teclado; 
   this.animacao = animacao;
   
   this.x = 0; 
   this.y = 0; 
   this.largura = 35; // Área de colisão do sprite (largura)
   this.altura = 40;  // Área de colisão do sprite (altura)
   this.velocidade = 5; // Velocidade ajustada para navegar melhor no labirinto
   
   this.labirinto = null; // Será atribuído depois no ficheiro HTML

   // Criando a spritesheet a partir da imagem recebida
   this.sheet = new Spritesheet(context, imagem, 3, 8);
   this.sheet.intervalo = 60;

   // Estado inicial
   this.andando = false;
   this.direcao = SONIC_DIREITA;
} 

Sonic.prototype = { 
   atualizar: function() { 
      // Em vez de mover o Sonic imediatamente, calculamos para onde ele quer ir
      var novoX = this.x;
      var novoY = this.y;

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

         // Preparamos o deslocamento
         novoX += this.velocidade;
      }
      else if (this.teclado.pressionada(SETA_ESQUERDA)) {
         if (! this.andando || this.direcao != SONIC_ESQUERDA) {
            this.sheet.linha = 2;  
            this.sheet.coluna = 0;
         }

         this.andando = true;
         this.direcao = SONIC_ESQUERDA;
         this.sheet.proximoQuadro();
         novoX -= this.velocidade; 
      }
      else if (this.teclado.pressionada(SETA_CIMA)) {
            if (! this.andando || this.direcao != SONIC_SUBINDO) {
                this.sheet.linha = 0; 
                this.sheet.coluna = 0; 
            }
            this.andando = true;
            this.direcao = SONIC_SUBINDO;
            novoY -= this.velocidade; 
      }
      else if (this.teclado.pressionada(SETA_BAIXO)) {
            if (! this.andando || this.direcao != SONIC_DESCENDO) {
                this.sheet.linha = 0; 
                this.sheet.coluna = 0;
            }
            this.andando = true;
            this.direcao = SONIC_DESCENDO;
            novoY += this.velocidade; 
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

      // Verificação de colisão: O Sonic só se move se não bater na parede
      if (this.labirinto) {
          if (!this.labirinto.colidiu(novoX, novoY, this.largura, this.altura)) {
              this.x = novoX;
              this.y = novoY;
          }
      } else {
          // Fallback caso o labirinto ainda não tenha sido carregado
          this.x = novoX;
          this.y = novoY;
      }
   }, 

   desenhar: function() { 
      this.sheet.desenhar(this.x, this.y);         
   },
   
   atirar: function() {
      var tiro = new Bola(this.context);
      tiro.x = this.x + 10;
      tiro.y = this.y + 20; // Ligeiramente ajustado para sair do meio do sprite
      tiro.raio = 5;
      tiro.cor = 'red';

      // Lendo a direção atual
      if (this.direcao == SONIC_ESQUERDA)
         tiro.velocidadeX = -10;
      else 
         tiro.velocidadeX = 10;

      // Adicionamos um identificador ao tiro para facilitar a verificação de colisões
      tiro.tipo = "tiro";
      
      // Bug corrigido (removido o ".bola.js" que estava no final)
      this.animacao.novoSprite(tiro);

      return tiro; 
   }
}