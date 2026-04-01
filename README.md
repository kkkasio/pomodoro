# Pomodoro à Prova de Esposa 🍅

Um app de Pomodoro construído com React, Vite, TypeScript e Zustand.

O motivo principal de eu ter feito isso (e com uma funcionalidade de "pausa" bem destacada) é que **minha mulher toda hora me chama** bem no meio da minha sessão de foco. Antes eu perdia os timers, agora eu pauso, resolvo o que tem que resolver e continuo de onde parei.

## O que tem por baixo do capô

- **Sincronia**: O motor do relógio roda via WebWorker (bom pra voces darem uma olhada como funfa). Isso significa que ele não trava e nem perde a conta mesmo se o navegador jogar a aba pro modo suspenso/background.
- **Rádio Lofi**: YT Player embutido flutuante tocando direto do YouTube no cantinho.
- **Avisos Sonoros**: Sintetizador com Web Audio nativo (um som de arpejo pra quando acaba o foco e o clássico de despertador pra terminar de enrolar no descanso) (não pensei em um tom de áudio legal rsrs).
- **Mantras Diários**: Puxa frases dinâmicas e varre o `localStorage` para garantir que o mantra de hoje nunca seja repetido na semana (integração facil com um json, aceito uma api melhor de frases motivacionais).
- **Estado Global**: Controle redondinho usando Zustand sem bagunça de props.

## Rodando local

```bash
# Baixa as dependências
yarn install

# Roda o app localmente
yarn dev
```

Feito para resolver um problema real de foco! 🚀
