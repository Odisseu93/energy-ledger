export const docsHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EnergyLedger API – Documentação</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --sidebar-w: 272px;
      --bg: #f1f5f9;
      --sidebar-bg: #0f172a;
      --sidebar-hover: rgba(255,255,255,0.06);
      --sidebar-active-border: #6366f1;
      --card: #ffffff;
      --border: #e2e8f0;
      --primary: #6366f1;
      --primary-light: #eef2ff;
      --get: #059669;
      --get-bg: #d1fae5;
      --get-text: #065f46;
      --post: #d97706;
      --post-bg: #fef3c7;
      --post-text: #92400e;
      --text: #0f172a;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      --code-bg: #0f172a;
      --code-text: #e2e8f0;
      --radius: 10px;
      --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      min-height: 100vh;
      font-size: 14px;
      line-height: 1.6;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
      width: var(--sidebar-w);
      min-height: 100vh;
      background: var(--sidebar-bg);
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    .sidebar-header {
      padding: 28px 20px 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .sidebar-logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #6366f1, #818cf8);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }
    .sidebar-logo h1 { color: #f1f5f9; font-size: 16px; font-weight: 700; }
    .sidebar-version {
      display: inline-block;
      background: rgba(99,102,241,0.2);
      color: #818cf8;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: 20px;
      margin-left: 42px;
    }

    .nav-group { padding: 20px 0 4px; }
    .nav-label {
      padding: 0 20px 8px;
      font-size: 10px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 13px;
      font-weight: 400;
      transition: all 0.15s;
      border-left: 2px solid transparent;
      cursor: pointer;
    }
    .nav-item:hover { color: #e2e8f0; background: var(--sidebar-hover); }
    .nav-item.active { color: #e2e8f0; background: var(--sidebar-hover); border-left-color: var(--sidebar-active-border); font-weight: 500; }
    .nav-method {
      font-size: 9px;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }
    .nav-get { background: rgba(5,150,105,0.2); color: #34d399; }
    .nav-post { background: rgba(217,119,6,0.2); color: #fbbf24; }

    .sidebar-footer {
      margin-top: auto;
      padding: 16px 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 11px;
      color: #475569;
    }

    /* ===== MAIN ===== */
    .main {
      flex: 1;
      padding: 48px 56px;
      max-width: 960px;
      overflow-x: hidden;
    }

    /* ===== SECTIONS ===== */
    .doc-section {
      margin-bottom: 72px;
      scroll-margin-top: 32px;
    }

    .section-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text);
      margin-bottom: 12px;
    }
    .section-lead {
      font-size: 15px;
      color: var(--text-muted);
      line-height: 1.75;
      margin-bottom: 28px;
      max-width: 680px;
    }

    h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text);
      margin: 32px 0 14px;
    }

    /* ===== CARD ===== */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    /* ===== TABLE ===== */
    .table-wrap { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); }
    table { width: 100%; border-collapse: collapse; background: var(--card); }
    thead tr { background: #f8fafc; }
    th {
      text-align: left;
      padding: 10px 16px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }
    td {
      padding: 13px 16px;
      border-bottom: 1px solid #f1f5f9;
      vertical-align: top;
      font-size: 13px;
      line-height: 1.6;
    }
    tr:last-child td { border-bottom: none; }
    td a { color: var(--primary); text-decoration: none; }
    td a:hover { text-decoration: underline; }

    /* ===== CODE ===== */
    code {
      background: #f1f5f9;
      color: #be185d;
      padding: 2px 6px;
      border-radius: 5px;
      font-size: 12px;
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    }

    .code-block {
      background: var(--code-bg);
      border-radius: var(--radius);
      padding: 18px 20px;
      overflow-x: auto;
      margin: 12px 0;
    }
    .code-block pre {
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 12px;
      line-height: 1.8;
      color: var(--code-text);
      white-space: pre;
    }
    .code-block .comment { color: #475569; }
    .code-block .cmd { color: #86efac; }
    .code-block .str { color: #fca5a5; }

    /* ===== BADGES ===== */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 3px 9px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-get { background: var(--get-bg); color: var(--get-text); }
    .badge-post { background: var(--post-bg); color: var(--post-text); }
    .badge-required { background: #fee2e2; color: #991b1b; }
    .badge-optional { background: #f1f5f9; color: #64748b; }

    /* ===== ALERT ===== */
    .alert {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 20px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .alert-icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
    .alert-info { background: #eff6ff; border-left: 3px solid #3b82f6; color: #1e40af; }
    .alert-warn { background: #fffbeb; border-left: 3px solid #f59e0b; color: #92400e; }

    /* ===== STEPS ===== */
    .steps { display: flex; flex-direction: column; gap: 0; }
    .step { display: flex; gap: 16px; padding-bottom: 24px; position: relative; }
    .step:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 13px;
      top: 28px;
      bottom: 0;
      width: 2px;
      background: var(--border);
    }
    .step-num {
      width: 28px;
      height: 28px;
      background: var(--primary);
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .step-body { flex: 1; padding-top: 4px; }
    .step-title { font-size: 14px; font-weight: 600; margin-bottom: 8px; }

    /* ===== STACK GRID ===== */
    .stack-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin: 16px 0;
    }
    .stack-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 16px;
      box-shadow: var(--shadow);
    }
    .stack-card-label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .stack-card-value { font-size: 14px; font-weight: 600; color: var(--text); }
    .stack-card-sub { font-size: 11px; color: var(--text-light); margin-top: 2px; }

    /* ===== ENDPOINT CARD ===== */
    .endpoint-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      margin-bottom: 16px;
      transition: border-color 0.15s;
    }
    .endpoint-card:hover { border-color: #c7d2fe; }

    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      cursor: pointer;
      user-select: none;
      transition: background 0.1s;
    }
    .endpoint-header:hover { background: #fafafe; }

    .method-pill {
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 6px;
      min-width: 52px;
      text-align: center;
      flex-shrink: 0;
      letter-spacing: 0.3px;
    }
    .method-get { background: var(--get-bg); color: var(--get-text); }
    .method-post { background: var(--post-bg); color: var(--post-text); }

    .endpoint-path {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      flex: 1;
    }
    .endpoint-summary {
      font-size: 13px;
      color: var(--text-muted);
      margin-right: 8px;
    }
    .endpoint-chevron {
      color: var(--text-light);
      font-size: 11px;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .endpoint-chevron.open { transform: rotate(180deg); }

    /* ===== PLAYGROUND ===== */
    .playground {
      border-top: 1px solid var(--border);
      padding: 24px;
      background: #fafafe;
      display: none;
    }
    .playground.open { display: block; }

    .playground-title {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 16px;
    }

    .form-field { margin-bottom: 14px; }
    .form-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 5px;
    }
    .form-input {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid var(--border);
      border-radius: 7px;
      font-size: 13px;
      background: #fff;
      color: var(--text);
      transition: border-color 0.15s, box-shadow 0.15s;
      font-family: inherit;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
    .form-input::placeholder { color: var(--text-light); }
    input[type="file"].form-input { padding: 7px 12px; cursor: pointer; }

    .form-row { display: flex; gap: 12px; }
    .form-row .form-field { flex: 1; }

    .send-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 20px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s, transform 0.1s;
      font-family: inherit;
    }
    .send-btn:hover { opacity: 0.88; }
    .send-btn:active { transform: scale(0.98); }
    .send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* ===== RESPONSE ===== */
    .response-wrap { margin-top: 20px; }
    .response-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .status-pill {
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
    .status-2xx { background: var(--get-bg); color: var(--get-text); }
    .status-4xx { background: var(--post-bg); color: var(--post-text); }
    .status-5xx { background: #fee2e2; color: #991b1b; }
    .response-time { font-size: 12px; color: var(--text-muted); }

    .response-body {
      background: var(--code-bg);
      color: var(--code-text);
      border-radius: 8px;
      padding: 16px 20px;
      overflow-x: auto;
      overflow-y: auto;
      max-height: 420px;
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 12px;
      line-height: 1.7;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .json-key { color: #93c5fd; }
    .json-str { color: #86efac; }
    .json-num { color: #fca5a5; }
    .json-bool { color: #c4b5fd; }
    .json-null { color: #94a3b8; }

    /* ===== ARCH DIAGRAM ===== */
    .arch-box {
      background: var(--code-bg);
      border-radius: var(--radius);
      padding: 24px 28px;
      overflow-x: auto;
    }
    .arch-box pre {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 12px;
      line-height: 1.9;
      color: #94a3b8;
      white-space: pre;
    }
    .arch-box .hl { color: #818cf8; }
    .arch-box .arrow { color: #475569; }
    .arch-box .note { color: #64748b; font-style: italic; }

    /* ===== ENV TABLE ===== */
    .required-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
      margin-right: 4px;
      vertical-align: middle;
    }

    /* ===== FORM HINT ===== */
    .form-hint {
      font-size: 11px;
      color: var(--text-light);
      margin-top: 4px;
      line-height: 1.5;
    }
    .form-hint code {
      background: transparent;
      color: #94a3b8;
      font-size: 11px;
      padding: 0;
    }

    /* ===== RESPONSE EXAMPLES ===== */
    .resp-examples {
      margin-top: 24px;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    .resp-examples-label {
      padding: 8px 14px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-muted);
      background: #f8fafc;
      border-bottom: 1px solid var(--border);
    }
    .resp-example { border-bottom: 1px solid var(--border); }
    .resp-example:last-child { border-bottom: none; }
    .resp-example-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      cursor: pointer;
      font-size: 13px;
      user-select: none;
      transition: filter 0.1s;
    }
    .resp-example-header:hover { filter: brightness(0.96); }
    .resp-ex-2xx { background: #f0fdf4; color: #166534; }
    .resp-ex-4xx { background: #fffbeb; color: #92400e; }
    .resp-ex-5xx { background: #fef2f2; color: #991b1b; }
    .resp-example-arrow { font-size: 9px; transition: transform 0.2s; display: inline-block; }
    .resp-example-arrow.open { transform: rotate(90deg); }
    .resp-example-status { font-weight: 800; font-size: 13px; }
    .resp-example-desc { font-size: 12px; opacity: 0.8; }
    .resp-example-content { display: none; border-top: 1px solid var(--border); }
    .resp-example-content.open { display: block; }
    .resp-example-tabs {
      display: flex;
      gap: 0;
      background: #f1f5f9;
      border-bottom: 1px solid var(--border);
      padding: 0 14px 0 0;
    }
    .resp-example-tab {
      padding: 8px 14px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-muted);
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
    }
    .resp-example-tab:hover { color: var(--text); }
    .resp-example-tab.active { font-weight: 600; color: var(--primary); border-bottom-color: var(--primary); }
    .resp-example-content.tab-value .resp-example-body { display: block; }
    .resp-example-content.tab-value .resp-example-schema { display: none; }
    .resp-example-content.tab-schema .resp-example-body { display: none; }
    .resp-example-content.tab-schema .resp-example-schema { display: block; }
    .resp-example-body {
      background: var(--code-bg);
      color: var(--code-text);
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 11.5px;
      line-height: 1.7;
      padding: 14px 18px;
      white-space: pre-wrap;
      word-break: break-all;
      border-top: 1px solid #1e293b;
    }
    .resp-example-schema {
      background: var(--card);
      padding: 14px 18px;
      font-size: 12px;
      line-height: 1.6;
      border-top: 1px solid var(--border);
    }
    .resp-example-schema table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .resp-example-schema th, .resp-example-schema td { padding: 6px 10px; text-align: left; border-bottom: 1px solid var(--border); vertical-align: top; }
    .resp-example-schema th { font-weight: 600; color: var(--text-muted); font-size: 11px; text-transform: uppercase; }
    .resp-example-schema .schema-name { font-family: 'SF Mono', 'Fira Code', monospace; color: var(--primary); font-weight: 500; }
    .resp-example-schema .schema-type { font-family: monospace; color: #64748b; font-size: 11px; }

    /* ===== PARAM TABLE ===== */
    .param-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px; }
    .param-table th {
      text-align: left;
      padding: 6px 10px;
      font-size: 10px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-bottom: 1px solid var(--border);
      background: #f8fafc;
    }
    .param-table td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; vertical-align: top; color: var(--text); }
    .param-table tr:last-child td { border-bottom: none; }
    .param-name { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; font-weight: 600; color: #0f172a; }
    .param-type { font-size: 11px; color: #6366f1; font-family: monospace; }
    .param-desc { color: var(--text-muted); font-size: 12px; line-height: 1.5; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 900px) {
      .sidebar { display: none; }
      .main { padding: 24px; }
    }
  </style>
</head>
<body>

<!-- =========================================== SIDEBAR =========================================== -->
<nav class="sidebar">
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">&#9889;</div>
      <h1>EnergyLedger API</h1>
    </div>
    <span class="sidebar-version">v1.0.0</span>
  </div>

  <div class="nav-group">
    <div class="nav-label">Geral</div>
    <a class="nav-item active" href="#overview">&#128196; Visão Geral</a>
    <a class="nav-item" href="#quickstart">&#9889; Quick Start</a>
    <a class="nav-item" href="#decisions">&#127981; Decisões Técnicas</a>
    <a class="nav-item" href="#prerequisites">&#9989; Pré-requisitos</a>
    <a class="nav-item" href="#setup">&#9881; Configuração</a>
    <a class="nav-item" href="#env">&#128272; Variáveis de Ambiente</a>
  </div>

  <div class="nav-group">
    <div class="nav-label">Referência</div>
    <a class="nav-item" href="#data-model">&#128203; Modelo de Dados</a>
    <a class="nav-item" href="#processing-flow">&#9654; Fluxo de Processamento</a>
    <a class="nav-item" href="#error-codes">&#9888; Códigos de Erro</a>
  </div>

  <div class="nav-group">
    <div class="nav-label">API Reference</div>
    <a class="nav-item" href="#ep-health"><span class="nav-method nav-get">GET</span> Health Check</a>
    <a class="nav-item" href="#ep-upload"><span class="nav-method nav-post">POST</span> Upload de Fatura</a>
    <a class="nav-item" href="#ep-list"><span class="nav-method nav-get">GET</span> Listar Faturas</a>
    <a class="nav-item" href="#ep-energy"><span class="nav-method nav-get">GET</span> Dashboard de Energia</a>
    <a class="nav-item" href="#ep-financial"><span class="nav-method nav-get">GET</span> Dashboard Financeiro</a>
  </div>

  <div class="sidebar-footer">
    Também disponível: <a href="/swagger" style="color:#818cf8; text-decoration:none;">Swagger UI &#8599;</a>
  </div>
</nav>

<!-- =========================================== MAIN =========================================== -->
<main class="main">

  <!-- -------- OVERVIEW -------- -->
  <section class="doc-section" id="overview">
    <div class="section-eyebrow">Documentação</div>
    <h1 class="section-title">EnergyLedger &#9889; Energy Invoice API</h1>
    <p class="section-lead">
      API RESTful que recebe faturas de energia em PDF, extrai dados estruturados via Google Gemini LLM,
      persiste os resultados no PostgreSQL e os expõe em dashboards de energia e financeiro.
    </p>

    <div class="alert alert-info">
      <span class="alert-icon">&#8505;</span>
      <div>Base URL detectada automaticamente. Todas as requisições do playground apontam para <strong id="base-url-display"></strong>.</div>
    </div>

    <h3>Visão geral da arquitetura</h3>
    <div class="arch-box">
      <pre>
<span class="hl">HTTP Request</span>
     <span class="arrow">|</span>
     <span class="arrow">&#9660;  Multer (file upload middleware)</span>
<span class="hl">Express Controller</span>
     <span class="arrow">|</span>
     <span class="arrow">&#9660;  tsyringe DI Container</span>
<span class="hl">Use Case</span>  <span class="note">(ProcessInvoiceUseCase / ListInvoicesUseCase / ...)</span>
     <span class="arrow">|</span>        <span class="arrow">|</span>
     <span class="arrow">&#9660;</span>        <span class="arrow">&#9660;</span>
<span class="hl">ILLMAdapter</span>  <span class="hl">IInvoiceRepository</span>
     <span class="arrow">|</span>        <span class="arrow">|</span>
     <span class="arrow">&#9660;</span>        <span class="arrow">&#9660;</span>
<span class="hl">GeminiAdapter</span>  <span class="hl">PrismaInvoiceRepository</span>
     <span class="arrow">|</span>        <span class="arrow">|</span>
     <span class="arrow">&#9660;</span>        <span class="arrow">&#9660;</span>
<span class="hl">Google Gemini API</span>  <span class="hl">PostgreSQL 16</span>
      </pre>
    </div>

    <h3>Stack de tecnologias</h3>
    <div class="stack-grid">
      <div class="stack-card">
        <div class="stack-card-label">Runtime</div>
        <div class="stack-card-value">Node.js</div>
        <div class="stack-card-sub">v22.14.0</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Linguagem</div>
        <div class="stack-card-value">TypeScript</div>
        <div class="stack-card-sub">strict mode</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Framework</div>
        <div class="stack-card-value">Express</div>
        <div class="stack-card-sub">v4.x</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">ORM</div>
        <div class="stack-card-value">Prisma</div>
        <div class="stack-card-sub">v6.x</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Banco de dados</div>
        <div class="stack-card-value">PostgreSQL</div>
        <div class="stack-card-sub">v16</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">LLM</div>
        <div class="stack-card-value">Gemini</div>
        <div class="stack-card-sub">gemini-2.5-flash</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">DI Container</div>
        <div class="stack-card-value">tsyringe</div>
        <div class="stack-card-sub">Microsoft</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Validação</div>
        <div class="stack-card-value">Zod</div>
        <div class="stack-card-sub">runtime schemas</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Logger</div>
        <div class="stack-card-value">Pino</div>
        <div class="stack-card-sub">structured JSON</div>
      </div>
      <div class="stack-card">
        <div class="stack-card-label">Testes</div>
        <div class="stack-card-value">Jest</div>
        <div class="stack-card-sub">+ ts-jest + supertest</div>
      </div>
    </div>

    <h3>Estrutura do projeto</h3>
    <div class="arch-box">
      <pre>
<span class="hl">src/</span>
<span class="arrow">&#9500;&#9472;&#9472; domain/</span>          <span class="note">&#8592; entidades e interfaces (sem dependências externas)</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; entities/</span>        <span class="note">InvoiceEntity, CustomerEntity</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; repositories/</span>     <span class="note">IInvoiceRepository, ICustomerRepository</span>
<span class="arrow">&#9474;   &#9492;&#9472;&#9472; value-objects/</span>    <span class="note">ReferenceMonthVO</span>
<span class="arrow">&#9500;&#9472;&#9472; application/</span>      <span class="note">&#8592; use cases e DTOs (orquestração da lógica)</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; dtos/</span>             <span class="note">ProcessInvoiceInputDto, DashboardOutputDto...</span>
<span class="arrow">&#9474;   &#9492;&#9472;&#9472; use-cases/</span>        <span class="note">ProcessInvoiceUseCase, ListInvoicesUseCase...</span>
<span class="arrow">&#9500;&#9472;&#9472; infrastructure/</span>   <span class="note">&#8592; implementações concretas (framework, DB, LLM)</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; config/</span>           <span class="note">env.ts (Zod), container.ts (tsyringe DI)</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; database/</span>
<span class="arrow">&#9474;   &#9474;   &#9500;&#9472;&#9472; prisma/</span>       <span class="note">schema.prisma, prisma-client.ts</span>
<span class="arrow">&#9474;   &#9474;   &#9492;&#9472;&#9472; repositories/</span> <span class="note">PrismaInvoiceRepository, PrismaCustomerRepository</span>
<span class="arrow">&#9474;   &#9500;&#9472;&#9472; http/</span>
<span class="arrow">&#9474;   &#9474;   &#9500;&#9472;&#9472; controllers/</span>  <span class="note">InvoiceController, DashboardController</span>
<span class="arrow">&#9474;   &#9474;   &#9500;&#9472;&#9472; middlewares/</span>  <span class="note">errorHandler, requestLogger, upload (multer)</span>
<span class="arrow">&#9474;   &#9474;   &#9500;&#9472;&#9472; routes/</span>       <span class="note">invoice.routes.ts, dashboard.routes.ts</span>
<span class="arrow">&#9474;   &#9474;   &#9500;&#9472;&#9472; docs/</span>         <span class="note">docs-page.ts (esta página)</span>
<span class="arrow">&#9474;   &#9474;   &#9492;&#9472;&#9472; swagger/</span>      <span class="note">openapi.ts (spec OpenAPI 3.0)</span>
<span class="arrow">&#9474;   &#9492;&#9472;&#9472; llm/</span>              <span class="note">gemini.adapter.ts, invoice-llm-data.schema.ts</span>
<span class="arrow">&#9492;&#9472;&#9472; shared/</span>           <span class="note">&#8592; utilitários transversais</span>
<span class="arrow">    &#9500;&#9472;&#9472; errors/</span>          <span class="note">AppError, ValidationError, LLMError...</span>
<span class="arrow">    &#9492;&#9472;&#9472; logger/</span>          <span class="note">pino logger (JSON em prod, pretty em dev)</span>
      </pre>
    </div>
  </section>

  <!-- -------- QUICK START -------- -->
  <section class="doc-section" id="quickstart">
    <div class="section-eyebrow">Primeiros Passos</div>
    <h2 class="section-title">Quick Start</h2>
    <p class="section-lead">
      Fluxo completo de uso da API do zero até os dashboards, em 4 comandos.
      Em produção use a base URL <code>https://energy-ledger.up.railway.app</code>; localmente use <code>http://localhost:3000</code>.
    </p>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-title">Fazer upload de uma fatura PDF</div>
          <div class="code-block"><pre><span class="cmd">curl -X POST https://energy-ledger.up.railway.app/api/v1/invoices/upload \
  -F "invoice=@fatura-set-2024.pdf"</span>

<span class="comment"># O campo do arquivo DEVE se chamar "invoice"
# A API envia o PDF ao Gemini, extrai os dados e salva no banco
# Retorna 201 com o objeto Invoice completo</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-title">Listar todas as faturas do cliente</div>
          <div class="code-block"><pre><span class="cmd">curl "https://energy-ledger.up.railway.app/api/v1/invoices?customer_number=7202210726"</span>

<span class="comment"># Retorna lista paginada. Use &amp;page=2&amp;limit=10 para paginar
# Sem filtros retorna todas as faturas de todos os clientes</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-title">Consultar dashboard de energia (kWh)</div>
          <div class="code-block"><pre><span class="cmd">curl "https://energy-ledger.up.railway.app/api/v1/dashboard/energy?customer_number=7202210726"</span>

<span class="comment"># Retorna consumo e energia compensada agrupados por mês de referência
# Omita customer_number para agregar todos os clientes</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <div class="step-title">Consultar dashboard financeiro (R$)</div>
          <div class="code-block"><pre><span class="cmd">curl "https://energy-ledger.up.railway.app/api/v1/dashboard/financial?customer_number=7202210726"</span>

<span class="comment"># Retorna valor total sem GD e economia com GD por mês de referência
# gdSavings é sempre negativo — representa crédito (economia) para o cliente</span></pre></div>
        </div>
      </div>
    </div>

    <div class="alert alert-info">
      <span class="alert-icon">&#8505;</span>
      <div>
        <strong>Idempotência:</strong> enviar a mesma fatura duas vezes (mesmo cliente + mesmo mês de referência)
        <strong>atualiza</strong> o registro existente em vez de criar um duplicado. Esse comportamento é
        implementado via <code>upsert</code> no Prisma usando a constraint única <code>(customerNumber, referenceMonth)</code>.
      </div>
    </div>
  </section>

  <!-- -------- TECHNICAL DECISIONS -------- -->
  <section class="doc-section" id="decisions">
    <div class="section-eyebrow">Arquitetura</div>
    <h2 class="section-title">Decisões Técnicas</h2>
    <p class="section-lead">Principais escolhas arquiteturais feitas para este projeto e suas justificativas.</p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Decisão</th>
            <th>Justificativa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Clean Architecture + DDD</strong></td>
            <td>Isola a lógica de negócio de frameworks e infraestrutura. As entidades de domínio são classes TypeScript puras sem dependências externas, tornando-as trivialmente testáveis sem precisar subir um banco de dados.</td>
          </tr>
          <tr>
            <td><strong>Express (framework minimalista)</strong></td>
            <td>Baixo overhead e ecossistema amplo. Suficiente para uma API RESTful focada com poucos endpoints. Evita "mágica" e mantém a camada HTTP fina e previsível.</td>
          </tr>
          <tr>
            <td><strong>Prisma ORM v6</strong></td>
            <td>Queries totalmente tipadas com inferência TypeScript, histórico de migrations legível e <code>upsert</code> nativo que evita duplicatas ao reprocessar a mesma fatura PDF.</td>
          </tr>
          <tr>
            <td><strong>Google Gemini 2.5 Flash</strong></td>
            <td>Suporte nativo a PDF via <code>inlineData</code> elimina uma etapa separada de OCR. O modelo retorna JSON estruturado correspondente ao schema Zod em um único prompt. O plano gratuito é suficiente para desenvolvimento e avaliação.</td>
          </tr>
          <tr>
            <td><strong>tsyringe (Injeção de Dependência)</strong></td>
            <td>Container de DI leve da Microsoft com integração nativa a decorators TypeScript (<code>@injectable</code>, <code>@inject</code>). Mantém os use cases completamente desacoplados da infraestrutura sem fiação manual verbosa.</td>
          </tr>
          <tr>
            <td><strong>Zod para todos os schemas</strong></td>
            <td>Fonte única de verdade para validação em runtime e tipos TypeScript em tempo de compilação. Usado para variáveis de ambiente, parsing da response do LLM e validação de query params — eliminando duplicação de tipos entre DTOs e validadores.</td>
          </tr>
          <tr>
            <td><strong>Pino logger</strong></td>
            <td>Logger estruturado de alta performance com overhead próximo a zero. Saída JSON em produção viabiliza agregação de logs (Datadog, CloudWatch). Pretty-print com pino-pretty em desenvolvimento.</td>
          </tr>
          <tr>
            <td><strong>Retry + Exponential Backoff (LLM)</strong></td>
            <td>Falhas transitórias da API do Gemini (rate limits, timeouts) são retentadas automaticamente até 3 vezes com backoff exponencial. Melhora a confiabilidade sem intervenção do usuário em problemas intermitentes.</td>
          </tr>
          <tr>
            <td><strong>Multer para uploads</strong></td>
            <td>Storage em memória mantém o PDF no processo como um Buffer — sem arquivos temporários, já que o Gemini recebe via base64 <code>inlineData</code>. O guard de tamanho rejeita arquivos acima do limite antes de chegar ao LLM.</td>
          </tr>
          <tr>
            <td><strong>Docker multi-stage build</strong></td>
            <td>O estágio builder compila o TypeScript; a imagem de produção copia apenas o <code>dist/</code> compilado e o <code>node_modules</code>, resultando em um container enxuto e reproduzível.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- -------- PREREQUISITES -------- -->
  <section class="doc-section" id="prerequisites">
    <div class="section-eyebrow">Primeiros Passos</div>
    <h2 class="section-title">Pré-requisitos</h2>
    <p class="section-lead">Tudo que você precisa ter instalado antes de rodar o projeto.</p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Requisito</th><th>Versão</th><th>Observações</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Node.js</strong></td>
            <td><code>22.14.0</code></td>
            <td>Use <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm</a> ou <a href="https://github.com/coreybutler/nvm-windows" target="_blank">nvm-windows</a> para gerenciar versões. Execute <code>nvm use</code> na raiz do projeto.</td>
          </tr>
          <tr>
            <td><strong>Docker Desktop</strong></td>
            <td>Última estável</td>
            <td>Necessário para o container do PostgreSQL. Certifique-se de que o engine Linux está rodando antes de executar <code>docker compose up</code>.</td>
          </tr>
          <tr>
            <td><strong>Google Gemini API Key</strong></td>
            <td>&#8212;</td>
            <td>Chave gratuita disponível em <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a>. O plano gratuito permite ~1.500 requisições/dia com <code>gemini-2.5-flash</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- -------- SETUP -------- -->
  <section class="doc-section" id="setup">
    <div class="section-eyebrow">Primeiros Passos</div>
    <h2 class="section-title">Configuração e Execução</h2>
    <p class="section-lead">Duas formas de rodar o projeto. Docker é recomendado para um ambiente totalmente isolado.</p>

    <h3>&#127959; Docker (recomendado)</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-title">Clonar e configurar</div>
          <div class="code-block"><pre><span class="comment"># Clonar o repositório</span>
<span class="cmd">git clone &lt;repo-url&gt; &amp;&amp; cd energy-ledger</span>

<span class="comment"># Copiar o template de variáveis de ambiente</span>
<span class="cmd">cp .env.example .env</span>

<span class="comment"># Editar .env e definir GEMINI_API_KEY=sua-chave-aqui</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-title">Fazer build e subir todos os serviços</div>
          <div class="code-block"><pre><span class="cmd">docker compose up --build</span>

<span class="comment"># Isso inicia:
#   - postgres  (porta 5432)
#   - api       (porta 3000) com prisma db push na inicialização</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-title">Verificar se o stack está saudável</div>
          <div class="code-block"><pre><span class="cmd">curl http://localhost:3000/health</span>
<span class="str"># {"status":"ok"}</span>
<span class="comment"># Produção: curl https://energy-ledger.up.railway.app/health</span></pre></div>
        </div>
      </div>
    </div>

    <h3>&#128187; Local (sem o container Docker da API)</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-title">Instalar dependências</div>
          <div class="code-block"><pre><span class="cmd">npm install</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-title">Subir o PostgreSQL via Docker</div>
          <div class="code-block"><pre><span class="cmd">docker compose up -d postgres</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-title">Gerar o Prisma client e sincronizar o schema</div>
          <div class="code-block"><pre><span class="cmd">npm run prisma:generate</span>
<span class="cmd">npx prisma db push --schema=src/infrastructure/database/prisma/schema.prisma</span></pre></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <div class="step-title">Iniciar em modo desenvolvimento (hot reload)</div>
          <div class="code-block"><pre><span class="cmd">npm run dev</span>

<span class="comment"># Servidor rodando em http://localhost:3000 (produção: https://energy-ledger.up.railway.app)</span></pre></div>
        </div>
      </div>
    </div>

    <h3>&#127514; Executando testes</h3>
    <div class="code-block"><pre><span class="comment"># Todos os testes</span>
<span class="cmd">npm test</span>

<span class="comment"># Com relatório de cobertura</span>
<span class="cmd">npm test -- --coverage</span>

<span class="comment"># Modo watch</span>
<span class="cmd">npm test -- --watch</span></pre></div>
  </section>

  <!-- -------- ENV VARS -------- -->
  <section class="doc-section" id="env">
    <div class="section-eyebrow">Configuração</div>
    <h2 class="section-title">Variáveis de Ambiente</h2>
    <p class="section-lead">Todas as variáveis são lidas do arquivo <code>.env</code> e validadas na inicialização via Zod. Variáveis obrigatórias ausentes encerram o processo imediatamente com uma mensagem de erro descritiva.</p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Variável</th><th>Obrigatória</th><th>Padrão</th><th>Descrição</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>NODE_ENV</code></td>
            <td><span class="badge badge-optional">opcional</span></td>
            <td><code>development</code></td>
            <td>Ambiente de execução. Um dos valores: <code>development</code> | <code>production</code> | <code>test</code>. Afeta o formato dos logs e a verbosidade dos erros.</td>
          </tr>
          <tr>
            <td><code>PORT</code></td>
            <td><span class="badge badge-optional">opcional</span></td>
            <td><code>3000</code></td>
            <td>Porta do servidor HTTP.</td>
          </tr>
          <tr>
            <td><code>DATABASE_URL</code></td>
            <td><span class="badge badge-required">obrigatória</span></td>
            <td>&#8212;</td>
            <td>Connection string do PostgreSQL. Exemplo: <code>postgresql://energy_ledger:energy_ledger_secret@localhost:5432/energy_ledger_db</code></td>
          </tr>
          <tr>
            <td><code>GEMINI_API_KEY</code></td>
            <td><span class="badge badge-required">obrigatória</span></td>
            <td>&#8212;</td>
            <td>Chave de API do Google AI Studio usada pelo <code>GeminiAdapter</code> para chamar o <code>gemini-2.5-flash</code>. Obtenha uma chave gratuita em <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a>.</td>
          </tr>
          <tr>
            <td><code>UPLOAD_MAX_SIZE_MB</code></td>
            <td><span class="badge badge-optional">opcional</span></td>
            <td><code>10</code></td>
            <td>Tamanho máximo permitido para upload de PDF em megabytes. Requisições acima desse limite são rejeitadas com HTTP 413 antes de chegar ao LLM.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- -------- DATA MODEL -------- -->
  <section class="doc-section" id="data-model">
    <div class="section-eyebrow">Referência</div>
    <h2 class="section-title">Modelo de Dados</h2>
    <p class="section-lead">
      Estrutura completa do objeto <code>Invoice</code> retornado pela API. Os campos são divididos
      em três origens: extraídos pelo LLM a partir do PDF, calculados pela aplicação segundo as
      regras de negócio da aplicação, e gerados internamente.
    </p>

    <h3>Campos extraídos pelo LLM (PDF)</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr>
            <td><code>customerNumber</code></td>
            <td><span class="param-type">string</span></td>
            <td>Número do cliente conforme impresso na fatura (campo "Nº do Cliente"). Identificador único do consumidor junto à distribuidora.</td>
          </tr>
          <tr>
            <td><code>referenceMonth</code></td>
            <td><span class="param-type">string</span></td>
            <td>Mês de referência no formato <code>MMM/AAAA</code> em português e maiúsculas (ex: <code>JAN/2024</code>, <code>SET/2024</code>). Junto com <code>customerNumber</code>, forma a chave única da fatura.</td>
          </tr>
          <tr>
            <td><code>electricEnergyKwh</code></td>
            <td><span class="param-type">number</span></td>
            <td>Energia Elétrica consumida em kWh. Corresponde ao item "Energia Elétrica" na tabela de itens da fatura.</td>
          </tr>
          <tr>
            <td><code>electricEnergyValue</code></td>
            <td><span class="param-type">number</span></td>
            <td>Valor cobrado pela Energia Elétrica em R$.</td>
          </tr>
          <tr>
            <td><code>sceeeEnergyKwh</code></td>
            <td><span class="param-type">number</span></td>
            <td>Energia SCEE sem ICMS (Sistema de Compensação de Energia Elétrica) em kWh. Energia injetada na rede pela fonte de geração do cliente.</td>
          </tr>
          <tr>
            <td><code>sceeeEnergyValue</code></td>
            <td><span class="param-type">number</span></td>
            <td>Valor da Energia SCEE sem ICMS em R$.</td>
          </tr>
          <tr>
            <td><code>compensatedEnergyKwh</code></td>
            <td><span class="param-type">number</span></td>
            <td>Energia Compensada GD I em kWh. Crédito de energia gerado por fonte renovável (GD = Geração Distribuída).</td>
          </tr>
          <tr>
            <td><code>compensatedEnergyValue</code></td>
            <td><span class="param-type">number (negativo)</span></td>
            <td>Valor da Energia Compensada GD I em R$. <strong>Sempre negativo</strong> — a distribuidora já o armazena como crédito (desconto). O sinal é preservado para que somas diretas funcionem corretamente nos dashboards.</td>
          </tr>
          <tr>
            <td><code>publicLightingContrib</code></td>
            <td><span class="param-type">number</span></td>
            <td>Contribuição de Iluminação Pública Municipal (CIP/COSIP) em R$. Taxa municipal cobrada na fatura de energia.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Campos calculados pela aplicação</h3>
    <div class="alert alert-info">
      <span class="alert-icon">&#8505;</span>
      <div>Estes campos não constam no PDF — são derivados pela <code>InvoiceEntity</code> usando as regras de negócio da aplicação antes de persistir no banco.</div>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Campo</th><th>Fórmula</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr>
            <td><code>energyConsumptionKwh</code></td>
            <td><code>electricEnergyKwh + sceeeEnergyKwh</code></td>
            <td>Consumo total de energia em kWh. Soma a energia elétrica padrão com a energia SCEE. Usado no eixo Y do dashboard de energia.</td>
          </tr>
          <tr>
            <td><code>totalValueWithoutGd</code></td>
            <td><code>electricEnergyValue + sceeeEnergyValue + publicLightingContrib</code></td>
            <td>Valor total da conta sem o desconto GD em R$. Representa o que o cliente pagaria sem a geração distribuída.</td>
          </tr>
          <tr>
            <td><code>gdSavings</code></td>
            <td><code>compensatedEnergyValue</code> (preservado)</td>
            <td>Economia gerada pela GD em R$. Igual ao <code>compensatedEnergyValue</code> — sempre negativo, representando o crédito/desconto obtido pelo cliente.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Campos gerados pelo sistema</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead>
        <tbody>
          <tr>
            <td><code>id</code></td>
            <td><span class="param-type">string (UUID v4)</span></td>
            <td>Identificador único da fatura gerado automaticamente.</td>
          </tr>
          <tr>
            <td><code>customerId</code></td>
            <td><span class="param-type">string (UUID v4)</span></td>
            <td>Referência ao registro de <code>Customer</code> vinculado a esta fatura. O cliente é criado ou localizado via <code>upsert</code> pelo <code>customerNumber</code>.</td>
          </tr>
          <tr>
            <td><code>fileUrl</code></td>
            <td><span class="param-type">string | null</span></td>
            <td>URL do arquivo PDF armazenado. Atualmente sempre <code>null</code> — o PDF é processado em memória e não é persistido em disco.</td>
          </tr>
          <tr>
            <td><code>processedAt</code></td>
            <td><span class="param-type">string (ISO 8601)</span></td>
            <td>Timestamp UTC do momento em que a fatura foi processada e salva. Formato: <code>2024-09-15T14:23:00.000Z</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- -------- PROCESSING FLOW -------- -->
  <section class="doc-section" id="processing-flow">
    <div class="section-eyebrow">Referência</div>
    <h2 class="section-title">Fluxo de Processamento</h2>
    <p class="section-lead">
      O que acontece internamente quando você envia um PDF para
      <code>POST /api/v1/invoices/upload</code>.
    </p>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-title">Recepção e validação do arquivo</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            O middleware <strong>Multer</strong> intercepta a requisição <code>multipart/form-data</code>,
            valida o <code>Content-Type</code> (<code>application/pdf</code>) e o tamanho (máx.
            <code>UPLOAD_MAX_SIZE_MB</code>). O arquivo é mantido em memória como um <code>Buffer</code> —
            nenhum arquivo temporário é criado em disco. Se o arquivo estiver ausente ou for inválido,
            retorna <strong>HTTP 400</strong> imediatamente.
          </p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-title">Extração de dados via Google Gemini LLM</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            O <code>Buffer</code> do PDF é convertido para base64 e enviado ao <strong>Google Gemini 2.5 Flash</strong>
            via <code>inlineData</code> (sem OCR separado). Um prompt estruturado instrui o modelo a retornar
            um JSON com os campos específicos da fatura. Se a API falhar, há <strong>3 tentativas automáticas</strong>
            com backoff exponencial (1s, 2s, 4s). Falha persistente retorna <strong>HTTP 502</strong>.
          </p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-title">Validação do schema da response do LLM</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            O JSON retornado pelo Gemini é validado contra um <strong>schema Zod</strong>
            (<code>invoice-llm-data.schema.ts</code>) que verifica a presença e os tipos de todos os
            campos obrigatórios. Se o Gemini retornar dados incompletos ou malformados, retorna
            <strong>HTTP 422</strong> com código <code>LLMParseError</code>.
          </p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-body">
          <div class="step-title">Cálculo dos campos derivados</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            A <code>InvoiceEntity</code> recebe os dados brutos e calcula automaticamente no construtor:
            <code>energyConsumptionKwh</code>, <code>totalValueWithoutGd</code> e <code>gdSavings</code>
            conforme as regras de negócio da aplicação. Isso acontece em memória, sem I/O.
          </p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">5</div>
        <div class="step-body">
          <div class="step-title">Upsert no PostgreSQL via Prisma</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            O cliente é localizado ou criado (<code>findOrCreate</code> por <code>customerNumber</code>).
            Em seguida, a fatura é persistida via <strong>upsert</strong> na constraint única
            <code>(customerNumber, referenceMonth)</code>: se já existir uma fatura daquele cliente naquele mês,
            ela é <strong>atualizada</strong>; caso contrário, é <strong>criada</strong>. Isso garante idempotência.
          </p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">6</div>
        <div class="step-body">
          <div class="step-title">Response 201 com o objeto completo</div>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">
            A fatura persistida (incluindo campos calculados e metadados gerados) é retornada
            com status <strong>HTTP 201 Created</strong> no formato <code>{"success": true, "data": Invoice}</code>.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- -------- ERROR CODES -------- -->
  <section class="doc-section" id="error-codes">
    <div class="section-eyebrow">Referência</div>
    <h2 class="section-title">Códigos de Erro</h2>
    <p class="section-lead">
      Todos os erros seguem o mesmo formato de response: <code>{"success": false, "error": {"code": "...", "message": "..."}}</code>.
      A tabela abaixo lista todos os códigos possíveis, seus status HTTP e quando ocorrem.
    </p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Código</th><th>HTTP</th><th>Quando ocorre</th><th>Endpoint(s)</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ValidationError</code></td>
            <td><span class="badge" style="background:#fef3c7; color:#92400e; font-size:11px;">400</span></td>
            <td>Arquivo ausente, tipo inválido (não PDF), query params com tipo errado (ex: <code>page</code> não inteiro, <code>customer_number</code> não string).</td>
            <td>Upload, Listar Faturas, Dashboard Energia, Dashboard Financeiro</td>
          </tr>
          <tr>
            <td><code>ValidationError</code></td>
            <td><span class="badge" style="background:#fef3c7; color:#92400e; font-size:11px;">413</span></td>
            <td>Arquivo PDF excede o limite definido em <code>UPLOAD_MAX_SIZE_MB</code> (padrão: 10 MB).</td>
            <td>Upload</td>
          </tr>
          <tr>
            <td><code>LLMParseError</code></td>
            <td><span class="badge" style="background:#fef3c7; color:#92400e; font-size:11px;">422</span></td>
            <td>O Gemini retornou um JSON que não passa na validação do schema Zod (campo ausente, tipo incorreto, ou o PDF não é uma fatura de energia reconhecível).</td>
            <td>Upload</td>
          </tr>
          <tr>
            <td><code>LLMError</code></td>
            <td><span class="badge" style="background:#fee2e2; color:#991b1b; font-size:11px;">502</span></td>
            <td>A API do Google Gemini falhou em todas as 3 tentativas (rate limit, timeout, serviço indisponível ou quota esgotada).</td>
            <td>Upload</td>
          </tr>
          <tr>
            <td><code>NotFoundError</code></td>
            <td><span class="badge" style="background:#fee2e2; color:#991b1b; font-size:11px;">404</span></td>
            <td>Recurso não encontrado. Reservado para extensões futuras da API (ex: busca por ID específico).</td>
            <td>&#8212;</td>
          </tr>
          <tr>
            <td><code>InternalError</code></td>
            <td><span class="badge" style="background:#fee2e2; color:#991b1b; font-size:11px;">500</span></td>
            <td>Erro inesperado não tratado (ex: falha de conexão com o banco de dados). Em produção (<code>NODE_ENV=production</code>), a mensagem de detalhe é omitida da response.</td>
            <td>Todos</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Formato padrão de erro</h3>
    <p style="font-size:13px; color:var(--text-muted); margin-bottom:10px;">Toda response de erro segue esta estrutura:</p>
    <div class="response-body json-auto">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "PDF file is required"
  }
}</div>
  </section>

  <!-- -------- API REFERENCE -------- -->
  <section class="doc-section" id="api-reference">
    <div class="section-eyebrow">API Reference</div>
    <h2 class="section-title">Endpoints</h2>
    <p class="section-lead">
      Todas as responses são JSON. Use o playground interativo abaixo para fazer requisições reais contra o servidor em execução.
      Para a especificação legível por máquina, acesse o <a href="/swagger">Swagger UI</a>.
    </p>

    <!-- HEALTH CHECK -->
    <div class="endpoint-card" id="ep-health">
      <div class="endpoint-header" onclick="togglePlayground('pg-health', 'chev-health')">
        <span class="method-pill method-get">GET</span>
        <span class="endpoint-path">/health</span>
        <span class="endpoint-summary">Verificação de disponibilidade — retorna 200 quando o servidor está ativo</span>
        <span class="endpoint-chevron" id="chev-health">&#9660;</span>
      </div>
      <div class="playground" id="pg-health">
        <div class="playground-title">&#9654; Testar</div>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">Sem parâmetros. Útil para verificar se o servidor está no ar antes de usar os demais endpoints.</p>
        <button class="send-btn" onclick="req_health(event)">&#9654; Enviar Requisição</button>
        <div id="resp-health"></div>

        <div class="resp-examples">
          <div class="resp-examples-label">Exemplos de response</div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — servidor operacional</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "status": "ok"
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">status</td><td class="schema-type">string</td><td>Sempre <code>"ok"</code> quando o servidor está operacional.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- UPLOAD INVOICE -->
    <div class="endpoint-card" id="ep-upload">
      <div class="endpoint-header" onclick="togglePlayground('pg-upload', 'chev-upload')">
        <span class="method-pill method-post">POST</span>
        <span class="endpoint-path">/api/v1/invoices/upload</span>
        <span class="endpoint-summary">Faz upload de uma fatura PDF para extração via LLM e persistência</span>
        <span class="endpoint-chevron" id="chev-upload">&#9660;</span>
      </div>
      <div class="playground" id="pg-upload">
        <div class="playground-title">&#9654; Testar</div>

        <div class="alert alert-warn">
          <span class="alert-icon">&#9888;</span>
          <div>O PDF é encaminhado ao <strong>Google Gemini 2.5 Flash</strong> para extração de dados estruturados. Certifique-se de que o <code>GEMINI_API_KEY</code> está configurado e dentro da cota.</div>
        </div>

        <div class="form-field">
          <label class="form-label">
            arquivo da fatura
            <span class="badge badge-required" style="font-size:9px; padding:1px 5px;">obrigatório</span>
          </label>
          <input type="file" id="f-upload-file" class="form-input" accept="application/pdf" />
          <p class="form-hint">
            Arquivo PDF da fatura de energia elétrica emitida pela distribuidora (ex: CEMIG, CPFL).
            Tamanho máximo: <code>UPLOAD_MAX_SIZE_MB</code> (padrão 10 MB). O campo no formulário
            multipart deve se chamar exatamente <code>invoice</code>.
          </p>
        </div>

        <button class="send-btn" onclick="req_upload(event)">&#9654; Enviar Requisição</button>
        <div id="resp-upload"></div>

        <div class="resp-examples">
          <div class="resp-examples-label">Exemplos de response</div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">201</span>
              <span class="resp-example-desc">Created — fatura processada e salva com sucesso</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": {
    "id": "a3b4c5d6-e7f8-9012-abcd-ef1234567890",
    "customerId": "f1e2d3c4-b5a6-7890-abcd-ef0123456789",
    "customerNumber": "7202210726",
    "referenceMonth": "SET/2024",
    "electricEnergyKwh": 50,
    "electricEnergyValue": 38.63,
    "sceeeEnergyKwh": 476,
    "sceeeEnergyValue": 366.28,
    "compensatedEnergyKwh": 476,
    "compensatedEnergyValue": -354.11,
    "publicLightingContrib": 49.43,
    "energyConsumptionKwh": 526,
    "totalValueWithoutGd": 454.34,
    "gdSavings": -354.11,
    "fileUrl": null,
    "processedAt": "2024-09-15T14:23:00.000Z"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code> em caso de sucesso.</td></tr>
                  <tr><td class="schema-name">data</td><td class="schema-type">object (Invoice)</td><td>Fatura criada ou atualizada.</td></tr>
                  <tr><td class="schema-name">data.id</td><td class="schema-type">string (uuid)</td><td>ID da fatura (Invoice).</td></tr>
                  <tr><td class="schema-name">data.customerNumber</td><td class="schema-type">string</td><td>Número do cliente conforme o PDF.</td></tr>
                  <tr><td class="schema-name">data.referenceMonth</td><td class="schema-type">string</td><td>Formato <code>MMM/YYYY</code> (ex.: SET/2024).</td></tr>
                  <tr><td class="schema-name">data.energyConsumptionKwh</td><td class="schema-type">number</td><td>electricEnergyKwh + sceeeEnergyKwh.</td></tr>
                  <tr><td class="schema-name">data.totalValueWithoutGd</td><td class="schema-type">number</td><td>Valor total em R$ sem o desconto de GD.</td></tr>
                  <tr><td class="schema-name">data.gdSavings</td><td class="schema-type">number</td><td>Crédito de GD (valor negativo).</td></tr>
                  <tr><td class="schema-name">data.processedAt</td><td class="schema-type">string (date-time)</td><td>Data/hora em ISO 8601 UTC.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">400</span>
              <span class="resp-example-desc">Bad Request — nenhum arquivo enviado ou formato inválido</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "PDF file is required"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code> em caso de erro.</td></tr>
                  <tr><td class="schema-name">error</td><td class="schema-type">object</td><td>Detalhes do erro.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>ValidationError, LLMParseError, LLMError, NotFoundError, InternalError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Mensagem legível.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">413</span>
              <span class="resp-example-desc">Payload Too Large — arquivo acima do limite configurado</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "File too large. Maximum size is 10 MB"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>ValidationError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Mensagem de limite de tamanho.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">422</span>
              <span class="resp-example-desc">Unprocessable Entity — LLM não conseguiu extrair dados do PDF</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "LLMParseError",
    "message": "LLM returned an invalid response: field 'customerNumber' is required"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>LLMParseError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Mensagem de falha no parse.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-5xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">502</span>
              <span class="resp-example-desc">Bad Gateway — falha na API do Gemini após 3 tentativas</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "LLMError",
    "message": "Gemini API failed after 3 attempts: You exceeded your current quota"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>LLMError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Mensagem de falha da API.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-5xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">500</span>
              <span class="resp-example-desc">Internal Server Error — erro inesperado (ex.: falha de banco)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "InternalServerError",
    "message": "An unexpected error occurred"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>InternalServerError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Em produção, mensagem genérica; em dev pode incluir detalhes.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LIST INVOICES -->
    <div class="endpoint-card" id="ep-list">
      <div class="endpoint-header" onclick="togglePlayground('pg-list', 'chev-list')">
        <span class="method-pill method-get">GET</span>
        <span class="endpoint-path">/api/v1/invoices</span>
        <span class="endpoint-summary">Lista faturas com filtros e paginação opcionais</span>
        <span class="endpoint-chevron" id="chev-list">&#9660;</span>
      </div>
      <div class="playground" id="pg-list">
        <div class="playground-title">&#9654; Testar</div>

        <div class="form-row">
          <div class="form-field">
            <label class="form-label">customer_number <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
            <input type="text" id="f-list-cn" class="form-input" placeholder="ex: 7202210726" />
            <p class="form-hint">Número do cliente conforme impresso na fatura (campo "Nº do Cliente"). Filtra faturas de um único cliente. Omita para listar todos.</p>
          </div>
          <div class="form-field">
            <label class="form-label">reference_month <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
            <input type="text" id="f-list-rm" class="form-input" placeholder="ex: SET/2024" />
            <p class="form-hint">Mês de referência no formato <code>MMM/AAAA</code> em maiúsculas (ex: <code>JAN/2024</code>, <code>SET/2024</code>). Filtra faturas de um mês específico.</p>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label class="form-label">page <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
            <input type="number" id="f-list-page" class="form-input" placeholder="1" min="1" />
            <p class="form-hint">Número da página. Começa em <code>1</code>. Padrão: <code>1</code>.</p>
          </div>
          <div class="form-field">
            <label class="form-label">limit <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
            <input type="number" id="f-list-limit" class="form-input" placeholder="20" min="1" max="100" />
            <p class="form-hint">Registros por página. Máximo: <code>100</code>. Padrão: <code>20</code>.</p>
          </div>
        </div>

        <button class="send-btn" onclick="req_list(event)">&#9654; Enviar Requisição</button>
        <div id="resp-list"></div>

        <div class="resp-examples">
          <div class="resp-examples-label">Exemplos de response</div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — lista paginada de faturas</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": [
    {
      "id": "a3b4c5d6-e7f8-9012-abcd-ef1234567890",
      "customerId": "f1e2d3c4-b5a6-7890-abcd-ef0123456789",
      "customerNumber": "7202210726",
      "referenceMonth": "SET/2024",
      "electricEnergyKwh": 50,
      "electricEnergyValue": 38.63,
      "sceeeEnergyKwh": 476,
      "sceeeEnergyValue": 366.28,
      "compensatedEnergyKwh": 476,
      "compensatedEnergyValue": -354.11,
      "publicLightingContrib": 49.43,
      "energyConsumptionKwh": 526,
      "totalValueWithoutGd": 454.34,
      "gdSavings": -354.11,
      "fileUrl": null,
      "processedAt": "2024-09-15T14:23:00.000Z"
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 20
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code>.</td></tr>
                  <tr><td class="schema-name">data</td><td class="schema-type">array (Invoice)</td><td>Lista de faturas da página atual.</td></tr>
                  <tr><td class="schema-name">total</td><td class="schema-type">integer</td><td>Total de faturas que atendem aos filtros.</td></tr>
                  <tr><td class="schema-name">page</td><td class="schema-type">integer</td><td>Página atual (base 1).</td></tr>
                  <tr><td class="schema-name">limit</td><td class="schema-type">integer</td><td>Tamanho da página.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">400</span>
              <span class="resp-example-desc">Bad Request — query params inválidos</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "Invalid query parameter: 'page' must be a positive integer"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>ValidationError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Mensagem de validação.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-5xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">500</span>
              <span class="resp-example-desc">Internal Server Error — erro inesperado (ex.: falha de banco)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "InternalServerError",
    "message": "An unexpected error occurred"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>InternalServerError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Em produção, mensagem genérica; em dev pode incluir detalhes.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ENERGY DASHBOARD -->
    <div class="endpoint-card" id="ep-energy">
      <div class="endpoint-header" onclick="togglePlayground('pg-energy', 'chev-energy')">
        <span class="method-pill method-get">GET</span>
        <span class="endpoint-path">/api/v1/dashboard/energy</span>
        <span class="endpoint-summary">Consumo de energia (kWh) agrupado por mês de referência</span>
        <span class="endpoint-chevron" id="chev-energy">&#9660;</span>
      </div>
      <div class="playground" id="pg-energy">
        <div class="playground-title">&#9654; Testar</div>
        <div class="form-field">
          <label class="form-label">customer_number <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
          <input type="text" id="f-energy-cn" class="form-input" placeholder="ex: 7202210726" />
          <p class="form-hint">
            Filtra o dashboard para um cliente específico. Omita para retornar os dados agregados
            de todos os clientes presentes no banco. Os valores de <code>energyConsumptionKwh</code>
            e <code>compensatedEnergyKwh</code> são somados por mês de referência.
          </p>
        </div>
        <button class="send-btn" onclick="req_energy(event)">&#9654; Enviar Requisição</button>
        <div id="resp-energy"></div>

        <div class="resp-examples">
          <div class="resp-examples-label">Exemplos de response</div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — consumo de energia agrupado por mês</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": {
    "customerNumber": "7202210726",
    "data": [
      {
        "referenceMonth": "JAN/2024",
        "energyConsumptionKwh": 506,
        "compensatedEnergyKwh": 456
      },
      {
        "referenceMonth": "FEV/2024",
        "energyConsumptionKwh": 492,
        "compensatedEnergyKwh": 441
      },
      {
        "referenceMonth": "MAR/2024",
        "energyConsumptionKwh": 534,
        "compensatedEnergyKwh": 476
      }
    ]
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code>.</td></tr>
                  <tr><td class="schema-name">data.customerNumber</td><td class="schema-type">string | null</td><td>Número do cliente quando filtrado; <code>null</code> quando agregado.</td></tr>
                  <tr><td class="schema-name">data.data</td><td class="schema-type">array</td><td>Um item por mês de referência.</td></tr>
                  <tr><td class="schema-name">data.data[].referenceMonth</td><td class="schema-type">string</td><td>Formato <code>MMM/YYYY</code>.</td></tr>
                  <tr><td class="schema-name">data.data[].energyConsumptionKwh</td><td class="schema-type">number</td><td>Consumo total (kWh) no mês.</td></tr>
                  <tr><td class="schema-name">data.data[].compensatedEnergyKwh</td><td class="schema-type">number</td><td>Energia compensada GD (kWh) no mês.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — sem customer_number (todos os clientes agregados)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": {
    "customerNumber": null,
    "data": [
      {
        "referenceMonth": "JAN/2024",
        "energyConsumptionKwh": 1540,
        "compensatedEnergyKwh": 1320
      },
      {
        "referenceMonth": "FEV/2024",
        "energyConsumptionKwh": 1480,
        "compensatedEnergyKwh": 1290
      }
    ]
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code>.</td></tr>
                  <tr><td class="schema-name">data.customerNumber</td><td class="schema-type">null</td><td>Sem filtro: todos os clientes agregados.</td></tr>
                  <tr><td class="schema-name">data.data</td><td class="schema-type">array</td><td>Um item por mês de referência.</td></tr>
                  <tr><td class="schema-name">data.data[].referenceMonth</td><td class="schema-type">string</td><td>Formato <code>MMM/YYYY</code>.</td></tr>
                  <tr><td class="schema-name">data.data[].energyConsumptionKwh</td><td class="schema-type">number</td><td>Consumo total (kWh).</td></tr>
                  <tr><td class="schema-name">data.data[].compensatedEnergyKwh</td><td class="schema-type">number</td><td>Energia compensada (kWh).</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">400</span>
              <span class="resp-example-desc">Bad Request — query params inválidos (ex.: customer_number com tipo incorreto)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "Invalid query parameters: {"customer_number":["Expected string, received array"]}"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>ValidationError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Detalhes da validação Zod (query params).</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-5xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">500</span>
              <span class="resp-example-desc">Internal Server Error — erro inesperado (ex.: falha de banco)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "InternalServerError",
    "message": "An unexpected error occurred"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>InternalServerError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Em produção, mensagem genérica; em dev pode incluir detalhes.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FINANCIAL DASHBOARD -->
    <div class="endpoint-card" id="ep-financial">
      <div class="endpoint-header" onclick="togglePlayground('pg-financial', 'chev-financial')">
        <span class="method-pill method-get">GET</span>
        <span class="endpoint-path">/api/v1/dashboard/financial</span>
        <span class="endpoint-summary">Valores financeiros (R$) agrupados por mês de referência</span>
        <span class="endpoint-chevron" id="chev-financial">&#9660;</span>
      </div>
      <div class="playground" id="pg-financial">
        <div class="playground-title">&#9654; Testar</div>
        <div class="form-field">
          <label class="form-label">customer_number <span class="badge badge-optional" style="font-size:9px; padding:1px 5px;">opcional</span></label>
          <input type="text" id="f-financial-cn" class="form-input" placeholder="ex: 7202210726" />
          <p class="form-hint">
            Filtra o dashboard para um cliente específico. Omita para retornar os dados de todos os
            clientes agregados por mês. <code>totalValueWithoutGd</code> é o valor total da conta
            sem o desconto GD. <code>gdSavings</code> é a economia gerada pela energia compensada
            (valor negativo = economia para o cliente).
          </p>
        </div>
        <button class="send-btn" onclick="req_financial(event)">&#9654; Enviar Requisição</button>
        <div id="resp-financial"></div>

        <div class="resp-examples">
          <div class="resp-examples-label">Exemplos de response</div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — valores financeiros agrupados por mês</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": {
    "customerNumber": "7202210726",
    "data": [
      {
        "referenceMonth": "JAN/2024",
        "totalValueWithoutGd": 329.60,
        "gdSavings": -222.22
      },
      {
        "referenceMonth": "FEV/2024",
        "totalValueWithoutGd": 315.80,
        "gdSavings": -214.50
      },
      {
        "referenceMonth": "MAR/2024",
        "totalValueWithoutGd": 342.10,
        "gdSavings": -230.80
      }
    ]
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code>.</td></tr>
                  <tr><td class="schema-name">data.customerNumber</td><td class="schema-type">string | null</td><td>Número do cliente quando filtrado; <code>null</code> quando agregado.</td></tr>
                  <tr><td class="schema-name">data.data</td><td class="schema-type">array</td><td>Um item por mês de referência.</td></tr>
                  <tr><td class="schema-name">data.data[].referenceMonth</td><td class="schema-type">string</td><td>Formato <code>MMM/YYYY</code>.</td></tr>
                  <tr><td class="schema-name">data.data[].totalValueWithoutGd</td><td class="schema-type">number</td><td>Valor total em R$ sem o desconto de GD.</td></tr>
                  <tr><td class="schema-name">data.data[].gdSavings</td><td class="schema-type">number</td><td>Economia GD (negativo = crédito para o cliente).</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-2xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">200</span>
              <span class="resp-example-desc">OK — sem customer_number (todos os clientes agregados)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": true,
  "data": {
    "customerNumber": null,
    "data": [
      {
        "referenceMonth": "JAN/2024",
        "totalValueWithoutGd": 985.40,
        "gdSavings": -652.80
      },
      {
        "referenceMonth": "FEV/2024",
        "totalValueWithoutGd": 942.20,
        "gdSavings": -618.30
      }
    ]
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>true</code>.</td></tr>
                  <tr><td class="schema-name">data.customerNumber</td><td class="schema-type">null</td><td>Sem filtro: todos os clientes agregados.</td></tr>
                  <tr><td class="schema-name">data.data</td><td class="schema-type">array</td><td>Um item por mês de referência.</td></tr>
                  <tr><td class="schema-name">data.data[].referenceMonth</td><td class="schema-type">string</td><td>Formato <code>MMM/YYYY</code>.</td></tr>
                  <tr><td class="schema-name">data.data[].totalValueWithoutGd</td><td class="schema-type">number</td><td>Valor total em R$.</td></tr>
                  <tr><td class="schema-name">data.data[].gdSavings</td><td class="schema-type">number</td><td>Economia GD (negativo).</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-4xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">400</span>
              <span class="resp-example-desc">Bad Request — query params inválidos (ex.: customer_number com tipo incorreto)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "ValidationError",
    "message": "Invalid query parameters: {"customer_number":["Expected string, received array"]}"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>ValidationError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Detalhes da validação Zod (query params).</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
          <div class="resp-example">
            <div class="resp-example-header resp-ex-5xx" onclick="toggleExample(this)">
              <span class="resp-example-arrow">&#9654;</span>
              <span class="resp-example-status">500</span>
              <span class="resp-example-desc">Internal Server Error — erro inesperado (ex.: falha de banco)</span>
            </div>
            <div class="resp-example-content tab-value">
              <div class="resp-example-tabs">
                <span class="resp-example-tab active" data-tab="value" onclick="switchRespTab(this)">Example value</span>
                <span class="resp-example-tab" data-tab="schema" onclick="switchRespTab(this)">Schema</span>
              </div>
              <div class="resp-example-body">{
  "success": false,
  "error": {
    "code": "InternalServerError",
    "message": "An unexpected error occurred"
  }
}</div>
              <div class="resp-example-schema">
                <table><thead><tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
                  <tr><td class="schema-name">success</td><td class="schema-type">boolean</td><td>Sempre <code>false</code>.</td></tr>
                  <tr><td class="schema-name">error.code</td><td class="schema-type">string</td><td>InternalServerError.</td></tr>
                  <tr><td class="schema-name">error.message</td><td class="schema-type">string</td><td>Em produção, mensagem genérica; em dev pode incluir detalhes.</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</main>

<!-- =========================================== SCRIPT =========================================== -->
<script>
  var BASE = window.location.origin;
  document.getElementById('base-url-display').textContent = BASE;

  // ---- Playground toggle ----
  function togglePlayground(pgId, chevId) {
    var pg = document.getElementById(pgId);
    var chev = document.getElementById(chevId);
    var isOpen = pg.classList.toggle('open');
    chev.classList.toggle('open', isOpen);
  }

  // ---- Response example toggle ----
  function toggleExample(header) {
    var content = header.nextElementSibling;
    var arrow = header.querySelector('.resp-example-arrow');
    var isOpen = content.classList.toggle('open');
    if (arrow) arrow.classList.toggle('open', isOpen);
  }

  function switchRespTab(tabEl) {
    var tab = tabEl.dataset.tab;
    var content = tabEl.closest('.resp-example-content');
    if (!content) return;
    content.querySelectorAll('.resp-example-tab').forEach(function(t) { t.classList.remove('active'); });
    tabEl.classList.add('active');
    content.classList.remove('tab-value', 'tab-schema');
    content.classList.add('tab-' + tab);
  }

  // ---- JSON syntax highlight ----
  function highlightJson(json) {
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\\\u[a-zA-Z0-9]{4}|\\\\[^u]|[^\\\\"])*"(\\s*:)?|\\b(true|false|null)\\b|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)/g,
      function(match) {
        var cls = 'json-num';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-str';
        } else if (/true|false/.test(match)) {
          cls = 'json-bool';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  // ---- Render response ----
  function renderResponse(respId, status, data, ms) {
    var statusClass = status >= 500 ? 'status-5xx' : (status >= 400 ? 'status-4xx' : 'status-2xx');
    var jsonStr = JSON.stringify(data, null, 2);
    var html = '<div class="response-wrap">';
    html += '<div class="response-meta">';
    html += '<span class="status-pill ' + statusClass + '">' + status + '</span>';
    html += '<span class="response-time">' + ms + ' ms</span>';
    html += '</div>';
    html += '<div class="response-body">' + highlightJson(jsonStr) + '</div>';
    html += '</div>';
    document.getElementById(respId).innerHTML = html;
  }

  function renderError(respId, msg) {
    var html = '<div class="response-wrap">';
    html += '<div class="response-meta"><span class="status-pill status-5xx">Erro de Rede</span></div>';
    html += '<div class="response-body" style="color:#f87171;">' + msg + '</div>';
    html += '</div>';
    document.getElementById(respId).innerHTML = html;
  }

  function setBtnLoading(btn, loading) {
    btn.disabled = loading;
    btn.innerHTML = loading ? '&#9203; Enviando...' : '&#9654; Enviar Requisição';
  }

  // ---- Endpoint handlers ----
  function req_health(e) {
    var btn = e.target;
    setBtnLoading(btn, true);
    var start = Date.now();
    fetch(BASE + '/health')
      .then(function(r) {
        var status = r.status;
        return r.json().then(function(data) {
          renderResponse('resp-health', status, data, Date.now() - start);
        });
      })
      .catch(function(err) { renderError('resp-health', err.message); })
      .finally(function() { setBtnLoading(btn, false); });
  }

  function req_upload(e) {
    var btn = e.target;
    var fileInput = document.getElementById('f-upload-file');
    if (!fileInput.files || !fileInput.files[0]) {
      renderError('resp-upload', 'Selecione um arquivo PDF antes de enviar.');
      return;
    }
    setBtnLoading(btn, true);
    var fd = new FormData();
    fd.append('invoice', fileInput.files[0]);
    var start = Date.now();
    fetch(BASE + '/api/v1/invoices/upload', { method: 'POST', body: fd })
      .then(function(r) {
        var status = r.status;
        return r.json().then(function(data) {
          renderResponse('resp-upload', status, data, Date.now() - start);
        });
      })
      .catch(function(err) { renderError('resp-upload', err.message); })
      .finally(function() { setBtnLoading(btn, false); });
  }

  function req_list(e) {
    var btn = e.target;
    setBtnLoading(btn, true);
    var params = new URLSearchParams();
    var cn = document.getElementById('f-list-cn').value.trim();
    var rm = document.getElementById('f-list-rm').value.trim();
    var pg = document.getElementById('f-list-page').value.trim();
    var lm = document.getElementById('f-list-limit').value.trim();
    if (cn) params.set('customer_number', cn);
    if (rm) params.set('reference_month', rm);
    if (pg) params.set('page', pg);
    if (lm) params.set('limit', lm);
    var qs = params.toString() ? '?' + params.toString() : '';
    var start = Date.now();
    fetch(BASE + '/api/v1/invoices' + qs)
      .then(function(r) {
        var status = r.status;
        return r.json().then(function(data) {
          renderResponse('resp-list', status, data, Date.now() - start);
        });
      })
      .catch(function(err) { renderError('resp-list', err.message); })
      .finally(function() { setBtnLoading(btn, false); });
  }

  function req_energy(e) {
    var btn = e.target;
    setBtnLoading(btn, true);
    var cn = document.getElementById('f-energy-cn').value.trim();
    var qs = cn ? '?customer_number=' + encodeURIComponent(cn) : '';
    var start = Date.now();
    fetch(BASE + '/api/v1/dashboard/energy' + qs)
      .then(function(r) {
        var status = r.status;
        return r.json().then(function(data) {
          renderResponse('resp-energy', status, data, Date.now() - start);
        });
      })
      .catch(function(err) { renderError('resp-energy', err.message); })
      .finally(function() { setBtnLoading(btn, false); });
  }

  function req_financial(e) {
    var btn = e.target;
    setBtnLoading(btn, true);
    var cn = document.getElementById('f-financial-cn').value.trim();
    var qs = cn ? '?customer_number=' + encodeURIComponent(cn) : '';
    var start = Date.now();
    fetch(BASE + '/api/v1/dashboard/financial' + qs)
      .then(function(r) {
        var status = r.status;
        return r.json().then(function(data) {
          renderResponse('resp-financial', status, data, Date.now() - start);
        });
      })
      .catch(function(err) { renderError('resp-financial', err.message); })
      .finally(function() { setBtnLoading(btn, false); });
  }

  // ---- Highlight static response examples and inline JSON blocks on load ----
  document.querySelectorAll('.resp-example-body, .json-auto').forEach(function(el) {
    var raw = el.textContent || '';
    el.innerHTML = highlightJson(raw);
  });

  // ---- Active nav: sync with hash (click) and with scroll ----
  var allSections = document.querySelectorAll('.doc-section[id], .endpoint-card[id]');
  var allNavItems = document.querySelectorAll('.nav-item');

  function setActiveNav(id) {
    if (!id) return;
    allNavItems.forEach(function(item) { item.classList.remove('active'); });
    var link = document.querySelector('.nav-item[href="#' + id + '"]');
    if (link) link.classList.add('active');
  }

  function setActiveFromHash() {
    var id = location.hash.slice(1);
    setActiveNav(id);
  }

  window.addEventListener('hashchange', setActiveFromHash);
  setActiveFromHash();

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' });

  allSections.forEach(function(s) { observer.observe(s); });
</script>
</body>
</html>`;
