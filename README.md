# COACH NUTRICIONAL® · site v4

Site estático de 7 páginas. Sem build, sem dependência. Suba o conteúdo desta pasta na raiz do repositório e a Vercel publica direto.

## Estrutura

```
index.html                    → /                          HOME, porta de entrada
certificacao.html             → /certificacao              o que entrega, 3 Es, protocolo, segurança, diferenciais, elegibilidade, comparativo
conteudo-programatico.html    → /conteudo-programatico     grade completa em acordeão
corpo-docente.html            → /corpo-docente             30 docentes + padrões de referência
investimento.html             → /investimento              oferta, garantia e FAQ
sobre.html                    → /sobre                     Science Play, compromissos editoriais, dados institucionais
ficha-tecnica.html            → /ficha-tecnica             página de consulta, fora do menu, dentro do sitemap
assets/cn.css                 → reset, cabeçalho, rodapé, barra mobile, estados e responsividade
assets/cn.js                  → contagem regressiva, drawer, acordeões, seletor de perfil, UTM, dataLayer
vercel.json                   → cleanUrls, redirects, cache dos assets
robots.txt · sitemap.xml · llms.txt
```

## O que mudou em relação à v3

A HOME deixou de ser rolagem infinita. Ela agora entrega hero, faixa institucional, o problema, a definição, o resumo da arquitetura da formação e a navegação para as sub páginas. Todo o resto virou página própria, com cabeçalho fixo, indicador de página ativa, drawer no mobile, rodapé em quatro colunas e blocos de "próximo passo" no fim de cada página.

A **ficha técnica** saiu da HOME e virou `/ficha-tecnica`: fora do menu principal, presente no sitemap e linkada no rodapé e nos blocos de próximo passo.

O bloco de nomes de universidades virou uma **grade de logos monocromáticas** em `assets/logos/`: 12 marcas fornecidas pelo cliente, convertidas para um único tom de cinza (#5F6B6A) com fundo transparente, recortadas no conteúdo e equalizadas por altura óptica célula a célula. Os arquivos são servidos do próprio domínio — nenhum hotlink para site de universidade ou Wikimedia.

Para trocar uma marca: substitua o PNG em `assets/logos/` mantendo o mesmo tom único e o fundo transparente, e ajuste o `max-height` daquela célula em `index.html`.

## A diagramação vive nas páginas

Cada página carrega a sua diagramação em estilos inline; `cn.css` cuida só do reset, do chrome compartilhado (cabeçalho, rodapé, barra mobile), dos estados de interação e do responsivo. Para alterar um bloco, edite a página. Para alterar cabeçalho, rodapé ou comportamento, edite `assets/cn.css` e `assets/cn.js` — e replique o HTML do cabeçalho/rodapé nas 7 páginas.

## Antes de publicar

1. **Fotos.** `/corpo-docente` tem dois placeholders "Foto a inserir" na direção técnica. Substituir pelas imagens hospedadas no Cloudinary.
2. **Licenças das logos.** As 12 marcas em `assets/logos/` foram fornecidas pelo cliente. Confirmar autorização de uso de cada titular antes de publicar.
3. **Contagem regressiva.** Em `assets/cn.js`, constante `DEADLINE`, hoje `2026-09-30T23:59:59-03:00`.
4. **Renovação do membership.** Valor ainda não definido. A FAQ fala em renovação opcional, sem número.
5. **Garantia.** Está em 7 dias. Se subir para 15, alterar em `investimento.html` (bloco de garantia, selos e FAQ) e no JSON-LD da FAQ.
6. **Datas do sitemap.** `lastmod` está em 2026-09-02.

## Preços vigentes

| Perfil | Padrão | Destaque | À vista | Checkout |
|---|---|---|---|---|
| Profissional de saúde | R$ 1.997 | 12x de R$ 134,14 | R$ 1.297,00 | `pay.hotmart.com/Q107343998H?off=op5bstjb` |
| Estudante de graduação | R$ 997 | 12x de R$ 72,09 | R$ 697,00 | `pay.hotmart.com/Q107343998H?off=ntka92gh` |

O parcelamento da Hotmart tem juros (12x R$ 134,14 = R$ 1.609,68). A expressão "sem juros" não aparece em nenhum ponto do site. Não reintroduzir. Para alterar, editar o objeto `TIERS` em `assets/cn.js` e o bloco de preço em `investimento.html`.

## Dados estruturados

- `/` — Organization, Course, WebPage, BreadcrumbList
- `/investimento` — FAQPage, WebPage, BreadcrumbList
- `/sobre` — Organization, WebPage, BreadcrumbList
- demais páginas — WebPage, BreadcrumbList

## Eventos no dataLayer

`cn_cta_hero`, `cn_cta_nav`, `cn_cta_final`, `cn_cta_mobile`, `cn_cta_footer`, `cn_cta_checkout`, `cn_cta_grade`, `cn_cta_docentes`, `cn_select_tier`, `cn_acc_open`, `cn_grade_expandir`, `cn_grade_recolher`, `cn_scroll_depth`.

## Regras de governança do conteúdo

Não reintroduzir sem contrato assinado ou confirmação:

- "Certificação internacional" sem a ressalva de escopo, e "registrado no MEC"
- Menção a patrocínio, sponsorship ou afiliação ao Institute of Coaching, ao McLean Hospital ou a Harvard Medical School — removida do site em setembro de 2026, só volta com contrato vigente
- Logo de instituição de terceiro sem arquivo licenciado servido do próprio domínio. Nunca fazer hotlink de logo em site de universidade ou Wikimedia
- Logo colorida na faixa institucional. A faixa é monocromática por decisão editorial: todas as marcas no mesmo tom de cinza
- Mayo Clinic como corpo docente (só serve como referência metodológica)
- Kit Físico do Paciente e Plataforma Clínica (produtos futuros)
- "Sem juros" no parcelamento
- Toolkit dos 26 instrumentos, prática supervisionada, avaliação por rubrica e mentor coaching
- Protocolo engessado em sessões de 50 minutos ou fases por mês. O protocolo é apresentado como estrutura adaptável
- Qualquer docente fora da grade oficial, e placeholders de docente. A aula "Comportamento alimentar disfuncional e crenças" está publicada com "docente a definir"

## Pendências de conteúdo herdadas da v3

- A grade soma 61h de conteúdo gravado; as 80h totais incluem as 20h ao vivo. Confirmar o arredondamento com a direção técnica.
- Divergências internas de carga horária: Pilar 1 declara 8h e soma 7h; Pilar 3 declara 6h e soma 7h; Pilar 5 declara 20h e soma 18h; Introdução declara 3h e soma 2h30.
- Duas "Bianca Andrade" no programa original (psiquiatra do IPq-USP e psicóloga do COB). No site estão como Bianca Besteti Damiano e Bianca Andrade. Confirmar.
