# COACH NUTRICIONAL® · site v5

Site estático de 7 páginas. Sem build, sem dependência. Suba o conteúdo desta pasta na raiz do repositório e a Vercel publica direto.

## O que mudou na v5 (refinamento · 02/10/2026)

Nada foi refeito. As 7 páginas, `cn.css` e `cn.js` foram refinados em cima da v4. Conteúdo, preços, regras de governança e estrutura de páginas permanecem.

**Responsivo**
- Toda grade `minmax(Npx,1fr)` virou `minmax(min(Npx,100%),1fr)`: nenhuma coluna fica mais larga que a tela. Corrige o corte lateral em telas de 320 a 360px (hero, "tudo o que está incluso", elegibilidade, segurança clínica, definição).
- Menu completo só a partir de 1181px. Entre 1081 e 1180px os cinco links sobrepunham o botão "Garantir vaga"; agora abre o drawer.
- Faixa de logos com colunas fixas (6 · 4 · 3 · 2 por largura) em vez de auto-fit: linhas sempre completas, logos nunca menores que a célula permite.
- `/investimento` no mobile: o card de preço vem antes da lista "tudo o que está incluso" e deixa de ser sticky.
- `/ficha-tecnica`: lista de dados em uma coluna no mobile (antes a coluna de valores ficava com menos de 100px).
- Cabeçalho mais baixo no mobile (92px em vez de 104px); barra inferior respeita a safe-area do iPhone (`viewport-fit=cover` exige isso).
- Botões do hero e da arquitetura ocupam a largura toda até 480px.

**Padronização**
- Raio de cards unificado em 16px (havia 14, 18 e 20). Botões primários com 56px de altura (havia 54, 56, 60 e 62). Grade de diferenciais com a mesma borda dos demais blocos.
- Cards de docentes com a borda padrão do site (1px #E3E0D8, ouro no hover) no lugar de 2px petróleo.
- Ouro sobre fundo claro (eyebrows, numerais, legenda de país, hovers) escurecido de #A88B4A para #856C33: contraste 4,5:1 sobre branco e marfim. O ouro #C6A664 sobre fundo escuro segue intacto.
- Textos secundários do rodapé com mais contraste.

**Conversão e percepção de valor**
- Hero da home: célula "5 países no corpo docente" com as bandeiras (us, ca, gb, it, br) no lugar de "12 sessões de protocolo". O protocolo de 12 semanas segue no texto do hero e na arquitetura.
- Preço e garantia nos cards "Investimento" de todas as páginas, no CTA final da home e na nota do hero.
- `/investimento`: barra mobile vai direto ao checkout e acompanha o perfil escolhido (profissional/estudante); o CTA do menu leva ao card de preço.
- Botões de checkout recuperaram o estado hover (havia dois atributos `class` no mesmo `<a>`; o segundo era ignorado).
- Contagem regressiva: ao expirar, o relógio some e a faixa mostra "inscrições encerradas".

**SEO · AEO · GEO**
- Títulos descritivos por página; descrição da home cita a Turma de Fundadores.
- `og:image` em 1200×630 via transformação Cloudinary (`c_pad`) em todas as páginas.
- JSON-LD: nó `WebSite` em todas as páginas; `WebPage` com url, description e dateModified; `Course` com syllabusSections (9 módulos), educationalCredentialAwarded, coursePrerequisites, instructor e image; `/corpo-docente` com `ItemList` dos 31 docentes como `Person` (afiliação, país, foto); `/conteudo-programatico` com `ItemList` dos módulos; `FAQPage` de `/investimento` alinhada 1:1 com as 11 perguntas visíveis.
- `sitemap.xml` com lastmod 2026-10-02; `llms.txt` com data de atualização.
- `assets/cn.css?v=5` e `assets/cn.js?v=5`. O `vercel.json` serve `/assets` com cache imutável de 1 ano, então toda edição de CSS/JS exige incrementar o `?v=` nas 7 páginas.
- `vercel.json` com Referrer-Policy, X-Frame-Options e Permissions-Policy.
- Pasta legada `certificacao/` removida: conteúdo reprovado em auditoria e conflito com `/certificacao` sob `cleanUrls`.

**Acessibilidade**
- `<main id="conteudo">`: o link "Ir para o conteúdo" apontava para um alvo inexistente.
- Burger com `aria-controls` e rótulo alternando abrir/fechar; Esc fecha o drawer.
- Poppins 300 passou a ser carregada: o "COACH" do wordmark pede peso 300 e o Google Fonts só entregava 400.

**Fotos oficiais**
- Brunna Boaventura: `https://res.cloudinary.com/dlzrfhwin/image/upload/v1790952997/Brunna_Boaventura_ew5svu.jpg`
- Brunno Falcão: `https://res.cloudinary.com/dlzrfhwin/image/upload/v1790964836/v2_feb93153-d52f-4fd5-a3bb-5074bfd678de_h9zvny.jpg`
- Em todas as ocorrências (direção técnica e cards de docente), via recorte facial do Cloudinary (`c_thumb,g_face`).

Fora do escopo desta rodada: `webinar/` e `obrigado/` (funil da aula aberta de 29/09, já realizada).

## Estrutura

```
index.html                    → /                          HOME, porta de entrada
certificacao.html             → /certificacao              o que entrega, 3 Es, protocolo, segurança, diferenciais, elegibilidade, comparativo
conteudo-programatico.html    → /conteudo-programatico     grade completa em acordeão
corpo-docente.html            → /corpo-docente             31 docentes + padrões de referência
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

O bloco de nomes de universidades virou uma **grade de logos monocromáticas** em `assets/logos/`: 12 marcas fornecidas pelo cliente, convertidas para um único tom de cinza (#5F6B6A) com fundo transparente, recortadas no conteúdo e equalizadas por altura óptica célula a célula. Os arquivos são servidos do próprio domínio · nenhum hotlink para site de universidade ou Wikimedia.

Para trocar uma marca: substitua o PNG em `assets/logos/` mantendo o mesmo tom único e o fundo transparente, e ajuste o `max-height` daquela célula em `index.html`.

## A diagramação vive nas páginas

Cada página carrega a sua diagramação em estilos inline; `cn.css` cuida só do reset, do chrome compartilhado (cabeçalho, rodapé, barra mobile), dos estados de interação e do responsivo. Para alterar um bloco, edite a página. Para alterar cabeçalho, rodapé ou comportamento, edite `assets/cn.css` e `assets/cn.js` · e replique o HTML do cabeçalho/rodapé nas 7 páginas.

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

- `/` · Organization, Course, WebPage, BreadcrumbList
- `/investimento` · FAQPage, WebPage, BreadcrumbList
- `/sobre` · Organization, WebPage, BreadcrumbList
- demais páginas · WebPage, BreadcrumbList

## Eventos no dataLayer

`cn_cta_hero`, `cn_cta_nav`, `cn_cta_final`, `cn_cta_mobile`, `cn_cta_footer`, `cn_cta_checkout`, `cn_cta_grade`, `cn_cta_docentes`, `cn_select_tier`, `cn_acc_open`, `cn_grade_expandir`, `cn_grade_recolher`, `cn_scroll_depth`.

## Regras de governança do conteúdo

Não reintroduzir sem contrato assinado ou confirmação:

- "Certificação internacional" sem a ressalva de escopo, e "registrado no MEC"
- Menção a patrocínio, sponsorship ou afiliação ao Institute of Coaching, ao McLean Hospital ou a Harvard Medical School, removida do site em setembro de 2026, só volta com contrato vigente
- Logo de instituição de terceiro sem arquivo licenciado servido do próprio domínio. Nunca fazer hotlink de logo em site de universidade ou Wikimedia
- Logo colorida na faixa institucional. A faixa é monocromática por decisão editorial: todas as marcas no mesmo tom de cinza
- Mayo Clinic como corpo docente (só serve como referência metodológica)
- Kit Físico do Paciente e Plataforma Clínica (produtos futuros)
- "Sem juros" no parcelamento
- Toolkit dos 26 instrumentos, prática supervisionada, avaliação por rubrica e mentor coaching
- Protocolo engessado em sessões de 50 minutos ou fases por mês. O protocolo é apresentado como estrutura adaptável
- Qualquer docente fora da grade oficial, e placeholders de docente

## Pendências de conteúdo herdadas da v3

- A grade soma 61h de conteúdo gravado; as 80h totais incluem as 20h ao vivo. Confirmar o arredondamento com a direção técnica.
- Divergências internas de carga horária: Pilar 1 declara 8h e soma 7h; Pilar 3 declara 6h e soma 7h; Pilar 5 declara 20h e soma 18h; Introdução declara 3h e soma 2h30.
- Duas "Bianca Andrade" no programa original (psiquiatra do IPq-USP e psicóloga do COB). No site estão como Bianca Besteti Damiano e Bianca Andrade. Confirmar.

## Turma de Fundadores (out/2026)

- A primeira turma chama-se **Turma de Fundadores**, com inscrições até **19/10/2026**. Não usar mais "turma de lançamento" nem "condição de setembro"
- Prazo da contagem regressiva: `DEADLINE` em `assets/cn.js`. Validade da oferta no JSON-LD: `priceValidUntil` em `index.html`
- Posicionamento: não é escassez nem desconto. É o grupo que valida o protocolo em paciente real antes da versão final. A certificação segue ativa depois de 19/10, o lugar de Fundador não se repete
- Entregas exclusivas publicadas: participação na validação do protocolo, Selo de Fundador numerado e condição de Fundador. Não publicar outras contrapartidas sem confirmação
- O troféu numerado foi removido da oferta e substituído pelo Selo de Fundador

## Identidade na navbar

- A marca na navbar é texto puro (`.wm`): COACH em Poppins 300 claro, NUTRICIONAL em Poppins 700 ouro, com ®. O PNG quadrado saiu da navbar

## Corpo docente

- Bandeiras em SVG local em `assets/flags/` (us, ca, gb, it, br). Não usar emoji de bandeira: o Windows não renderiza e exibe as letras do país

## Rodapé

- Linha visível de razão social, CNPJ e cidade removida do rodapé de todas as páginas, assim como a vigência do registro INPI. Os dados institucionais completos ficam na página /sobre e no JSON-LD
- Instagram oficial: @coachnutricional

## Arquivo legado

- `certificacao/index.html` é a versão antiga da página, com conteúdo reprovado em auditoria (96 blocos, 17 ferramentas, MEC, Mayo Clinic, troféu). Não é a página publicada em /certificacao, que vem de `certificacao.html`. Recomendado excluir

## Grade oficial (versão de outubro/2026)

- Introdução 3 aulas · 2h | Pilar 1 O Profissional 7 · 6h | Pilar 2 O Paciente 8 · 8h | Pilar 3 A Relação Terapêutica 5 · 6h | Pilar 4 Mudança de Comportamento 7 · 8h | Pilar 5 Comportamento Alimentar 14 · 20h | Pilar 6 Entrega do Cuidado Nutricional 6 · 6h | Pilar 7 Estratégia e Negócios em Nutrição 3 · 4h
- Total: 53 aulas gravadas, 60h. Somadas às 20h ao vivo, 80h
- Corpo docente: 31 (10 internacionais, 21 Brasil), 5 países. Roberto Garcia (Mente em Forma) entrou no Pilar 6
- Fotos dos docentes: Cloudinary, pasta "Coach Nutricional", com recorte facial automático (c_thumb,g_face) na URL
