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

1. **Links de checkout.** Em `assets/cn.js`, objeto `TIERS`, trocar as duas URLs `https://pay.coachnutricional.com.br/...` pelas reais. As UTMs são propagadas automaticamente.
2. **Renovação do membership.** Valor ainda não definido. A FAQ fala em renovação opcional, sem número.
3. **Garantia.** Está em 7 dias. Se subir para 15, alterar em `index.html` (FAQ, bloco `.guarantee` e `.trust`) e no JSON-LD da FAQ.
4. **Contagem regressiva.** Em `assets/cn.js`, constante `DEADLINE`, hoje `2026-09-30T23:59:59-03:00`.

## Preços vigentes

| Perfil | Padrão | Setembro | Parcelado |
|---|---|---|---|
| Profissional de saúde | R$ 1.997 | R$ 1.297 | 12x R$ 108,08 |
| Estudante de graduação | R$ 997 | R$ 697 | 12x R$ 58,08 |

Para alterar, editar o objeto `TIERS` em `assets/cn.js` e o bloco `.price` em `index.html`.

## Eventos no dataLayer

`cn_cta_hero`, `cn_cta_nav`, `cn_cta_final`, `cn_cta_mobile`, `cn_cta_checkout`, `cn_cta_grade`, `cn_cta_docentes`, `cn_select_tier`, `cn_faq_open`, `cn_modulo_abrir`, `cn_grade_expandir`, `cn_scroll_depth`.

## Regras de governança do conteúdo

Não reintroduzir sem contrato assinado ou confirmação:

- "Certificação internacional" e "registrado no MEC"
- Logos de Harvard, Mayo Clinic, Duke ou de qualquer instituição de terceiros
- Mayo Clinic como corpo docente (não há docente confirmado da Mayo, só serve como referência metodológica)
- Kit Físico do Paciente e Plataforma Clínica (produtos futuros)
- Qualquer docente fora da grade oficial

## Pendências de conteúdo

- Você listou "7 PILARES" e nomeou 6. A grade também pula do Pilar 5 para "PILAR 8". Definir se existe um sétimo.
- A grade soma 61h de conteúdo. As 80h totais incluem prática supervisionada, estudos de caso e avaliação. Confirmar com a direção técnica.
- Divergências internas de carga horária: Pilar 1 declara 8h e soma 7h; Pilar 3 declara 6h e soma 7h; Pilar 5 declara 20h e soma 18h; Introdução declara 3h e soma 2h30.
- Duas "Bianca Andrade" no programa (psiquiatra do IPq-USP e psicóloga do COB). Se for a mesma pessoa, o total cai de 28 para 27 docentes.
- Aula "Comportamento alimentar disfuncional e crenças" está sem docente definido.
