# Enerflux BioHub 2.0 — demonstração interativa

Protótipo conceitual de tecnologia comunitária para identificar, registrar e encaminhar biomassa a rotas de valorização. **Não há sensores, balança, planta energética, backend nem autenticação real.** Todos os resultados são simulados ou estimativas demonstrativas.

## Estrutura
- `index.html` — conteúdo e seções (início, problema, como funciona, área do morador, BioATM, meu impacto, comunidade, biomassa, critérios, indicadores, projeto, rodapé).
- `style.css` — design tokens (cores, modo escuro automático), componentes e animações. Respeita `prefers-reduced-motion`.
- `script.js` — menu, cadastro por apelido, fluxo do BioATM, cálculo, gráficos e persistência em `localStorage`.
- `robots.txt`, `sitemap.xml` — SEO básico.

## Como rodar
Abra `index.html` no navegador ou use `npx serve .`. Não há build nem dependências.

## Deploy
Vercel ou GitHub Pages, apontando para a raiz do repositório. Atualize o domínio em `canonical`, `robots.txt` e `sitemap.xml` se mudar.

## Onde alterar
Em `script.js`: `MAXKG` (limite por depósito, hoje 1000 kg), `MATERIALS` (nome, categoria, kWh/kg, m³/kg) e `calc()` (fórmulas). Fórmulas e avisos também aparecem em "Fontes e metodologia" no `index.html`.

## Dados e privacidade
Apelidos e depósitos ficam só no navegador (chaves `enerflux-demo-v1:*`). "Reiniciar demonstração" apaga os depósitos; o "Modo apresentação" (rodapé) esconde a área do morador e o histórico.

## Pendências antes de afirmações públicas
Autoria e contatos oficiais; município e comunidade piloto; resíduos aceitos (revisão de especialista); fontes dos fatores kWh/kg e m³/kg; regras de crédito; parceiros confirmados. Nenhuma parceria, patente ou retorno é declarado.

## Roadmap (ver `docs/ROADMAP.md`)
Fase 1 clareza e acabamento → Fase 2 demonstração robusta → Fase 3 validação técnica → Fase 4 piloto (condicional) → Fase 5 escala (condicional). Banco de dados só após aprovação e requisitos definidos.
