# COACH NUTRICIONAL® · Site de lançamento

Site estático de 3 páginas. Sem build, sem dependência. Arraste o conteúdo desta pasta para a raiz do repositório e a Vercel publica direto.

## Estrutura

```
index.html                    → /                          página de vendas
conteudo-programatico.html    → /conteudo-programatico     grade completa
corpo-docente.html            → /corpo-docente             28 docentes
assets/cn.css                 → estilos compartilhados
assets/cn.js                  → scripts compartilhados
vercel.json                   → cleanUrls, redirect 301, cache dos assets
robots.txt                    → libera Googlebot, GPTBot, PerplexityBot, ClaudeBot
sitemap.xml                   → 3 URLs
llms.txt                      → resumo estruturado para motores generativos
```

`vercel.json` já faz o redirect 301 de `/certificacao` para `/`, preservando o que estava indexado.

## Antes de publicar

1. **Renovação do membership.** Valor ainda não definido. A FAQ fala em renovação opcional, sem número.
3. **Garantia.** Está em 7 dias. Se subir para 15, alterar em `index.html` (FAQ, bloco `.guarantee` e `.trust`) e no JSON-LD da FAQ.
4. **Contagem regressiva.** Em `assets/cn.js`, constante `DEADLINE`, hoje `2026-09-30T23:59:59-03:00`.

## Preços vigentes

| Perfil | Padrão | Destaque na página | À vista | Checkout |
|---|---|---|---|---|
| Profissional de saúde | R$ 1.997 | 12x de R$ 134,14 | R$ 1.297,00 | `pay.hotmart.com/Q107343998H?off=op5bstjb` |
| Estudante de graduação | R$ 997 | 12x de R$ 72,09 | R$ 697,00 | `pay.hotmart.com/Q107343998H?off=ntka92gh` |

O número em destaque no bloco de preço é a parcela, com asterisco. O valor à vista aparece na linha logo abaixo. A nota do asterisco informa que o parcelamento tem juros da plataforma.

O parcelamento da Hotmart tem juros (12x R$ 134,14 = R$ 1.609,68). Por isso a expressão "sem juros" foi removida de todo o site. Não reintroduzir.

Para alterar, editar o objeto `TIERS` em `assets/cn.js` e o bloco `.price` em `index.html`.

## Eventos no dataLayer

`cn_cta_hero`, `cn_cta_nav`, `cn_cta_final`, `cn_cta_mobile`, `cn_cta_checkout`, `cn_cta_grade`, `cn_cta_docentes`, `cn_select_tier`, `cn_faq_open`, `cn_modulo_abrir`, `cn_grade_expandir`, `cn_scroll_depth`.

## Regras de governança do conteúdo

Não reintroduzir sem contrato assinado ou confirmação:

- "Certificação internacional" e "registrado no MEC"
- Logos de Harvard, Mayo Clinic, Duke ou de qualquer instituição de terceiros. Só entram se houver arquivo licenciado hospedado no Cloudinary do projeto. Nunca fazer hotlink de logo em site de universidade ou Wikimedia: quebra, é frágil e é uso de marca sem autorização
- Mayo Clinic como corpo docente (não há docente confirmado da Mayo, só serve como referência metodológica)
- Kit Físico do Paciente e Plataforma Clínica (produtos futuros)
- "Sem juros" no parcelamento (o parcelamento da Hotmart tem juros)
- Toolkit dos 26 instrumentos, prática supervisionada, avaliação por rubrica e mentor coaching
- Protocolo engessado em 12 sessões, 12 semanas, 50 minutos ou fases por mês. O Módulo de Aplicação é apresentado como estrutura adaptável
- Qualquer docente fora da grade oficial
- Nomes marcados como "a confirmar" ou placeholders de docente. Só entra nome confirmado. A aula "Comportamento alimentar disfuncional e crenças" está publicada sem docente até a definição

## Pendências de conteúdo

- Você listou "7 PILARES" e nomeou 6. A grade também pula do Pilar 5 para "PILAR 8". Definir se existe um sétimo.
- A grade soma 61h de conteúdo. As 80h totais incluem prática supervisionada, estudos de caso e avaliação. Confirmar com a direção técnica.
- Divergências internas de carga horária: Pilar 1 declara 8h e soma 7h; Pilar 3 declara 6h e soma 7h; Pilar 5 declara 20h e soma 18h; Introdução declara 3h e soma 2h30.
- Duas "Bianca Andrade" no programa (psiquiatra do IPq-USP e psicóloga do COB). Se for a mesma pessoa, o total cai de 28 para 27 docentes.
- Aula "Comportamento alimentar disfuncional e crenças" está sem docente definido.
